import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/quiz/QuizCard";
import { quizData } from "../data/quizData";

type Answers = Record<number, string>;

export default function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const allAnswered = answeredCount === quizData.length;

  const handleSelect = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <main className="page quiz-page">
      <div className="container">
        <div className="quiz-header">
          <p className="subtitle">Quiz & Games Page</p>
          <h1 className="title">Sebelum masuk, jawab dulu ya.</h1>
          <p className="subtitle" style={{ marginTop: 12 }}>
            Progress: {answeredCount}/{quizData.length}
          </p>
        </div>

        <div className="quiz-list">
          {quizData.map((item) => (
            <QuizCard
              key={item.id}
              question={item.question}
              options={item.options}
              selectedAnswer={answers[item.id]}
              onSelect={(value) => handleSelect(item.id, value)}
            />
          ))}
        </div>

        <div className="quiz-footer">
          <button
            className="btn btn-primary"
            disabled={!allAnswered}
            style={{
              opacity: allAnswered ? 1 : 0.5,
              cursor: allAnswered ? "pointer" : "not-allowed",
            }}
            onClick={() => navigate("/main")}
          >
            {allAnswered ? "Masuk ke halaman utama" : "Jawab semua dulu"}
          </button>
        </div>
      </div>
    </main>
  );
}