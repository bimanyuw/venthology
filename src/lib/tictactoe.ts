export type Cell = "X" | "O" | null;
export type Board = Cell[];

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: Board): Cell | "draw" | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(Boolean)) return "draw";
  return null;
}

function availableMoves(board: Board) {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
}

function minimax(board: Board, maximizing: boolean): number {
  const winner = checkWinner(board);

  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (winner === "draw") return 0;

  const moves = availableMoves(board);

  if (maximizing) {
    let bestScore = -Infinity;
    for (const move of moves) {
      board[move] = "O";
      const score = minimax(board, false);
      board[move] = null;
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  }

  let bestScore = Infinity;
  for (const move of moves) {
    board[move] = "X";
    const score = minimax(board, true);
    board[move] = null;
    bestScore = Math.min(bestScore, score);
  }
  return bestScore;
}

export function getBestMove(board: Board): number {
  const moves = availableMoves(board);
  const filledCount = board.filter(Boolean).length;

  if (filledCount <= 1) {
    const earlyChoices = [4, 0, 2, 6, 8].filter((i) => board[i] === null);
    return earlyChoices[Math.floor(Math.random() * earlyChoices.length)];
  }

  let bestScore = -Infinity;
  let bestMove = moves[0];

  for (const move of moves) {
    board[move] = "O";
    const score = minimax(board, false);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}