import React, { useState } from "react";
import { UserRole, Theme } from "../types";
import { Settings2, X, BellRing } from "lucide-react";

interface RoleSimulatorProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  theme: Theme;
  onSimulatePushNotification: () => void;
  onZeroSessions?: () => void;
}

export const RoleSimulator: React.FC<RoleSimulatorProps> = ({
  currentRole,
  onChangeRole,
  theme,
  onSimulatePushNotification,
  onZeroSessions,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const roles: { role: UserRole; label: string }[] = [
    { role: "public", label: "Public (Guest)" },
    { role: "registered", label: "Registered Member" },
    { role: "client", label: "Active Client" },
    { role: "coach", label: "Coach" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[9999] xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:right-8 flex flex-col items-end xl:items-start gap-4">
      {isOpen ? (
        <div
          className={`p-5 rounded-2xl border shadow-2xl w-64 animate-in fade-in slide-in-from-bottom-4 xl:slide-in-from-right-4 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
            >
              Simulator Role
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded-full ${theme === "dark" ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {roles.map((r) => (
              <button
                key={r.role}
                onClick={() => onChangeRole(r.role)}
                className={`py-2 px-3 rounded-lg text-sm font-medium text-left transition-colors border ${
                  currentRole === r.role
                    ? theme === "dark"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50"
                      : "bg-emerald-50 text-emerald-700 border-emerald-300"
                    : theme === "dark"
                      ? "bg-slate-800/50 hover:bg-slate-800 text-slate-300 border-transparent"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-transparent"
                }`}
              >
                {r.label}
              </button>
            ))}

            <div
              className={`mt-4 pt-4 border-t ${theme === "dark" ? "border-slate-800" : "border-slate-100"}`}
            >
              <button
                onClick={onSimulatePushNotification}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
              >
                <BellRing className="w-4 h-4" />
                Simulasi Push Notif
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
          title="Role Simulator"
        >
          <Settings2 className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
