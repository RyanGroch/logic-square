import {
  useContext,
  MouseEventHandler,
  EventHandler,
  ChangeEvent,
} from "react";
import { GameContext, GameContextI } from "../app-logic/context";
import { FaWindowClose } from "react-icons/fa";
import styles from "./Modal.module.css";

function Modal() {
  const { state, setState } = useContext(GameContext) as GameContextI;
  const closeModal: MouseEventHandler = () => {
    setState({ ...state, showModal: false });
  };
  const checkForErrors = () =>
    !state.minTrues || !state.maxTrues
      ? "Please fill out all required fields."
      : state.minTrues > state.maxTrues
      ? "The maximum number of trues must be greater than or equal to the minimum number of trues."
      : state.minTrues < 1 ||
        state.minTrues > 24 ||
        state.maxTrues < 1 ||
        state.maxTrues > 24
      ? "Values of min/max trues must be between 1 and 24 (inclusive)."
      : "";
  const submitForm: MouseEventHandler = (e) => {
    e.preventDefault();
    const errorMsg = checkForErrors();

    setState({
      ...state,
      showModal: Boolean(errorMsg),
      showError: Boolean(errorMsg),
      [e.currentTarget.id]: !errorMsg,
      errorMsg,
    });
  };
  const setTrues: EventHandler<ChangeEvent> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]: Number(target.value) || 0 });
  };
  return (
    <div className={styles["modal__wrap"]}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h2>New Puzzle</h2>
          <div className={styles.modal__icon} onClick={closeModal}>
            <FaWindowClose />
          </div>
        </div>
        <form>
          <div className={styles["modal__form-box"]}>
            <label htmlFor="minTrues">Min # True: </label>
            <input
              type="number"
              min={1}
              max={24}
              id="minTrues"
              value={state.minTrues || ""}
              onChange={setTrues}
            />
          </div>
          <div className={styles["modal__form-box"]}>
            <label htmlFor="maxTrues">Max # True: </label>
            <input
              type="number"
              min={1}
              max={24}
              id="maxTrues"
              value={state.maxTrues || ""}
              onChange={setTrues}
            />
          </div>
          {state.showError ? (
            <div className={styles["modal__form-error"]}>
              <p>{state.errorMsg}</p>
            </div>
          ) : (
            ""
          )}
          <div className={styles["modal__btn-box"]}>
            <button
              type="button"
              className={styles.modal__btn}
              id="startGenerating"
              onClick={submitForm}
            >
              Generate Puzzle
            </button>
            <button
              type="button"
              className={`${styles.modal__btn} ${styles["modal__btn-secondary"]}`}
              id="gettingPuzzle"
              onClick={submitForm}
            >
              Get Pre-Generated Puzzle
            </button>
            <p className={styles.modal__disclaimer}>
              *Generating a new puzzle may take only a few seconds, or it may
              take over an hour if you get unlucky. Fetching a pre-generated
              puzzle is always instant.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
