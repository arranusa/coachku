import React, { useState } from "react";
import { UserRole, Language, Theme, TransactionItem } from "../types";
import { t } from "../utils/i18n";
import {
  User,
  Shield,
  CreditCard,
  LogOut,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  Lock,
  Mail,
  CheckCircle2,
  Award,
  Settings,
  HelpCircle,
  History,
  Phone,
  QrCode,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ProfileViewProps {
  currentRole: UserRole;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onLoginAs: (role: UserRole) => void;
  onLogout: () => void;
  transactions: TransactionItem[];
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentRole,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onLoginAs,
  onLogout,
  transactions,
}) => {
  const isDark = theme === "dark";
  const isGuest = currentRole === "public";

  // State for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState<UserRole>("client");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentQRData, setCurrentQRData] = useState<string>("");

  const generateNewQR = () => {
    const token = `presensi_${Date.now()}`;
    setCurrentQRData(token);
    setShowQRModal(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login or registration
    onLoginAs("registered");
  };

  if (isGuest) {
    return (
      <div
        className={`p-4 max-w-lg mx-auto ${isDark ? "text-slate-100" : "text-slate-900"}`}
      >
        {/* Header Hero */}
        <div
          className={`p-6 rounded-2xl mb-6 text-center border ${
            isDark
              ? "bg-slate-900/90 border-slate-800 shadow-xl"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-1">
            {t(language, "loginRegisterTitle")}
          </h2>
          <p
            className={`text-xs max-w-xs mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            {t(language, "loginRegisterSub")}
          </p>
        </div>

        {/* Auth Form */}
        <form
          onSubmit={handleAuthSubmit}
          className={`p-6 rounded-2xl border ${
            isDark
              ? "bg-slate-900/90 border-slate-800"
              : "bg-white border-slate-200 shadow-sm"
          } space-y-4`}
        >
          {isRegistering && (
            <div>
              <label
                className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                />
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-emerald-500 ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>
          )}

          {isRegistering && (
            <div>
              <label
                className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                Nomor Handphone (WhatsApp)
              </label>
              <div className="relative">
                <Phone
                  className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                />
                <input
                  type="tel"
                  placeholder="081234567890"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-emerald-500 ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>
          )}

          <div>
            <label
              className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(language, "emailLabel")}
            </label>
            <div className="relative">
              <Mail
                className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com / 08123456789"
                required
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-emerald-500 ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(language, "passwordLabel")}
            </label>
            <div className="relative">
              <Lock
                className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-emerald-500 ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                    : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label
                className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <Lock
                  className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:border-emerald-500 ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500"
                      : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400 active:scale-95 transition-all mt-2"
          >
            {isRegistering
              ? t(language, "registerBtn")
              : t(language, "loginBtn")}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-emerald-500 hover:underline font-medium"
            >
              {isRegistering
                ? "Sudah punya akun? Masuk di sini"
                : "Belum punya akun? Daftar gratis"}
            </button>
          </div>
        </form>

        {/* Guest Controls */}
        <div
          className={`mt-6 p-4 rounded-xl border ${
            isDark
              ? "bg-slate-900/50 border-slate-800"
              : "bg-slate-100/80 border-slate-200"
          } space-y-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold">
                {t(language, "languageSetting")}
              </span>
            </div>
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20"
            >
              {language.toUpperCase()} (Switch)
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
              <span className="text-xs font-semibold">
                {t(language, "themeSetting")}
              </span>
            </div>
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${isDark ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-800"}`}
            >
              {isDark ? t(language, "darkMode") : t(language, "lightMode")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Logged-in Profile View
  const profileDetails = {
    name: currentRole === "coach" ? "Coach Budi Santoso" : "Alex Mercer",
    email:
      currentRole === "coach"
        ? "budi.santoso@coachku.id"
        : "alex.mercer@gmail.com",
    avatar:
      currentRole === "coach"
        ? "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    roleLabel:
      currentRole === "coach"
        ? "Coach Master Terverifikasi"
        : currentRole === "client"
          ? "Client Aktif (Gold Member)"
          : "Pengguna Terdaftar",
  };

  return (
    <div
      className={`p-4 max-w-lg mx-auto ${isDark ? "text-slate-100" : "text-slate-900"} space-y-4`}
    >
      {/* Profile Header Card */}
      <div
        className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        }`}
      >
        <img
          src={profileDetails.avatar}
          alt={profileDetails.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-extrabold text-base truncate">
              {profileDetails.name}
            </h3>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          </div>
          <p
            className={`text-xs truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {profileDetails.email}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
            {profileDetails.roleLabel}
          </span>
        </div>

        {currentRole === "coach" && (
          <button
            onClick={generateNewQR}
            className="p-1.5 rounded-2xl bg-white border-2 border-amber-500 shadow-md shadow-amber-500/20 active:scale-95 transition-transform shrink-0 relative flex flex-col items-center justify-center overflow-hidden"
          >
            <QRCodeSVG value="dummy_mini_qr" size={40} />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <QrCode className="w-5 h-5 text-white" />
            </div>
          </button>
        )}
      </div>

      {/* Account Settings List */}
      <div
        className={`p-4 rounded-2xl border ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200 shadow-sm"
        } divide-y ${isDark ? "divide-slate-800" : "divide-slate-100"}`}
      >
        <h4
          className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {t(language, "accountSettings")}
        </h4>

        {/* Language Switch */}
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">
                {t(language, "languageSetting")}
              </p>
              <p
                className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                {language === "id"
                  ? "Bahasa Indonesia (Default)"
                  : "English (US)"}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleLanguage}
            className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 transition-all"
          >
            {language.toUpperCase()}
          </button>
        </div>

        {/* Theme Switch */}
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold">{t(language, "themeSetting")}</p>
              <p
                className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                {isDark ? t(language, "darkMode") : t(language, "lightMode")}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${isDark ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-800"}`}
          >
            {isDark ? "Switch Light" : "Switch Dark"}
          </button>
        </div>

        {/* Become a Coach Button (for non-coach members) */}
        {currentRole !== "coach" && (
          <a
            href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20untuk%20mendaftar%20sebagai%20Coach%2FPersonal%20Trainer%20di%20COACHKU."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg transition-all mb-2 block"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">
                  Daftar sebagai Mitra / Coach
                </p>
                <p
                  className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Gabung menjadi partner personal trainer kami
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-4 h-4 ${isDark ? "text-slate-600" : "text-slate-400"}`}
            />
          </a>
        )}

        {/* Transaction History Button */}
        <button
          onClick={() => setShowTransactions(!showTransactions)}
          className="w-full py-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">
                {t(language, "myTransactions")}
              </p>
              <p
                className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                {transactions.length} transaksi selesai
              </p>
            </div>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform ${showTransactions ? "rotate-90" : ""}`}
          />
        </button>

        {/* Help & Terms */}
        <div className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
              <HelpCircle className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold">{t(language, "helpCenter")}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Transactions Collapsible Accordion */}
      {showTransactions && (
        <div
          className={`p-4 rounded-2xl border ${
            isDark
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200 shadow-sm"
          } space-y-3`}
        >
          <h4 className="text-xs font-extrabold flex items-center gap-1.5 text-emerald-500">
            <History className="w-4 h-4" />
            {t(language, "myTransactions")}
          </h4>

          {transactions.length === 0 ? (
            <p
              className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Belum ada riwayat transaksi.
            </p>
          ) : (
            <div className="space-y-2">
              {transactions.map((trx) => (
                <div
                  key={trx.id}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    isDark
                      ? "bg-slate-800/60 border-slate-700/60"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{trx.packageName}</span>
                      {trx.isRenewal && (
                        <span className="bg-emerald-500/20 text-emerald-500 text-[9px] px-1.5 py-0.2 rounded font-bold">
                          Diskon Perpanjangan
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {trx.coachName} • {trx.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-500">
                      Rp {trx.amount.toLocaleString("id-ID")}
                    </span>
                    <span className="block text-[9px] text-emerald-600 font-semibold uppercase">
                      Lunas ({trx.status})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-xs flex items-center justify-center gap-2 border border-red-500/20 active:scale-95 transition-all mt-4"
      >
        <LogOut className="w-4 h-4" />
        <span>{t(language, "logoutBtn")}</span>
      </button>

      {/* QR Code Modal for Coach */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div
            className={`w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} animate-in zoom-in-95`}
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-800/50">
              <h3
                className={`font-bold text-sm flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                <QrCode className="w-4 h-4 text-amber-500" /> Scan untuk
                Presensi
              </h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center justify-center">
              <div className="bg-white p-3 rounded-2xl shadow-inner mb-4">
                <QRCodeSVG value={currentQRData} size={200} />
              </div>

              <p
                className={`text-xs text-center font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                Tunjukkan QR code ini kepada client Anda.
              </p>
              <p className="text-[10px] text-amber-500 font-bold mt-2 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                ⚠️ QR code kedaluwarsa dalam 1 jam
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
