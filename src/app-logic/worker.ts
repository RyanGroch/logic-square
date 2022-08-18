import createPuzzle from "../puzzle-logic/create-puzzle";
import createSolution from "../puzzle-logic/create-solution";
import solverVisualizerNext from "../puzzle-logic/solver-visualizer";
import {
  SolvedBoard,
  WorkerPayload,
  GeneratorPayload,
  SolverPayload,
} from "../types";
import { getNumTrues } from "./helpers";

onmessage = (msg): void => {
  const generate: boolean = msg.data[0];
  const data = msg.data[1] as WorkerPayload;

  if (generate) {
    const [minTrues, maxTrues] = data as GeneratorPayload;
    const numTrues = getNumTrues(minTrues, maxTrues);
    const solution: SolvedBoard = createSolution(numTrues);
    const puzzle = createPuzzle(solution);
    postMessage([puzzle, solution]);
  } else {
    const [solverState, puzzle] = data as SolverPayload;
    const newState = solverVisualizerNext(solverState, puzzle);
    postMessage(newState);
  }
};
