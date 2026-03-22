export type QuizItem = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

export const quizData: QuizItem[] = [
  {
    id: 1,
    question: "Siapa orang yang paling nyebelin di Ventho?",
    options: ["ojan", "alika", "nisper", "mpi"],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "Siapakah nomor absen 19 di Ventho?",
    options: ["Kevin", "Kadek", "Abi", "Aceng"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Siapakah nomor absen 36 di Ventho?",
    options: ["Rama", "Ujang", "Nazla", "Najwa"],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "Angka berapa yang ada di nomor punggung jersey Bule?",
    options: ["11", "1", "7", "10"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "Siapakah orang terakhir yang di post di turulogy?",
    options: ["Dapler", "Ojan", "Ujang", "Ale"],
    correctIndex: 2,
  },
  {
    id: 6,
    question: "Ada berapa siswa di kelas Ventho?",
    options: ["45", "46", "47", "50"],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "Siapa nama wali kelas pertama Ventho?",
    options: ["Arie Wiguna Sampurna", "Arie Wiguno Sampoerno", "Arie Wiguno Sampurno", "Arie Wiguna Sampurno"],
    correctIndex: 3,
  },
  {
    id: 8,
    question: "Siapa nama wali kelas terakhir Ventho?",
    options: ["Kori Komaryah", "Kori Komariyati", "Kori Komaryati", "Kori Komayrati"],
    correctIndex: 2,
  },
  {
    id: 9,
    question: "Siapa nama karakter yang diperankan oleh Ravi di film Aurora",
    options: [
      "Zavie",
      "Zafhir",
      "Zafhi",
      "Zavi",
    ],
    correctIndex: 3,
  },
  {
    id: 10,
    question: "Ada berapa mata pelajaran selama kelas 12?",
    options: ["14", "15", "16", "17"],
    correctIndex: 1,
  },
];