type QuizCardProps = {
  question: string;
  options: string[];
  selectedAnswer?: string;
  onSelect: (value: string) => void;
};

export default function QuizCard({
  question,
  options,
  selectedAnswer,
  onSelect,
}: QuizCardProps) {
  return (
    <div className="quiz-card">
      <h3>{question}</h3>

      <div className="quiz-options">
        {options.map((option) => (
          <button
            key={option}
            className={`quiz-option ${
              selectedAnswer === option ? "selected" : ""
            }`}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}