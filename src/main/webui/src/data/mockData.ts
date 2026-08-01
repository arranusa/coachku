import {
  Coach,
  ClientRecord,
  ScheduleSession,
  Meal,
  Exercise,
  NotificationItem,
  TransactionItem,
} from "../types";

export const INITIAL_COACHES: Coach[] = [
  {
    id: "coach-1",
    name: "Coach Budi Santoso",
    title: "Senior Master Trainer",
    specialty: "Hypertrophy & Bodybuilding",
    rating: 4.9,
    reviewsCount: 128,
    distance: "1.2 km",
    gymLocation: "Gold Gym City Center, Jakarta",
    bio: "NASM Master Trainer berpengalaman 8+ tahun membantu klien membentuk otot, menurunkan lemak tubuh, serta memperbaiki postur tubuh dengan aman dan efektif.",
    avatar:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&auto=format&fit=crop&q=80",
    certifications: [
      "NASM CPT",
      "CSCS Strength Specialist",
      "Precision Nutrition L1",
    ],
    testimonials: [
      {
        id: "testim-0",
        clientId: "c-0",
        clientName: "Andi Saputra",
        rating: 5,
        comment:
          "Latihannya sangat intens dan hasil terlihat dalam 1 bulan! Sangat direkomendasikan.",
        date: "2026-08-01",
      },
      {
        id: "testim-1",
        clientId: "c-1",
        clientName: "Rina Marlina",
        rating: 5,
        comment:
          "Coach sangat sabar dan teliti memperhatikan form. Bebas dari cedera.",
        date: "2026-07-30",
      },
      {
        id: "testim-2",
        clientId: "c-2",
        clientName: "Dimas Anggara",
        rating: 5,
        comment:
          "Materi latihan selalu fresh, gak pernah bosen latihan bareng coach.",
        date: "2026-07-28",
      },
      {
        id: "testim-3",
        clientId: "c-3",
        clientName: "Maya Fitriani",
        rating: 5,
        comment: "Sangat profesional dan selalu on-time. Best coach in town!",
        date: "2026-07-26",
      },
      {
        id: "testim-4",
        clientId: "c-4",
        clientName: "Bagus Santoso",
        rating: 5,
        comment: "Diet plan yang diberikan sangat realistis dan mudah diikuti.",
        date: "2026-07-24",
      },
      {
        id: "testim-5",
        clientId: "c-5",
        clientName: "Citra Kirana",
        rating: 5,
        comment:
          "Mantap! Massa otot naik 2kg dalam waktu 2 bulan. Thank you coach!",
        date: "2026-07-22",
      },
      {
        id: "testim-6",
        clientId: "c-6",
        clientName: "Reza Rahadian",
        rating: 5,
        comment:
          "Dari yang gak bisa squat sama sekali, sekarang bisa angkat beban berat dengan form sempurna.",
        date: "2026-07-20",
      },
      {
        id: "testim-7",
        clientId: "c-7",
        clientName: "Dinda Hauw",
        rating: 5,
        comment:
          "Selalu memberikan motivasi saat saya merasa mau menyerah. The best!",
        date: "2026-07-18",
      },
      {
        id: "testim-8",
        clientId: "c-8",
        clientName: "Yudi Mulyadi",
        rating: 5,
        comment: "Programnya sangat terstruktur, progress selalu di-tracking.",
        date: "2026-07-16",
      },
      {
        id: "testim-9",
        clientId: "c-9",
        clientName: "Nadia Vega",
        rating: 5,
        comment: "Sangat ramah dan knowledgeable. Banyak belajar soal nutrisi.",
        date: "2026-07-14",
      },
      {
        id: "testim-10",
        clientId: "c-10",
        clientName: "Ricky Harun",
        rating: 5,
        comment: "Bikin ketagihan gym gara-gara programnya seru banget.",
        date: "2026-07-12",
      },
      {
        id: "testim-11",
        clientId: "c-11",
        clientName: "Sisca Kohl",
        rating: 5,
        comment:
          "Sesi latihannya benar-benar padat dan worth it. Sukses terus coach!",
        date: "2026-07-10",
      },
    ],
    packages: [
      {
        id: "pkg-budi-1",
        name: "Starter Kickstart",
        sessions: 4,
        price: 950000,
        renewalDiscountPercent: 10,
        renewalPrice: 855000,
        description:
          "Sangat cocok untuk pemula yang ingin memahami form gerakan dasar & rutin latihan.",
        features: [
          "4x Sesi Coaching Privat 60 Menit",
          "Rutin Latihan Personal",
          "Evaluasi Video Gerakan",
        ],
      },
      {
        id: "pkg-budi-2",
        name: "Hypertrophy Transformation",
        sessions: 8,
        price: 1800000,
        renewalDiscountPercent: 15,
        renewalPrice: 1530000,
        popular: true,
        description:
          "Paket terfavorit untuk pembentukan otot konsisten & transformasi bentuk tubuh.",
        features: [
          "8x Sesi Coaching Privat 60 Menit",
          "Panduan Nutrisi Khusus",
          "Analisis Komposisi Tubuh Mingguan",
          "Akses Langsung WhatsApp Coach",
        ],
      },
      {
        id: "pkg-budi-3",
        name: "Pro Athlete Mastery",
        sessions: 12,
        price: 2500000,
        renewalDiscountPercent: 20,
        renewalPrice: 2000000,
        description:
          "Program kebugaran komprehensif tingkat lanjut dengan pemantauan nutrisi harian 1-on-1.",
        features: [
          "12x Sesi Coaching Privat 60 Menit",
          "Panduan Makro & Suplemen Lengkap",
          "Prioritas Jadwal Booking",
          "Tanya Jawab Coach 24/7",
        ],
      },
    ],
  },
  {
    id: "coach-2",
    name: "Coach Maya Wijaya",
    title: "Spesialis Fungsional & HIIT",
    specialty: "Weight Loss & Calisthenics",
    rating: 4.85,
    reviewsCount: 94,
    distance: "2.5 km",
    gymLocation: "Fitness First Senayan, Jakarta",
    bio: "Mantan atlet lari nasional yang berfokus pada pembakaran lemak tinggi, peningkatan mobilitas sendi, dan kalistenik.",
    avatar:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop&q=80",
    certifications: [
      "ACE Certified Trainer",
      "TRX Suspension Master",
      "FMS Mobility L2",
    ],
    packages: [
      {
        id: "pkg-maya-1",
        name: "Burn & Tone 4 Sesi",
        sessions: 4,
        price: 880000,
        renewalDiscountPercent: 10,
        renewalPrice: 792000,
        description:
          "Latihan intensitas tinggi untuk mempercepat pembakaran kalori.",
        features: [
          "4x Sesi HIIT 60 Menit",
          "Dashboard Kalori Terbakar",
          "Panduan Pemanasan Mobilitas",
        ],
      },
      {
        id: "pkg-maya-2",
        name: "Body Shred 30 Hari",
        sessions: 8,
        price: 1650000,
        renewalDiscountPercent: 15,
        renewalPrice: 1402500,
        popular: true,
        description:
          "Protokol penurunan lemak fokus dipadu penguasaan kekuatan beban tubuh.",
        features: [
          "8x Sesi Coaching Privat",
          "Rencana Defisit Kalori Custom",
          "Evaluasi Foto Perkembangan",
        ],
      },
    ],
  },
  {
    id: "coach-3",
    name: "Coach Ryan Pratama",
    title: "Powerlifting & Performa Atletik",
    specialty: "Powerlifting & Strength",
    rating: 4.95,
    reviewsCount: 156,
    distance: "3.1 km",
    gymLocation: "Iron Cave PowerGym, Jakarta Selatan",
    bio: "Atlet powerlifting kompetitif berpengalaman 10+ tahun melatih atlet menembus batas squat, bench, dan deadlift.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    certifications: [
      "USAPL Senior Coach",
      "NSCA CSCS",
      "Barbell Rehab Specialist",
    ],
    packages: [
      {
        id: "pkg-ryan-1",
        name: "Barbell Tech Check",
        sessions: 4,
        price: 1050000,
        renewalDiscountPercent: 12,
        renewalPrice: 924000,
        description:
          "Kuasai teknik dasar gerakan angkat beban utama secara biomekanis.",
        features: [
          "4x Sesi Teknik Barbell",
          "Tes 1Rep Max Safe Loading",
          "Pemeriksaan Beban Sendi",
        ],
      },
      {
        id: "pkg-ryan-2",
        name: "Powerlifting Meet Prep",
        sessions: 12,
        price: 2800000,
        renewalDiscountPercent: 18,
        renewalPrice: 2296000,
        popular: true,
        description:
          "Program puncak kekuatan untuk persiapan kompetisi atau rekor pribadi.",
        features: [
          "12x Sesi Beban Berat 75 Menit",
          "Program RPE Mingguan",
          "Persiapan Pemilihan Beban",
        ],
      },
    ],
  },
];

export const INITIAL_CLIENT_EXERCISES: Exercise[] = [
  {
    id: "ex-1",
    name: "Barbell Bench Press",
    sets: 4,
    reps: "8-10 reps",
    targetWeight: "75 kg",
    completedSets: [true, true, true, false],
  },
  {
    id: "ex-2",
    name: "Incline Dumbbell Press",
    sets: 3,
    reps: "10-12 reps",
    targetWeight: "24 kg",
    completedSets: [true, true, false],
  },
  {
    id: "ex-3",
    name: "Cable Chest Flyes",
    sets: 3,
    reps: "12-15 reps",
    targetWeight: "15 kg",
    completedSets: [true, false, false],
  },
  {
    id: "ex-4",
    name: "Tricep Rope Pushdowns",
    sets: 4,
    reps: "12 reps",
    targetWeight: "22.5 kg",
    completedSets: [false, false, false, false],
  },
];

export const INITIAL_CLIENT_MEALS: Meal[] = [
  {
    id: "meal-1",
    time: "07:30 WIB",
    name: "Oatmeal + Protein Powder + Pisang",
    calories: 450,
    protein: 35,
    completed: true,
  },
  {
    id: "meal-2",
    time: "12:30 WIB",
    name: "Dada Ayam Panggang + Nasi Merah + Brokoli",
    calories: 650,
    protein: 52,
    completed: true,
  },
  {
    id: "meal-3",
    time: "16:30 WIB",
    name: "Whey Protein Shake Pre-Workout",
    calories: 280,
    protein: 28,
    completed: true,
  },
  {
    id: "meal-4",
    time: "20:00 WIB",
    name: "Ikan Salmon Panggang + Ubi Manis",
    calories: 580,
    protein: 42,
    completed: false,
  },
];

export const INITIAL_TODAY_SESSIONS: ScheduleSession[] = [
  {
    id: "ts-1",
    clientName: "Alex Mercer",
    clientAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    time: "10:00 - 11:00 WIB",
    dateStr: "2026-07-31",
    dayLabel: "Hari Ini (Jumat)",
    timeframe: "daily",
    program: "Upper Body Hypertrophy (Dada & Trisep)",
    location: "Gold Gym City Center - Area A",
    status: "completed",
  },
  {
    id: "ts-2",
    clientName: "Sarah Kim",
    clientAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    time: "14:00 - 15:00 WIB",
    dateStr: "2026-07-31",
    dayLabel: "Hari Ini (Jumat)",
    timeframe: "daily",
    program: "Sirkuit Fat Loss & Conditioning Core",
    location: "Fitness First Senayan - Turf Zone",
    status: "completed",
  },
  {
    id: "ts-3",
    clientName: "David R.",
    clientAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    time: "17:00 - 18:00 WIB",
    dateStr: "2026-07-31",
    dayLabel: "Hari Ini (Jumat)",
    timeframe: "daily",
    program: "Deadlift & Posterior Chain Heavy",
    location: "Iron Cave PowerGym",
    status: "upcoming",
  },

  // Additional weekly & monthly sessions
  {
    id: "ts-4",
    clientName: "Alex Mercer",
    clientAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    time: "10:00 - 11:00 WIB",
    dateStr: "2026-08-03",
    dayLabel: "Senin Depan",
    timeframe: "weekly",
    program: "Lower Body Focus (Squat & Hamstring)",
    location: "Gold Gym City Center - Area B",
    status: "upcoming",
  },
  {
    id: "ts-5",
    clientName: "Sarah Kim",
    clientAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    time: "14:00 - 15:00 WIB",
    dateStr: "2026-08-05",
    dayLabel: "Rabu Depan",
    timeframe: "weekly",
    program: "Full Body Endurance & Mobility",
    location: "Fitness First Senayan",
    status: "upcoming",
  },
  {
    id: "ts-6",
    clientName: "David R.",
    clientAvatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    time: "16:00 - 17:00 WIB",
    dateStr: "2026-08-15",
    dayLabel: "Pertengahan Bulan (Sabtu)",
    timeframe: "monthly",
    program: "Bench Press PR Testing & Technique",
    location: "Iron Cave PowerGym",
    status: "upcoming",
  },
  {
    id: "ts-7",
    clientName: "Rina Kartika",
    clientAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    time: "09:00 - 10:00 WIB",
    dateStr: "2026-08-22",
    dayLabel: "Akhir Bulan (Sabtu)",
    timeframe: "monthly",
    program: "Posture Correction & Glutes Hypertrophy",
    location: "Gold Gym City Center",
    status: "upcoming",
  },
];

export const INITIAL_COACH_CLIENTS: ClientRecord[] = [
  {
    id: "cli-1",
    name: "Alex Mercer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    packageName: "Hypertrophy Transformation",
    totalSessions: 8,
    remainingSessions: 1, // low session count to test renewal
    nextSessionTime: "Hari Ini 16:00 WIB",
    status: "expiring",
    lastAttendance: "Hari Ini 10:00 WIB",
  },
  {
    id: "cli-2",
    name: "Sarah Kim",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    packageName: "Starter Kickstart",
    totalSessions: 4,
    remainingSessions: 1,
    nextSessionTime: "Besok 14:00 WIB",
    status: "expiring",
    lastAttendance: "Kemarin 14:00 WIB",
  },
  {
    id: "cli-3",
    name: "David R.",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    packageName: "Pro Athlete Mastery",
    totalSessions: 12,
    remainingSessions: 9,
    nextSessionTime: "Jumat, 2 Aug 17:00 WIB",
    status: "active",
    lastAttendance: "29 Jul 17:00 WIB",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Pengingat Sesi Mendatang",
    message:
      "Pengingat Latihan: Anda memiliki jadwal latihan dengan Coach Budi dalam 2 jam (Hari ini pukul 16:00 WIB di Gold Gym City Center).",
    time: "10 mnt lalu",
    type: "session",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Peringatan Paket Hampir Habis",
    message:
      "Paket Berakhir: Paket latihan Anda tersisa 1 sesi lagi. Dapatkan Diskon Perpanjangan 15% untuk paket berikutnya!",
    time: "1 jam lalu",
    type: "package",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Presensi Terverifikasi",
    message:
      "Presensi Sukses: Klien Alex Mercer berhasil melakukan check-in untuk sesi pukul 10:00 WIB.",
    time: "3 jam lalu",
    type: "system",
    unread: false,
  },
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: "TRX-98211",
    date: "25 Jul 2026",
    coachName: "Coach Budi Santoso",
    packageName: "Hypertrophy Transformation (8 Sesi)",
    amount: 1800000,
    status: "success",
    isRenewal: false,
  },
  {
    id: "TRX-87120",
    date: "10 Jun 2026",
    coachName: "Coach Maya Wijaya",
    packageName: "Burn & Tone (4 Sesi)",
    amount: 880000,
    status: "success",
    isRenewal: false,
  },
];
