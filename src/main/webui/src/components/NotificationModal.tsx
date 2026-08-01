import React from "react";
import {
  X,
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Download,
} from "lucide-react";
import { NotificationItem } from "../types";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Notifications & Alerts
              </h3>
              <p className="text-xs text-slate-400">
                Session reminders & package warnings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Recent Alerts ({notifications.length})
            </span>
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-emerald-400 hover:underline font-medium"
            >
              Mark all as read
            </button>
          </div>

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.type === "session"
                  ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-100"
                  : n.type === "package"
                    ? "bg-amber-950/30 border-amber-500/30 text-amber-100"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-200"
              } ${n.unread ? "ring-1 ring-emerald-500/30" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg text-white mt-0.5 ${
                    n.type === "session"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : n.type === "package"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {n.type === "session" ? (
                    <Clock className="w-4 h-4" />
                  ) : n.type === "package" ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {n.message}
                  </p>
                  {n.action && (
                    <button
                      onClick={() => {
                        if (n.action?.onClick) {
                          // Do action, normally this would trigger PWA prompt
                          alert(n.action.label);
                        }
                      }}
                      className="mt-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 w-max"
                    >
                      <Download className="w-3 h-3" />
                      {n.action.label}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <p className="text-[10px] text-slate-400 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> Push
            notifications enabled
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
