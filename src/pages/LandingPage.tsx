import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import { playerNames } from "../data/players";
import { claimName, getClaimedNames, setCurrentPlayer } from "../lib/storage";

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState("");
  const [claimed] = useState<string[]>(getClaimedNames());

  const availableCount = useMemo(
    () => playerNames.filter((name) => !claimed.includes(name)).length,
    [claimed]
  );

  const handleStart = () => {
    if (!selectedName) return;

    if (claimed.includes(selectedName)) {
      alert("Nama ini sudah dipakai. Pilih nama lain.");
      return;
    }

    setCurrentPlayer(selectedName);
    claimName(selectedName);
    navigate("/quiz");
  };

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={1} total={7} label="Landing Page" />

        <section className="card center-card">
          <p className="eyebrow">Venthology Ramadhan Edition</p>
          <h1 className="title">Pilih nama dulu sebelum mulai.</h1>
          <p className="subtitle">
            Nama yang sudah dipakai tidak bisa digunakan lagi.
          </p>
          <p className="subtitle">
            Sisa nama yang tersedia: <strong>{availableCount}</strong>
          </p>

          <div className="player-grid">
            {playerNames.map((name) => {
              const isTaken = claimed.includes(name);
              const isSelected = selectedName === name;

              return (
                <button
                  key={name}
                  type="button"
                  className={`player-btn ${isSelected ? "selected" : ""} ${
                    isTaken ? "taken" : ""
                  }`}
                  onClick={() => !isTaken && setSelectedName(name)}
                  disabled={isTaken}
                >
                  <span>{name}</span>
                  {isTaken && <small>Sudah dipakai</small>}
                </button>
              );
            })}
          </div>

          <div className="actions-row">
            <button
              className="btn btn-primary"
              type="button"
              disabled={!selectedName}
              onClick={handleStart}
            >
              {selectedName ? `Lanjut sebagai ${selectedName}` : "Pilih nama dulu"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}