import { useEffect, useMemo, useState } from "react";
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

export default function LandingPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerRow[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlayers();

    const channel = supabase
      .channel("landing-players")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data players:", error);
      setPlayers([]);
      setLoading(false);
      return;
    }

    setPlayers(data ?? []);
    setLoading(false);
  };

  const claimedNames = useMemo(
    () => players.filter((player) => player.is_claimed).map((player) => player.name),
    [players]
  );

  const availableCount = useMemo(
    () => players.filter((player) => !player.is_claimed).length,
    [players]
  );

  const handleStart = async () => {
    if (!selectedName || submitting) return;

    setSubmitting(true);

    const { data: targetPlayer, error: fetchError } = await supabase
      .from("players")
      .select("id, name, is_claimed")
      .eq("name", selectedName)
      .single();

    if (fetchError || !targetPlayer) {
      alert("Nama tidak ditemukan.");
      setSubmitting(false);
      return;
    }

    if (targetPlayer.is_claimed) {
      alert("Nama ini sudah dipakai. Pilih nama lain.");
      setSubmitting(false);
      await fetchPlayers();
      return;
    }

    const { error: updateError } = await supabase
      .from("players")
      .update({ is_claimed: true })
      .eq("id", targetPlayer.id)
      .eq("is_claimed", false);

    if (updateError) {
      console.error("Gagal claim nama:", updateError);
      alert("Gagal menyimpan nama. Coba lagi.");
      setSubmitting(false);
      return;
    }

    localStorage.setItem("current_player", selectedName);
    navigate("/quiz");
  };

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={1} total={7} label="Landing Page" />

        <section className="card center-card">
          <p className="eyebrow">Abi bagi-bagi THR</p>
          <h1 className="title">Pilih nama dulu sebelum mulai.</h1>
          <p className="subtitle">
            Klo gaada namanya brati gabisa dapet THR.
          </p>
          <p className="subtitle">
            Sisa nama yang tersedia: <strong>{availableCount}</strong>
          </p>

          {loading ? (
            <p className="subtitle">Memuat nama...</p>
          ) : (
            <div className="player-grid">
              {players.map((player) => {
                const isTaken = claimedNames.includes(player.name);
                const isSelected = selectedName === player.name;

                return (
                  <button
                    key={player.id}
                    type="button"
                    className={`player-btn ${isSelected ? "selected" : ""} ${
                      isTaken ? "taken" : ""
                    }`}
                    onClick={() => !isTaken && setSelectedName(player.name)}
                    disabled={isTaken || submitting}
                  >
                    <span>{player.name}</span>
                    {isTaken && <small>Sudah dipakai</small>}
                  </button>
                );
              })}
            </div>
          )}

          <div className="actions-row">
            <button
              className="btn btn-primary"
              type="button"
              disabled={!selectedName || loading || submitting}
              onClick={handleStart}
            >
              {submitting
                ? "Menyimpan..."
                : selectedName
                ? `Lanjut sebagai ${selectedName}`
                : "Pilih nama dulu"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}