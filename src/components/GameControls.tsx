import { MouseEventHandler, useContext } from "react";
import { GameContext, GameContextI } from "../app-logic/context";
import styles from "./GameControls.module.css";

interface Props {
  colors: Array<string>;
}

function GameControls({ colors }: Props) {
  const { state, setState } = useContext(GameContext) as GameContextI;
  const selectColor: MouseEventHandler = (e) => {
    const target = e.currentTarget as HTMLElement;
    setState({ ...state, selectedColor: Number(target.dataset.index) });
  };
  const openModal: MouseEventHandler = () => {
    if (state.solving || state.generating) return;
    setState({ ...state, showModal: true });
  };
  const beginSolving: MouseEventHandler = () => {
    if (state.solving || state.generating) return;
    setState({ ...state, showModal: false, startSolving: true });
  };
  return (
    <div>
      <div className={styles["btn-wrap"]}>
        {colors.map((color, i) => (
          <button
            className={styles["color-btn"]}
            style={{
              backgroundColor: color,
              boxShadow: `${
                i === state.selectedColor ? `0 0 8px 5px goldenrod` : ""
              }`,
            }}
            data-index={i}
            key={i}
            onClick={selectColor}
          >
            {i === 0 ? "True" : ""}
          </button>
        ))}
      </div>
      <div className={styles["btn-wrap"]}>
        <button
          className={`${styles["other-btn"]} ${styles["new-game-btn"]}`}
          onClick={openModal}
        >
          New Puzzle
        </button>
        <button
          className={`${styles["other-btn"]} ${styles["solve-for-me-btn"]}`}
          onClick={beginSolving}
        >
          Solve It For Me
        </button>
      </div>
    </div>
  );
}

export default GameControls;
