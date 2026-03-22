import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import {
  addLeaderboardEntry,
  getCurrentPlayer,
  getLeaderboard,
} from "../lib/storage";

export default function MessagePage() {
  const navigate = useNavigate();
  const player = getCurrentPlayer();
  const [message, setMessage] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<number | null>(null);

  const leaderboard = useMemo(() => getLeaderboard(), [submittedOrder]);

  if (!player) {
    navigate("/");
    return null;
  }

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("Isi kesan dan pesan dulu.");
      return;
    }

    const order = addLeaderboardEntry(player, message.trim());
    setSubmittedOrder(order);
  };

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={6} total={7} label="Kesan & Pesan" />

        <section className="section-stack">
          <div className="card">
            <div className="page-heading">
              <p className="eyebrow">Kesan & Pesan</p>
              <h1 className="title">Tulis pesanmu dulu.</h1>
              <p className="subtitle">
                {player}, isi kesan dan pesan sebelum ke link THR.
              </p>
            </div>

            <textarea
              className="message-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis kesan dan pesan di sini..."
            />

            <div className="actions-row" style={{ marginTop: 16 }}>
              <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Submit
              </button>

              {submittedOrder && (
                <button
                  className="btn"
                  type="button"
                  onClick={() => navigate("/thr")}
                >
                  Lanjut ke THR
                </button>
              )}
            </div>

            {submittedOrder && (
              <p className="subtitle" style={{ marginTop: 16, textAlign: "center" }}>
                Kamu selesai urutan ke-<strong>{submittedOrder}</strong>.
              </p>
            )}
          </div>

          <div className="card">
            <div className="page-heading">
              <p className="eyebrow">Leaderboard</p>
              <h2 className="title" style={{ fontSize: "2rem" }}>
                Yang sudah selesai
              </h2>
            </div>

            <div className="leaderboard">
              {leaderboard.length === 0 ? (
                <p className="subtitle">Belum ada yang selesai.</p>
              ) : (
                leaderboard
                  .sort((a, b) => a.order - b.order)
                  .map((entry) => (
                    <div key={entry.name} className="leaderboard-item">
                      <span>
                        #{entry.order} - {entry.name}
                      </span>
                      <span>{entry.message}</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}