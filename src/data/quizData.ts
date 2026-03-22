export type QuizItem = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export const quizData: QuizItem[] = [
  {
    id: 1,
    question: "Bulan spesial untuk web ini adalah?",
    options: ["Syawal", "Ramadhan", "Rajab", "Muharram"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Warna tema utama web ini adalah?",
    options: ["Pink silver", "Blue white", "Green gold", "Black red"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "Sebelum ke hadiah akhir, kamu harus...",
    options: ["Logout", "Main quiz dan game", "Refresh page", "Skip semua"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "Game pertama target tap-nya berapa?",
    options: ["25", "50", "75", "100"],
    correctIndex: 3,
  },
  {
    id: 5,
    question: "Memory game punya berapa pasangan kartu?",
    options: ["10", "15", "20", "25"],
    correctIndex: 3,
  },
  {
    id: 6,
    question: "Siapa yang jalan duluan di Tic Tac Toe?",
    options: ["AI", "User", "Acak", "Tidak ada"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "Kalau ada jawaban quiz yang salah, bisa lanjut?",
    options: ["Bisa", "Tidak bisa", "Kadang bisa", "Tergantung device"],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "Di akhir nanti ada field untuk...",
    options: ["Upload foto", "Isi kesan dan pesan", "Edit quiz", "Buat akun"],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "Nama yang sudah dipakai pemain lain akan...",
    options: [
      "Tetap bisa dipakai",
      "Jadi prioritas",
      "Tidak bisa dipakai lagi",
      "Auto terhapus",
    ],
    correctIndex: 2,
  },
  {
    id: 10,
    question: "Setelah semua selesai, kamu akan dapat...",
    options: ["Leaderboard", "Urutan selesai", "Link THR", "Semuanya benar"],
    correctIndex: 3,
  },
];