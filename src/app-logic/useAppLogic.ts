import {
  StateI,
  SolvedBoard,
  GeneratorReturn,
  SolverStateI,
  UnsolvedBoard,
  PartiallySolvedBoard,
} from "../types";
import { useEffect, useState, useMemo } from "react";
import { boardToColor, checkComplete, getPregeneratedPuzzle } from "./helpers";
import { defaultColorBoard } from "../color-consts";

export default function useAppLogic(): [
  StateI,
  React.Dispatch<React.SetStateAction<StateI>>
] {
  const [state, setState] = useState<StateI>({
    puzzle: null,
    solution: null,
    colorBoard: defaultColorBoard,
    selectedColor: 0,
    startSolving: false,
    solving: false,
    startGenerating: false,
    generating: false,
    gettingPuzzle: true,
    complete: false,
    showModal: false,
    showError: false,
    errorMsg: "",
    minTrues: 10,
    maxTrues: 15,
    solverState: null,
  });

  const worker = useMemo(
    () => new Worker(new URL("./worker.ts", import.meta.url)),
    []
  );

  worker.onmessage = (e: MessageEvent) => {
    const data = e.data as GeneratorReturn | SolverStateI;

    if (state.generating) {
      const generatorData = data as GeneratorReturn;
      const [puzzle, solution] = generatorData;
      setState({
        ...state,
        puzzle,
        solution,
        generating: false,
        colorBoard: defaultColorBoard,
      });
    }

    if (state.solving) {
      const solverState = data as SolverStateI;
      const { board, solved } = solverState;
      const colorBoard = boardToColor(board);
      setState({
        ...state,
        solving: !solved,
        solverState: solved ? null : e.data,
        colorBoard,
      });
    }
  };

  useEffect(() => {
    if (state.gettingPuzzle) {
      const { puzzle, solution } = getPregeneratedPuzzle(
        state.minTrues,
        state.maxTrues
      );
      const colorBoard = defaultColorBoard;
      setState({
        ...state,
        gettingPuzzle: false,
        colorBoard,
        puzzle: puzzle as UnsolvedBoard,
        solution: solution as SolvedBoard,
      });
      return;
    }

    if (state.startGenerating) {
      setState({ ...state, startGenerating: false, generating: true });
      setTimeout(
        () => worker.postMessage([true, [state.minTrues, state.maxTrues]]),
        500
      );
      return;
    }

    if (state.startSolving) {
      const currentPuzzle = state.puzzle as PartiallySolvedBoard;
      const visBoard: PartiallySolvedBoard = currentPuzzle.map((row) => [
        ...row,
      ]);
      const solverState = {
        board: visBoard,
        row: 0,
        col: 0,
        conditions: [],
        solved: false,
      };
      const colorBoard = defaultColorBoard;
      setState({
        ...state,
        startSolving: false,
        solving: true,
        colorBoard,
        solverState,
      });
      setTimeout(
        () => worker.postMessage([false, [solverState, state.puzzle]]),
        5
      );
      return;
    }

    if (state.solving) {
      setTimeout(
        () => worker.postMessage([false, [state.solverState, state.puzzle]]),
        5
      );
    }

    const complete = checkComplete(
      state.colorBoard,
      state.solution as SolvedBoard
    );
    if (complete !== state.complete) {
      setState({ ...state, complete });
    }
  }, [state, worker]);

  return [state, setState];
}
