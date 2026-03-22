import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";

export default function ThrPage() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<string | null>(null);

  useEffect(() => {
    const currentPlayer = localStorage.getItem("current_player");

    if (!currentPlayer) {
      navigate("/");
      return;
    }

    setPlayer(currentPlayer);
  }, [navigate]);

  if (!player) {
    return null;
  }

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={7} total={7} label="THR" />

        <section className="card center-card">
          <p className="eyebrow">Final Page</p>
          <h1 className="title">Yeay, ini link THR-nya.</h1>
          <p className="subtitle">
            {player}, thanku udah nyelesain semua quiz dan games sampai akhir.
          </p>

          <a
            className="btn btn-primary"
            href="https://app.gopay.co.id/NF8p/t53ztljk"
            target="_blank"
            rel="noreferrer"
          >
            Ambil THR
          </a>
        </section>
      </div>
    </main>
  );
}