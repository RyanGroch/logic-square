import { PartiallySolvedBoard, SolvedBoard, ColorBoard } from "../types";
import { startingColor } from "../color-consts";
import { pregenerated } from "../pregenerated";

export const checkComplete = (colorBoard: ColorBoard, solution: SolvedBoard) =>
  colorBoard.every((row, i) =>
    row.every(
      (val, j) =>
        (val === 0 && solution[i][j]) || (val !== 0 && !solution[i][j])
    )
  );

export const boardToColor = (board: PartiallySolvedBoard): ColorBoard =>
  board.map((row) =>
    row.map((val) => (typeof val !== "boolean" ? startingColor : val ? 0 : 1))
  );

export const getNumTrues = (minTrues: number, maxTrues: number): number =>
  Math.floor(Math.random() * (1 + maxTrues - minTrues) + minTrues);

export const getPregeneratedPuzzle = (minTrues: number, maxTrues: number) => {
  const numTrues = getNumTrues(minTrues, maxTrues);
  const puzzleIndex = Math.floor(Math.random() * 5);
  return pregenerated[numTrues - 1][puzzleIndex];
};
