export type Puzzle = {
  year: string;
  title: string;
  description: string;
  clues: Clue[];
  answers: Answer[];
};

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
