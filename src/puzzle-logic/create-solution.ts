import { SolvedBoard } from "../types";
import { allSquareStrings } from "./puzzle-helpers";

const createSolution = (numTrues: number): SolvedBoard => {
  const falseSquares = [...allSquareStrings];

  for (let i = 0; i < numTrues; i++) {
    const randIndex = Math.floor(Math.random() * falseSquares.length);
    falseSquares.splice(randIndex, 1);
  }

  const solution = Array(5)
    .fill(Array(5).fill(true))
    .map((row: Array<boolean>, i: number) =>
      row.map((_, j) => !falseSquares.includes(`${i}/${j}`))
    );

  return solution;
};

export default createSolution;
