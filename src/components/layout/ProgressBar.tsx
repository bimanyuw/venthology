type ProgressBarProps = {
  step: number;
  total: number;
  label: string;
};

export default function ProgressBar({
  step,
  total,
  label,
}: ProgressBarProps) {
  const width = `${(step / total) * 100}%`;

  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>{label}</span>
        <span>
          {step}/{total}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width }} />
      </div>
    </div>
  );
}