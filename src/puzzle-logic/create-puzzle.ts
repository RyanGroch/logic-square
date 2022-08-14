import { Board, SolvedBoard } from "../types";
import {
  getConditions,
  removeSquareString,
  insertCondition,
  getSquareStrings,
  shuffleArray,
} from "./puzzle-helpers";
import solverGenerator from "./solver-generator";

const createPuzzle = (solution: SolvedBoard): Board => {
  const squareStrings = getSquareStrings();
  const board: Board = solution.map((row) => row.map((val) => val));
  const finalPuzzle = createPuzzleNext(board, solution, squareStrings);
  return finalPuzzle;
};

const createPuzzleNext = (
  board: Board,
  solution: SolvedBoard,
  squareStrings: Array<string>
): Board => {
  if (!squareStrings.length) {
    return board;
  }

  const shuffledSquares = shuffleArray(squareStrings);
  for (let squareString of shuffledSquares) {
    const indices = squareString.split("/");
    const [rowIndex, colIndex] = [Number(indices[0]), Number(indices[1])];
    const val: boolean = solution[rowIndex][colIndex];
    const conditions = shuffleArray(
      getConditions(solution, rowIndex, colIndex, val)
    );

    for (let condition of conditions) {
      const newBoard = insertCondition(board, condition, rowIndex, colIndex);
      const possibleSolutions = solverGenerator(newBoard);

      if (!possibleSolutions.length) {
        throw new Error("Puzzle has no solutions.");
      }

      if (possibleSolutions.length > 1) {
        continue;
      }

      const newSquareStrings = removeSquareString(
        shuffledSquares,
        squareString
      );
      const nextIter = createPuzzleNext(newBoard, solution, newSquareStrings);

      if (nextIter.length) {
        return nextIter;
      }
    }
  }

  return [];
};

export default createPuzzle;
