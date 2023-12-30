import { useEffect, useMemo, useReducer } from 'react';
import { Answer, Clue, Puzzle } from './types';
import PUZZLES from '../../puzzles.yml';
import { keyBy, toPairs } from 'lodash-es';

type Action =
  | {
      type: 'match';
      clue: Clue;
      answer: Answer;
    }
  | {
      type: 'unmatch';
      clue: Clue;
    }
  | {
      type: 'load';
      storage: Storage;
    };

type State = Map<Clue, Answer>;

type Storage = {
  [year in keyof typeof PUZZLES]: {
    [k in (typeof PUZZLES)[year]['clues'][number]['id']]?: (typeof PUZZLES)[year]['answers'][number]['id'];
  };
}[keyof typeof PUZZLES];

const load = (puzzle: Puzzle, storage: Storage): State => {
  const clues = keyBy(puzzle.clues, 'id');
  const answers = keyBy(puzzle.answers, 'id');

  const solution = toPairs(storage).reduce((acc, [clueId, answerId]) => {
    const clue = clues[clueId];
    const answer = answers[answerId];
    return clue && answer ? acc.set(clue, answer) : acc;
  }, new Map());
  return solution;
};

const save = (storageKey: string, solution: State) => {
  const data = JSON.stringify(
    [...solution.entries()].reduce(
      (acc, [clue, answer]) =>
        Object.assign(acc, { [clue.id]: String(answer.id) }),
      {},
    ),
  );

  localStorage.setItem(storageKey, data);
};

const useSolution = (puzzle: Puzzle) => {
  const storageKey = `wordplay.${puzzle.year}`;

  const [solution, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'match': {
        const newState = new Map(state).set(action.clue, action.answer);
        save(storageKey, newState);
        return newState;
      }
      case 'unmatch': {
        const newState = new Map(state);
        newState.delete(action.clue);
        save(storageKey, newState);
        return newState;
      }
      case 'load':
        return load(puzzle, action.storage);
      default:
        return state;
    }
  }, new Map());

  useEffect(() => {
    const json = localStorage.getItem(storageKey) || '{}';
    const storage = JSON.parse(json) as Storage;
    dispatch({ type: 'load', storage });
  }, [storageKey]);

  const solvedClues = useMemo(() => new Set(solution.keys()), [solution]);
  const solvedAnswers = useMemo(() => new Set(solution.values()), [solution]);

  const match = (clue: Clue, answer: Answer) =>
    dispatch({ type: 'match', clue, answer });
  const unmatch = (clue: Clue) => dispatch({ type: 'unmatch', clue });

  return { solution, solvedClues, solvedAnswers, match, unmatch };
};

export default useSolution;
