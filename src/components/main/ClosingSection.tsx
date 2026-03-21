export default function ClosingSection() {
  return (
    <section className="closing-section">
      <div className="closing-box">
        <p className="subtitle">The end</p>
        <h2 className="title">Oke, thank you sudah berkunjung ke web Ventho.</h2>
        <p className="subtitle" style={{ marginTop: 16 }}>
          Ini link THR-nya ya. Semoga suka sama web kecil ini.
        </p>

        <div className="closing-actions">
          <a
            className="btn btn-primary"
            href="https://link-gopay-atau-link-thr-kamu.com"
            target="_blank"
            rel="noreferrer"
          >
            Ambil THR
          </a>
        </div>
      </div>
    </section>
  );
}