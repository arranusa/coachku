export type ArticleData = {
  id: number;
  title: { id: string; en: string };
  category: string;
  readTime: string;
  image: string;
  content: { id: string; en: string };
  author: string;
  date: string;
};

export const ARTICLES_DATA: ArticleData[] = [
  {
    id: 1,
    title: {
      id: "5 Kesalahan Umum Saat Melakukan Deadlift",
      en: "5 Common Mistakes When Deadlifting",
    },
    category: "Tips Latihan",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop",
    author: "Dr. John Doe",
    date: "10 Oct 2024",
    content: {
      id: "Deadlift adalah salah satu latihan terbaik, tapi jika dilakukan dengan salah, bisa menyebabkan cedera punggung serius. Kesalahan pertama adalah membengkokkan punggung bagian bawah. Selalu pastikan punggung Anda lurus dan dada dibusungkan. Kedua, bar terlalu jauh dari tulang kering Anda. Tarik bar sedekat mungkin dengan kaki Anda. Ketiga, tidak menggunakan otot glutes Anda. Fokuslah mendorong pinggul ke depan di puncak gerakan.",
      en: "Deadlifts are one of the best exercises, but doing them wrong can cause serious back injuries. The first mistake is rounding the lower back. Always keep your back straight and chest up. Second, the bar is too far from your shins. Keep the bar as close to your legs as possible. Third, not engaging your glutes. Focus on pushing your hips forward at the top of the movement.",
    },
  },
  {
    id: 2,
    title: {
      id: "Pentingnya Nutrisi Setelah Latihan Berat",
      en: "The Importance of Post-Workout Nutrition",
    },
    category: "Nutrisi",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop",
    author: "Jane Smith, Nutritionist",
    date: "12 Oct 2024",
    content: {
      id: "Setelah sesi latihan yang intens, otot Anda membutuhkan nutrisi untuk pulih dan tumbuh. Jangan lewatkan jendela anabolik! Konsumsi protein cepat serap seperti whey atau putih telur dalam waktu 45 menit setelah latihan. Padukan dengan karbohidrat sederhana untuk memulihkan glikogen otot, misalnya pisang atau nasi putih. Hidrasi juga sangat penting, minumlah air secukupnya untuk menggantikan cairan yang hilang melalui keringat.",
      en: "After an intense workout session, your muscles need nutrients to recover and grow. Don't miss the anabolic window! Consume fast-absorbing protein like whey or egg whites within 45 minutes post-workout. Pair it with simple carbohydrates to restore muscle glycogen, such as bananas or white rice. Hydration is also crucial, drink enough water to replace the fluids lost through sweat.",
    },
  },
  {
    id: 3,
    title: {
      id: "Rekomendasi Sepatu Gym Terbaik 2024",
      en: "Best Gym Shoes Recommendations 2024",
    },
    category: "Gear",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    author: "FitGear Editorial",
    date: "14 Oct 2024",
    content: {
      id: "Sepatu yang tepat akan meningkatkan performa latihan Anda. Untuk angkat beban statis (seperti squat atau deadlift), carilah sepatu dengan sol yang datar dan keras, seperti Converse Chuck Taylor atau sepatu khusus powerlifting. Jika latihan Anda lebih banyak plyometric atau HIIT, gunakan sepatu cross-training yang memberikan stabilitas lateral dan bantalan yang cukup, seperti Nike Metcon atau Reebok Nano. Hindari sepatu lari bersol tebal untuk latihan beban, karena tidak stabil.",
      en: "The right shoes will improve your workout performance. For static weightlifting (like squats or deadlifts), look for shoes with flat, hard soles, like Converse Chuck Taylors or dedicated powerlifting shoes. If your workouts are mostly plyometric or HIIT, use cross-training shoes that offer lateral stability and adequate cushioning, like Nike Metcons or Reebok Nanos. Avoid thick-soled running shoes for weight training, as they lack stability.",
    },
  },
  {
    id: 4,
    title: {
      id: "Cara Mencegah Cedera Bahu",
      en: "How to Prevent Shoulder Injuries",
    },
    category: "Kesehatan",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
    author: "Dr. John Doe",
    date: "15 Oct 2024",
    content: {
      id: "Bahu adalah sendi yang sangat rentan saat latihan beban. Untuk mencegah cedera, pastikan untuk melakukan pemanasan rotator cuff sebelum latihan upper body.",
      en: "The shoulder is a highly vulnerable joint during weight training. To prevent injuries, make sure to warm up your rotator cuff before upper body workouts.",
    },
  },
  {
    id: 5,
    title: {
      id: "Pentingnya Tidur untuk Pembentukan Otot",
      en: "The Importance of Sleep for Muscle Building",
    },
    category: "Kesehatan",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1511295742362-92c96b6ade1d?q=80&w=600&auto=format&fit=crop",
    author: "Jane Smith",
    date: "16 Oct 2024",
    content: {
      id: "Banyak orang lupa bahwa otot tidak tumbuh saat di gym, melainkan saat Anda tidur. Pastikan mendapat 7-9 jam tidur berkualitas.",
      en: "Many people forget that muscles do not grow in the gym, but rather while you sleep. Ensure you get 7-9 hours of quality sleep.",
    },
  },
  {
    id: 6,
    title: {
      id: "Suplemen Pre-Workout: Perlu atau Tidak?",
      en: "Pre-Workout Supplements: Necessary or Not?",
    },
    category: "Nutrisi",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=600&auto=format&fit=crop",
    author: "Fitness Guru",
    date: "17 Oct 2024",
    content: {
      id: "Pre-workout bisa memberikan tambahan energi, namun tidak wajib. Kafein dari secangkir kopi seringkali sudah cukup.",
      en: "Pre-workout can provide an extra energy boost, but it is not mandatory. Caffeine from a cup of coffee is often sufficient.",
    },
  },
  {
    id: 7,
    title: { id: "Latihan Kardio vs Beban", en: "Cardio vs Weight Training" },
    category: "Tips Latihan",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    author: "Coach Budi",
    date: "18 Oct 2024",
    content: {
      id: "Keduanya penting. Latihan beban membangun otot dan meningkatkan metabolisme, sementara kardio penting untuk kesehatan jantung.",
      en: "Both are important. Weight training builds muscle and increases metabolism, while cardio is important for heart health.",
    },
  },
  {
    id: 8,
    title: { id: "Mitos Diet Karbohidrat", en: "The Carbohydrate Diet Myth" },
    category: "Nutrisi",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop",
    author: "Jane Smith, Nutritionist",
    date: "19 Oct 2024",
    content: {
      id: "Karbohidrat bukan musuh Anda. Mereka adalah sumber energi utama tubuh saat melakukan latihan intensitas tinggi.",
      en: "Carbohydrates are not your enemy. They are the body’s primary energy source during high-intensity workouts.",
    },
  },
  {
    id: 9,
    title: {
      id: "Teknik Pernapasan Saat Latihan",
      en: "Breathing Techniques During Exercise",
    },
    category: "Tips Latihan",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop",
    author: "Dr. John Doe",
    date: "20 Oct 2024",
    content: {
      id: "Pernapasan yang benar: buang napas saat fase konsentrik (mengangkat beban), dan tarik napas saat fase eksentrik (menurunkan beban).",
      en: "Correct breathing: exhale during the concentric phase (lifting the weight), and inhale during the eccentric phase (lowering the weight).",
    },
  },
  {
    id: 10,
    title: {
      id: "Pentingnya Pemanasan dan Pendinginan",
      en: "The Importance of Warm-Up and Cool-Down",
    },
    category: "Kesehatan",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    author: "Coach Budi",
    date: "21 Oct 2024",
    content: {
      id: "Pemanasan menyiapkan otot dan sistem saraf Anda, sementara pendinginan membantu mengembalikan detak jantung ke normal secara bertahap.",
      en: "A warm-up prepares your muscles and nervous system, while a cool-down helps gradually return your heart rate to normal.",
    },
  },
  {
    id: 11,
    title: {
      id: "Cara Meningkatkan Fleksibilitas",
      en: "How to Improve Flexibility",
    },
    category: "Kesehatan",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
    author: "FitGear Editorial",
    date: "22 Oct 2024",
    content: {
      id: "Regangkan tubuh Anda setiap hari. Gabungkan peregangan statis setelah latihan dan peregangan dinamis sebelum latihan.",
      en: "Stretch your body every day. Combine static stretching after workouts and dynamic stretching before workouts.",
    },
  },
  {
    id: 12,
    title: { id: "Protein Nabati vs Hewani", en: "Plant vs Animal Protein" },
    category: "Nutrisi",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=600&auto=format&fit=crop",
    author: "Jane Smith, Nutritionist",
    date: "23 Oct 2024",
    content: {
      id: "Protein hewani biasanya memiliki profil asam amino lengkap, namun protein nabati jika dikombinasikan (seperti nasi dan kacang-kacangan) juga bisa memberikan hasil yang sama.",
      en: "Animal protein usually has a complete amino acid profile, but plant proteins when combined (like rice and beans) can also provide the same results.",
    },
  },
  {
    id: 13,
    title: {
      id: "Pentingnya Minum Air Saat Latihan",
      en: "The Importance of Drinking Water During Workouts",
    },
    category: "Kesehatan",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=600&auto=format&fit=crop",
    author: "Dr. John Doe",
    date: "24 Oct 2024",
    content: {
      id: "Dehidrasi dapat menurunkan performa hingga 20%. Pastikan Anda minum cukup air sebelum, selama, dan setelah berolahraga.",
      en: "Dehydration can decrease performance by up to 20%. Ensure you drink enough water before, during, and after exercise.",
    },
  },
  {
    id: 14,
    title: {
      id: "Cara Tetap Konsisten Nge-Gym",
      en: "How to Stay Consistent at the Gym",
    },
    category: "Motivasi",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=600&auto=format&fit=crop",
    author: "Fitness Guru",
    date: "25 Oct 2024",
    content: {
      id: "Buatlah jadwal yang realistis. Mulailah dengan 2-3 kali seminggu. Kunci utama adalah disiplin dan jadikan latihan sebagai gaya hidup.",
      en: "Create a realistic schedule. Start with 2-3 times a week. The main key is discipline and making exercise a lifestyle.",
    },
  },
  {
    id: 15,
    title: {
      id: "Tips Mengatasi Rasa Nyeri Otot (DOMS)",
      en: "Tips to Overcome Muscle Soreness (DOMS)",
    },
    category: "Pemulihan",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
    author: "Coach Budi",
    date: "26 Oct 2024",
    content: {
      id: "Rasa nyeri setelah latihan beban baru (DOMS) sangat wajar. Atasi dengan istirahat, pijat ringan, mandi air hangat, dan makan makanan berprotein.",
      en: "Soreness after a new weight training routine (DOMS) is very normal. Overcome it with rest, light massage, a warm bath, and eating protein-rich foods.",
    },
  },
  {
    id: 16,
    title: {
      id: "Memilih Pakaian Olahraga yang Tepat",
      en: "Choosing the Right Workout Clothes",
    },
    category: "Gear",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    author: "FitGear Editorial",
    date: "27 Oct 2024",
    content: {
      id: "Gunakan bahan yang menyerap keringat dan cepat kering (dry-fit). Hindari bahan katun tebal karena akan menahan keringat dan membuat Anda merasa berat.",
      en: "Use sweat-wicking and quick-drying materials (dry-fit). Avoid thick cotton as it holds sweat and makes you feel heavy.",
    },
  },
  {
    id: 17,
    title: {
      id: "Latihan Tubuh Bagian Bawah Terbaik",
      en: "Best Lower Body Exercises",
    },
    category: "Tips Latihan",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=600&auto=format&fit=crop",
    author: "Dr. John Doe",
    date: "28 Oct 2024",
    content: {
      id: 'Jangan lupakan "leg day"! Squat, Lunges, dan Deadlift adalah latihan inti untuk membangun kekuatan otot kaki secara keseluruhan.',
      en: "Don't skip leg day! Squats, Lunges, and Deadlifts are core exercises for building overall leg muscle strength.",
    },
  },
  {
    id: 18,
    title: {
      id: "Kapan Harus Mengganti Rutinitas Latihan?",
      en: "When to Change Your Workout Routine?",
    },
    category: "Tips Latihan",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    author: "Coach Budi",
    date: "29 Oct 2024",
    content: {
      id: "Jika Anda berhenti melihat progres selama beberapa minggu, mungkin ini saatnya mengubah program latihan. Tubuh Anda sangat pintar dalam beradaptasi.",
      en: "If you stop seeing progress for a few weeks, it might be time to change your workout program. Your body is very smart at adapting.",
    },
  },
  {
    id: 19,
    title: {
      id: "Suplemen Creatine: Panduan Lengkap",
      en: "Creatine Supplement: Complete Guide",
    },
    category: "Nutrisi",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=600&auto=format&fit=crop",
    author: "Jane Smith, Nutritionist",
    date: "30 Oct 2024",
    content: {
      id: "Creatine adalah suplemen paling banyak diteliti yang terbukti meningkatkan kekuatan dan massa otot. Gunakan creatine monohydrate untuk hasil terbaik.",
      en: "Creatine is the most researched supplement proven to increase strength and muscle mass. Use creatine monohydrate for best results.",
    },
  },
  {
    id: 20,
    title: {
      id: "Menjaga Keseimbangan Hidup dan Olahraga",
      en: "Maintaining Work-Life-Fitness Balance",
    },
    category: "Motivasi",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=600&auto=format&fit=crop",
    author: "Fitness Guru",
    date: "31 Oct 2024",
    content: {
      id: "Olahraga harusnya meningkatkan kualitas hidup Anda, bukan mengambil alihnya. Temukan keseimbangan antara gym, pekerjaan, dan bersosialisasi.",
      en: "Exercise should enhance your quality of life, not take it over. Find a balance between the gym, work, and socializing.",
    },
  },
];
