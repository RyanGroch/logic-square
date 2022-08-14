import {
  useContext,
  MouseEventHandler,
  FormEventHandler,
  EventHandler,
  ChangeEvent,
} from "react";
import { GameContext, GameContextI } from "../context";
import { FaWindowClose } from "react-icons/fa";
import styles from "./Modal.module.css";

function Modal() {
  const { state, setState } = useContext(GameContext) as GameContextI;
  const closeModal: MouseEventHandler = () => {
    setState({ ...state, showModal: false });
  };
  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();
    const errorMsg =
      !state.minTrues || !state.maxTrues
        ? "Please fill out all required fields."
        : state.minTrues > state.maxTrues
        ? "The maximum number of trues must be greater than or equal to the minimum number of trues."
        : state.minTrues < 1 ||
          state.minTrues > 25 ||
          state.maxTrues < 1 ||
          state.maxTrues > 25
        ? "Values of min/max trues must be between 1 and 25."
        : "";

    setState({
      ...state,
      showModal: Boolean(errorMsg),
      showError: Boolean(errorMsg),
      startGenerating: !errorMsg,
      errorMsg,
    });
  };
  const setTrues: EventHandler<ChangeEvent> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.currentTarget;
    setState({ ...state, [target.id]: Number(target.value) || 0 });
  };
  const setSeed: EventHandler<ChangeEvent> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.currentTarget;
    setState({ ...state, seed: target.value });
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
        <form onSubmit={submitForm}>
          <div className={styles["modal__form-box"]}>
            <label htmlFor="minTrues">Min # True: </label>
            <input
              type="number"
              min={1}
              max={25}
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
              max={25}
              id="maxTrues"
              value={state.maxTrues || ""}
              onChange={setTrues}
            />
          </div>
          <div className={styles["modal__form-box"]}>
            <label htmlFor="seed">Seed (optional): </label>
            <input
              type="text"
              id="seed"
              value={state.seed}
              onChange={setSeed}
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
            <button type="submit" className={styles.modal__btn}>
              Generate Puzzle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
