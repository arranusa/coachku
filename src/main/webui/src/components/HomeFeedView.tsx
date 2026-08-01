import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Flame,
  Clock,
  X,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";
import { Language, Theme, UserRole } from "../types";
import { t } from "../utils/i18n";
import { ARTICLES_DATA, ArticleData } from "../data/articles";

interface HomeFeedViewProps {
  currentRole: UserRole;
  onSwitchToRegistered: () => void;
  language: Language;
  theme: Theme;
}

export const HomeFeedView: React.FC<HomeFeedViewProps> = ({
  currentRole,
  onSwitchToRegistered,
  language,
  theme,
}) => {
  const isDark = theme === "dark";

  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(
    null,
  );
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    // Randomize articles on mount
    const shuffled = [...ARTICLES_DATA].sort(() => 0.5 - Math.random());
    setArticles(shuffled);
  }, []);

  return (
    <div
      className={`space-y-6 pb-24 ${isDark ? "text-white" : "text-slate-900"}`}
    >
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden rounded-2xl p-5 shadow-lg border transition-all ${
          isDark
            ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800"
            : "bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border-emerald-100"
        }`}
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> {t(language, "heroBadge")}
          </span>
        </div>

        <h1
          className={`text-2xl font-black leading-tight tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
        >
          {t(language, "heroTitle")}{" "}
          <span className="text-emerald-500 dark:text-emerald-400 font-black">
            {t(language, "heroTitleHighlight")}
          </span>
        </h1>

        <p
          className={`text-xs mt-2.5 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          {t(language, "heroDesc")}
        </p>

        {/* CTA Register Button (Only for Public Guest) */}
        {currentRole === "public" && (
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={onSwitchToRegistered}
              className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
            >
              <span>{t(language, "ctaRegisterLogin")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Highlights */}
        <div
          className={`grid grid-cols-3 gap-2 mt-5 pt-4 border-t text-center ${
            isDark ? "border-slate-800" : "border-emerald-100/80"
          }`}
        >
          <div>
            <span className="text-base font-black text-emerald-500">50+</span>
            <p
              className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t(language, "verifiedCoaches")}
            </p>
          </div>
          <div>
            <span className="text-base font-black text-amber-500">4.9 ★</span>
            <p
              className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t(language, "avgRating")}
            </p>
          </div>
          <div>
            <span className="text-base font-black text-teal-600 dark:text-teal-400">
              100%
            </span>
            <p
              className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t(language, "moneyBack")}
            </p>
          </div>
        </div>
      </div>

      {/* Fitness News & Articles Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className={`text-base font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            <Flame className="w-4 h-4 text-emerald-500" />{" "}
            {language === "id"
              ? "Berita & Artikel Terkini"
              : "Latest News & Articles"}
          </h2>
        </div>

        <div className="space-y-3">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className={`rounded-2xl overflow-hidden border shadow-sm cursor-pointer group ${
                isDark
                  ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                  : "bg-white border-slate-200 hover:border-emerald-300 shadow-slate-100"
              }`}
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title[language === "id" ? "id" : "en"]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3
                  className={`font-bold text-sm leading-snug mb-2 group-hover:text-emerald-500 transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {article.title[language === "id" ? "id" : "en"]}
                </h3>
                <div
                  className={`flex items-center gap-4 text-[10px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime} read
                  </span>
                  <span className="flex items-center gap-1 text-emerald-500">
                    <BookOpen className="w-3 h-3" /> Read Article
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md h-[90vh] sm:h-auto max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} animate-in slide-in-from-bottom-8 duration-300`}
          >
            <div className="relative h-56 shrink-0 bg-slate-800">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title[language === "id" ? "id" : "en"]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 text-white rounded-full hover:bg-slate-900/80 backdrop-blur-md transition-colors border border-slate-700/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-lg uppercase tracking-wider mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl font-black text-white leading-tight">
                  {selectedArticle.title[language === "id" ? "id" : "en"]}
                </h3>
              </div>
            </div>

            <div
              className={`p-5 overflow-y-auto ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              <div className="flex items-center gap-4 text-[11px] font-medium mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-500" />{" "}
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-emerald-500" />{" "}
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />{" "}
                  {selectedArticle.readTime}
                </span>
              </div>
              <div className="prose prose-sm prose-emerald dark:prose-invert max-w-none">
                <p className="leading-relaxed text-sm">
                  {selectedArticle.content[language === "id" ? "id" : "en"]}
                </p>
              </div>
            </div>
            <div
              className={`p-4 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                {language === "id" ? "Tutup Artikel" : "Close Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
