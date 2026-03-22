import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/layout/ProgressBar";
import QuizCard from "../components/quiz/QuizCard";
import { quizData } from "../data/quizData";

type Answers = Record<number, number>;

export default function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const player = localStorage.getItem("current_player");

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const allAnswered = answeredCount === quizData.length;

  const allCorrect = useMemo(() => {
    return quizData.every((item) => answers[item.id] === item.correctIndex);
  }, [answers]);

  const handleCheck = () => {
    if (!allAnswered) {
      alert("Jawab semua soal dulu.");
      return;
    }

    setShowResult(true);

    if (!allCorrect) {
      alert("Masih ada jawaban yang salah. Coba cek lagi.");
      return;
    }

    const confirmed = window.confirm(
      "Yakin nih jawabannya udah bener semua?"
    );

    if (confirmed) {
      navigate("/game-1");
    }
  };

  if (!player) {
    navigate("/");
    return null;
  }

  return (
    <main className="page app-shell">
      <div className="container narrow">
        <ProgressBar step={2} total={7} label="Quiz Page" />

        <section className="section-stack">
          <div className="page-heading">
            <p className="eyebrow">Quiz</p>
            <h1 className="title">Jawab semua dengan benar.</h1>
            <p className="subtitle">
              {player}, selesaikan semua soal dulu ya.
            </p>
            <p className="subtitle">
              Progress: {answeredCount}/{quizData.length}
            </p>
          </div>

          {quizData.map((item) => (
            <QuizCard
              key={item.id}
              question={item.question}
              options={item.options}
              correctIndex={item.correctIndex}
              selected={answers[item.id]}
              showResult={showResult}
              onSelect={(index) =>
                setAnswers((prev) => ({
                  ...prev,
                  [item.id]: index,
                }))
              }
            />
          ))}

          <div className="actions-row">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleCheck}
            >
              Cek Jawaban
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}