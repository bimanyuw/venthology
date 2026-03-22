import ProgressBar from "../components/layout/ProgressBar";
import { getCurrentPlayer } from "../lib/storage";

export default function ThrPage() {
  const player = getCurrentPlayer();

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={7} total={7} label="THR" />

        <section className="card center-card">
          <p className="eyebrow">Final Page</p>
          <h1 className="title">Yeay, ini link THR-nya.</h1>
          <p className="subtitle">
            {player ? `${player}, ` : ""}
            makasih udah nyelesain semua quiz dan games sampai akhir.
          </p>

          <a
            className="btn btn-primary"
            href="https://link-thr-kamu.com"
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