import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import TapGame from "../components/games/TapGame";

export default function Game1Page() {
  const navigate = useNavigate();

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={3} total={7} label="Game 1" />
        <TapGame target={100} onComplete={() => navigate("/game-2")} />
      </div>
    </main>
  );
}