import styles from "./GameBoard.module.css";
import { UnsolvedBoard } from "../types";
import { MouseEventHandler, useContext } from "react";
import { GameContext, GameContextI } from "../app-logic/context";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa";
import Modal from "./Modal";

interface Props {
  colors: string[];
  startingColor: number;
}

function GameBoard({ colors, startingColor }: Props) {
  const { state, setState } = useContext(GameContext) as GameContextI;
  const board = state.puzzle as UnsolvedBoard;
  const colorBoard: number[][] = state.colorBoard;
  const convertedColorMap = colorBoard.map((row) =>
    row.map((val) => colors[val])
  );
  const setBoxColor: MouseEventHandler = (e) => {
    if (state.solving) return;
    const target = e.currentTarget as HTMLElement;
    const rowIndex = Number(target.dataset.row);
    const colIndex = Number(target.dataset.col);
    setState({
      ...state,
      colorBoard: colorBoard.map((row, i) =>
        row.map((val, j) =>
          rowIndex === i && colIndex === j
            ? val === state.selectedColor
              ? startingColor
              : state.selectedColor
            : val
        )
      ),
    });
  };
  return (
    <div className={styles["board-wrap"]}>
      <div className={styles.board}>
        {state.generating || state.gettingPuzzle ? (
          <div className={styles["loading-screen"]}>
            <p>Generating Puzzle...</p>
          </div>
        ) : (
          <>
            {state.complete ? (
              <div className={styles["solved-msg"]}>Solved!</div>
            ) : (
              ""
            )}
            {state.showModal ? <Modal /> : ""}
            {state.initialized
              ? board.map((row, i) =>
                  row.map((val, j) => (
                    <div
                      className={`${styles.cell} ${
                        i === 0 ? styles["cell-top"] : ""
                      } ${j === 0 ? styles["cell-left"] : ""}`}
                      key={`${i}/${j}`}
                      data-row={i}
                      data-col={j}
                      style={{ backgroundColor: convertedColorMap[i][j] }}
                      onClick={setBoxColor}
                    >
                      <div className={styles["cell-inner"]}>
                        <div
                          className={`${styles["cell-inner-top-bottom"]} ${styles["cell-inner-part"]}`}
                        >
                          {val[0] === "UP" ? <FaAngleUp /> : ""}
                        </div>
                        <div
                          className={`${styles["cell-inner-side"]} ${styles["cell-inner-part"]}`}
                        >
                          {val[0] === "LEFT" ? <FaAngleLeft /> : ""}
                        </div>
                        <div
                          className={`${styles["cell-inner-center"]} ${styles["cell-inner-part"]}`}
                        >
                          {`${val[1]}${val[2] ? "T" : "F"}`}
                        </div>
                        <div
                          className={`${styles["cell-inner-side"]} ${styles["cell-inner-part"]}`}
                        >
                          {val[0] === "RIGHT" ? <FaAngleRight /> : ""}
                        </div>
                        <div
                          className={`${styles["cell-inner-top-bottom"]} ${styles["cell-inner-part"]}`}
                        >
                          {val[0] === "DOWN" ? <FaAngleDown /> : ""}
                        </div>
                      </div>
                    </div>
                  ))
                )
              : ""}
          </>
        )}
      </div>
    </div>
  );
}

export default GameBoard;
