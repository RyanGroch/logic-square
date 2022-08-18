export enum Direction {
  Up = "UP",
  Right = "RIGHT",
  Down = "DOWN",
  Left = "LEFT",
}

export type BoardCondition = [Direction, number, boolean];

export type PartiallySolvedVal = BoardCondition | boolean;
export type PartiallySolvedBoard = PartiallySolvedVal[][];

export type SolvedBoard = boolean[][];
export type UnsolvedBoard = BoardCondition[][];

type VisualizerVal = BoardCondition | [boolean, boolean];
export type VisualizerBoard = VisualizerVal[][];

export type ColorBoard = number[][];

export type Square = [number, number];
export type SolverCondition = [Array<Square>, number, boolean, boolean];

export type GeneratorPayload = [number, number];
export type SolverPayload = [SolverStateI, UnsolvedBoard];
export type WorkerPayload = GeneratorPayload | SolverPayload;

export type GeneratorReturn = [UnsolvedBoard, SolvedBoard];

export interface SolverStateI {
  board: PartiallySolvedBoard;
  row: number;
  col: number;
  conditions: Array<SolverCondition>;
  solved: boolean;
}

export interface StateI {
  initialized: boolean;
  puzzle: UnsolvedBoard | null;
  solution: SolvedBoard | null;
  colorBoard: ColorBoard;
  selectedColor: number;
  startSolving: boolean;
  solving: boolean;
  startGenerating: boolean;
  generating: boolean;
  startGettingPuzzle: boolean;
  gettingPuzzle: boolean;
  complete: boolean;
  showModal: boolean;
  showError: boolean;
  errorMsg: string;
  minTrues: number;
  maxTrues: number;
  solverState: SolverStateI | null;
}
