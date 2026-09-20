export interface QnaQuestion {
  id: string;
  emoji: string;
  question: {
    en: string;
    vi: string;
  };
  sampleAnswer?: {
    en: string;
    vi: string;
  };
}

export interface QnaCategory {
  id: string;
  titleEn: string;
  titleVi: string;
  descriptionEn: string;
  descriptionVi: string;
  emoji: string;
  gradient: string;
  questions: QnaQuestion[];
}

export const qnaCategories: QnaCategory[] = [
  {
    id: "about-me",
    titleEn: "About Me & Daily Life",
    titleVi: "Bản thân & Cuộc sống",
    descriptionEn: "Questions about your name, age, feelings, and weather",
    descriptionVi: "Hỏi đáp về tên, tuổi, cảm xúc và thời tiết",
    emoji: "👋",
    gradient: "from-rose-200 via-pink-100 to-amber-100",
    questions: [
      {
        id: "name",
        emoji: "🏷️",
        question: { en: "What is your name?", vi: "Con tên là gì?" },
        sampleAnswer: { en: "My name is...", vi: "Tên con là..." },
      },
      {
        id: "age",
        emoji: "🎂",
        question: { en: "How old are you?", vi: "Con mấy tuổi rồi?" },
        sampleAnswer: { en: "I am 5 years old!", vi: "Con 5 tuổi ạ!" },
      },
      {
        id: "feeling",
        emoji: "😊",
        question: { en: "How are you today?", vi: "Hôm nay con cảm thấy thế nào?" },
        sampleAnswer: { en: "I am happy!", vi: "Con đang rất vui ạ!" },
      },
      {
        id: "favorite_color",
        emoji: "🎨",
        question: { en: "What is your favorite color?", vi: "Con thích màu gì nhất?" },
        sampleAnswer: { en: "My favorite color is blue!", vi: "Con thích màu xanh dương nhất!" },
      },
      {
        id: "weather",
        emoji: "☀️",
        question: { en: "How is the weather today?", vi: "Thời tiết hôm nay thế nào?" },
        sampleAnswer: { en: "It is sunny today!", vi: "Hôm nay trời nắng ạ!" },
      },
      {
        id: "sleepy",
        emoji: "🥱",
        question: { en: "Are you sleepy?", vi: "Con có buồn ngủ không?" },
        sampleAnswer: { en: "No, I am wide awake!", vi: "Dạ không, con rất tỉnh táo!" },
      },
      {
        id: "hungry",
        emoji: "😋",
        question: { en: "Are you hungry?", vi: "Con có đói không?" },
        sampleAnswer: { en: "Yes, I want to eat!", vi: "Dạ có, con muốn ăn ạ!" },
      },
      {
        id: "smile",
        emoji: "😄",
        question: { en: "Can you smile for me?", vi: "Con mỉm cười cho ba mẹ xem nào?" },
        sampleAnswer: { en: "Cheese! Big smile!", vi: "Cười tươi nè!" },
      },
      {
        id: "morning_greeting",
        emoji: "🌅",
        question: { en: "What do you say in the morning?", vi: "Buổi sáng con chào thế nào?" },
        sampleAnswer: { en: "Good morning!", vi: "Chào buổi sáng ạ!" },
      },
      {
        id: "night_greeting",
        emoji: "🌙",
        question: { en: "What do you say before going to bed?", vi: "Trước khi đi ngủ con nói gì?" },
        sampleAnswer: { en: "Good night!", vi: "Chúc ngủ ngon ạ!" },
      },
    ],
  },
  {
    id: "body-actions",
    titleEn: "Body & Fun Actions",
    titleVi: "Cơ thể & Hành động",
    descriptionEn: "Questions about fingers, toes, jumping, and clapping",
    descriptionVi: "Hỏi đáp về ngón tay, ngón chân, nhảy và vỗ tay",
    emoji: "✋",
    gradient: "from-purple-200 via-indigo-100 to-sky-100",
    questions: [
      {
        id: "fingers",
        emoji: "🖐️",
        question: { en: "How many fingers do you have?", vi: "Con có bao nhiêu ngón tay?" },
        sampleAnswer: { en: "I have 10 fingers!", vi: "Con có 10 ngón tay ạ!" },
      },
      {
        id: "eyes",
        emoji: "👁️",
        question: { en: "How many eyes do you have?", vi: "Con có bao nhiêu mắt?" },
        sampleAnswer: { en: "I have 2 eyes!", vi: "Con có 2 mắt ạ!" },
      },
      {
        id: "hands_count",
        emoji: "👐",
        question: { en: "How many hands do you have?", vi: "Con có bao nhiêu bàn tay?" },
        sampleAnswer: { en: "I have 2 hands!", vi: "Con có 2 bàn tay ạ!" },
      },
      {
        id: "ears_count",
        emoji: "👂",
        question: { en: "How many ears do you have?", vi: "Con có bao nhiêu cái tai?" },
        sampleAnswer: { en: "I have 2 ears!", vi: "Con có 2 cái tai!" },
      },
      {
        id: "touch_nose",
        emoji: "👃",
        question: { en: "Can you touch your nose?", vi: "Con chạm vào mũi mình được không?" },
        sampleAnswer: { en: "Yes, I can!", vi: "Dạ được, chạm mũi nè!" },
      },
      {
        id: "jump_frog",
        emoji: "🐸",
        question: { en: "Can you jump like a frog?", vi: "Con nhảy như con ếch được không?" },
        sampleAnswer: { en: "Ribbit! Yes I can!", vi: "Dạ được, nhảy nhảy!" },
      },
      {
        id: "clap_hands",
        emoji: "👏",
        question: { en: "Can you clap your hands?", vi: "Con vỗ tay được không?" },
        sampleAnswer: { en: "Clap, clap, clap!", vi: "Vỗ tay bộp bộp bộp!" },
      },
      {
        id: "touch_toes",
        emoji: "🦶",
        question: { en: "Can you touch your toes?", vi: "Con chạm vào ngón chân được không?" },
        sampleAnswer: { en: "Yes, look!", vi: "Dạ được, nhìn nè!" },
      },
      {
        id: "shake_head",
        emoji: "🗣️",
        question: { en: "Can you shake your head?", vi: "Con lắc đầu được không?" },
        sampleAnswer: { en: "Shake, shake, shake!", vi: "Lắc lắc cái đầu!" },
      },
      {
        id: "stomp_feet",
        emoji: "👟",
        question: { en: "Can you stomp your feet?", vi: "Con dậm chân được không?" },
        sampleAnswer: { en: "Stomp, stomp, stomp!", vi: "Dậm dậm chân!" },
      },
      {
        id: "wave_hand",
        emoji: "👋",
        question: { en: "Can you wave goodbye?", vi: "Con vẫy tay chào tạm biệt được không?" },
        sampleAnswer: { en: "Bye-bye!", vi: "Vẫy tay chào tạm biệt!" },
      },
    ],
  },
  {
    id: "counting",
    titleEn: "Counting & Numbers",
    titleVi: "Đếm số & Phản xạ",
    descriptionEn: "Practice counting fingers, feet, and legs",
    descriptionVi: "Luyện tập đếm ngón tay, bàn chân, cái chân",
    emoji: "🔢",
    gradient: "from-sky-200 via-cyan-100 to-teal-100",
    questions: [
      {
        id: "count_5",
        emoji: "✋",
        question: { en: "Can you count from 1 to 5?", vi: "Con đếm từ 1 đến 5 được không?" },
        sampleAnswer: { en: "1, 2, 3, 4, 5!", vi: "1, 2, 3, 4, 5!" },
      },
      {
        id: "count_10",
        emoji: "🔟",
        question: { en: "Can you count from 1 to 10?", vi: "Con đếm từ 1 đến 10 được không?" },
        sampleAnswer: { en: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10!", vi: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10!" },
      },
      {
        id: "feet",
        emoji: "🦶",
        question: { en: "How many feet do you have?", vi: "Con có bao nhiêu bàn chân?" },
        sampleAnswer: { en: "I have 2 feet!", vi: "Con có 2 bàn chân!" },
      },
      {
        id: "toes_count",
        emoji: "🦶",
        question: { en: "How many toes do you have?", vi: "Con có bao nhiêu ngón chân?" },
        sampleAnswer: { en: "I have 10 toes!", vi: "Con có 10 ngón chân!" },
      },
      {
        id: "dog_legs",
        emoji: "🐶",
        question: { en: "How many legs does a dog have?", vi: "Con chó có bao nhiêu cái chân?" },
        sampleAnswer: { en: "A dog has 4 legs!", vi: "Con chó có 4 chân!" },
      },
      {
        id: "wheels_car",
        emoji: "🚗",
        question: { en: "How many wheels does a car have?", vi: "Xe ô tô có bao nhiêu cái bánh xe?" },
        sampleAnswer: { en: "A car has 4 wheels!", vi: "Ô tô có 4 bánh xe!" },
      },
      {
        id: "bird_wings",
        emoji: "🐦",
        question: { en: "How many wings does a bird have?", vi: "Con chim có bao nhiêu cái cánh?" },
        sampleAnswer: { en: "A bird has 2 wings!", vi: "Con chim có 2 cánh!" },
      },
      {
        id: "cat_tail",
        emoji: "🐈",
        question: { en: "How many tails does a cat have?", vi: "Con mèo có bao nhiêu cái đuôi?" },
        sampleAnswer: { en: "Only 1 tail!", vi: "Chỉ có 1 cái đuôi thôi!" },
      },
      {
        id: "sun_count",
        emoji: "☀️",
        question: { en: "How many suns are in the sky?", vi: "Có bao nhiêu mặt trời trên trời?" },
        sampleAnswer: { en: "There is only 1 sun!", vi: "Chỉ có 1 mặt trời thôi ạ!" },
      },
    ],
  },
  {
    id: "animals-nature",
    titleEn: "Animals & Nature",
    titleVi: "Con vật & Tự nhiên",
    descriptionEn: "Fun questions about animal sounds and nature colors",
    descriptionVi: "Hỏi đáp về tiếng kêu động vật và màu sắc thiên nhiên",
    emoji: "🐶",
    gradient: "from-amber-200 via-yellow-100 to-lime-100",
    questions: [
      {
        id: "dog_sound",
        emoji: "🐶",
        question: { en: "What sound does a dog make?", vi: "Con chó kêu như thế nào?" },
        sampleAnswer: { en: "Woof woof!", vi: "Gâu gâu!" },
      },
      {
        id: "cat_sound",
        emoji: "🐱",
        question: { en: "What sound does a cat make?", vi: "Con mèo kêu như thế nào?" },
        sampleAnswer: { en: "Meow meow!", vi: "Meo meo!" },
      },
      {
        id: "duck_sound",
        emoji: "🦆",
        question: { en: "What sound does a duck make?", vi: "Con vịt kêu như thế nào?" },
        sampleAnswer: { en: "Quack quack!", vi: "Cáp cáp!" },
      },
      {
        id: "cow_sound",
        emoji: "🐮",
        question: { en: "What sound does a cow make?", vi: "Con bò kêu như thế nào?" },
        sampleAnswer: { en: "Moo moo!", vi: "Bò mooo!" },
      },
      {
        id: "frog_sound",
        emoji: "🐸",
        question: { en: "What sound does a frog make?", vi: "Con ếch kêu như thế nào?" },
        sampleAnswer: { en: "Ribbit, ribbit!", vi: "Ếch ộp ộp!" },
      },
      {
        id: "lion_roar",
        emoji: "🦁",
        question: { en: "Can a lion roar loud?", vi: "Con sư tử có rống to được không?" },
        sampleAnswer: { en: "Roar! Big loud roar!", vi: "Gầm to lắm!" },
      },
      {
        id: "monkey_climb",
        emoji: "🐒",
        question: { en: "Can monkeys climb trees?", vi: "Con khỉ có biết leo cây không?" },
        sampleAnswer: { en: "Yes, monkeys love climbing!", vi: "Dạ có, khỉ leo cây giỏi lắm!" },
      },
      {
        id: "sky_color",
        emoji: "☁️",
        question: { en: "What color is the sky?", vi: "Bầu trời có màu gì?" },
        sampleAnswer: { en: "The sky is blue!", vi: "Bầu trời màu xanh dương!" },
      },
      {
        id: "grass_color",
        emoji: "🌱",
        question: { en: "What color is grass?", vi: "Cỏ có màu gì?" },
        sampleAnswer: { en: "Grass is green!", vi: "Cỏ màu xanh lá!" },
      },
      {
        id: "bird_fly",
        emoji: "🕊️",
        question: { en: "Can birds fly in the sky?", vi: "Con chim có bay được trên trời không?" },
        sampleAnswer: { en: "Yes, birds can fly!", vi: "Dạ có, chim biết bay!" },
      },
      {
        id: "fish_live",
        emoji: "🐟",
        question: { en: "Where do fish live?", vi: "Con cá sống ở đâu?" },
        sampleAnswer: { en: "Fish live in water!", vi: "Cá sống ở dưới nước!" },
      },
      {
        id: "sun_moon",
        emoji: "🌙",
        question: { en: "When do we see the moon?", vi: "Khi nào chúng ta thấy mặt trăng?" },
        sampleAnswer: { en: "At night time!", vi: "Vào ban đêm!" },
      },
    ],
  },
  {
    id: "food-likes",
    titleEn: "Food & Preferences",
    titleVi: "Món ăn & Sở thích",
    descriptionEn: "Questions about yummy food, drinks, and favorites",
    descriptionVi: "Hỏi đáp về các món ăn ngon, đồ uống và món yêu thích",
    emoji: "🍎",
    gradient: "from-orange-200 via-rose-100 to-red-100",
    questions: [
      {
        id: "like_apples",
        emoji: "🍎",
        question: { en: "Do you like apples?", vi: "Con có thích ăn táo không?" },
        sampleAnswer: { en: "Yes, I do! Yum!", vi: "Dạ có, ngon lắm!" },
      },
      {
        id: "like_icecream",
        emoji: "🍦",
        question: { en: "Do you like ice cream?", vi: "Con có thích ăn kem không?" },
        sampleAnswer: { en: "Yes! Ice cream is yummy!", vi: "Dạ thích, kem ngon lắm!" },
      },
      {
        id: "like_pizza",
        emoji: "🍕",
        question: { en: "Do you like pizza?", vi: "Con có thích ăn pizza không?" },
        sampleAnswer: { en: "Yes, I love pizza!", vi: "Dạ thích ăn pizza lắm!" },
      },
      {
        id: "thirsty",
        emoji: "🥛",
        question: { en: "What do you drink when you are thirsty?", vi: "Con uống gì khi thấy khát?" },
        sampleAnswer: { en: "I drink water or milk!", vi: "Con uống nước hoặc sữa ạ!" },
      },
      {
        id: "like_milk",
        emoji: "🥛",
        question: { en: "Do you drink milk every day?", vi: "Mỗi ngày con có uống sữa không?" },
        sampleAnswer: { en: "Yes, milk makes me strong!", vi: "Dạ có, uống sữa cho khỏe mạnh!" },
      },
      {
        id: "yellow_fruit",
        emoji: "🍌",
        question: { en: "What fruit is yellow and sweet?", vi: "Quả gì màu vàng và ngọt?" },
        sampleAnswer: { en: "A banana!", vi: "Quả chuối!" },
      },
      {
        id: "rabbit_food",
        emoji: "🥕",
        question: { en: "What do rabbits love to eat?", vi: "Con thỏ thích ăn gì nhất?" },
        sampleAnswer: { en: "Carrots!", vi: "Củ cà rốt!" },
      },
      {
        id: "orange_color",
        emoji: "🍊",
        question: { en: "What color is an orange fruit?", vi: "Quả cam có màu gì?" },
        sampleAnswer: { en: "It is orange!", vi: "Nó có màu cam!" },
      },
    ],
  },
  {
    id: "family-home",
    titleEn: "Family & Home",
    titleVi: "Gia đình & Thói quen",
    descriptionEn: "Questions about mommy, daddy, hugs, and cleaning up",
    descriptionVi: "Hỏi đáp về ba mẹ, cái ôm và dọn dẹp đồ chơi",
    emoji: "👨‍👩‍👧‍👦",
    gradient: "from-green-200 via-emerald-100 to-teal-100",
    questions: [
      {
        id: "mom_dad",
        emoji: "❤️",
        question: { en: "Who loves you very much?", vi: "Ai yêu thương con nhất nào?" },
        sampleAnswer: { en: "Mommy and Daddy!", vi: "Ba và mẹ ạ!" },
      },
      {
        id: "hug",
        emoji: "🤗",
        question: { en: "Can you give a big hug?", vi: "Con ôm ba mẹ một cái thật to được không?" },
        sampleAnswer: { en: "Big warm hug!", vi: "Ôm chặt cứng luôn!" },
      },
      {
        id: "clean_toys",
        emoji: "🧸",
        question: { en: "Do you clean your toys after playing?", vi: "Chơi xong con có dọn đồ chơi không?" },
        sampleAnswer: { en: "Yes, I clean up my toys!", vi: "Dạ có, con tự dọn đồ chơi ạ!" },
      },
      {
        id: "sleep_bed",
        emoji: "🛏️",
        question: { en: "Where do you sleep at night?", vi: "Buổi tối con ngủ ở đâu?" },
        sampleAnswer: { en: "In my cozy bed!", vi: "Trên chiếc giường êm ái!" },
      },
    ],
  },
  {
    id: "hobbies-fun",
    titleEn: "Hobbies & Playtime",
    titleVi: "Trò chơi & Sở thích",
    descriptionEn: "Questions about singing, drawing, dancing, and playing ball",
    descriptionVi: "Hỏi đáp về hát, vẽ tranh, nhảy nhót và chơi bóng",
    emoji: "⚽",
    gradient: "from-yellow-200 via-amber-100 to-orange-100",
    questions: [
      {
        id: "sing_song",
        emoji: "🎤",
        question: { en: "Can you sing a song?", vi: "Con hát một bài được không?" },
        sampleAnswer: { en: "La la la! Yes I can!", vi: "La la la! Được chứ ạ!" },
      },
      {
        id: "draw_pictures",
        emoji: "🎨",
        question: { en: "Do you like drawing pictures?", vi: "Con có thích vẽ tranh không?" },
        sampleAnswer: { en: "Yes, I love colors!", vi: "Con thích vẽ tranh lắm!" },
      },
      {
        id: "kick_ball",
        emoji: "⚽",
        question: { en: "Can you kick a ball?", vi: "Con đá quả bóng được không?" },
        sampleAnswer: { en: "Kick! Goal!", vi: "Đá bóng vào lưới!" },
      },
      {
        id: "dance_music",
        emoji: "🎵",
        question: { en: "Can you dance to the music?", vi: "Con nhảy theo tiếng nhạc được không?" },
        sampleAnswer: { en: "Dance, dance, dance!", vi: "Nhảy nhót tung tăng!" },
      },
    ],
  },
];

export function getQnaCategory(id: string): QnaCategory | undefined {
  return qnaCategories.find((cat) => cat.id === id);
}
