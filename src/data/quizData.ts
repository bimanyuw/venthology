export type QuizItem = {
  id: number;
  question: string;
  options: string[];
};

export const quizData: QuizItem[] = [
  {
    id: 1,
    question: "Kalau Ventho lagi nerima THR, ekspresi paling cocok yang mana?",
    options: [
      "Sok santai padahal senyum lebar",
      "Langsung bilang makasih banyak",
      "Nanya ini beneran?",
      "Auto flexing tipis-tipis",
    ],
  },
  {
    id: 2,
    question: "Kalau disuruh pilih, hadiah kecil yang paling bikin senang itu apa?",
    options: [
      "Pesan personal",
      "Foto kenangan",
      "Video lucu",
      "Uang digital pastinya",
    ],
  },
  {
    id: 3,
    question: "Menurutmu, website ini harus dibuka dengan cara apa?",
    options: [
      "Pelan-pelan biar vibes-nya dapet",
      "Langsung scroll sampai bawah",
      "Nonton video dulu",
      "Cari link THR duluan",
    ],
  },
];