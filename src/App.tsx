import "./App.css";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import {
  Direction,
  UnsolvedBoard,
  StateI,
  SolvedBoard,
  Board,
  GeneratorReturn,
  SolverStateI,
} from "./types";
import { GameContext } from "./context";
import { useEffect, useState, useMemo } from "react";
import {
  backtrack,
  inputAnswer,
  progress,
} from "./puzzle-logic/solver-helpers";
import solverVisualizerNext from "./puzzle-logic/solver-visualizer";

function App() {
  const colors = [
    "#ccffcc",
    "#ff9980",
    "#ffffb3",
    "#b3b3ff",
    "#f0b3ff",
    "#fff",
  ];
  const startingColor = 5;
  const getDefaultColorBoard = (): number[][] =>
    Array(5).fill(Array(5).fill(startingColor));
  const [state, setState] = useState<StateI>({
    initialized: false,
    puzzle: null,
    solution: null,
    colorBoard: getDefaultColorBoard(),
    selectedColor: 0,
    startSolving: false,
    solving: false,
    startGenerating: true,
    generating: false,
    complete: false,
    showModal: false,
    showError: false,
    errorMsg: "",
    minTrues: 10,
    maxTrues: 15,
    seed: "",
    solverState: null,
  });

  const worker = useMemo(
    () => new Worker(new URL("./worker.ts", import.meta.url)),
    []
  );

  // HELPER FUNCS - MOVE LATER
  // Consider types - it might be useful to have some explicitly named types here
  const checkComplete = (colorMap: number[][], solution: boolean[][]) => {
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

  const boardToColor = (board: Board): number[][] => {
    return board.map((row) =>
      row.map((val) => {
        if (typeof val !== "boolean") return startingColor as number;
        if (val) return 0;
        return 1;
      })
    );
  };

  // END HELPER FUNCS - MOVE LATER

  worker.onmessage = (e: MessageEvent) => {
    const data = e.data as GeneratorReturn | SolverStateI;
    if (state.generating) {
      const generatorData = data as GeneratorReturn;
      const [puzzle, solution] = generatorData;
      setState({
        ...state,
        initialized: true,
        puzzle,
        solution,
        generating: false,
        colorBoard: getDefaultColorBoard(),
      });
    }

    if (state.solving) {
      const solverState = data as SolverStateI;
      const { board, solved } = solverState;
      const colorBoard = boardToColor(board);
      if (solved) {
        setState({
          ...state,
          solving: false,
          colorBoard: colorBoard,
          solverState: null,
        });
      } else {
        setState({ ...state, solverState: e.data, colorBoard });
      }
    }
  };

  useEffect(() => {
    if (state.startGenerating) {
      setState({ ...state, startGenerating: false, generating: true });
      setTimeout(
        () =>
          worker.postMessage([
            true,
            [state.minTrues, state.maxTrues, state.seed],
          ]),
        500
      );
      return;
    }

    if (!state.initialized) return;

    if (state.startSolving) {
      const currentPuzzle = state.puzzle as Board;
      const visBoard: Board = currentPuzzle.map((row) => [...row]);
      const solverState = {
        board: visBoard,
        row: 0,
        col: 0,
        conditions: [],
        solved: false,
      };
      const colorBoard = getDefaultColorBoard();
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

  return (
    <div className="app">
      <Header />
      <GameContext.Provider value={{ state, setState }}>
        <GameBoard colors={colors} startingColor={startingColor} />
        <GameControls colors={colors} />
      </GameContext.Provider>
    </div>
  );
}

export default App;
