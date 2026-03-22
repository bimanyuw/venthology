import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import Game1Page from "./pages/Game1Page";
import Game2Page from "./pages/Game2Page";
import Game3Page from "./pages/Game3Page";
import MessagePage from "./pages/MessagePage";
import ThrPage from "./pages/ThrPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/game-1" element={<Game1Page />} />
      <Route path="/game-2" element={<Game2Page />} />
      <Route path="/game-3" element={<Game3Page />} />
      <Route path="/message" element={<MessagePage />} />
      <Route path="/thr" element={<ThrPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}