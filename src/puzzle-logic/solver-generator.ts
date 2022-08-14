import { Board, SolverCondition } from "../types";
import {
  progress,
  inputAnswer,
  inputCondition,
  getSquares,
  checkConditions,
} from "./solver-helpers";

const solutions: Array<Board> = [];

const solverGenerator = (board: Board): Array<Board> => {
  solutions.length = 0;
  solverGeneratorNext(board, 0, 0, []);

  return solutions;
};

const solverGeneratorNext = (
  board: Board,
  rowIndex: number,
  colIndex: number,
  conditions: Array<SolverCondition>
): void => {
  if (rowIndex === 5) {
    solutions.push(board);
    return;
  }

  const current = board[rowIndex][colIndex];
  const [nextRowI, nextColI] = progress(rowIndex, colIndex);

  if (typeof current === "boolean") {
    return solverGeneratorNext(board, nextRowI, nextColI, conditions);
  }

  const [direction, numSqares, claim] = current;
  const squares = getSquares(rowIndex, colIndex, direction);

  for (let b of [false, true]) {
    const newBoard = inputAnswer(board, rowIndex, colIndex, b);
    const newConditions = inputCondition(
      conditions,
      squares,
      numSqares,
      claim,
      b
    );
    const passed = checkConditions(newBoard, newConditions);
    if (passed) {
      solverGeneratorNext(newBoard, nextRowI, nextColI, newConditions);
    }
  }
};

export default solverGenerator;
