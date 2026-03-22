import { useEffect, useState } from "react";

type TapGameProps = {
  target?: number;
  onComplete: () => void;
};

export default function TapGame({
  target = 100,
  onComplete,
}: TapGameProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= target) {
      onComplete();
    }
  }, [count, target, onComplete]);

  return (
    <div className="card center-card">
      <p className="eyebrow">Game 1</p>
      <h1 className="title">Tap sampai {target}</h1>
      <p className="subtitle">Tekan tombol sampai angka penuh.</p>

      <div className="tap-count">{count}</div>

      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Tap
      </button>
    </div>
  );
}