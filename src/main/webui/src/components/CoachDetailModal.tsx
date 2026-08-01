import React, { useState } from "react";
import {
  X,
  Star,
  MapPin,
  Award,
  CheckCircle2,
  Dumbbell,
  ChevronRight,
  MessageSquareQuote,
  ChevronLeft,
} from "lucide-react";
import { Coach, TrainingPackage, Language, Theme } from "../types";
import { t } from "../utils/i18n";

interface CoachDetailModalProps {
  coach: Coach | null;
  onClose: () => void;
  onSelectPackage: (coach: Coach, pkg: TrainingPackage) => void;
  language?: Language;
  theme?: Theme;
}

export const CoachDetailModal: React.FC<CoachDetailModalProps> = ({
  coach,
  onClose,
  onSelectPackage,
  language = "id",
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [testimonialPage, setTestimonialPage] = useState(1);
  if (!coach) return null;

  const testimonialsPerPage = 5;
  const testimonials = coach.testimonials || [];
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    (testimonialPage - 1) * testimonialsPerPage,
    testimonialPage * testimonialsPerPage,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/85 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border ${
          isDark
            ? "bg-slate-900 border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Header with image */}
        <div className="relative h-44 bg-slate-800">
          <img
            src={coach.avatar}
            alt={coach.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-950 transition-colors border border-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              {coach.specialty}
            </span>
            <h2 className="text-xl font-black text-white mt-1">{coach.name}</h2>
            <p className="text-xs text-slate-300 font-medium">{coach.title}</p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Rating & Distance */}
          <div
            className={`flex items-center justify-between p-3 rounded-xl border text-xs ${
              isDark
                ? "bg-slate-800/60 border-slate-700/50"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{coach.rating}</span>
              <span
                className={`font-normal ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                ({coach.reviewsCount} ulasan)
              </span>
            </div>
            <div
              className={`flex items-center gap-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>{coach.distance}</span>
            </div>
          </div>

          {/* Gym location */}
          <div
            className={`text-xs flex items-center gap-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            <span
              className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              Lokasi Gym:
            </span>
            <span className="text-emerald-500 font-bold">
              {coach.gymLocation}
            </span>
          </div>

          {/* Bio */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              Tentang Coach
            </h3>
            <p
              className={`text-xs leading-relaxed p-3 rounded-xl border ${
                isDark
                  ? "bg-slate-950/40 border-slate-800 text-slate-300"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              {coach.bio}
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              Sertifikasi
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {coach.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border flex items-center gap-1 font-medium ${
                    isDark
                      ? "bg-slate-800 text-slate-300 border-slate-700"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Award className="w-3 h-3 text-emerald-500" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <div className="pt-2 pb-4 border-b border-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <h3
                  className={`text-sm font-black flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  <MessageSquareQuote className="w-4 h-4 text-emerald-500" />{" "}
                  Ulasan Klien
                </h3>
                <span className="text-[10px] text-emerald-500 font-bold">
                  {testimonials.length} Ulasan
                </span>
              </div>

              <div className="space-y-3">
                {currentTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border ${isDark ? "bg-slate-800/40 border-slate-700" : "bg-slate-50 border-slate-200"}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}
                      >
                        {t.clientName}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span
                          className={`text-[10px] font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {t.rating}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-xs italic ${isDark ? "text-slate-400" : "text-slate-600"}`}
                    >
                      "{t.comment}"
                    </p>
                    <p className="text-[9px] text-slate-500 mt-2 text-right">
                      {t.date}
                    </p>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      setTestimonialPage((p) => Math.max(1, p - 1))
                    }
                    disabled={testimonialPage === 1}
                    className={`p-1.5 rounded-lg border ${testimonialPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-800"} ${isDark ? "border-slate-700 text-slate-300" : "border-slate-300 text-slate-700"}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span
                    className={`text-[10px] font-bold ${isDark ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Hal {testimonialPage} dari {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setTestimonialPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={testimonialPage === totalPages}
                    className={`p-1.5 rounded-lg border ${testimonialPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-800"} ${isDark ? "border-slate-700 text-slate-300" : "border-slate-300 text-slate-700"}`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Packages Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h3
                className={`text-sm font-black flex items-center gap-1.5 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                <Dumbbell className="w-4 h-4 text-emerald-500" /> Paket Latihan
              </h3>
              <span className="text-[10px] text-emerald-500 font-bold">
                Pilih paket untuk beli
              </span>
            </div>

            <div className="space-y-3">
              {coach.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-4 rounded-xl border transition-all ${
                    pkg.popular
                      ? isDark
                        ? "bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500/50"
                        : "bg-emerald-50/60 border-emerald-300"
                      : isDark
                        ? "bg-slate-800/40 border-slate-700/60"
                        : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {pkg.popular && (
                        <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                          ★ Paling Populer
                        </span>
                      )}
                      <h4
                        className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {pkg.name}
                      </h4>
                      <p
                        className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {pkg.sessions} Sesi Coaching Privat
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-500">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </span>
                      <p
                        className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        Rp{" "}
                        {Math.round(pkg.price / pkg.sessions).toLocaleString(
                          "id-ID",
                        )}
                        /sesi
                      </p>
                    </div>
                  </div>

                  <p
                    className={`text-xs my-2.5 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {pkg.description}
                  </p>

                  <div className="space-y-1 my-3">
                    {pkg.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className={`text-[11px] flex items-center gap-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectPackage(coach, pkg)}
                    className="w-full mt-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
                  >
                    <span>{t(language as Language, "buyPackage")}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
