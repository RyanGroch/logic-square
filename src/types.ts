export enum Direction {
  Up = "UP",
  Right = "RIGHT",
  Down = "DOWN",
  Left = "LEFT",
}

export type BoardCondition = [Direction, number, boolean];

type Row = Array<BoardCondition | boolean>;
export type Board = Array<Row>;

type SolvedRow = Array<boolean>;
export type SolvedBoard = Array<SolvedRow>;
export type UnsolvedBoard = BoardCondition[][];

type VisualizerVal = [boolean, boolean];
type VisualizerRow = Array<BoardCondition | VisualizerVal>;
export type VisualizerBoard = Array<VisualizerRow>;

export type Square = [number, number];
export type SolverCondition = [Array<Square>, number, boolean, boolean];

export type GeneratorPayload = [number, number];
export type SolverPayload = [SolverStateI, UnsolvedBoard];
export type WorkerPayload = GeneratorPayload | SolverPayload;

export type GeneratorReturn = [UnsolvedBoard, SolvedBoard];

export interface SolverStateI {
  board: Board;
  row: number;
  col: number;
  conditions: Array<SolverCondition>;
  solved: boolean;
}

export interface StateI {
  initialized: boolean;
  puzzle: UnsolvedBoard | null;
  solution: SolvedBoard | null;
  colorBoard: number[][];
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
