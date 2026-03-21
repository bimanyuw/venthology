export type FloatingPhoto = {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotate?: number;
  z?: number;
};

export const floatingPhotos: FloatingPhoto[] = [
  {
    id: 1,
    src: "/photos/photo1.jpeg",
    alt: "Memory 1",
    width: 170,
    height: 230,
    x: -180,
    y: -40,
    rotate: -4,
    z: 2,
  },
  {
    id: 2,
    src: "/photos/photo2.jpeg",
    alt: "Memory 2",
    width: 210,
    height: 280,
    x: 40,
    y: -10,
    rotate: 2,
    z: 3,
  },
  {
    id: 3,
    src: "/photos/photo3.jpeg",
    alt: "Memory 3",
    width: 160,
    height: 220,
    x: 170,
    y: 55,
    rotate: -3,
    z: 1,
  },
  {
    id: 4,
    src: "/photos/photo4.jpeg",
    alt: "Memory 4",
    width: 150,
    height: 210,
    x: -30,
    y: 110,
    rotate: 3,
    z: 4,
  },
];

export const finalShowcasePhoto = {
  src: "/photos/photo5.jpeg",
  alt: "Final memory",
};