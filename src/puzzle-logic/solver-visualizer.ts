import { SolverStateI, UnsolvedBoard } from "../types";
import {
  backtrack,
  checkConditions,
  getSquares,
  inputAnswer,
  inputCondition,
  progress,
} from "./solver-helpers";

const solverVisualizerNext = (
  solverState: SolverStateI,
  puzzle: UnsolvedBoard
): SolverStateI => {
  const { board, row, col, conditions } = solverState;
  if (row === 5) return { ...solverState, solved: true };
  if (row === -1) throw new Error("Error: No solutions exist.");

  const current = board[row][col];
  const [nextRow, nextCol] = progress(row, col);
  const boardCondition = puzzle[row][col];
  const [direction, numSquares, claim] = boardCondition;
  const squares = getSquares(row, col, direction);

  if (typeof current !== "boolean") {
    const newBoard = inputAnswer(board, row, col, false);
    const newConditions = inputCondition(
      conditions,
      squares,
      numSquares,
      claim,
      false
    );
    const passed = checkConditions(newBoard, newConditions);
    return {
      board: newBoard,
      row: passed ? nextRow : row,
      col: passed ? nextCol : col,
      conditions: passed ? newConditions : conditions,
      solved: false,
    };
  }

  if (!current) {
    const newBoard = inputAnswer(board, row, col, true);
    const newConditions = inputCondition(
      conditions,
      squares,
      numSquares,
      claim,
      true
    );
    const passed = checkConditions(newBoard, newConditions);
    return {
      board: newBoard,
      row: passed ? nextRow : row,
      col: passed ? nextCol : col,
      conditions: passed ? newConditions : conditions,
      solved: false,
    };
  }

  const oldConditions = conditions.slice(0, -1);
  const oldBoard = inputAnswer(board, row, col, boardCondition);
  const [oldRow, oldCol] = backtrack(row, col);
  return {
    board: oldBoard,
    row: oldRow,
    col: oldCol,
    conditions: oldConditions,
    solved: false,
  };
};

export default solverVisualizerNext;
