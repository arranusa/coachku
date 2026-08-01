import React, { useState } from "react";
import {
  CheckCircle2,
  Dumbbell,
  MapPin,
  MessageSquare,
  Phone,
  Flame,
  Utensils,
  Calendar,
  Check,
  Zap,
  RefreshCw,
  UserPlus,
  Tag,
} from "lucide-react";
import {
  Coach,
  TrainingPackage,
  Exercise,
  Meal,
  Language,
  Theme,
} from "../types";
import { Scanner } from "@yudiel/react-qr-scanner";
import { X, Star } from "lucide-react";
import { t } from "../utils/i18n";

interface ClientViewProps {
  activeCoach: Coach;
  activePackage: TrainingPackage;
  remainingSessions: number;
  exercises: Exercise[];
  meals: Meal[];
  onPresensiCheckIn: (qrData?: string) => void;
  onToggleExerciseSet: (exerciseId: string, setIndex: number) => void;
  onToggleMeal: (mealId: string) => void;
  hasPresensiedToday: boolean;
  onRenewPackage: () => void;
  onChangeCoach: () => void;
  language: Language;
  theme: Theme;
}

export const ClientView: React.FC<ClientViewProps> = ({
  activeCoach,
  activePackage,
  remainingSessions,
  exercises,
  meals,
  onPresensiCheckIn,
  onToggleExerciseSet,
  onToggleMeal,
  hasPresensiedToday,
  onRenewPackage,
  onChangeCoach,
  language,
  theme,
}) => {
  const isDark = theme === "dark";
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState("");
  const totalSessions = activePackage.sessions;
  const sessionsUsed = totalSessions - remainingSessions;
  const progressPercent = Math.round((sessionsUsed / totalSessions) * 100);

  const discountPercent = activePackage.renewalDiscountPercent || 15;

  // Meal totals calculation
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const consumedCalories = meals
    .filter((m) => m.completed)
    .reduce((sum, m) => sum + m.calories, 0);
  const consumedProtein = meals
    .filter((m) => m.completed)
    .reduce((sum, m) => sum + m.protein, 0);

  return (
    <div
      className={`space-y-5 pb-24 ${isDark ? "text-white" : "text-slate-900"}`}
    >
      {/* Active Coach & Package Card */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-emerald-500/40"
            : "bg-white border-emerald-200 shadow-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            {t(language, "activePackageTitle")}
          </span>
          <span
            className={`text-[10px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {t(language, "validUntil")} 30 Aug 2026
          </span>
        </div>

        {/* Coach Details */}
        <div className="flex items-center gap-3">
          <img
            src={activeCoach.avatar}
            alt={activeCoach.name}
            className="w-14 h-14 rounded-xl object-cover shrink-0 border-2 border-emerald-500 shadow-md"
          />
          <div className="flex-1 min-w-0">
            <h2
              className={`text-base font-black truncate ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {activeCoach.name}
            </h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              {activeCoach.title}
            </p>
            <p
              className={`text-[11px] mt-0.5 flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              <MapPin className="w-3 h-3 text-emerald-500" />{" "}
              {activeCoach.gymLocation}
            </p>
          </div>
        </div>

        {/* Session Progress Bar */}
        <div
          className={`p-3 rounded-xl border space-y-1.5 ${
            isDark
              ? "bg-slate-950 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex justify-between items-center text-xs">
            <span
              className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              Paket: {activePackage.name}
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              Sisa {remainingSessions} dari {totalSessions} Sesi
            </span>
          </div>

          <div
            className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
          >
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${Math.max(10, 100 - progressPercent)}%` }}
            />
          </div>

          <div
            className={`flex justify-between text-[10px] pt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            <span>
              {t(language, "completed")}: {sessionsUsed} sesi
            </span>
            <span>
              {progressPercent}% {t(language, "used")}
            </span>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              isDark
                ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />{" "}
            {t(language, "chatCoach")}
          </button>
          <button
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              isDark
                ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-teal-500" />{" "}
            {t(language, "callCoach")}
          </button>
        </div>
      </div>

      {remainingSessions <= 0 && (
        <div
          className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
            isDark
              ? "bg-amber-950/20 border-amber-500/30"
              : "bg-amber-50 border-amber-200 shadow-slate-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3
              className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-amber-400" : "text-amber-700"}`}
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> Beri
              Nilai Coach
            </h3>
          </div>
          <p
            className={`text-xs ${isDark ? "text-amber-200/70" : "text-amber-800/70"}`}
          >
            Sesi Anda telah habis. Berikan rating dan testimonial pengalaman
            berlatih Anda dengan {activeCoach.name} untuk membantu member lain.
          </p>
          <button
            onClick={() => setShowRatingModal(true)}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
          >
            <Star className="w-4 h-4 fill-slate-950" /> Beri Ulasan
          </button>
        </div>
      )}

      {/* RENEWAL & CHANGE COACH OPTIONS SECTION */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3
            className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <RefreshCw className="w-4 h-4 text-emerald-500" />{" "}
            {t(language, "renewOrChangeCoach")}
          </h3>
          <span className="text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-500/20">
            <Tag className="w-3 h-3" /> Diskon {discountPercent}%
          </span>
        </div>

        <p
          className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Sesi hampir habis? Lakukan perpanjangan dengan diskon khusus atau
          ganti coach melalui transaksi baru.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            onClick={onRenewPackage}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t(language, "renewPackageBtn")}</span>
          </button>

          <button
            onClick={onChangeCoach}
            className={`py-3 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 border transition-all ${
              isDark
                ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border-slate-700"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300"
            }`}
          >
            <UserPlus className="w-4 h-4 text-teal-500" />
            <span>{t(language, "changeCoachBtn")}</span>
          </button>
        </div>
      </div>

      {/* PRESENSI / CHECK-IN SECTION */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Calendar className="w-4 h-4 text-emerald-500" />{" "}
              {t(language, "todayPresensi")}
            </h3>
            <p
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t(language, "presensiSub")}
            </p>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-1 rounded font-bold ${
              isDark
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            16:00 - 17:00
          </span>
        </div>

        <button
          onClick={() => setShowQRScanner(true)}
          disabled={hasPresensiedToday || remainingSessions <= 0}
          className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
            hasPresensiedToday
              ? "bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40 cursor-not-allowed"
              : remainingSessions <= 0
                ? "bg-slate-200 text-slate-500 dark:bg-slate-800 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/25 hover:brightness-110 active:scale-[0.98]"
          }`}
        >
          {hasPresensiedToday ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>
                {t(language, "presensiDone")} ({remainingSessions}{" "}
                {t(language, "sessionsLeft")})
              </span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>{t(language, "checkinNow")}</span>
            </>
          )}
        </button>
      </div>

      {/* WORKOUT MONITORING CARD */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Dumbbell className="w-4 h-4 text-emerald-500" />{" "}
              {t(language, "todayWorkout")}
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              Upper Body Hypertrophy - Hari ke-3
            </p>
          </div>
          <span
            className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {t(language, "assignedByCoach")}
          </span>
        </div>

        {/* Exercise Checklist */}
        <div className="space-y-3 pt-1">
          {exercises.map((ex) => {
            const completedCount = ex.completedSets.filter(Boolean).length;
            const isAllDone = completedCount === ex.sets;

            return (
              <div
                key={ex.id}
                className={`p-3 rounded-xl border transition-all ${
                  isAllDone
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : isDark
                      ? "bg-slate-950/60 border-slate-800"
                      : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4
                      className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {ex.name}
                    </h4>
                    <p
                      className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {t(language, "target")}: {ex.sets} sets × {ex.reps} @{" "}
                      <strong className="text-emerald-500">
                        {ex.targetWeight}
                      </strong>
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isAllDone
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : isDark
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {completedCount}/{ex.sets} Sets
                  </span>
                </div>

                {/* Set Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {ex.completedSets.map((isDone, setIdx) => (
                    <button
                      key={setIdx}
                      onClick={() => onToggleExerciseSet(ex.id, setIdx)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                        isDone
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                          : isDark
                            ? "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>Set {setIdx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MEAL PLAN TRACKER SECTION */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-sm font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              <Utensils className="w-4 h-4 text-emerald-500" />{" "}
              {t(language, "mealTracker")}
            </h3>
            <p
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t(language, "macroTarget")}
            </p>
          </div>
          <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400" /> {consumedCalories}{" "}
            / {totalCalories} kcal
          </span>
        </div>

        {/* Macro Summary Progress Bars */}
        <div
          className={`p-3 rounded-xl border space-y-2 text-xs ${
            isDark
              ? "bg-slate-950 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className={isDark ? "text-slate-300" : "text-slate-700"}>
                {t(language, "proteinTarget")}
              </span>
              <span className="font-bold text-emerald-500">
                {consumedProtein}g / {totalProtein}g
              </span>
            </div>
            <div
              className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
            >
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${Math.min(100, (consumedProtein / totalProtein) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Meal Checklist */}
        <div className="space-y-2">
          {meals.map((m) => (
            <div
              key={m.id}
              onClick={() => onToggleMeal(m.id)}
              className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                m.completed
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : isDark
                    ? "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    m.completed
                      ? "bg-emerald-500 border-emerald-500 text-slate-950"
                      : isDark
                        ? "border-slate-700 bg-slate-800"
                        : "border-slate-300 bg-white"
                  }`}
                >
                  {m.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold ${
                      m.completed
                        ? "line-through text-slate-400"
                        : isDark
                          ? "text-white"
                          : "text-slate-900"
                    }`}
                  >
                    {m.name}
                  </h4>
                  <span
                    className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-500">
                  {m.calories} kcal
                </span>
                <p className="text-[10px] text-emerald-500 font-semibold">
                  {m.protein}g protein
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showQRScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} animate-in zoom-in-95`}
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <h3
                className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}
              >
                Scan QR Coach
              </h3>
              <button
                onClick={() => setShowQRScanner(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-black/50 w-full aspect-square relative">
              <Scanner
                onScan={(result) => {
                  if (result && result.length > 0) {
                    setShowQRScanner(false);
                    // Pass the first scanned result's raw value
                    onPresensiCheckIn(result[0].rawValue);
                  }
                }}
              />
            </div>
            <div
              className={`p-4 text-center text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Arahkan kamera ke QR code pada aplikasi coach Anda.
            </div>
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div
            className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} animate-in zoom-in-95`}
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <h3
                className={`font-bold text-sm flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Beri
                Ulasan Coach
              </h3>
              <button
                onClick={() => setShowRatingModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                <img
                  src={activeCoach.avatar}
                  alt={activeCoach.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p
                    className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    {activeCoach.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {activeCoach.title}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <p
                  className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  Berapa nilai untuk coach ini?
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)}>
                      <Star
                        className={`w-8 h-8 transition-colors ${star <= rating ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-700"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                >
                  Tulis ulasan Anda
                </label>
                <textarea
                  rows={4}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda berlatih dengan coach ini..."
                  className={`w-full p-3 rounded-xl text-sm border focus:ring-2 focus:ring-emerald-500 outline-none transition-all ${isDark ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"}`}
                />
              </div>

              <button
                onClick={() => {
                  alert("Terima kasih! Ulasan Anda telah disimpan.");
                  setShowRatingModal(false);
                  setTestimonial("");
                }}
                disabled={testimonial.length < 5}
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all ${
                  testimonial.length >= 5
                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                }`}
              >
                Kirim Ulasan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
