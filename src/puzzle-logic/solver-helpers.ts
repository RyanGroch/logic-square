import {
  SolverCondition,
  Square,
  Direction,
  SolvedBoard,
  VisualizerBoard,
  PartiallySolvedBoard,
  PartiallySolvedVal,
} from "../types";

export const inputCondition = (
  conditions: Array<SolverCondition>,
  squares: Array<Square>,
  numSquares: number,
  claim: boolean,
  assessment: boolean
): Array<SolverCondition> => {
  return [...conditions, [squares, numSquares, claim, assessment]];
};

export const inputAnswer = (
  board: PartiallySolvedBoard,
  rowIndex: number,
  colIndex: number,
  valToInput: PartiallySolvedVal
): PartiallySolvedBoard => {
  return board.map((row, i) =>
    row.map((currVal, j) =>
      rowIndex === i && colIndex === j ? valToInput : currVal
    )
  );
};

export const checkConditions = (
  board: PartiallySolvedBoard,
  conditions: Array<SolverCondition>
): boolean => {
  for (let condition of conditions) {
    const [squares, numThatMeetClaim, claim, assessment] = condition;
    const [lowestOfClaim, highestOfClaim] = squares.reduce(
      (vals: [number, number], square: Square): [number, number] => {
        const [i, j] = square;
        return typeof board[i][j] !== "boolean"
          ? [vals[0], vals[1] + 1]
          : board[i][j] === claim
          ? [vals[0] + 1, vals[1] + 1]
          : vals;
      },
      [0, 0]
    );

    const hasAllInfo = highestOfClaim === lowestOfClaim;

    if (
      ((highestOfClaim < numThatMeetClaim ||
        lowestOfClaim > numThatMeetClaim) &&
        assessment) ||
      (hasAllInfo && highestOfClaim === numThatMeetClaim && !assessment)
    ) {
      return false;
    }
  }

  return true;
};

export const getSquares = (
  rowIndex: number,
  colIndex: number,
  direction: Direction
): Array<Square> => {
  const squares: Array<Square> = [];

  switch (direction) {
    case "UP":
      for (let k = 0; k < rowIndex; k++) {
        squares.push([k, colIndex]);
      }
      break;
    case "RIGHT":
      for (let k = colIndex + 1; k < 5; k++) {
        squares.push([rowIndex, k]);
      }
      break;
    case "DOWN":
      for (let k = rowIndex + 1; k < 5; k++) {
        squares.push([k, colIndex]);
      }
      break;
    case "LEFT":
      for (let k = 0; k < colIndex; k++) {
        squares.push([rowIndex, k]);
      }
      break;
    default:
      throw new TypeError("Invalid direction type");
  }

  return squares;
};

export const countTrueSquares = (
  squares: Array<Square>,
  solution: SolvedBoard
): number =>
  squares.reduce((numTrue: number, square: Square) => {
    const [row, col] = square;
    const value = solution[row][col];
    return value ? numTrue + 1 : numTrue;
  }, 0);

export const getRegularBoard = (
  visBoard: VisualizerBoard
): PartiallySolvedBoard =>
  visBoard.map((row) =>
    row.map((item) => (item.length === 2 ? item[0] : item))
  );

export const progress = (i: number, j: number): [number, number] => {
  const newI = j === 4 ? i + 1 : i;
  const newJ = j === 4 ? 0 : j + 1;

  return [newI, newJ];
};

export const backtrack = (i: number, j: number): [number, number] => {
  const newI = j === 0 ? i - 1 : i;
  const newJ = j === 0 ? 4 : j - 1;

  return [newI, newJ];
};
