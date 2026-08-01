import React, { useEffect } from "react";
import { CheckCircle2, Zap } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px] bg-slate-900/95 border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-top duration-300">
      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <p className="text-xs text-white font-bold leading-tight">{message}</p>
    </div>
  );
};
