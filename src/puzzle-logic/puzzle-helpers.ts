import { countTrueSquares, getSquares } from "./solver-helpers";
import {
  BoardCondition,
  Direction,
  PartiallySolvedBoard,
  SolvedBoard,
} from "../types";

export const getConditions = (
  solution: SolvedBoard,
  rowIndex: number,
  colIndex: number,
  value: boolean
): Array<BoardCondition> => {
  const conditions: Array<BoardCondition> = [];
  const dirs: Array<Direction> = [
    Direction.Up,
    Direction.Right,
    Direction.Down,
    Direction.Left,
  ];
  const sdirs = shuffleArray<Direction>(dirs);

  for (let dir of sdirs) {
    const squares = getSquares(rowIndex, colIndex, dir);

    if (!squares.length) {
      continue;
    }

    const numTrue = countTrueSquares(squares, solution);
    const numFalse = squares.length - numTrue;

    for (let claim of [true, false]) {
      const inputNum = claim ? numTrue : numFalse;
      if (value) {
        conditions.push([dir, inputNum, claim]);
      } else {
        const possibleNumClaims = Array(squares.length + 1)
          .fill(0)
          .map((_, i) => i);
        const possibleNumsRemaining = possibleNumClaims.filter(
          (num) => inputNum !== num
        );
        for (let num of possibleNumsRemaining) {
          conditions.push([dir, num, claim]);
        }
      }
    }
  }
  return conditions;
};

export const removeSquareString = (
  squares: Array<string>,
  squareToRemove: string
): Array<string> => squares.filter((square) => square !== squareToRemove);

export const insertCondition = (
  board: PartiallySolvedBoard,
  condition: BoardCondition,
  rowIndex: number,
  colIndex: number
) =>
  board.map((row, i) =>
    row.map((item: BoardCondition | boolean, j) =>
      rowIndex === i && colIndex === j ? condition : item
    )
  );

export const getSquareStrings = (): Array<string> =>
  Array(25)
    .fill("")
    .map((_, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      return `${row}/${col}`;
    });

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};
