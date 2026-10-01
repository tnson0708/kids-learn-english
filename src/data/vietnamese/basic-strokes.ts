/**
 * The 5 groups of basic strokes ("5 nhóm nét cơ bản") for chữ viết thường, as SVG paths in ô li
 * units: x grows right from the stroke's left edge, y = 0 is the baseline (đường kẻ đậm) and
 * negative y is above it. Body strokes are 2 li tall like a/o; khuyết strokes reach 5 li.
 * Each path starts where the pen goes down, so the first point gets the "đặt bút" dot.
 */

export interface BasicStroke {
  id: string;
  name: string;
  /** Example letters that use the stroke. */
  example: string;
  path: string;
  /** Width in li (for spacing copies along a line). */
  width: number;
}

export interface BasicStrokeGroup {
  id: number;
  name: string;
  strokes: BasicStroke[];
}

export const BASIC_STROKE_GROUPS: BasicStrokeGroup[] = [
  {
    id: 0,
    name: "Nét thẳng",
    strokes: [
      { id: "thang-dung", name: "Nét thẳng đứng", example: "i, t, p", path: "M 0.3 -2 L 0.3 0", width: 0.6 },
      { id: "thang-ngang", name: "Nét ngang", example: "t, đ, e", path: "M 0 -1.5 L 2 -1.5", width: 2 },
    ],
  },
  {
    id: 1,
    name: "Nét xiên",
    strokes: [
      { id: "xien-phai", name: "Nét xiên phải", example: "x, v", path: "M 0 0 L 1.4 -2", width: 1.4 },
      { id: "xien-trai", name: "Nét xiên trái", example: "x, k", path: "M 0 -2 L 1.4 0", width: 1.4 },
    ],
  },
  {
    id: 2,
    name: "Nét cong",
    strokes: [
      {
        id: "cong-ho-phai",
        name: "Nét cong hở phải",
        example: "c, e",
        path: "M 1.5 -1.65 C 1.2 -2.1 0.15 -2.15 0.05 -1.1 C -0.05 -0.05 0.9 0.15 1.5 -0.45",
        width: 1.6,
      },
      {
        id: "cong-ho-trai",
        name: "Nét cong hở trái",
        example: "x, s",
        path: "M 0.1 -1.65 C 0.4 -2.1 1.45 -2.15 1.55 -1.1 C 1.65 -0.05 0.7 0.15 0.1 -0.45",
        width: 1.6,
      },
      {
        id: "cong-kin",
        name: "Nét cong kín",
        example: "o, a, d",
        path: "M 1.25 -1.9 C 0.5 -2.15 0 -1.6 0 -1 C 0 -0.35 0.45 0.05 0.95 0 C 1.5 -0.05 1.75 -0.55 1.75 -1.05 C 1.75 -1.55 1.5 -1.85 1.25 -1.9",
        width: 1.8,
      },
    ],
  },
  {
    id: 3,
    name: "Nét móc",
    strokes: [
      {
        id: "moc-xuoi",
        name: "Nét móc xuôi",
        example: "n, m",
        path: "M 0 -1.5 C 0.2 -2.05 1.05 -2.2 1.05 -1.45 L 1.05 0",
        width: 1.1,
      },
      {
        id: "moc-nguoc",
        name: "Nét móc ngược",
        example: "i, u, t",
        path: "M 0.2 -2 L 0.2 -0.55 C 0.2 0.15 1 0.1 1.4 -0.45",
        width: 1.4,
      },
      {
        id: "moc-hai-dau",
        name: "Nét móc hai đầu",
        example: "m, n",
        path: "M 0 -1.5 C 0.2 -2.05 0.9 -2.2 0.9 -1.45 L 0.9 -0.55 C 0.9 0.15 1.6 0.1 2 -0.45",
        width: 2,
      },
    ],
  },
  {
    id: 4,
    name: "Nét khuyết",
    strokes: [
      {
        id: "khuyet-tren",
        name: "Nét khuyết trên",
        example: "b, h, l",
        path: "M 0 -1.2 C 0.6 -1.7 1.35 -3.4 1.3 -4.35 C 1.25 -5.15 0.55 -5.1 0.55 -4.2 L 0.55 0",
        width: 1.4,
      },
      {
        id: "khuyet-duoi",
        name: "Nét khuyết dưới",
        example: "g, y",
        path: "M 0.9 -2 L 0.9 2.2 C 0.9 3.15 0.15 3.15 0.2 2.35 C 0.25 1.4 1 0.4 1.6 -0.3",
        width: 1.6,
      },
    ],
  },
];

/** Start point of a path ("M x y …"), for the đặt bút dot. */
export function pathStart(d: string): { x: number; y: number } {
  const m = d.match(/M\s*(-?[\d.]+)\s+(-?[\d.]+)/);
  return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
}
