import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import { supabase } from "../lib/supabase";

type PlayerRow = {
  id: string;
  name: string;
  is_claimed: boolean;
  is_finished: boolean;
  finish_order: number | null;
  message: string | null;
  finished_at: string | null;
};

export default function MessagePage() {
  const navigate = useNavigate();
  const player = localStorage.getItem("current_player");

  const [message, setMessage] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<PlayerRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingBoard, setLoadingBoard] = useState(true);

  useEffect(() => {
    if (!player) {
      navigate("/");
      return;
    }

    fetchLeaderboard();
    fetchCurrentPlayerStatus();

    const channel = supabase
      .channel("message-page-players")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        () => {
          fetchLeaderboard();
          fetchCurrentPlayerStatus();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [player, navigate]);

  const fetchLeaderboard = async () => {
    setLoadingBoard(true);

    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("is_finished", true)
      .order("finish_order", { ascending: true });

    if (error) {
      console.error("Gagal mengambil leaderboard:", error);
      setLeaderboard([]);
      setLoadingBoard(false);
      return;
    }

    setLeaderboard(data ?? []);
    setLoadingBoard(false);
  };

  const fetchCurrentPlayerStatus = async () => {
    if (!player) return;

    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("name", player)
      .single();

    if (error || !data) {
      return;
    }

    if (data.message) {
      setMessage(data.message);
    }

    if (data.is_finished && data.finish_order) {
      setSubmittedOrder(data.finish_order);
    }
  };

  const handleSubmit = async () => {
    if (!player) {
      navigate("/");
      return;
    }

    if (!message.trim()) {
      alert("Isi kesan dan pesan dulu.");
      return;
    }

    if (submittedOrder) {
      return;
    }

    setSubmitting(true);

    const { data: existingPlayer, error: existingError } = await supabase
      .from("players")
      .select("*")
      .eq("name", player)
      .single();

    if (existingError || !existingPlayer) {
      alert("Data pemain tidak ditemukan.");
      setSubmitting(false);
      return;
    }

    if (existingPlayer.is_finished && existingPlayer.finish_order) {
      setSubmittedOrder(existingPlayer.finish_order);
      setSubmitting(false);
      return;
    }

    const { count, error: countError } = await supabase
      .from("players")
      .select("*", { count: "exact", head: true })
      .eq("is_finished", true);

    if (countError) {
      console.error("Gagal menghitung urutan finish:", countError);
      alert("Gagal menyimpan pesan. Coba lagi.");
      setSubmitting(false);
      return;
    }

    const nextOrder = (count ?? 0) + 1;

    const { error: updateError } = await supabase
      .from("players")
      .update({
        is_finished: true,
        finish_order: nextOrder,
        message: message.trim(),
        finished_at: new Date().toISOString(),
      })
      .eq("name", player)
      .eq("is_finished", false);

    if (updateError) {
      console.error("Gagal update player:", updateError);
      alert("Gagal menyimpan pesan. Coba lagi.");
      setSubmitting(false);
      return;
    }

    setSubmittedOrder(nextOrder);
    setSubmitting(false);
    await fetchLeaderboard();
  };

  if (!player) {
    return null;
  }

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
              disabled={Boolean(submittedOrder)}
            />

            <div className="actions-row" style={{ marginTop: 16 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
                disabled={submitting || Boolean(submittedOrder)}
              >
                {submitting
                  ? "Menyimpan..."
                  : submittedOrder
                  ? "Sudah Tersubmit"
                  : "Submit"}
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
              <p
                className="subtitle"
                style={{ marginTop: 16, textAlign: "center" }}
              >
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
              {loadingBoard ? (
                <p className="subtitle">Memuat leaderboard...</p>
              ) : leaderboard.length === 0 ? (
                <p className="subtitle">Belum ada yang selesai.</p>
              ) : (
                leaderboard.map((entry) => (
                  <div key={entry.id} className="leaderboard-item">
                    <span>
                      #{entry.finish_order} - {entry.name}
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