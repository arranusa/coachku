import React, { useState, useRef } from "react";
import {
  Search,
  MapPin,
  Star,
  Dumbbell,
  X,
  Info,
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone,
  Map,
} from "lucide-react";
import { Coach, TrainingPackage, Language, Theme, UserRole } from "../types";
import { t } from "../utils/i18n";

interface RegisteredUserViewProps {
  coaches: Coach[];
  onOpenCoachDetail: (coach: Coach) => void;
  onSelectPackage: (coach: Coach, pkg: TrainingPackage) => void;
  language: Language;
  theme: Theme;
  currentRole: UserRole;
}

export const RegisteredUserView: React.FC<RegisteredUserViewProps> = ({
  coaches,
  onOpenCoachDetail,
  onSelectPackage,
  language,
  theme,
  currentRole,
}) => {
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  type GymDetail = {
    name: string;
    distance: string;
    image: string;
    rating: number;
    desc: string;
    address: string;
    facilities: string[];
    hours: string;
  };
  const [selectedGym, setSelectedGym] = useState<GymDetail | null>(null);

  const gymScrollRef = useRef<HTMLDivElement>(null);
  const coachScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const gymsData: GymDetail[] = [
    {
      name: "FitHub Sudirman",
      distance: "1.2 km",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop",
      rating: 4.8,
      desc: "Fasilitas premium dengan peralatan import lengkap dan kelas studio harian. Sangat cocok bagi profesional muda yang mencari kenyamanan.",
      address: "Jl. Jend. Sudirman No.Kav 21, Jakarta Pusat",
      facilities: ["Locker Room", "Sauna", "Free WiFi", "Cafe"],
      hours: "06:00 - 22:00",
    },
    {
      name: "MegaGym Kuningan",
      distance: "2.5 km",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop",
      rating: 4.6,
      desc: "Gym luas 2 lantai dengan area crossfit khusus dan sauna. Ruang beban bebas yang sangat besar.",
      address: "Kuningan City Mall, Lt. 3, Jakarta Selatan",
      facilities: ["Crossfit Area", "Shower", "Parking", "Pool"],
      hours: "05:30 - 23:00",
    },
    {
      name: "CoreFitness Kemang",
      distance: "3.8 km",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop",
      rating: 4.9,
      desc: "Boutique gym eksklusif, cocok untuk privasi dan fokus latihan personal. Memberikan handuk gratis setiap sesi.",
      address: "Jl. Kemang Raya No. 15, Jakarta Selatan",
      facilities: ["Private Studio", "Towel Service", "Free WiFi", "Cafe"],
      hours: "07:00 - 21:00",
    },
    {
      name: "ActiveLife Bintaro",
      distance: "5.1 km",
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop",
      rating: 4.7,
      desc: "Suasana komunitas yang erat dengan perlengkapan powerlifting komplit. Banyak squat rack dan platform deadlift.",
      address: "Bintaro Jaya Sektor 7, Tangerang Selatan",
      facilities: ["Powerlifting Gear", "Locker Room", "Parking"],
      hours: "06:00 - 22:30",
    },
  ];

  const categories = [
    "All",
    "Hypertrophy",
    "Fat Loss",
    "Powerlifting",
    "Calisthenics",
  ];

  const filteredCoaches = coaches.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.gymLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ||
      c.specialty.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredGyms = gymsData.filter((gym) => {
    return (
      gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      className={`space-y-5 pb-24 ${isDark ? "text-white" : "text-slate-900"}`}
    >
      {/* Welcome Banner */}
      {currentRole !== "public" && (
        <div
          className={`p-4 rounded-2xl border shadow-lg ${
            isDark
              ? "bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border-slate-800"
              : "bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-200 shadow-slate-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {t(language, "registeredMember")}
              </span>
              <h1
                className={`text-xl font-black mt-0.5 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {t(language, "welcomeBack")} Alex! 👋
              </h1>
              <p
                className={`text-xs mt-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                {t(language, "welcomeMemberSub")}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Dumbbell className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "id"
                ? "Cari gym atau nama coach..."
                : "Search gym or coach name..."
            }
            className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs border focus:outline-none focus:border-emerald-500 transition-colors ${
              isDark
                ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : isDark
                    ? "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gym List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-700"}`}
          >
            {language === "id" ? "Gym Terdekat" : "Nearby Gyms"}
          </h2>
        </div>
        <div className="relative group/gym">
          <div
            ref={gymScrollRef}
            className="flex overflow-x-auto pb-4 -mx-4 px-4 gap-3 snap-x hide-scrollbar"
          >
            {filteredGyms.length === 0 ? (
              <div className="w-full text-center py-6">
                <p
                  className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {language === "id"
                    ? "Gym tidak ditemukan."
                    : "No gyms found."}
                </p>
              </div>
            ) : (
              filteredGyms.map((gym, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGym(gym)}
                  className={`snap-center shrink-0 w-48 rounded-2xl overflow-hidden border shadow-lg relative cursor-pointer group ${isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-emerald-300"}`}
                >
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-3">
                    <h3
                      className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {gym.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <p
                        className={`text-[11px] flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        <MapPin className="w-3 h-3 text-emerald-500" />{" "}
                        {gym.distance}
                      </p>
                      <p className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> {gym.rating}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => scroll(gymScrollRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-8 h-8 rounded-full bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover/gym:opacity-100 transition-opacity backdrop-blur-sm z-10 hidden sm:flex hover:bg-emerald-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(gymScrollRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-8 h-8 rounded-full bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover/gym:opacity-100 transition-opacity backdrop-blur-sm z-10 hidden sm:flex hover:bg-emerald-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Coach List */}
      <div className="space-y-3">
        <h2
          className={`text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-700"}`}
        >
          {t(language, "availableCoaches")} ({filteredCoaches.length})
        </h2>

        <div className="relative group/coach">
          <div
            ref={coachScrollRef}
            className="flex overflow-x-auto pb-4 -mx-4 px-4 gap-4 snap-x hide-scrollbar"
          >
            {filteredCoaches.map((coach) => (
              <div
                key={coach.id}
                className={`snap-center shrink-0 w-[85vw] max-w-[340px] p-4 rounded-2xl border space-y-3 shadow-lg flex flex-col ${
                  isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200 shadow-slate-100"
                }`}
              >
                {/* Coach Header */}
                <div className="flex items-start gap-3">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-300 dark:border-slate-700"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {coach.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{coach.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      {coach.title}
                    </p>
                    <p
                      className={`text-[11px] mt-1 flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      <MapPin className="w-3 h-3 text-emerald-500" />{" "}
                      {coach.gymLocation}
                    </p>
                  </div>
                </div>

                {/* View Packages Button */}
                <button
                  onClick={() => onOpenCoachDetail(coach)}
                  className={`w-full py-2 mt-auto text-xs font-semibold rounded-xl text-center transition-colors ${
                    isDark
                      ? "bg-slate-800/60 hover:bg-slate-800 text-slate-300"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {language === "id" ? "Lihat Paket" : "View Packages"}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(coachScrollRef, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-8 h-8 rounded-full bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover/coach:opacity-100 transition-opacity backdrop-blur-sm z-10 hidden sm:flex hover:bg-emerald-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(coachScrollRef, "right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-8 h-8 rounded-full bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover/coach:opacity-100 transition-opacity backdrop-blur-sm z-10 hidden sm:flex hover:bg-emerald-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Gym Detail Modal */}
      {selectedGym && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300 ${isDark ? "bg-slate-900 border border-slate-800" : "bg-white border border-slate-200"}`}
          >
            <button
              onClick={() => setSelectedGym(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-colors border border-slate-700/50"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-48 w-full relative shrink-0">
              <img
                src={selectedGym.image}
                alt={selectedGym.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-black text-white">
                  {selectedGym.name}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-slate-200 text-xs">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />{" "}
                    {selectedGym.distance}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />{" "}
                    {selectedGym.rating}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Info & Address */}
              <div
                className={`flex flex-col gap-3 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{selectedGym.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{selectedGym.hours}</span>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Fasilitas Gym
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGym.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-700 border-slate-200"}`}
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Tentang Gym
                </h4>
                <p
                  className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  {selectedGym.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  className={`py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 border transition-all ${isDark ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" : "bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200"}`}
                >
                  <Map className="w-4 h-4" /> Buka Peta
                </button>
                <button className="py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95">
                  <Phone className="w-4 h-4" /> Hubungi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
