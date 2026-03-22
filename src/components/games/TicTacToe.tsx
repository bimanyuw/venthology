import { useEffect, useState } from "react";
import { checkWinner, getBestMove, type Board, type Cell } from "../../lib/tictactoe";

type TicTacToeProps = {
  onComplete: () => void;
};

export default function TicTacToe({ onComplete }: TicTacToeProps) {
  const createEmptyBoard = (): Board => Array(9).fill(null);

  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [status, setStatus] = useState("Kamu jalan duluan.");
  const [locked, setLocked] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const winner = checkWinner(board);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setLocked(false);
    setShowNext(false);
    setStatus("Kamu kalah. Coba lagi sampai menang ya.");
  };

  const handleClick = (index: number) => {
    if (board[index] || locked || winner || showNext) return;

    const nextBoard = [...board];
    nextBoard[index] = "X";
    setBoard(nextBoard);
    setLocked(true);
  };

  useEffect(() => {
    const result = checkWinner(board);

    if (result === "X") {
      setStatus("Kamu menang. Sekarang boleh lanjut.");
      setShowNext(true);
      setLocked(true);
      return;
    }

    if (result === "draw") {
      setStatus("Seri. Belum menang, coba lagi ya.");
      const timer = window.setTimeout(() => {
        setBoard(createEmptyBoard());
        setLocked(false);
        setShowNext(false);
        setStatus("Ulang lagi. Kamu jalan duluan.");
      }, 1000);

      return () => window.clearTimeout(timer);
    }

    if (result === "O") {
      const timer = window.setTimeout(() => {
        resetGame();
      }, 1000);

      return () => window.clearTimeout(timer);
    }

    const xCount = board.filter((cell) => cell === "X").length;
    const oCount = board.filter((cell) => cell === "O").length;

    if (xCount > oCount) {
      const timer = window.setTimeout(() => {
        const move = getBestMove([...board]);
        const nextBoard = [...board];
        nextBoard[move] = "O";
        setBoard(nextBoard);
        setLocked(false);
      }, 500);

      return () => window.clearTimeout(timer);
    }

    setLocked(false);
  }, [board]);

  return (
    <div className="card center-card">
      <p className="eyebrow">Game 3</p>
      <h1 className="title">Tic Tac Toe</h1>
      <p className="subtitle">{status}</p>

      <div className="ttt-grid">
        {board.map((cell: Cell, index) => (
          <button
            key={index}
            type="button"
            className="ttt-cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="actions-row">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setBoard(createEmptyBoard());
            setLocked(false);
            setShowNext(false);
            setStatus("Game direset. Kamu jalan duluan.");
          }}
        >
          Reset
        </button>

        <button
          type="button"
          className="btn btn-primary"
          disabled={!showNext}
          onClick={onComplete}
        >
          Next
        </button>
      </div>
    </div>
  );
}