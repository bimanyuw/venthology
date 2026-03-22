import { useEffect, useState } from "react";
import type { Board, Cell } from "../../lib/tictactoe";
import { checkWinner, getBestMove } from "../../lib/tictactoe";

type TicTacToeProps = {
  onComplete: () => void;
};

export default function TicTacToe({ onComplete }: TicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [status, setStatus] = useState("Kamu jalan duluan.");
  const [locked, setLocked] = useState(false);

  const winner = checkWinner(board);

  const handleClick = (index: number) => {
    if (board[index] || locked || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = "X";
    setBoard(nextBoard);
    setLocked(true);
  };

  useEffect(() => {
    const currentWinner = checkWinner(board);

    if (currentWinner === "X") {
      setStatus("Kamu menang.");
      const timer = window.setTimeout(() => onComplete(), 900);
      return () => window.clearTimeout(timer);
    }

    if (currentWinner === "O") {
      setStatus("AI menang.");
      const timer = window.setTimeout(() => onComplete(), 900);
      return () => window.clearTimeout(timer);
    }

    if (currentWinner === "draw") {
      setStatus("Seri.");
      const timer = window.setTimeout(() => onComplete(), 900);
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
  }, [board, onComplete]);

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
    </div>
  );
}