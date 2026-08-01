import React from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Activity,
  BarChart3,
} from "lucide-react";
import { Language, Theme } from "../types";
import { t } from "../utils/i18n";

interface CoachDashboardViewProps {
  language: Language;
  theme: Theme;
}

export const CoachDashboardView: React.FC<CoachDashboardViewProps> = ({
  language,
  theme,
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`space-y-5 pb-24 ${isDark ? "text-white" : "text-slate-900"}`}
    >
      {/* Welcome Banner */}
      <div
        className={`p-5 rounded-3xl shadow-lg border relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800"
            : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100 shadow-slate-200/50"
        }`}
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {language === "id" ? "Dashboard Coach" : "Coach Dashboard"}
          </span>
          <h1
            className={`text-2xl font-black mt-1 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {language === "id" ? "Halo, Coach Budi!" : "Hello, Coach Budi!"} 👋
          </h1>
          <p
            className={`text-xs mt-1.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {language === "id"
              ? "Berikut adalah ringkasan performa Anda hari ini."
              : "Here is the summary of your performance today."}
          </p>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className={`p-4 rounded-2xl border shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +2
            </span>
          </div>
          <h3
            className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}
          >
            24
          </h3>
          <p
            className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {language === "id" ? "Klien Aktif" : "Active Clients"}
          </p>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +15%
            </span>
          </div>
          <h3
            className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Rp 8.5M
          </h3>
          <p
            className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {language === "id" ? "Pendapatan Bulan Ini" : "This Month Income"}
          </p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div
        className={`p-4 rounded-2xl border shadow-sm grid grid-cols-2 gap-4 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span
              className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              4.9/5.0
            </span>
          </div>
          <p
            className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {language === "id" ? "Rating Rata-rata" : "Avg Rating"}
          </p>
        </div>
        <div
          className={`pl-4 border-l ${isDark ? "border-slate-800" : "border-slate-100"}`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span
              className={`text-xs font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              142
            </span>
          </div>
          <p
            className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {language === "id" ? "Total Sesi Selesai" : "Total Sessions"}
          </p>
        </div>
      </div>

      {/* Analytics Chart Mock */}
      <div
        className={`p-4 rounded-2xl border shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-500" />
            {language === "id"
              ? "Aktivitas Sesi (Minggu Ini)"
              : "Session Activity (This Week)"}
          </h3>
        </div>
        <div className="h-32 flex items-end justify-between gap-2 px-1">
          {[40, 70, 45, 90, 60, 30, 80].map((height, idx) => (
            <div key={idx} className="w-full flex flex-col items-center gap-2">
              <div
                className={`w-full rounded-t-sm transition-all duration-500 ${idx === 3 ? "bg-emerald-500" : isDark ? "bg-slate-800" : "bg-slate-200"}`}
                style={{ height: `${height}%` }}
              />
              <span
                className={`text-[8px] font-medium ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
