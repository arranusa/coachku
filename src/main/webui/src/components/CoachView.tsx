import React, { useState } from "react";
import {
  Calendar,
  Users,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award,
  FileText,
  Plus,
  Percent,
  Tag,
} from "lucide-react";
import {
  ClientRecord,
  ScheduleSession,
  TrainingPackage,
  Language,
  Theme,
} from "../types";
import { t } from "../utils/i18n";

interface CoachViewProps {
  todaySessions: ScheduleSession[];
  clientRecords: ClientRecord[];
  coachPackages: TrainingPackage[];

  onCreatePackage: (newPackage: Omit<TrainingPackage, "id">) => void;
  language: Language;
  theme: Theme;
}

export const CoachView: React.FC<CoachViewProps> = ({
  todaySessions,
  clientRecords,
  coachPackages,
  onCreatePackage,
  language,
  theme,
}) => {
  const isDark = theme === "dark";

  // State for Schedule timeframe filter (harian, mingguan, bulanan)
  const [scheduleFilter, setScheduleFilter] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  // Form state for creating a new package with renewal discount
  const [noteModalClient, setNoteModalClient] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Filter sessions based on daily, weekly, monthly filter
  const filteredSessions = todaySessions.filter(
    (s) => s.timeframe === scheduleFilter,
  );

  return (
    <div
      className={`space-y-5 pb-24 ${isDark ? "text-white" : "text-slate-900"}`}
    >
      {/* SCHEDULE FILTER & CALENDAR LIST */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2
            className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <Calendar className="w-4 h-4 text-amber-500" />{" "}
            {t(language, "clientSchedule")}
          </h2>

          {/* Timeframe Tabs: Harian, Mingguan, Bulanan */}
          <div
            className={`p-1 rounded-xl border flex items-center gap-1 text-xs ${
              isDark
                ? "bg-slate-950 border-slate-800"
                : "bg-slate-100 border-slate-200"
            }`}
          >
            <button
              onClick={() => setScheduleFilter("daily")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                scheduleFilter === "daily"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t(language, "filterDaily")}
            </button>
            <button
              onClick={() => setScheduleFilter("weekly")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                scheduleFilter === "weekly"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t(language, "filterWeekly")}
            </button>
            <button
              onClick={() => setScheduleFilter("monthly")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                scheduleFilter === "monthly"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t(language, "filterMonthly")}
            </button>
          </div>
        </div>

        {/* Filtered Schedule Items */}
        <div className="space-y-2.5 pt-1">
          {filteredSessions.length === 0 ? (
            <p
              className={`text-xs py-4 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Tidak ada jadwal latihan untuk kategori ini.
            </p>
          ) : (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`p-3.5 rounded-xl border space-y-2 ${
                  isDark
                    ? "bg-slate-950/60 border-slate-800"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={session.clientAvatar}
                      alt={session.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                    />
                    <div>
                      <h3
                        className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {session.clientName}
                      </h3>
                      <p
                        className={`text-[10px] flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        <Clock className="w-3 h-3 text-amber-500" />{" "}
                        {session.dayLabel} • {session.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      session.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : session.status === "pending_approval"
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {session.status === "pending_approval"
                      ? t(language, "presensiPending")
                      : session.status}
                  </span>
                </div>

                <p
                  className={`text-xs font-medium p-2 rounded-lg border ${
                    isDark
                      ? "bg-slate-900 border-slate-800 text-slate-300"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  Program: {session.program}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setNoteModalClient(session.clientName)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                      isDark
                        ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />{" "}
                    {t(language, "addWorkoutNotes")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CLIENT LIST & SESSION REMAINERS */}
      <div
        className={`p-4 rounded-2xl border shadow-lg space-y-3 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <Users className="w-4 h-4 text-emerald-500" />{" "}
            {t(language, "activeClientsList")}
          </h2>
          <span
            className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {clientRecords.length} Klien
          </span>
        </div>

        <div className="space-y-3">
          {clientRecords.map((client) => {
            const isExpiring = client.remainingSessions <= 1;

            return (
              <div
                key={client.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isExpiring
                    ? "bg-amber-500/10 border-amber-500/40"
                    : isDark
                      ? "bg-slate-950/60 border-slate-800"
                      : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                    />
                    <div>
                      <h3
                        className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {client.name}
                        {isExpiring && (
                          <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.2 rounded uppercase flex items-center gap-0.5">
                            <AlertTriangle className="w-2.5 h-2.5" />{" "}
                            {t(language, "expiringSoon")}
                          </span>
                        )}
                      </h3>
                      <p
                        className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {client.packageName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-sm font-black ${
                        isExpiring
                          ? "text-amber-500 animate-pulse"
                          : "text-emerald-500"
                      }`}
                    >
                      Sisa {client.remainingSessions} / {client.totalSessions}
                    </span>
                    <p
                      className={`text-[9px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      Sesi tersisa
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[11px] ${
                    isDark
                      ? "border-slate-800/80 text-slate-400"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <span>
                    {t(language, "lastAttendance")}: {client.lastAttendance}
                  </span>
                  <button
                    onClick={() => setNoteModalClient(client.name)}
                    className="text-emerald-500 hover:underline font-bold"
                  >
                    + Catatan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Modal */}
      {noteModalClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div
            className={`border rounded-2xl p-4 w-full max-w-sm space-y-3 ${
              isDark
                ? "bg-slate-900 border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <h3 className="text-sm font-bold">
              Catatan Latihan untuk {noteModalClient}
            </h3>
            <textarea
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Contoh: Berhasil Bench Press PR 80kg. Fokus perbaiki leg drive di sesi berikutnya..."
              className={`w-full rounded-xl p-2.5 text-xs border focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? "bg-slate-950 border-slate-700 text-white"
                  : "bg-slate-50 border-slate-300 text-slate-900"
              }`}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setNoteModalClient(null);
                  setNoteText("");
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl ${
                  isDark
                    ? "bg-slate-800 text-slate-300"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setNoteModalClient(null);
                  setNoteText("");
                }}
                className="flex-1 py-2 bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl"
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
