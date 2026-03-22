import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import TicTacToe from "../components/games/TicTacToe";

export default function Game3Page() {
  const navigate = useNavigate();

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={5} total={7} label="Game 3" />
        <TicTacToe onComplete={() => navigate("/message")} />
      </div>
    </main>
  );
}