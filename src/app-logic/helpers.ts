import { Board, SolvedBoard, UnsolvedBoard } from "../types";
import { startingColor } from "../color-consts";
import { pregenerated } from "../pregenerated";

// Consider types - it might be useful to have some explicitly named types here
export const checkComplete = (colorMap: number[][], solution: boolean[][]) => {
  let passing = true;
  colorMap.forEach((row, i) =>
    row.forEach((val, j) => {
      if ((val === 0 && !solution[i][j]) || (val !== 0 && solution[i][j])) {
        passing = false;
        return;
      }
    })
  );
  return passing;
};

export const boardToColor = (board: Board): number[][] => {
  return board.map((row) =>
    row.map((val) => {
      if (typeof val !== "boolean") return startingColor as number;
      if (val) return 0;
      return 1;
    })
  );
};

export const getDefaultColorBoard = (): number[][] =>
  Array(5).fill(Array(5).fill(startingColor));

export const getNumTrues = (minTrues: number, maxTrues: number): number =>
  Math.floor(Math.random() * (maxTrues - minTrues) + minTrues);

export const getPregeneratedPuzzle = (minTrues: number, maxTrues: number) => {
  const numTrues = getNumTrues(minTrues, maxTrues);
  const puzzleIndex = Math.floor(Math.random() * 5);
  return pregenerated[numTrues - 1][puzzleIndex];
};
