export interface GiftItem {
  id: string;
  nameEn: string;
  nameVi: string;
  price: number; // Price in đồng
  emoji: string;
  category: "cars" | "superhero" | "blocks" | "robots" | "dinos" | "games";
  descriptionEn: string;
  descriptionVi: string;
  gradient: string;
}

export const giftItems: GiftItem[] = [
  {
    id: "racing_car",
    nameEn: "Super Speed Racing Car",
    nameVi: "Xe Ô Tô Đua Siêu Tốc",
    price: 50,
    emoji: "🏎️",
    category: "cars",
    descriptionEn: "A fast red racing car toy to zoom across the room!",
    descriptionVi: "Chiếc xe đua màu đỏ chạy cực nhanh trong phòng!",
    gradient: "from-rose-400 to-red-600",
  },
  {
    id: "superman_figure",
    nameEn: "Superman Action Figure",
    nameVi: "Mô Hình Siêu Nhân Superman",
    price: 80,
    emoji: "🦸‍♂️",
    category: "superhero",
    descriptionEn: "Brave superhero with a shiny red cape!",
    descriptionVi: "Siêu nhân dũng cảm với chiếc áo khoác đỏ rực rỡ!",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    id: "lego_set",
    nameEn: "Lego Construction Bricks",
    nameVi: "Bộ Đồ Chơi Xếp Hình Lego",
    price: 100,
    emoji: "🧩",
    category: "blocks",
    descriptionEn: "Build castles, towers, and cool houses with colorful bricks!",
    descriptionVi: "Thỏa sức lắp ráp lâu đài, tòa nhà và ngôi nhà rực rỡ!",
    gradient: "from-amber-400 to-yellow-500",
  },
  {
    id: "transformer_robot",
    nameEn: "Transformer Robot Toy",
    nameVi: "Robot Biến Hình Thông Minh",
    price: 120,
    emoji: "🤖",
    category: "robots",
    descriptionEn: "Transforms from a giant robot into a cool sports car!",
    descriptionVi: "Biến hình từ robot khổng lồ thành xe thể thao cực ngầu!",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    id: "t_rex_dino",
    nameEn: "Roaring T-Rex Dinosaur",
    nameVi: "Khủng Long T-Rex Khổng Lồ",
    price: 150,
    emoji: "🦖",
    category: "dinos",
    descriptionEn: "Mighty T-Rex that roars and walks on adventures!",
    descriptionVi: "Chú khủng long T-Rex dũng mãnh biết bước đi thám hiểm!",
    gradient: "from-emerald-400 to-green-600",
  },
  {
    id: "monster_truck",
    nameEn: "Big Wheel Monster Truck",
    nameVi: "Xe Tải Đồ Chơi Bánh Xe Khổng Lồ",
    price: 180,
    emoji: "🛻",
    category: "cars",
    descriptionEn: "Giant wheels to jump over any obstacle!",
    descriptionVi: "Bánh xe siêu to vượt mọi địa hình obstacles!",
    gradient: "from-purple-400 to-fuchsia-600",
  },
  {
    id: "toy_train_set",
    nameEn: "Express Railway Train Set",
    nameVi: "Bộ Tàu Hỏa Đường Ray Siêu Tốc",
    price: 220,
    emoji: "🚂",
    category: "cars",
    descriptionEn: "Electric train running smoothly on round tracks!",
    descriptionVi: "Đoàn tàu hỏa chạy mượt mà trên đường ray vòng tròn!",
    gradient: "from-sky-400 to-teal-600",
  },
  {
    id: "remote_helicopter",
    nameEn: "Remote Control Helicopter",
    nameVi: "Máy Bay Trực Thăng Điều Khiển Từ Xa",
    price: 300,
    emoji: "🚁",
    category: "robots",
    descriptionEn: "Flies high into the air with glowing LED lights!",
    descriptionVi: "Bay cao lên không trung với đèn LED phát sáng rực rỡ!",
    gradient: "from-orange-400 to-amber-600",
  },
  {
    id: "superhero_mask_set",
    nameEn: "Superhero Cape & Mask Set",
    nameVi: "Bộ Áo Choàng & Mặt Nạ Siêu Anh Hùng",
    price: 400,
    emoji: "🎭",
    category: "superhero",
    descriptionEn: "Dress up like a real hero saving the world!",
    descriptionVi: "Hóa thân thành siêu anh hùng thật sự giải cứu thế giới!",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    id: "ultimate_toy_castle",
    nameEn: "Ultimate Toy Castle & Figures",
    nameVi: "Lâu Đài Đồ Chơi Khổng Lồ",
    price: 500,
    emoji: "🏰",
    category: "blocks",
    descriptionEn: "The ultimate dream gift for master builders!",
    descriptionVi: "Phần thưởng ước mơ lớn nhất dành cho bé chăm học!",
    gradient: "from-pink-400 to-rose-600",
  },
];
