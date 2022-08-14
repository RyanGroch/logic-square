import { createContext, SetStateAction, Dispatch } from "react";
import { StateI } from "./types";

export interface GameContextI {
  state: StateI;
  setState: Dispatch<SetStateAction<StateI>>;
}

export const GameContext = createContext<GameContextI | null>(null);
