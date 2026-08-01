import React from "react";
import { Home, Search, Calendar, User, LogIn, Package } from "lucide-react";
import { BottomNavTab, Language, Theme } from "../types";
import { t } from "../utils/i18n";

interface BottomNavProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
  activeRole: string;
  language: Language;
  theme: Theme;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  activeRole,
  language,
  theme,
}) => {
  const isDark = theme === "dark";
  const tabs = [
    {
      id: "home" as BottomNavTab,
      label: t(language, "navHome"),
      icon: <Home className="w-5 h-5" />,
    },
    ...(activeRole !== "coach"
      ? [
          {
            id: "search" as BottomNavTab,
            label: t(language, "navSearch"),
            icon: <Search className="w-5 h-5" />,
          },
        ]
      : [
          {
            id: "packages" as BottomNavTab,
            label: t(language, "navPackages"),
            icon: <Package className="w-5 h-5" />,
          },
        ]),
    ...(activeRole === "client" || activeRole === "coach"
      ? [
          {
            id: "schedule" as BottomNavTab,
            label: t(language, "navSchedule"),
            icon: <Calendar className="w-5 h-5" />,
          },
        ]
      : []),
    {
      id: "profile" as BottomNavTab,
      label:
        activeRole === "public"
          ? t(language, "loginBtn")
          : t(language, "navProfile"),
      icon:
        activeRole === "public" ? (
          <LogIn className="w-5 h-5" />
        ) : (
          <User className="w-5 h-5" />
        ),
    },
  ];

  const gridColsClass = tabs.length === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md border-t max-w-[480px] mx-auto transition-colors ${
        isDark
          ? "bg-slate-900/95 border-slate-800"
          : "bg-white/95 border-slate-200"
      }`}
    >
      <div className={`grid ${gridColsClass} py-2 px-1`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? "text-emerald-500 font-bold"
                  : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {isActive && (
                <span className="absolute -top-2 w-6 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
              )}
              {tab.icon}
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
