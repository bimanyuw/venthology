import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import MemoryGame from "../components/games/MemoryGame";

export default function Game2Page() {
  const navigate = useNavigate();

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={4} total={7} label="Game 2" />
        <MemoryGame onComplete={() => navigate("/game-3")} />
      </div>
    </main>
  );
}