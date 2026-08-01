import React from "react";
import { Bell, Dumbbell, Sun, Moon, Globe } from "lucide-react";
import { UserRole, Language, Theme } from "../types";
import { t } from "../utils/i18n";

interface HeaderProps {
  currentRole: UserRole;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  unreadNotificationsCount,
  onOpenNotifications,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === "dark";

  const roleBadges: Record<
    UserRole,
    {
      labelKey: "guestMode" | "registeredMode" | "clientMode" | "coachMode";
      darkColor: string;
      lightColor: string;
    }
  > = {
    public: {
      labelKey: "guestMode",
      darkColor: "bg-slate-800 text-slate-300 border-slate-700",
      lightColor: "bg-slate-200 text-slate-700 border-slate-300",
    },
    registered: {
      labelKey: "registeredMode",
      darkColor: "bg-blue-950 text-blue-300 border-blue-800",
      lightColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
    client: {
      labelKey: "clientMode",
      darkColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      lightColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    coach: {
      labelKey: "coachMode",
      darkColor: "bg-amber-950 text-amber-300 border-amber-800",
      lightColor: "bg-amber-100 text-amber-800 border-amber-300",
    },
  };

  const badgeConfig = roleBadges[currentRole];

  return (
    <header
      className={`${isDark ? "bg-slate-900 border-slate-800/80 shadow-md" : "bg-white border-slate-200 shadow-sm"} border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200`}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 font-black">
          <Dumbbell className="w-5 h-5 text-slate-950 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black text-lg tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
            >
              COACH<span className="text-emerald-500">KU</span>
            </span>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              PWA
            </span>
          </div>
          <p
            className={`text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {t(language, "appTagline")}
          </p>
        </div>
      </div>

      {/* Controls & Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Language Toggle */}
        <button
          onClick={onToggleLanguage}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
            isDark
              ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
              : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300"
          }`}
          title="Ganti Bahasa (ID / EN)"
          aria-label="Toggle language"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-500" />
          <span className="uppercase">{language}</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className={`p-1.5 sm:p-2 rounded-lg transition-all ${
            isDark
              ? "bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-700"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
          }`}
          title={
            isDark
              ? "Ganti ke Mode Terang (Light Mode)"
              : "Ganti ke Mode Gelap (Dark Mode)"
          }
          aria-label="Toggle theme mode"
        >
          {isDark ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4 text-slate-800" />
          )}
        </button>

        {/* Role Badge */}
        <span
          className={`text-[9px] font-bold px-2 py-1 rounded-full border ${
            isDark ? badgeConfig.darkColor : badgeConfig.lightColor
          } tracking-wider hidden xs:inline-block`}
        >
          {t(language, badgeConfig.labelKey)}
        </span>

        {/* Notification Bell - Hidden in PUBLIC (Guest) mode */}
        {currentRole !== "public" && (
          <button
            onClick={onOpenNotifications}
            className={`relative p-2 rounded-xl transition-all active:scale-95 ${
              isDark
                ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/50"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border border-white dark:border-slate-900">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};
