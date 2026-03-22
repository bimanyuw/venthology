type QuizCardProps = {
  question: string;
  options: string[];
  selected?: number;
  showResult?: boolean;
  correctIndex: number;
  onSelect: (index: number) => void;
};

export default function QuizCard({
  question,
  options,
  selected,
  showResult,
  correctIndex,
  onSelect,
}: QuizCardProps) {
  return (
    <div className="card quiz-card">
      <h3>{question}</h3>

      <div className="quiz-options">
        {options.map((option, index) => {
          let className = "quiz-option";

          if (selected === index) {
            className += " selected";
          }

          if (showResult) {
            if (index === correctIndex) className += " correct";
            if (selected === index && index !== correctIndex) className += " wrong";
          }

          return (
            <button
              key={option}
              type="button"
              className={className}
              onClick={() => onSelect(index)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}