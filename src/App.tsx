import "./App.css";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import GameControls from "./components/GameControls";
import { GameContext } from "./app-logic/context";
import useAppLogic from "./app-logic/useAppLogic";

function App() {
  const [state, setState] = useAppLogic();

  return (
    <div className="app">
      <Header />
      <GameContext.Provider value={{ state, setState }}>
        <GameBoard />
        <GameControls />
      </GameContext.Provider>
    </div>
  );
}

export default App;
