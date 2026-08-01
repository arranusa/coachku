import React, { useState } from "react";
import {
  X,
  QrCode,
  Building2,
  Smartphone,
  Check,
  Copy,
  ShieldCheck,
  Loader2,
  Zap,
  Tag,
} from "lucide-react";
import {
  Coach,
  TrainingPackage,
  PaymentMethod,
  Language,
  Theme,
} from "../types";
import { t } from "../utils/i18n";

interface PaymentModalProps {
  isOpen: boolean;
  coach: Coach | null;
  pkg: TrainingPackage | null;
  isRenewal?: boolean;
  onClose: () => void;
  onPaymentSuccess: (coach: Coach, pkg: TrainingPackage) => void;
  language?: Language;
  theme?: Theme;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  coach,
  pkg,
  isRenewal = false,
  onClose,
  onPaymentSuccess,
  language = "id",
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qris");
  const [selectedBank, setSelectedBank] = useState<"bca" | "mandiri" | "bni">(
    "bca",
  );
  const [selectedEwallet, setSelectedEwallet] = useState<
    "gopay" | "ovo" | "shopeepay"
  >("gopay");
  const [phone, setPhone] = useState("0812-3456-7890");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !coach || !pkg) return null;

  // Calculate final price based on renewal discount
  const discountPercent = pkg.renewalDiscountPercent || 15;
  const finalPrice = isRenewal
    ? pkg.renewalPrice || Math.round(pkg.price * (1 - discountPercent / 100))
    : pkg.price;

  const handleCopyAccount = (accNumber: string) => {
    navigator.clipboard?.writeText(accNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(coach, pkg);
    }, 1500);
  };

  const bankAccounts = {
    bca: {
      name: "Bank BCA",
      number: "8801 2940 1928",
      holder: "PT COACHKU INDONESIA",
    },
    mandiri: {
      name: "Bank Mandiri",
      number: "1220 0019 2831 00",
      holder: "PT COACHKU INDONESIA",
    },
    bni: {
      name: "Bank BNI",
      number: "0981 2341 55",
      holder: "PT COACHKU INDONESIA",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/85 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header */}
        <div
          className={`px-5 py-3.5 border-b flex items-center justify-between ${
            isDark
              ? "bg-slate-900/90 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
              <Zap className="w-4 h-4 fill-emerald-500" />
            </div>
            <div>
              <h3
                className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {isRenewal
                  ? "Perpanjangan Paket Latihan"
                  : "Checkout Paket Latihan"}
              </h3>
              <p
                className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Pembayaran Aman & Instan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "bg-slate-800 text-slate-400 hover:text-white"
                : "bg-slate-200 text-slate-600 hover:text-slate-900"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Summary Box */}
          <div
            className={`p-3.5 rounded-xl border space-y-2 ${
              isDark
                ? "bg-slate-800/60 border-slate-700/60"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-2 ${
                isDark ? "border-slate-700/50" : "border-slate-200"
              }`}
            >
              <div>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                  Coach
                </span>
                <p
                  className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {coach.name}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`text-[10px] uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Paket
                </span>
                <p
                  className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {pkg.name}
                </p>
              </div>
            </div>

            {isRenewal && (
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                <Tag className="w-3.5 h-3.5" />
                <span>Perpanjangan Sesi — Hemat {discountPercent}%!</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <span
                className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {pkg.sessions} Sesi Coaching
              </span>
              <div className="text-right">
                {isRenewal && (
                  <span className="text-xs text-slate-400 line-through mr-2">
                    Rp {pkg.price.toLocaleString("id-ID")}
                  </span>
                )}
                <span className="text-base font-black text-emerald-500">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label
              className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              Pilih Metode Pembayaran
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* QRIS */}
              <button
                onClick={() => setSelectedMethod("qris")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMethod === "qris"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold shadow-sm"
                    : isDark
                      ? "bg-slate-800/40 border-slate-700 text-slate-400"
                      : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-[11px]">QRIS</span>
              </button>

              {/* Bank Transfer */}
              <button
                onClick={() => setSelectedMethod("bank")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMethod === "bank"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold shadow-sm"
                    : isDark
                      ? "bg-slate-800/40 border-slate-700 text-slate-400"
                      : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="text-[11px]">Transfer Bank</span>
              </button>

              {/* E-Wallet */}
              <button
                onClick={() => setSelectedMethod("ewallet")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  selectedMethod === "ewallet"
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-bold shadow-sm"
                    : isDark
                      ? "bg-slate-800/40 border-slate-700 text-slate-400"
                      : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-[11px]">E-Wallet</span>
              </button>
            </div>
          </div>

          {/* Dynamic Payment Method View */}
          <div
            className={`p-4 rounded-xl border space-y-3 ${
              isDark
                ? "bg-slate-950/60 border-slate-800"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            {/* 1. QRIS */}
            {selectedMethod === "qris" && (
              <div className="text-center space-y-3">
                <p
                  className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}
                >
                  Pindai QR code menggunakan BCA, GoPay, OVO, ShopeePay, atau
                  mobile banking pilihan Anda:
                </p>

                <div className="inline-block p-3 bg-white rounded-2xl shadow-xl border-2 border-emerald-400/50">
                  <div className="w-40 h-40 bg-slate-900 rounded-xl flex flex-col items-center justify-center p-2 text-center text-white relative">
                    <QrCode className="w-24 h-24 text-emerald-400" />
                    <span className="text-[9px] text-slate-300 font-mono mt-1">
                      COACHKU-QRIS-PAY
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-amber-500 font-bold">
                  ⏱ Berlaku selama 15:00 menit
                </p>
              </div>
            )}

            {/* 2. Bank Transfer */}
            {selectedMethod === "bank" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {(["bca", "mandiri", "bni"] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBank(b)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition-all ${
                        selectedBank === b
                          ? "bg-emerald-500 text-slate-950 shadow-md"
                          : isDark
                            ? "bg-slate-800 text-slate-400"
                            : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <div
                  className={`p-3 rounded-xl border space-y-2 ${
                    isDark
                      ? "bg-slate-900 border-slate-800"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div
                    className={`flex justify-between items-center text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    <span>
                      {bankAccounts[selectedBank].name} Virtual Account:
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between p-2.5 rounded-lg border ${
                      isDark
                        ? "bg-slate-950 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="font-mono text-sm font-black text-emerald-500 tracking-wider">
                      {bankAccounts[selectedBank].number}
                    </span>
                    <button
                      onClick={() =>
                        handleCopyAccount(bankAccounts[selectedBank].number)
                      }
                      className={`text-xs px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                        isDark
                          ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                          : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                      }`}
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copied ? "Tersalin" : "Salin"}</span>
                    </button>
                  </div>

                  <p
                    className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Nama Rekening:{" "}
                    <strong
                      className={isDark ? "text-white" : "text-slate-900"}
                    >
                      {bankAccounts[selectedBank].holder}
                    </strong>
                  </p>
                </div>
              </div>
            )}

            {/* 3. E-Wallet */}
            {selectedMethod === "ewallet" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {(["gopay", "ovo", "shopeepay"] as const).map((ew) => (
                    <button
                      key={ew}
                      onClick={() => setSelectedEwallet(ew)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold capitalize transition-all ${
                        selectedEwallet === ew
                          ? "bg-emerald-500 text-slate-950 shadow-md"
                          : isDark
                            ? "bg-slate-800 text-slate-400"
                            : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      {ew}
                    </button>
                  ))}
                </div>

                <div>
                  <label
                    className={`text-[11px] block mb-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Nomor HP {selectedEwallet.toUpperCase()}:
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 text-xs font-mono border focus:outline-none focus:border-emerald-500 ${
                      isDark
                        ? "bg-slate-900 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-900"
                    }`}
                    placeholder="0812-xxxx-xxxx"
                  />
                  <p
                    className={`text-[10px] mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Notifikasi konfirmasi pembayaran akan dikirim langsung ke
                    aplikasi e-wallet Anda.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`flex items-center gap-2 text-[10px] justify-center ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Enkripsi SSL
            256-Bit & Aktivasi Sesi Otomatis
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className={`p-4 border-t ${isDark ? "border-slate-800 bg-slate-900/90" : "border-slate-200 bg-slate-50"}`}
        >
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memproses Pembayaran...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>
                  Bayar Sekarang - Rp {finalPrice.toLocaleString("id-ID")}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
