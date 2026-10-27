/**
 * Comprehensive Pre-Primary Math Curriculum (Toán Tiền Tiểu Học cho bé 5-6 tuổi)
 * Covers all 6 core modules:
 * 1. Numbers 0-10 & 11-20 (Số đếm, lượng tương ứng, cấu tạo số & tập viết số chuẩn ô ly)
 * 2. Comparison (>, <, =) & Ordering (So sánh số lượng, dấu cá sấu, sắp xếp thứ tự)
 * 3. Number Bonds (Tách - Gộp số trong phạm vi 5 & 10)
 * 4. Visual Addition, Subtraction & Word Problems (Cộng trừ trực quan & toán có lời văn)
 * 5. Geometry, Spatial Orientation & Measurement (Hình phẳng, hình khối, vị trí không gian, đo lường)
 * 6. Logic Patterns & Clock Time (Quy luật dãy hình & làm quen đồng hồ)
 */

export interface MathNumberItem {
  num: number;
  word: string;
  emoji: string;
  itemName: string;
  rhyme: string;
  strokeGuide: string;
  voicePrompt: string;
  color: string;
}

export const MATH_NUMBERS_0_10: MathNumberItem[] = [
  {
    num: 0,
    word: "Số không",
    emoji: "🪹",
    itemName: "chiếc tổ trống",
    rhyme: "Số 0 tròn trĩnh như quả trứng gà",
    strokeGuide: "1 nét cong kín: Đặt bút dưới đường kẻ ngang 3 một chút, viết nét cong kín từ phải sang trái xuống đường kẻ đậm rồi khép kín.",
    voicePrompt: "Số không. Số 0 tròn trĩnh như quả trứng gà, chỉ không có đồ vật nào.",
    color: "text-slate-600",
  },
  {
    num: 1,
    word: "Số một",
    emoji: "☀️",
    itemName: "ông mặt trời",
    rhyme: "Số 1 như chiếc bút chì đứng thẳng",
    strokeGuide: "2 nét: Nét 1 xiên phải ngắn từ giữa ô lên góc đường kẻ ngang 3; Nét 2 sổ thẳng từ đường kẻ 3 xuống đường kẻ đậm 1.",
    voicePrompt: "Số một. Có một ông mặt trời. Số 1 gồm nét xiên ngắn và nét sổ thẳng.",
    color: "text-red-600",
  },
  {
    num: 2,
    word: "Số hai",
    emoji: "🦆",
    itemName: "con vịt vàng",
    rhyme: "Số 2 giống chú vịt con đang bơi",
    strokeGuide: "1 nét cong trên kết hợp xiên thẳng và nét ngang: Đặt bút trên đường kẻ 2, viết nét cong trên rồi xiên thẳng về góc trái đường kẻ đậm, kéo ngang sang phải.",
    voicePrompt: "Số hai. Có hai con vịt vàng đang bơi.",
    color: "text-orange-600",
  },
  {
    num: 3,
    word: "Số ba",
    emoji: "🦋",
    itemName: "con bướm xinh",
    rhyme: "Số 3 như hai cánh bướm uốn lượn",
    strokeGuide: "2 nét cong phải nối tiếp (hoặc nét ngang + xiên + cong phải): Tạo hai bụng cong tròn đều nhau từ đường kẻ 3 xuống đường kẻ đậm.",
    voicePrompt: "Số ba. Có ba con bướm xinh xắn.",
    color: "text-amber-600",
  },
  {
    num: 4,
    word: "Số bốn",
    emoji: "🚗",
    itemName: "chiếc ô tô",
    rhyme: "Số 4 như chiếc cờ nhỏ vuông vắn",
    strokeGuide: "3 nét: Nét 1 xiên trái từ đường kẻ 3 xuống trên đường kẻ 1; Nét 2 kéo ngang sang phải; Nét 3 sổ thẳng từ trên xuống đường kẻ đậm.",
    voicePrompt: "Số bốn. Có bốn chiếc ô tô.",
    color: "text-emerald-600",
  },
  {
    num: 5,
    word: "Số năm",
    emoji: "⭐",
    itemName: "ngôi sao vàng",
    rhyme: "Số 5 như chiếc móc câu tròn bụng",
    strokeGuide: "3 nét: Nét sổ ngắn xuống đường kẻ 2, nối nét cong phải tròn bụng chạm đường kẻ đậm, cuối cùng viết nét ngang trên cùng ở đường kẻ 3.",
    voicePrompt: "Số năm. Có năm ngôi sao vàng lấp lánh.",
    color: "text-teal-600",
  },
  {
    num: 6,
    word: "Số sáu",
    emoji: "🐞",
    itemName: "bọ rùa đỏ",
    rhyme: "Số 6 như chiếc còi nhỏ xinh",
    strokeGuide: "1 nét cong dưới khép kín ở nửa dưới: Đặt bút dưới đường kẻ 3, viết nét cong trái xuống chạm đường kẻ đậm rồi vòng lên khép kín ở đường kẻ 2.",
    voicePrompt: "Số sáu. Có sáu chú bọ rùa đỏ.",
    color: "text-sky-600",
  },
  {
    num: 7,
    word: "Số bảy",
    emoji: "🌈",
    itemName: "cầu vồng",
    rhyme: "Số 7 như cây gậy nhỏ có đai ngang",
    strokeGuide: "3 nét: Nét 1 ngang trên đường kẻ 3; Nét 2 xiên trái xuống đường kẻ đậm; Nét 3 gạch ngang ngắn cắt giữa nét xiên.",
    voicePrompt: "Số bảy. Có bảy sắc cầu vồng rực rỡ.",
    color: "text-blue-600",
  },
  {
    num: 8,
    word: "Số tám",
    emoji: "🐙",
    itemName: "bạch tuộc",
    rhyme: "Số 8 như người tuyết hai vòng tròn",
    strokeGuide: "1 nét cong lượn hai vòng khép kín: Viết nét cong trái rồi lượn sang phải chạm đường kẻ đậm, vòng lên cắt chéo ở giữa tạo thành 2 vòng tròn trên nhỏ dưới to.",
    voicePrompt: "Số tám. Có tám chú bạch tuộc vui nhộn.",
    color: "text-indigo-600",
  },
  {
    num: 9,
    word: "Số chín",
    emoji: "🎈",
    itemName: "quả bóng bay",
    rhyme: "Số 9 như quả bóng bay có dây cầm",
    strokeGuide: "1 nét cong kín ở trên nối với nét móc ngược trái ở dưới: Tạo đầu tròn ở nửa trên rồi kéo xuống uốn cong chạm đường kẻ đậm.",
    voicePrompt: "Số chín. Có chín quả bóng bay nhiều màu.",
    color: "text-purple-600",
  },
  {
    num: 10,
    word: "Số mười",
    emoji: "🍎",
    itemName: "quả táo đỏ",
    rhyme: "Số 10 gồm chữ số 1 đứng trước và chữ số 0 đứng sau",
    strokeGuide: "Ghép chữ số 1 và chữ số 0 đứng cạnh nhau, cách nhau nửa ô ly, cùng cao 4 li (2 ô vuông).",
    voicePrompt: "Số mười. Gồm chữ số 1 đứng trước và chữ số 0 đứng sau. Có mười quả táo đỏ.",
    color: "text-rose-600",
  },
];

export interface TeenNumberItem {
  num: number;
  word: string;
  tens: number;
  ones: number;
  emoji: string;
}

export const MATH_NUMBERS_11_20: TeenNumberItem[] = [
  { num: 11, word: "Mười một", tens: 10, ones: 1, emoji: "🍓" },
  { num: 12, word: "Mười hai", tens: 10, ones: 2, emoji: "🍊" },
  { num: 13, word: "Mười ba", tens: 10, ones: 3, emoji: "🍋" },
  { num: 14, word: "Mười bốn", tens: 10, ones: 4, emoji: "🍐" },
  { num: 15, word: "Mười lăm", tens: 10, ones: 5, emoji: "🍑" },
  { num: 16, word: "Mười sáu", tens: 10, ones: 6, emoji: "🍒" },
  { num: 17, word: "Mười bảy", tens: 10, ones: 7, emoji: "🥝" },
  { num: 18, word: "Mười tám", tens: 10, ones: 8, emoji: "🍇" },
  { num: 19, word: "Mười chín", tens: 10, ones: 9, emoji: "🍉" },
  { num: 20, word: "Hai mươi", tens: 20, ones: 0, emoji: "🍍" },
];

export interface CompareQuestion {
  id: string;
  leftCount: number;
  leftEmoji: string;
  leftLabel: string;
  rightCount: number;
  rightEmoji: string;
  rightLabel: string;
  answer: ">" | "<" | "=";
  explanation: string;
}

export const COMPARE_QUESTIONS: CompareQuestion[] = [
  {
    id: "cmp_1",
    leftCount: 5,
    leftEmoji: "🍎",
    leftLabel: "quả táo",
    rightCount: 3,
    rightEmoji: "🍎",
    rightLabel: "quả táo",
    answer: ">",
    explanation: "5 quả táo nhiều hơn 3 quả táo, nên 5 lớn hơn 3 (5 > 3). Cá sấu há miệng về bên 5!",
  },
  {
    id: "cmp_2",
    leftCount: 2,
    leftEmoji: "🐣",
    leftLabel: "gà con",
    rightCount: 6,
    rightEmoji: "🐣",
    rightLabel: "gà con",
    answer: "<",
    explanation: "2 chú gà con ít hơn 6 chú gà con, nên 2 bé hơn 6 (2 < 6). Cá sấu há miệng về bên 6!",
  },
  {
    id: "cmp_3",
    leftCount: 4,
    leftEmoji: "⭐",
    leftLabel: "ngôi sao",
    rightCount: 4,
    rightEmoji: "⭐",
    rightLabel: "ngôi sao",
    answer: "=",
    explanation: "Hai bên đều có 4 ngôi sao bằng nhau, nên ta điền dấu bằng (4 = 4)!",
  },
  {
    id: "cmp_4",
    leftCount: 7,
    leftEmoji: "🍓",
    leftLabel: "quả dâu",
    rightCount: 4,
    rightEmoji: "🍓",
    rightLabel: "quả dâu",
    answer: ">",
    explanation: "7 quả dâu nhiều hơn 4 quả dâu, nên 7 lớn hơn 4 (7 > 4)!",
  },
  {
    id: "cmp_5",
    leftCount: 3,
    leftEmoji: "🐟",
    leftLabel: "con cá",
    rightCount: 8,
    rightEmoji: "🐟",
    rightLabel: "con cá",
    answer: "<",
    explanation: "3 con cá ít hơn 8 con cá, nên 3 bé hơn 8 (3 < 8)!",
  },
  {
    id: "cmp_6",
    leftCount: 6,
    leftEmoji: "🎈",
    leftLabel: "bóng bay",
    rightCount: 6,
    rightEmoji: "🎈",
    rightLabel: "bóng bay",
    answer: "=",
    explanation: "Hai bên cùng có 6 quả bóng bay, nên 6 bằng 6 (6 = 6)!",
  },
  {
    id: "cmp_7",
    leftCount: 9,
    leftEmoji: "🐝",
    leftLabel: "con ong",
    rightCount: 5,
    rightEmoji: "🐝",
    rightLabel: "con ong",
    answer: ">",
    explanation: "9 con ong nhiều hơn 5 con ong, nên 9 lớn hơn 5 (9 > 5)!",
  },
  {
    id: "cmp_8",
    leftCount: 1,
    leftEmoji: "🥕",
    leftLabel: "củ cà rốt",
    rightCount: 5,
    rightEmoji: "🥕",
    rightLabel: "củ cà rốt",
    answer: "<",
    explanation: "1 củ cà rốt ít hơn 5 củ cà rốt, nên 1 bé hơn 5 (1 < 5)!",
  },
];

export interface NumberBondItem {
  id: string;
  whole: number;
  partA: number;
  partB: number;
  missing: "whole" | "partB";
  emoji: string;
  itemName: string;
  prompt: string;
}

export const NUMBER_BOND_ITEMS: NumberBondItem[] = [
  {
    id: "nb_1",
    whole: 5,
    partA: 2,
    partB: 3,
    missing: "partB",
    emoji: "🍎",
    itemName: "quả táo",
    prompt: "Có 5 quả táo tách vào 2 giỏ. Giỏ thứ nhất có 2 quả, hỏi giỏ thứ hai có mấy quả?",
  },
  {
    id: "nb_2",
    whole: 5,
    partA: 4,
    partB: 1,
    missing: "partB",
    emoji: "🐣",
    itemName: "chú gà",
    prompt: "5 gồm 4 và mấy? Bé hãy đếm số gà còn lại nhé!",
  },
  {
    id: "nb_3",
    whole: 6,
    partA: 3,
    partB: 3,
    missing: "whole",
    emoji: "🍓",
    itemName: "quả dâu",
    prompt: "Gộp 3 quả dâu và 3 quả dâu được tất cả mấy quả dâu?",
  },
  {
    id: "nb_4",
    whole: 7,
    partA: 4,
    partB: 3,
    missing: "partB",
    emoji: "🎈",
    itemName: "quả bóng",
    prompt: "Có 7 quả bóng, tách ra 4 quả bóng bên trái thì bên phải còn mấy quả?",
  },
  {
    id: "nb_5",
    whole: 8,
    partA: 5,
    partB: 3,
    missing: "whole",
    emoji: "⭐",
    itemName: "ngôi sao",
    prompt: "Gộp 5 ngôi sao và 3 ngôi sao được tất cả bao nhiêu ngôi sao?",
  },
  {
    id: "nb_6",
    whole: 10,
    partA: 6,
    partB: 4,
    missing: "partB",
    emoji: "🍊",
    itemName: "quả cam",
    prompt: "Có 10 quả cam tách làm 2 phần: một phần có 6 quả, phần kia có mấy quả?",
  },
  {
    id: "nb_7",
    whole: 10,
    partA: 5,
    partB: 5,
    missing: "partB",
    emoji: "🍬",
    itemName: "viên kẹo",
    prompt: "10 gồm 5 và mấy? Bé chọn số đúng vào ô trống nhé!",
  },
  {
    id: "nb_8",
    whole: 9,
    partA: 7,
    partB: 2,
    missing: "whole",
    emoji: "🐟",
    itemName: "con cá",
    prompt: "Gộp 7 con cá và 2 con cá được tất cả mấy con cá?",
  },
];

export interface VisualWordProblem {
  id: string;
  op: "+" | "-";
  a: number;
  b: number;
  answer: number;
  emoji: string;
  story: string;
  question: string;
  explanation: string;
}

export const VISUAL_WORD_PROBLEMS: VisualWordProblem[] = [
  {
    id: "wp_1",
    op: "+",
    a: 3,
    b: 2,
    answer: 5,
    emoji: "🐦",
    story: "Trên cành cây có 3 chú chim đang hót, lát sau có thêm 2 chú chim nữa bay tới.",
    question: "Hỏi trên cành cây có tất cả mấy chú chim?",
    explanation: "Gộp 3 chú chim với 2 chú chim: 3 + 2 = 5 chú chim!",
  },
  {
    id: "wp_2",
    op: "-",
    a: 5,
    b: 2,
    answer: 3,
    emoji: "🍎",
    story: "Trên đĩa có 5 quả táo đỏ, bé biếu bà 2 quả táo.",
    question: "Hỏi trên đĩa còn lại mấy quả táo?",
    explanation: "Bớt đi 2 quả táo từ 5 quả táo: 5 - 2 = 3 quả táo!",
  },
  {
    id: "wp_3",
    op: "+",
    a: 4,
    b: 3,
    answer: 7,
    emoji: "🐰",
    story: "Trong vườn có 4 bạn thỏ trắng đang ăn cà rốt, có thêm 3 bạn thỏ nữa chạy vào chơi.",
    question: "Hỏi trong vườn có tất cả mấy bạn thỏ?",
    explanation: "4 bạn thỏ thêm 3 bạn thỏ: 4 + 3 = 7 bạn thỏ!",
  },
  {
    id: "wp_4",
    op: "-",
    a: 6,
    b: 4,
    answer: 2,
    emoji: "🎈",
    story: "Chú hề cầm 6 quả bóng bay, chú tặng cho các bạn nhỏ 4 quả bóng.",
    question: "Hỏi chú hề còn lại mấy quả bóng bay?",
    explanation: "6 quả bóng bớt đi 4 quả bóng: 6 - 4 = 2 quả bóng!",
  },
  {
    id: "wp_5",
    op: "+",
    a: 5,
    b: 5,
    answer: 10,
    emoji: "🐟",
    story: "Bể cá có 5 con cá vàng, ba thả thêm 5 con cá vàng nữa vào bể.",
    question: "Hỏi trong bể có tất cả bao nhiêu con cá vàng?",
    explanation: "5 con cá cộng 5 con cá: 5 + 5 = 10 con cá!",
  },
  {
    id: "wp_6",
    op: "-",
    a: 8,
    b: 3,
    answer: 5,
    emoji: "🦆",
    story: "Dưới ao có 8 con vịt đang bơi, có 3 con vịt lên bờ nghỉ ngơi.",
    question: "Hỏi dưới ao còn lại mấy con vịt?",
    explanation: "8 con vịt trừ 3 con vịt lên bờ: 8 - 3 = 5 con vịt!",
  },
];

export interface ShapeItem {
  id: string;
  name: string;
  kind: "2d" | "3d";
  color: string;
  bgClass: string;
  description: string;
  sidesInfo: string;
  realLifeExamples: { emoji: string; label: string }[];
  voicePrompt: string;
}

export const SHAPES_DATA: ShapeItem[] = [
  {
    id: "circle",
    name: "Hình tròn",
    kind: "2d",
    color: "#EF4444",
    bgClass: "bg-red-50 border-red-200",
    description: "Hình tròn có đường bao cong tròn khép kín, không có góc nhọn nào nên có thể lăn tròn.",
    sidesInfo: "Không có cạnh, không có góc",
    realLifeExamples: [
      { emoji: "🕒", label: "Mặt đồng hồ" },
      { emoji: "🍩", label: "Bánh vòng" },
      { emoji: "🪙", label: "Đồng xu" },
    ],
    voicePrompt: "Hình tròn. Hình tròn cong tròn đều, không có góc cạnh, giống như mặt đồng hồ hay bánh xe.",
  },
  {
    id: "square",
    name: "Hình vuông",
    kind: "2d",
    color: "#2563EB",
    bgClass: "bg-blue-50 border-blue-200",
    description: "Hình vuông có 4 cạnh thẳng bằng nhau và 4 góc vuông vắn.",
    sidesInfo: "4 cạnh bằng nhau, 4 góc vuông",
    realLifeExamples: [
      { emoji: "🖼️", label: "Khung ảnh vuông" },
      { emoji: "🪟", label: "Ô cửa sổ" },
      { emoji: "🍪", label: "Bánh quy vuông" },
    ],
    voicePrompt: "Hình vuông. Hình vuông có 4 cạnh dài bằng nhau và 4 góc vuông, giống như chiếc khăn tay hay ô cửa sổ.",
  },
  {
    id: "triangle",
    name: "Hình tam giác",
    kind: "2d",
    color: "#F59E0B",
    bgClass: "bg-amber-50 border-amber-200",
    description: "Hình tam giác có 3 cạnh thẳng và 3 góc nhọn.",
    sidesInfo: "3 cạnh thẳng, 3 góc",
    realLifeExamples: [
      { emoji: "🍕", label: "Miếng bánh pizza" },
      { emoji: "⚠️", label: "Biển báo giao thông" },
      { emoji: "⛺", label: "Mái lều trại" },
    ],
    voicePrompt: "Hình tam giác. Hình tam giác có 3 cạnh và 3 góc, giống như miếng bánh pizza hay cánh buồm.",
  },
  {
    id: "rectangle",
    name: "Hình chữ nhật",
    kind: "2d",
    color: "#10B981",
    bgClass: "bg-emerald-50 border-emerald-200",
    description: "Hình chữ nhật có 4 góc vuông, gồm 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau.",
    sidesInfo: "2 cạnh dài, 2 cạnh ngắn, 4 góc vuông",
    realLifeExamples: [
      { emoji: "🚪", label: "Cánh cửa" },
      { emoji: "📺", label: "Màn hình Tivi" },
      { emoji: "📗", label: "Quyển vở học" },
    ],
    voicePrompt: "Hình chữ nhật. Hình chữ nhật có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau, giống như quyển vở hay cánh cửa.",
  },
  {
    id: "sphere",
    name: "Khối cầu",
    kind: "3d",
    color: "#EC4899",
    bgClass: "bg-pink-50 border-pink-200",
    description: "Khối cầu tròn đều mọi phía, có thể lăn về mọi hướng.",
    sidesInfo: "Khối tròn lăn được mọi hướng",
    realLifeExamples: [
      { emoji: "⚽", label: "Quả bóng đá" },
      { emoji: "🍊", label: "Quả cam" },
      { emoji: "🌍", label: "Quả địa cầu" },
    ],
    voicePrompt: "Khối cầu. Khối cầu tròn đều lăn được mọi phía, giống như quả bóng đá hay viên bi.",
  },
  {
    id: "cube",
    name: "Khối lập phương",
    kind: "3d",
    color: "#8B5CF6",
    bgClass: "bg-purple-50 border-purple-200",
    description: "Khối lập phương có 6 mặt đều là hình vuông bằng nhau, xếp chồng lên nhau rất vững.",
    sidesInfo: "6 mặt đều là hình vuông",
    realLifeExamples: [
      { emoji: "🎲", label: "Viên xúc xắc" },
      { emoji: "🎁", label: "Hộp quà vuông" },
      { emoji: "🧊", label: "Viên đá lạnh" },
    ],
    voicePrompt: "Khối lập phương. Khối lập phương có 6 mặt đều là hình vuông, giống như viên xúc xắc hay khối Rubik.",
  },
];

export interface SpatialQuestion {
  id: string;
  concept: string;
  sceneTitle: string;
  prompt: string;
  items: { pos: string; emoji: string; label: string }[];
  correctPos: string;
  explanation: string;
}

export const SPATIAL_QUESTIONS: SpatialQuestion[] = [
  {
    id: "sp_1",
    concept: "Trái – Phải – Ở giữa",
    sceneTitle: "Ba bạn thú xếp hàng ngang",
    prompt: "Bạn nào đang đứng Ở GIỮA hàng?",
    items: [
      { pos: "left", emoji: "🐶", label: "Chó con (Bên trái)" },
      { pos: "middle", emoji: "🐱", label: "Mèo con (Ở giữa)" },
      { pos: "right", emoji: "🐰", label: "Thỏ trắng (Bên phải)" },
    ],
    correctPos: "middle",
    explanation: "Mèo con đứng ở giữa Chó con (bên trái) và Thỏ trắng (bên phải)!",
  },
  {
    id: "sp_2",
    concept: "Trái – Phải",
    sceneTitle: "Đồ vật trên bàn học",
    prompt: "Đồ vật nào nằm ở BÊN TRÁI?",
    items: [
      { pos: "left", emoji: "✏️", label: "Bút chì" },
      { pos: "middle", emoji: "📓", label: "Quyển vở" },
      { pos: "right", emoji: "📏", label: "Thước kẻ" },
    ],
    correctPos: "left",
    explanation: "Chiếc bút chì nằm ở phía bên trái của quyển vở!",
  },
  {
    id: "sp_3",
    concept: "Trái – Phải",
    sceneTitle: "Vườn trái cây",
    prompt: "Quả nào nằm ở BÊN PHẢI ngoài cùng?",
    items: [
      { pos: "left", emoji: "🍎", label: "Quả táo" },
      { pos: "middle", emoji: "🍌", label: "Quả chuối" },
      { pos: "right", emoji: "🍉", label: "Dưa hấu" },
    ],
    correctPos: "right",
    explanation: "Quả dưa hấu nằm ở phía bên phải ngoài cùng!",
  },
  {
    id: "sp_4",
    concept: "Trên – Dưới",
    sceneTitle: "Cây xanh trong vườn",
    prompt: "Con vật nào đang ở PHÍA TRÊN ngọn cây?",
    items: [
      { pos: "top", emoji: "🐦", label: "Chim non (Phía trên)" },
      { pos: "middle", emoji: "🌳", label: "Cây cổ thụ" },
      { pos: "bottom", emoji: "🐢", label: "Rùa nhỏ (Phía dưới gốc cây)" },
    ],
    correctPos: "top",
    explanation: "Chú chim non đang đậu ở phía trên ngọn cây, còn rùa nhỏ ở phía dưới gốc cây!",
  },
];

export interface MeasurementQuestion {
  id: string;
  category: string;
  prompt: string;
  optionA: { emoji: string; label: string; sizeClass: string; detail: string };
  optionB: { emoji: string; label: string; sizeClass: string; detail: string };
  correct: "A" | "B";
  explanation: string;
}

export const MEASUREMENT_QUESTIONS: MeasurementQuestion[] = [
  {
    id: "ms_1",
    category: "Cao hơn – Thấp hơn",
    prompt: "Con vật nào CAO HƠN?",
    optionA: { emoji: "🦒", label: "Hươu cao cổ", sizeClass: "text-6xl", detail: "Cổ rất cao" },
    optionB: { emoji: "🐕", label: "Chú cún con", sizeClass: "text-3xl", detail: "Thấp nhỏ" },
    correct: "A",
    explanation: "Hươu cao cổ cao hơn chú cún con!",
  },
  {
    id: "ms_2",
    category: "Nặng hơn – Nhẹ hơn",
    prompt: "Con vật nào NẶNG HƠN?",
    optionA: { emoji: "🐘", label: "Con voi", sizeClass: "text-6xl", detail: "To lớn, rất nặng" },
    optionB: { emoji: "🦋", label: "Con bướm", sizeClass: "text-3xl", detail: "Nhỏ xíu, rất nhẹ" },
    correct: "A",
    explanation: "Con voi to lớn nên nặng hơn con bướm rất nhiều!",
  },
  {
    id: "ms_3",
    category: "Dài hơn – Ngắn hơn",
    prompt: "Phương tiện nào DÀI HƠN?",
    optionA: { emoji: "🚲", label: "Xe đạp", sizeClass: "text-4xl", detail: "Ngắn gọn" },
    optionB: { emoji: "🚆", label: "Đoàn tàu hỏa", sizeClass: "text-6xl", detail: "Nhiều toa dài" },
    correct: "B",
    explanation: "Đoàn tàu hỏa có nhiều toa nối nhau nên dài hơn chiếc xe đạp!",
  },
  {
    id: "ms_4",
    category: "To hơn – Nhỏ hơn",
    prompt: "Quả nào NHỎ HƠN?",
    optionA: { emoji: "🍉", label: "Quả dưa hấu", sizeClass: "text-6xl", detail: "Quả to" },
    optionB: { emoji: "🍒", label: "Quả anh đào (Cherry)", sizeClass: "text-3xl", detail: "Quả nhỏ" },
    correct: "B",
    explanation: "Quả anh đào (Cherry) nhỏ hơn quả dưa hấu!",
  },
];

export interface PatternQuestion {
  id: string;
  ruleName: string;
  sequence: string[];
  options: string[];
  answer: string;
  prompt: string;
}

export const PATTERN_QUESTIONS: PatternQuestion[] = [
  {
    id: "pat_1",
    ruleName: "Quy luật xen kẽ A - B - A - B",
    sequence: ["🍎", "🍌", "🍎", "🍌", "🍎"],
    options: ["🍌", "🍎", "🍇"],
    answer: "🍌",
    prompt: "Táo - Chuối - Táo - Chuối - Táo... Tiếp theo là quả gì nhỉ?",
  },
  {
    id: "pat_2",
    ruleName: "Quy luật A - A - B",
    sequence: ["⭐", "⭐", "🌙", "⭐", "⭐"],
    options: ["⭐", "🌙", "☀️"],
    answer: "🌙",
    prompt: "Sao - Sao - Trăng - Sao - Sao... Hình tiếp theo là gì?",
  },
  {
    id: "pat_3",
    ruleName: "Quy luật 3 hình A - B - C",
    sequence: ["🔴", "🟦", "🔺", "🔴", "🟦"],
    options: ["🔺", "🔴", "🟦"],
    answer: "🔺",
    prompt: "Tròn đỏ - Vuông xanh - Tam giác - Tròn đỏ - Vuông xanh... Tiếp theo là hình nào?",
  },
  {
    id: "pat_4",
    ruleName: "Quy luật số tăng dần",
    sequence: ["2", "4", "6", "8"],
    options: ["9", "10", "7"],
    answer: "10",
    prompt: "Đếm cách 2: 2, 4, 6, 8... Số tiếp theo là số mấy?",
  },
];

export interface ClockActivity {
  hour: number;
  label: string;
  activity: string;
  emoji: string;
  period: string;
}

export const CLOCK_ACTIVITIES: ClockActivity[] = [
  { hour: 7, label: "7 giờ đúng", activity: "Bé thức dậy, ăn sáng và đi học", emoji: "🎒", period: "Buổi sáng" },
  { hour: 9, label: "9 giờ đúng", activity: "Bé học bài và vui chơi ở lớp", emoji: "📚", period: "Buổi sáng" },
  { hour: 12, label: "12 giờ đúng", activity: "Bé ăn cơm trưa và nghỉ trưa", emoji: "🍚", period: "Buổi trưa" },
  { hour: 4, label: "4 giờ chiều", activity: "Ba mẹ đón bé tan học về nhà", emoji: "🏠", period: "Buổi chiều" },
  { hour: 7, label: "7 giờ tối", activity: "Cả nhà quây quần ăn tối vui vẻ", emoji: "🍲", period: "Buổi tối" },
  { hour: 9, label: "9 giờ tối", activity: "Bé đánh răng và lên giường đi ngủ", emoji: "😴", period: "Buổi tối" },
];
