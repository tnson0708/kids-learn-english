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

const ONES_EN = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const TEENS_EN = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS_EN = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const ONES_VI = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const TENS_VI = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];

const ONES_IPA = ["/ˈzɪroʊ/", "/wʌn/", "/tuː/", "/θriː/", "/fɔːr/", "/faɪv/", "/sɪks/", "/ˈsɛvən/", "/eɪt/", "/naɪn/"];
const TEENS_IPA = ["/tɛn/", "/ɪˈlɛvən/", "/twɛlv/", "/θɜːrˈtiːn/", "/fɔːrˈtiːn/", "/fɪfˈtiːn/", "/sɪksˈtiːn/", "/ˌsɛvənˈtiːn/", "/eɪˈtiːn/", "/naɪnˈtiːn/"];
const TENS_IPA = ["", "", "/ˈtwɛnti/", "/ˈθɜːrti/", "/ˈfɔːrti/", "/ˈfɪfti/", "/ˈsɪksti/", "/ˈsɛvənti/", "/ˈeɪti/", "/ˈnaɪnti/"];

function digitToEmoji(n: number): string {
  if (n <= 10) {
    const emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    return emojis[n];
  }
  if (n === 100) return "💯";
  return n.toString();
}

function generateNumbersItems(): VocabItem[] {
  const items: VocabItem[] = [];

  for (let n = 0; n <= 100; n++) {
    let word: Bilingual;

    if (n < 10) {
      word = w(ONES_EN[n], `Số ${ONES_VI[n]}`, ONES_IPA[n]);
    } else if (n < 20) {
      const viName = n === 15 ? "Số mười lăm" : `Số mười ${ONES_VI[n - 10]}`;
      word = w(TEENS_EN[n - 10], viName, TEENS_IPA[n - 10]);
    } else if (n === 100) {
      word = w("One Hundred", "Số một trăm", "/wʌn ˈhʌndrəd/");
    } else {
      const tensDigit = Math.floor(n / 10);
      const onesDigit = n % 10;
      const tensEn = TENS_EN[tensDigit];
      const tensVi = TENS_VI[tensDigit];
      const tensIpa = TENS_IPA[tensDigit].slice(1, -1);

      if (onesDigit === 0) {
        word = w(tensEn, `Số ${tensVi}`, `/${tensIpa}/`);
      } else {
        const enWord = `${tensEn}-${ONES_EN[onesDigit]}`;
        let onesVi = ONES_VI[onesDigit];
        if (onesDigit === 1) onesVi = "mốt";
        else if (onesDigit === 4) onesVi = "tư";
        else if (onesDigit === 5) onesVi = "lăm";

        const viWord = `Số ${tensVi} ${onesVi}`;
        const onesIpaClean = ONES_IPA[onesDigit].slice(1, -1);
        const ipaWord = `/${tensIpa}-${onesIpaClean}/`;

        word = w(enWord, viWord, ipaWord);
      }
    }

    items.push({
      id: `num_${n}`,
      emoji: digitToEmoji(n),
      word,
    });
  }

  return items;
}

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
    items: generateNumbersItems(),
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
      { id: "dragon_fruit", emoji: "🐉", word: w("Dragon Fruit", "Quả thanh long", "/ˈdræɡən fruːt/") },
      { id: "durian", emoji: "🍈", word: w("Durian", "Quả sầu riêng", "/ˈdʊriən/") },
      { id: "papaya", emoji: "🍈", word: w("Papaya", "Quả đu đủ", "/pəˈpaɪə/") },
      { id: "mangosteen", emoji: "🟣", word: w("Mangosteen", "Quả măng cụt", "/ˈmæŋɡəstiːn/") },
      { id: "lychee", emoji: "🔴", word: w("Lychee", "Quả vải", "/ˈliːtʃiː/") },
      { id: "rambutan", emoji: "🔴", word: w("Rambutan", "Quả chôm chôm", "/ræmˈbuːtən/") },
      { id: "guava", emoji: "🍏", word: w("Guava", "Quả ổi", "/ˈɡwɑːvə/") },
      { id: "passion_fruit", emoji: "🟣", word: w("Passion Fruit", "Quả chanh dây", "/ˈpæʃən fruːt/") },
      { id: "pomegranate", emoji: "🍎", word: w("Pomegranate", "Quả lựu", "/ˈpɑːmɪɡrænɪt/") },
      { id: "blueberry", emoji: "🫐", word: w("Blueberry", "Quả việt quất", "/ˈbluːbɛri/") },
      { id: "blackberry", emoji: "🫐", word: w("Blackberry", "Quả mâm xôi", "/ˈblækbɛri/") },
      { id: "melon", emoji: "🍈", word: w("Melon", "Quả dưa lưới", "/ˈmɛlən/") },
      { id: "tangerine", emoji: "🍊", word: w("Tangerine", "Quả quýt", "/ˌtændʒəˈriːn/") },
      { id: "plum", emoji: "🍑", word: w("Plum", "Quả mận", "/plʌm/") },
      { id: "fig", emoji: "🫐", word: w("Fig", "Quả sung", "/fɪɡ/") },
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
      { id: "fish", emoji: "🐟", word: w("Fish", "Con cá", "/fɪʃ/") },
      { id: "bird", emoji: "🐦", word: w("Bird", "Con chim", "/bɜrd/") },
      { id: "giraffe", emoji: "🦒", word: w("Giraffe", "Con hươu cao cổ", "/dʒɪˈræf/") },
      { id: "zebra", emoji: "🦓", word: w("Zebra", "Con ngựa vằn", "/ˈziːbrə/") },
      { id: "hippo", emoji: "🦛", word: w("Hippo", "Con hà mã", "/ˈhɪpoʊ/") },
      { id: "rhino", emoji: "🦏", word: w("Rhino", "Con tê giác", "/ˈraɪnoʊ/") },
      { id: "crocodile", emoji: "🐊", word: w("Crocodile", "Con cá sấu", "/ˈkrɑːkədaɪl/") },
      { id: "dolphin", emoji: "🐬", word: w("Dolphin", "Con cá heo", "/ˈdɑːlfɪn/") },
      { id: "whale", emoji: "🐳", word: w("Whale", "Con cá voi", "/weɪl/") },
      { id: "octopus", emoji: "🐙", word: w("Octopus", "Con bạch tuộc", "/ˈɑːktəpəs/") },
      { id: "crab", emoji: "🦀", word: w("Crab", "Con cua", "/kræb/") },
      { id: "owl", emoji: "🦉", word: w("Owl", "Con chim cú", "/aʊl/") },
      { id: "bee", emoji: "🐝", word: w("Bee", "Con ong", "/biː/") },
      { id: "ant", emoji: "🐜", word: w("Ant", "Con kiến", "/ænt/") },
      { id: "kangaroo", emoji: "🦘", word: w("Kangaroo", "Con chuột túi", "/ˌkæŋɡəˈruː/") },
      { id: "panda", emoji: "🐼", word: w("Panda", "Con gấu trúc", "/ˈpændə/") },
      { id: "koala", emoji: "🐨", word: w("Koala", "Con gấu koala", "/koʊˈɑːlə/") },
      { id: "dinosaur", emoji: "🦖", word: w("Dinosaur", "Con khủng long", "/ˈdaɪnəsɔːr/") },
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
      { id: "desk", emoji: "🪵", word: w("Desk", "Bàn học", "/dɛsk/") },
      { id: "chair", emoji: "🪑", word: w("Chair", "Ghế học", "/tʃɛr/") },
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
  {
    id: "vegetables",
    nameKey: "topic_vegetables",
    emoji: "🥦",
    gradient: "from-emerald-200 via-lime-100 to-teal-200",
    items: [
      { id: "carrot", emoji: "🥕", word: w("Carrot", "Củ cà rốt", "/ˈkærət/") },
      { id: "broccoli", emoji: "🥦", word: w("Broccoli", "Bông cải xanh", "/ˈbrɑːkəli/") },
      { id: "tomato", emoji: "🍅", word: w("Tomato", "Quả cà chua", "/təˈmeɪtoʊ/") },
      { id: "potato", emoji: "🥔", word: w("Potato", "Củ khoai tây", "/pəˈteɪtoʊ/") },
      { id: "sweet_potato", emoji: "🍠", word: w("Sweet Potato", "Củ khoai lang", "/swiːt pəˈteɪtoʊ/") },
      { id: "corn", emoji: "🌽", word: w("Corn", "Bắp nếp / Ngô", "/kɔːrn/") },
      { id: "cucumber", emoji: "🥒", word: w("Cucumber", "Quả dưa leo", "/ˈkjuːkʌmbər/") },
      { id: "luffa", emoji: "🫛", word: w("Luffa (Sponge Gourd)", "Quả mướp", "/ˈlʌfə/") },
      { id: "bitter_melon", emoji: "🍈", word: w("Bitter Melon", "Khổ qua / Mướp đắng", "/ˈbɪtər ˈmɛlən/") },
      { id: "bottle_gourd", emoji: "🍐", word: w("Bottle Gourd", "Trái bầu", "/ˈbɑːtəl ɡɔːrd/") },
      { id: "squash", emoji: "🫑", word: w("Squash", "Quả bí đỏ", "/skwɑːʃ/") },
      { id: "malabar_spinach", emoji: "🍃", word: w("Malabar Spinach", "Rau mồng tơi", "/ˈmæləbɑːr ˈspɪnɪtʃ/") },
      { id: "choy_sum", emoji: "🥬", word: w("Choy Sum", "Rau cải ngọt", "/tʃɔɪ sʌm/") },
      { id: "water_spinach", emoji: "🌿", word: w("Water Spinach", "Rau muống", "/ˈwɔːtər ˈspɪnɪtʃ/") },
      { id: "cabbage", emoji: "🥗", word: w("Cabbage", "Bắp cải", "/ˈkæbɪdʒ/") },
      { id: "radish", emoji: "🫚", word: w("Radish", "Củ cải trắng", "/ˈrædɪʃ/") },
      { id: "pumpkin", emoji: "🎃", word: w("Pumpkin", "Quả bí ngô", "/ˈpʌmpkɪn/") },
      { id: "onion", emoji: "🧅", word: w("Onion", "Củ hành tây", "/ˈʌnjən/") },
      { id: "garlic", emoji: "🧄", word: w("Garlic", "Củ tỏi", "/ˈɡɑːrlɪk/") },
      { id: "mushroom", emoji: "🍄", word: w("Mushroom", "Cây nấm", "/ˈmʌʃruːm/") },
      { id: "eggplant", emoji: "🍆", word: w("Eggplant", "Quả cà tím", "/ˈɛɡˌplænt/") },
      { id: "chili_pepper", emoji: "🌶️", word: w("Chili Pepper", "Quả ớt", "/ˈtʃɪli ˈpɛpər/") },
    ],
    questionTemplates: (item) => [
      w("What vegetable is this?", "Đây là loại rau củ gì?"),
      w(`Do you like to eat ${item.word.en.toLowerCase()}?`, `Con có thích ăn ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "kitchen-utensils",
    nameKey: "topic_kitchen_utensils",
    emoji: "🍳",
    gradient: "from-amber-200 via-yellow-100 to-orange-200",
    items: [
      { id: "spoon", emoji: "🥄", word: w("Spoon", "Cái thìa / Muỗng", "/spuːn/") },
      { id: "fork", emoji: "🍴", word: w("Fork", "Cái nĩa", "/fɔːrk/") },
      { id: "knife", emoji: "🔪", word: w("Knife", "Con dao", "/naɪf/") },
      { id: "chopsticks", emoji: "🥢", word: w("Chopsticks", "Đôi đũa", "/ˈtʃɑːpstɪks/") },
      { id: "bowl", emoji: "🥣", word: w("Bowl", "Cái bát / Chén", "/boʊl/") },
      { id: "plate", emoji: "🍽️", word: w("Plate", "Cái đĩa", "/pleɪt/") },
      { id: "cup", emoji: "🥤", word: w("Cup", "Cái cốc / Ly", "/kʌp/") },
      { id: "teapot", emoji: "🫖", word: w("Teapot", "Ấm trà", "/ˈtiːpɑːt/") },
      { id: "pot", emoji: "🍲", word: w("Cooking Pot", "Cái nồi", "/pɑːt/") },
      { id: "frying_pan", emoji: "🍳", word: w("Frying Pan", "Cái chảo", "/ˈfraɪɪŋ pæn/") },
      { id: "kettle", emoji: "🫖", word: w("Kettle", "Ấm đun nước", "/ˈkɛtəl/") },
      { id: "bottle", emoji: "🍾", word: w("Bottle", "Chai nước", "/ˈbɑːtəl/") },
      { id: "fridge", emoji: "🧊", word: w("Refrigerator (Fridge)", "Tủ lạnh", "/rɪˈfrɪdʒəˌreɪtər/") },
      { id: "dishwasher", emoji: "🫧", word: w("Dishwasher", "Máy rửa bát / Máy rửa chén", "/ˈdɪʃˌwɑːʃər/") },
      { id: "water_purifier", emoji: "💧", word: w("Water Purifier", "Máy lọc nước", "/ˈwɔːtər ˈpjʊrəˌfaɪər/") },
    ],
    questionTemplates: (item) => [
      w("What kitchen tool is this?", "Đây là đồ dùng nhà bếp gì?"),
      w(`Do you use a ${item.word.en.toLowerCase()}?`, `Con có dùng ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "living-room",
    nameKey: "topic_living_room",
    emoji: "🛋️",
    gradient: "from-rose-200 via-purple-100 to-sky-200",
    items: [
      { id: "sofa", emoji: "🛋️", word: w("Sofa (Couch)", "Ghế sofa / Ghế bành", "/ˈsoʊfə/") },
      { id: "television", emoji: "📺", word: w("Television (TV)", "Tivi", "/ˈtɛləˌvɪʒən/") },
      { id: "table", emoji: "🪑", word: w("Coffee Table", "Bàn trà / Bàn phòng khách", "/ˈkɑːfi ˈteɪbəl/") },
      { id: "lamp", emoji: "💡", word: w("Lamp", "Đèn bàn / Đèn phòng", "/læmp/") },
      { id: "clock", emoji: "⏰", word: w("Clock", "Đồng hồ treo tường", "/klɑːk/") },
      { id: "picture", emoji: "🖼️", word: w("Picture Frame", "Bức tranh / Khung ảnh", "/ˈpɪktʃər/") },
      { id: "fan", emoji: "🪭", word: w("Fan", "Quạt máy", "/fæn/") },
      { id: "air_conditioner", emoji: "❄️", word: w("Air Conditioner", "Máy điều hòa / Máy lạnh", "/ˈɛr kənˈdɪʃənər/") },
      { id: "carpet", emoji: "🪢", word: w("Carpet (Rug)", "Thảm trải sàn", "/ˈkɑːrpət/") },
      { id: "curtain", emoji: "🪟", word: w("Curtains", "Rèm cửa", "/ˈkɜːrtənz/") },
      { id: "plant", emoji: "🪴", word: w("Houseplant", "Cây cảnh trong nhà", "/ˈhaʊsˌplænt/") },
      { id: "remote_control", emoji: "📻", word: w("Remote Control", "Điều khiển từ xa", "/rɪˈmoʊt kənˈtroʊl/") },
      { id: "fish_tank", emoji: "🐠", word: w("Fish Tank (Aquarium)", "Bể cá cảnh", "/fɪʃ tæŋk/") },
      { id: "hammock", emoji: "🏕️", word: w("Hammock", "Cái võng", "/ˈhæmək/") },
      { id: "robot_vacuum", emoji: "🤖", word: w("Robot Vacuum", "Robot hút bụi", "/ˈroʊbɑːt ˈvækjuːm/") },
    ],
    questionTemplates: (item) => [
      w("What is this in the living room?", "Đây là món đồ gì trong phòng khách?"),
      w(`Can you see a ${item.word.en.toLowerCase()}?`, `Con có thấy ${item.word.vi.toLowerCase()} không?`),
    ],
  },
  {
    id: "bedroom",
    nameKey: "topic_bedroom",
    emoji: "🛏️",
    gradient: "from-indigo-200 via-sky-100 to-purple-200",
    items: [
      { id: "bed", emoji: "🛏️", word: w("Bed", "Cái giường", "/bɛd/") },
      { id: "pillow", emoji: "🛏️", word: w("Pillow", "Cái gối", "/ˈpɪloʊ/") },
      { id: "blanket", emoji: "🛋️", word: w("Blanket (Quilt)", "Cái chăn / Mền", "/ˈblæŋkət/") },
      { id: "wardrobe", emoji: "🚪", word: w("Wardrobe (Closet)", "Tủ quần áo", "/ˈwɔːrdroʊb/") },
      { id: "nightstand", emoji: "🪵", word: w("Nightstand (Bedside Table)", "Tủ đầu giường", "/ˈnaɪtˌstænd/") },
      { id: "alarm_clock", emoji: "⏰", word: w("Alarm Clock", "Đồng hồ báo thức", "/əˈlɑːrm klɑːk/") },
      { id: "mirror", emoji: "🪞", word: w("Mirror", "Gương soi", "/ˈmɪrər/") },
      { id: "comb", emoji: "🪮", word: w("Comb (Hairbrush)", "Cái lược", "/koʊm/") },
      { id: "pajamas", emoji: "👔", word: w("Pajamas", "Bộ đồ ngủ", "/pəˈdʒɑːməz/") },
      { id: "slipper", emoji: "🩴", word: w("Slippers", "Dép đi trong nhà", "/ˈslɪpərz/") },
      { id: "toy_box", emoji: "🧸", word: w("Toy Chest (Toy Box)", "Rương / Hộp đựng đồ chơi", "/tɔɪ tʃɛst/") },
      { id: "desk_lamp", emoji: "💡", word: w("Bedside Lamp", "Đèn ngủ", "/ˈbɛdˌsaɪd læmp/") },
    ],
    questionTemplates: (item) => [
      w("What is this in the bedroom?", "Đây là đồ dùng gì trong phòng ngủ?"),
      w(`Do you have a ${item.word.en.toLowerCase()} in your room?`, `Phòng con có ${item.word.vi.toLowerCase()} không?`),
    ],
  },
];

export function getTopic(id: string): VocabTopic | undefined {
  return vocabularyTopics.find((topic) => topic.id === id);
}

export function getItemQuestions(topic: VocabTopic, item: VocabItem): Bilingual[] {
  return [...topic.questionTemplates(item), ...(item.extraQuestions ?? [])];
}
