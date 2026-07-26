import type { TranslationKey } from "@/lib/i18n";

export interface Bilingual {
  en: string;
  vi: string;
  ipa?: string;
}

export interface VocabItem {
  id: string;
  emoji: string;
  word: Bilingual;
  /** Extra Q&A prompts specific to this item, on top of the topic's generic templates. */
  extraQuestions?: Bilingual[];
}

export interface VocabTopic {
  id: string;
  nameKey: TranslationKey;
  emoji: string;
  gradient: string;
  items: VocabItem[];
  questionTemplates: (item: VocabItem) => Bilingual[];
}

const w = (en: string, vi: string, ipa?: string): Bilingual => ({ en, vi, ipa });

export const vocabularyTopics: VocabTopic[] = [
  {
    id: "colors",
    nameKey: "topic_colors",
    emoji: "🎨",
    gradient: "from-rose-200 via-amber-100 to-yellow-200",
    items: [
      { id: "red", emoji: "🔴", word: w("Red", "Màu đỏ", "/rɛd/") },
      { id: "orange", emoji: "🟠", word: w("Orange", "Màu cam", "/ˈɔrɪndʒ/") },
      { id: "yellow", emoji: "🟡", word: w("Yellow", "Màu vàng", "/ˈjɛloʊ/") },
      { id: "green", emoji: "🟢", word: w("Green", "Màu xanh lá", "/ɡriːn/") },
      { id: "blue", emoji: "🔵", word: w("Blue", "Màu xanh dương", "/bluː/") },
      { id: "purple", emoji: "🟣", word: w("Purple", "Màu tím", "/ˈpɜrpəl/") },
      { id: "pink", emoji: "🩷", word: w("Pink", "Màu hồng", "/pɪŋk/") },
      { id: "brown", emoji: "🟤", word: w("Brown", "Màu nâu", "/braʊn/") },
      { id: "black", emoji: "⚫", word: w("Black", "Màu đen", "/blæk/") },
      { id: "white", emoji: "⚪", word: w("White", "Màu trắng", "/waɪt/") },
      { id: "gray", emoji: "🔘", word: w("Gray", "Màu xám", "/ɡreɪ/") },
      { id: "gold", emoji: "🪙", word: w("Gold", "Màu vàng kim", "/ɡoʊld/") },
      { id: "silver", emoji: "🥈", word: w("Silver", "Màu bạc", "/ˈsɪlvər/") },
      { id: "cyan", emoji: "🩵", word: w("Cyan", "Màu xanh lơ", "/ˈsaɪən/") },
    ],
    questionTemplates: (item) => [
      w("What color is this?", "Đây là màu gì?"),
      w(`Is this ${item.word.en.toLowerCase()}?`, `Đây có phải là ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "numbers",
    nameKey: "topic_numbers",
    emoji: "🔢",
    gradient: "from-sky-200 via-cyan-100 to-blue-200",
    items: [
      { id: "zero", emoji: "0️⃣", word: w("Zero", "Số không", "/ˈzɪroʊ/") },
      { id: "one", emoji: "1️⃣", word: w("One", "Số một", "/wʌn/") },
      { id: "two", emoji: "2️⃣", word: w("Two", "Số hai", "/tuː/") },
      { id: "three", emoji: "3️⃣", word: w("Three", "Số ba", "/θriː/") },
      { id: "four", emoji: "4️⃣", word: w("Four", "Số bốn", "/fɔr/") },
      { id: "five", emoji: "5️⃣", word: w("Five", "Số năm", "/faɪv/") },
      { id: "six", emoji: "6️⃣", word: w("Six", "Số sáu", "/sɪks/") },
      { id: "seven", emoji: "7️⃣", word: w("Seven", "Số bảy", "/ˈsɛvən/") },
      { id: "eight", emoji: "8️⃣", word: w("Eight", "Số tám", "/eɪt/") },
      { id: "nine", emoji: "9️⃣", word: w("Nine", "Số chín", "/naɪn/") },
      { id: "ten", emoji: "🔟", word: w("Ten", "Số mười", "/tɛn/") },
      { id: "eleven", emoji: "1️⃣1️⃣", word: w("Eleven", "Số mười một", "/ɪˈlɛvən/") },
      { id: "twelve", emoji: "1️⃣2️⃣", word: w("Twelve", "Số mười hai", "/twɛlv/") },
      { id: "thirteen", emoji: "1️⃣3️⃣", word: w("Thirteen", "Số mười ba", "/θɜrˈtiːn/") },
      { id: "fourteen", emoji: "1️⃣4️⃣", word: w("Fourteen", "Số mười bốn", "/fɔrˈtiːn/") },
      { id: "fifteen", emoji: "1️⃣5️⃣", word: w("Fifteen", "Số mười lăm", "/fɪfˈtiːn/") },
      { id: "twenty", emoji: "2️⃣0️⃣", word: w("Twenty", "Số hai mươi", "/ˈtwɛnti/") },
      { id: "hundred", emoji: "💯", word: w("Hundred", "Số một trăm", "/ˈhʌndrəd/") },
    ],
    questionTemplates: (item) => [
      w(`Can you count to ${item.word.en.toLowerCase()}?`, `Con đếm đến ${item.word.vi.toLowerCase()} được không?`),
      w(`Show me ${item.word.en.toLowerCase()} fingers!`, `Con giơ ${item.word.vi.toLowerCase()} ngón tay lên nhé!`),
    ],
  },
  {
    id: "fruits",
    nameKey: "topic_fruits",
    emoji: "🍎",
    gradient: "from-lime-200 via-emerald-100 to-green-200",
    items: [
      { id: "apple", emoji: "🍎", word: w("Apple", "Quả táo", "/ˈæpəl/") },
      { id: "banana", emoji: "🍌", word: w("Banana", "Quả chuối", "/bəˈnænə/") },
      { id: "orange", emoji: "🍊", word: w("Orange", "Quả cam", "/ˈɔrɪndʒ/") },
      { id: "grapes", emoji: "🍇", word: w("Grapes", "Quả nho", "/ɡreɪps/") },
      { id: "watermelon", emoji: "🍉", word: w("Watermelon", "Quả dưa hấu", "/ˈwɔtərˌmɛlən/") },
      { id: "strawberry", emoji: "🍓", word: w("Strawberry", "Quả dâu tây", "/ˈstrɔˌbɛri/") },
      { id: "pineapple", emoji: "🍍", word: w("Pineapple", "Quả dứa", "/ˈpaɪnˌæpəl/") },
      { id: "peach", emoji: "🍑", word: w("Peach", "Quả đào", "/piːtʃ/") },
      { id: "cherry", emoji: "🍒", word: w("Cherry", "Quả anh đào", "/ˈtʃɛri/") },
      { id: "mango", emoji: "🥭", word: w("Mango", "Quả xoài", "/ˈmæŋɡoʊ/") },
      { id: "lemon", emoji: "🍋", word: w("Lemon", "Quả chanh vàng", "/ˈlɛmən/") },
      { id: "coconut", emoji: "🥥", word: w("Coconut", "Quả dừa", "/ˈkoʊkəˌnʌt/") },
      { id: "avocado", emoji: "🥑", word: w("Avocado", "Quả bơ", "/ˌævəˈkɑːdoʊ/") },
      { id: "kiwi", emoji: "🥝", word: w("Kiwi", "Quả kiwi", "/ˈkiːwiː/") },
      { id: "pear", emoji: "🍐", word: w("Pear", "Quả lê", "/pɛr/") },
    ],
    questionTemplates: (item) => [
      w("What fruit is this?", "Đây là quả gì?"),
      w(`Do you like ${item.word.en.toLowerCase()}?`, `Con có thích ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "animals",
    nameKey: "topic_animals",
    emoji: "🐶",
    gradient: "from-amber-200 via-orange-100 to-rose-200",
    items: [
      { id: "dog", emoji: "🐶", word: w("Dog", "Con chó", "/dɔɡ/") },
      { id: "cat", emoji: "🐱", word: w("Cat", "Con mèo", "/kæt/") },
      { id: "cow", emoji: "🐮", word: w("Cow", "Con bò", "/kaʊ/") },
      { id: "pig", emoji: "🐷", word: w("Pig", "Con lợn", "/pɪɡ/") },
      { id: "chicken", emoji: "🐔", word: w("Chicken", "Con gà", "/ˈtʃɪkɪn/") },
      { id: "duck", emoji: "🦆", word: w("Duck", "Con vịt", "/dʌk/") },
      { id: "elephant", emoji: "🐘", word: w("Elephant", "Con voi", "/ˈɛləfənt/") },
      { id: "lion", emoji: "🦁", word: w("Lion", "Con sư tử", "/ˈlaɪən/") },
      { id: "fish", emoji: "🐟", word: w("Fish", "Con cá", "/fɪʃ/") },
      { id: "bird", emoji: "🐦", word: w("Bird", "Con chim", "/bɜrd/") },
      { id: "tiger", emoji: "🐯", word: w("Tiger", "Con hổ", "/ˈtaɪɡər/") },
      { id: "bear", emoji: "🐻", word: w("Bear", "Con gấu", "/bɛr/") },
      { id: "rabbit", emoji: "🐰", word: w("Rabbit", "Con thỏ", "/ˈræbɪt/") },
      { id: "monkey", emoji: "🐒", word: w("Monkey", "Con khỉ", "/ˈmʌŋki/") },
      { id: "horse", emoji: "🐴", word: w("Horse", "Con ngựa", "/hɔrs/") },
      { id: "sheep", emoji: "🐑", word: w("Sheep", "Con cừu", "/ʃiːp/") },
      { id: "frog", emoji: "🐸", word: w("Frog", "Con ếch", "/frɔɡ/") },
      { id: "turtle", emoji: "🐢", word: w("Turtle", "Con rùa", "/ˈtɜrtəl/") },
      { id: "penguin", emoji: "🐧", word: w("Penguin", "Con chim cánh cụt", "/ˈpɛnɡwɪn/") },
      { id: "butterfly", emoji: "🦋", word: w("Butterfly", "Con bướm", "/ˈbʌtərˌflaɪ/") },
    ],
    questionTemplates: (item) => [
      w("What animal is this?", "Đây là con gì?"),
      w(`What sound does a ${item.word.en.toLowerCase()} make?`, `Con ${item.word.vi.toLowerCase()} kêu như thế nào?`),
    ],
  },
  {
    id: "body-parts",
    nameKey: "topic_body_parts",
    emoji: "✋",
    gradient: "from-fuchsia-200 via-purple-100 to-indigo-200",
    items: [
      { id: "eye", emoji: "👁️", word: w("Eye", "Mắt", "/aɪ/"), extraQuestions: [w("How many eyes do you have?", "Con có bao nhiêu mắt?")] },
      { id: "ear", emoji: "👂", word: w("Ear", "Tai", "/ɪr/"), extraQuestions: [w("How many ears do you have?", "Con có bao nhiêu tai?")] },
      { id: "nose", emoji: "👃", word: w("Nose", "Mũi", "/noʊz/") },
      { id: "mouth", emoji: "👄", word: w("Mouth", "Miệng", "/maʊθ/") },
      { id: "tooth", emoji: "🦷", word: w("Tooth", "Răng", "/tuːθ/"), extraQuestions: [w("How many teeth do you have?", "Con có bao nhiêu cái răng?")] },
      { id: "tongue", emoji: "👅", word: w("Tongue", "Lưỡi", "/tʌŋ/") },
      { id: "hand", emoji: "✋", word: w("Hand", "Bàn tay", "/hænd/"), extraQuestions: [w("How many fingers do you have?", "Con có bao nhiêu ngón tay?")] },
      { id: "foot", emoji: "🦶", word: w("Foot", "Bàn chân", "/fʊt/"), extraQuestions: [w("How many feet do you have?", "Con có bao nhiêu bàn chân?")] },
      { id: "leg", emoji: "🦵", word: w("Leg", "Chân", "/lɛɡ/"), extraQuestions: [w("How many legs do you have?", "Con có bao nhiêu chân?")] },
      { id: "arm", emoji: "💪", word: w("Arm", "Cánh tay", "/ɑrm/"), extraQuestions: [w("How many arms do you have?", "Con có bao nhiêu cánh tay?")] },
      { id: "finger", emoji: "👆", word: w("Finger", "Ngón tay", "/ˈfɪŋɡər/") },
      { id: "toe", emoji: "🦶", word: w("Toe", "Ngón chân", "/toʊ/") },
      { id: "head", emoji: "🗣️", word: w("Head", "Đầu", "/hɛd/") },
      { id: "hair", emoji: "💇", word: w("Hair", "Tóc", "/hɛr/") },
      { id: "shoulder", emoji: "👔", word: w("Shoulder", "Vai", "/ˈʃoʊldər/") },
      { id: "knee", emoji: "🦵", word: w("Knee", "Đầu gối", "/niː/") },
    ],
    questionTemplates: (item) => [
      w("What is this?", "Đây là bộ phận gì?"),
      w(`Can you touch your ${item.word.en.toLowerCase()}?`, `Con chạm vào ${item.word.vi.toLowerCase()} của mình được không?`),
    ],
  },
  {
    id: "shapes",
    nameKey: "topic_shapes",
    emoji: "⭐",
    gradient: "from-yellow-200 via-lime-100 to-teal-200",
    items: [
      { id: "circle", emoji: "⭕", word: w("Circle", "Hình tròn", "/ˈsɜrkəl/") },
      { id: "square", emoji: "⬜", word: w("Square", "Hình vuông", "/skwɛr/") },
      { id: "triangle", emoji: "🔺", word: w("Triangle", "Hình tam giác", "/ˈtraɪˌæŋɡəl/") },
      { id: "star", emoji: "⭐", word: w("Star", "Hình ngôi sao", "/stɑr/") },
      { id: "heart", emoji: "💖", word: w("Heart", "Hình trái tim", "/hɑrt/") },
      { id: "diamond", emoji: "🔶", word: w("Diamond", "Hình thoi", "/ˈdaɪəmənd/") },
      { id: "rectangle", emoji: "▭", word: w("Rectangle", "Hình chữ nhật", "/ˈrɛkˌtæŋɡəl/") },
      { id: "oval", emoji: "🥚", word: w("Oval", "Hình bầu dục", "/ˈoʊvəl/") },
      { id: "hexagon", emoji: "⬢", word: w("Hexagon", "Hình lục giác", "/ˈhɛksəˌɡɑn/") },
      { id: "cube", emoji: "🧊", word: w("Cube", "Hình lập phương", "/kjuːb/") },
      { id: "crescent", emoji: "🌙", word: w("Crescent", "Hình trăng khuyết", "/ˈkrɛsənt/") },
    ],
    questionTemplates: (item) => [
      w("What shape is this?", "Đây là hình gì?"),
      w(`Can you find something shaped like a ${item.word.en.toLowerCase()}?`, `Con tìm đồ vật có ${item.word.vi.toLowerCase()} được không?`),
    ],
  },
  {
    id: "feelings",
    nameKey: "topic_feelings",
    emoji: "😊",
    gradient: "from-pink-200 via-rose-100 to-amber-200",
    items: [
      { id: "happy", emoji: "😊", word: w("Happy", "Vui vẻ", "/ˈhæpi/") },
      { id: "sad", emoji: "😢", word: w("Sad", "Buồn", "/sæd/") },
      { id: "angry", emoji: "😡", word: w("Angry", "Tức giận", "/ˈæŋɡri/") },
      { id: "excited", emoji: "🤩", word: w("Excited", "Hào hứng", "/ɪkˈsaɪtɪd/") },
      { id: "surprised", emoji: "😲", word: w("Surprised", "Ngạc nhiên", "/sərˈpraɪzd/") },
      { id: "scared", emoji: "😨", word: w("Scared", "Sợ hãi", "/skɛrd/") },
      { id: "sleepy", emoji: "🥱", word: w("Sleepy", "Buồn ngủ", "/ˈsliːpi/") },
      { id: "tired", emoji: "😫", word: w("Tired", "Mệt mỏi", "/ˈtaɪərd/") },
      { id: "silly", emoji: "🤪", word: w("Silly", "Hài hước", "/ˈsɪli/") },
      { id: "calm", emoji: "😌", word: w("Calm", "Bình tĩnh", "/kɑːm/") },
      { id: "shy", emoji: "😳", word: w("Shy", "E thẹn", "/ʃaɪ/") },
      { id: "proud", emoji: "😎", word: w("Proud", "Tự hào", "/praʊd/") },
    ],
    questionTemplates: (item) => [
      w("How do you feel?", "Con cảm thấy thế nào?"),
      w(`Are you feeling ${item.word.en.toLowerCase()}?`, `Con có cảm thấy ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "school-supplies",
    nameKey: "topic_school_supplies",
    emoji: "🎒",
    gradient: "from-blue-200 via-sky-100 to-indigo-200",
    items: [
      { id: "pencil", emoji: "✏️", word: w("Pencil", "Bút chì", "/ˈpɛnsəl/") },
      { id: "pen", emoji: "🖊️", word: w("Pen", "Bút mực", "/pɛn/") },
      { id: "backpack", emoji: "🎒", word: w("Backpack", "Balo đi học", "/ˈbækˌpæk/") },
      { id: "water_bottle", emoji: "🥛", word: w("Water Bottle", "Bình nước", "/ˈwɔtər ˈbɑtəl/") },
      { id: "book", emoji: "📖", word: w("Book", "Sách", "/bʊk/") },
      { id: "notebook", emoji: "📓", word: w("Notebook", "Vở bài tập", "/ˈnoʊtˌbʊk/") },
      { id: "ruler", emoji: "📏", word: w("Ruler", "Thước kẻ", "/ˈruːlər/") },
      { id: "eraser", emoji: "🧼", word: w("Eraser", "Cục tẩy", "/ɪˈreɪsər/") },
      { id: "scissors", emoji: "✂️", word: w("Scissors", "Kéo cắt giấy", "/ˈsɪzərz/") },
      { id: "crayon", emoji: "🖍️", word: w("Crayon", "Bút màu sáp", "/ˈkreɪˌɑn/") },
      { id: "pencil_case", emoji: "👝", word: w("Pencil Case", "Hộp bút", "/ˈpɛnsəl keɪs/") },
      { id: "desk", emoji: "🪑", word: w("Desk", "Bàn học", "/dɛsk/") },
    ],
    questionTemplates: (item) => [
      w("What is this?", "Đây là đồ dùng gì?"),
      w(`Do you have a ${item.word.en.toLowerCase()}?`, `Con có ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "family",
    nameKey: "topic_family",
    emoji: "👨‍👩‍👧‍👦",
    gradient: "from-amber-200 via-rose-100 to-pink-200",
    items: [
      { id: "father", emoji: "👨", word: w("Father (Dad)", "Bố / Ba", "/ˈfɑːðər/") },
      { id: "mother", emoji: "👩", word: w("Mother (Mom)", "Mẹ / Má", "/ˈmʌðər/") },
      { id: "brother", emoji: "👦", word: w("Brother", "Anh / Em trai", "/ˈbrʌðər/") },
      { id: "sister", emoji: "👧", word: w("Sister", "Chị / Em gái", "/ˈsɪstər/") },
      { id: "baby", emoji: "👶", word: w("Baby", "Em bé", "/ˈbeɪbi/") },
      { id: "grandfather", emoji: "👴", word: w("Grandfather (Grandpa)", "Ông", "/ˈɡrændˌfɑːðər/") },
      { id: "grandmother", emoji: "👵", word: w("Grandmother (Grandma)", "Bà", "/ˈɡrændˌmʌðər/") },
      { id: "uncle", emoji: "🧔", word: w("Uncle", "Chú / Bác / Cậu", "/ˈʌŋkəl/") },
      { id: "aunt", emoji: "👩‍🦱", word: w("Aunt", "Cô / Dì / Bác gái", "/ænt/") },
      { id: "cousin", emoji: "🧑", word: w("Cousin", "Anh chị em họ", "/ˈkʌzən/") },
      { id: "family", emoji: "👨‍👩‍👧‍👦", word: w("Family", "Gia đình", "/ˈfæməli/") },
    ],
    questionTemplates: (item) => [
      w("Who is this?", "Đây là ai?"),
      w(`Do you love your ${item.word.en.toLowerCase()}?`, `Con có yêu ${item.word.vi.toLowerCase()} của mình không?`),
    ],
  },
];

export function getTopic(id: string): VocabTopic | undefined {
  return vocabularyTopics.find((topic) => topic.id === id);
}

export function getItemQuestions(topic: VocabTopic, item: VocabItem): Bilingual[] {
  return [...topic.questionTemplates(item), ...(item.extraQuestions ?? [])];
}
