import localFont from "next/font/local";

/**
 * Vietnamese primary-school handwriting fonts ("chữ viết tay tiểu học") by Xa Trục Thảo
 * (Thủy Nguyễn) — free for non-commercial educational use, see src/fonts/README.md.
 *
 * Both fonts share the same metrics: 1 ô li = 200 font units on a 2048 UPM em, so
 * lowercase "o" is exactly 2 li tall, "b"/"l" 5 li, "t" 3 li, "d" 4 li, capitals 5 li.
 */

/** Solid "thanh đậm" (thick/thin) letters — the red model letters. */
export const tapVietFont = localFont({
  src: "../fonts/xtt-tapviet-thanhdam.woff2",
  variable: "--font-tapviet",
  display: "swap",
  preload: false,
});

/** Dotted "tập đồ" letters with identical outlines/advances — for tracing over. */
export const tapDoFont = localFont({
  src: "../fonts/xtt-tapdo.woff2",
  variable: "--font-tapdo",
  display: "swap",
  preload: false,
});
