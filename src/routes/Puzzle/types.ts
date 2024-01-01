export type Puzzle = {
  year: string;
  title: string;
  description: string;
  color: string;
  clues: Clue[];
  answers: Answer[];
} & ({ guest: never } | { guest: true; author: string });

export type Clue = {
  id: number;
  clue: string;
  answer: number;
  description?: string;
  credit?: string;
};

export type Answer = {
  id: number;
  answer: string;
};
