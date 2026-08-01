/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  UserRole,
  BottomNavTab,
  Coach,
  TrainingPackage,
  Exercise,
  Meal,
  TodaySession,
  ClientRecord,
  NotificationItem,
  Language,
  Theme,
} from "./types";
import {
  INITIAL_COACHES,
  INITIAL_CLIENT_EXERCISES,
  INITIAL_CLIENT_MEALS,
  INITIAL_TODAY_SESSIONS,
  INITIAL_COACH_CLIENTS,
  INITIAL_NOTIFICATIONS,
} from "./data/mockData";

import { Header } from "./components/Header";
import { NotificationModal } from "./components/NotificationModal";
import { BottomNav } from "./components/BottomNav";
import { HomeFeedView } from "./components/HomeFeedView";
import { RegisteredUserView } from "./components/RegisteredUserView";
import { ClientView } from "./components/ClientView";
import { CoachView } from "./components/CoachView";
import { CoachDashboardView } from "./components/CoachDashboardView";
import { ProfileView } from "./components/ProfileView";
import { CoachDetailModal } from "./components/CoachDetailModal";
import { PaymentModal } from "./components/PaymentModal";
import { Toast } from "./components/Toast";
import { RoleSimulator } from "./components/RoleSimulator";
import { PackageManagementView } from "./components/PackageManagementView";
import { Calendar, Download } from "lucide-react";
import { t } from "./utils/i18n";

export default function App() {
  // Global App States
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("currentRole");
    return (saved as UserRole) || "registered";
  });

  useEffect(() => {
    localStorage.setItem("currentRole", currentRole);
  }, [currentRole]);

  const [activeTab, setActiveTab] = useState<BottomNavTab>("home");
  const [language, setLanguage] = useState<Language>("id");
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    // Default to day/night based on time
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Data State
  const [coaches, setCoaches] = useState<Coach[]>(INITIAL_COACHES);
  const [clientExercises, setClientExercises] = useState<Exercise[]>(
      INITIAL_CLIENT_EXERCISES,
  );
  const [clientMeals, setClientMeals] = useState<Meal[]>(INITIAL_CLIENT_MEALS);
  const [todaySessions, setTodaySessions] = useState<TodaySession[]>(
      INITIAL_TODAY_SESSIONS,
  );
  const [clientRecords, setClientRecords] = useState<ClientRecord[]>(
      INITIAL_COACH_CLIENTS,
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(
      INITIAL_NOTIFICATIONS,
  );

  // Client Active Package state
  const [activeCoach, setActiveCoach] = useState<Coach>(INITIAL_COACHES[0]);
  const [activePackage, setActivePackage] = useState<TrainingPackage>(
      INITIAL_COACHES[0].packages[1],
  );
  const [remainingSessions, setRemainingSessions] = useState<number>(6);
  const [hasPresensiedToday, setHasPresensiedToday] = useState<boolean>(false);

  // Modals & UI state
  const [selectedCoachModal, setSelectedCoachModal] = useState<Coach | null>(
      null,
  );
  const [paymentCoach, setPaymentCoach] = useState<Coach | null>(null);
  const [paymentPkg, setPaymentPkg] = useState<TrainingPackage | null>(null);
  const [isRenewalPayment, setIsRenewalPayment] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isDark = theme === "dark";

  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in navigator && (navigator as any).standalone);

    if (isMobile && !isStandalone) {
      // Show immediately if it's mobile and not standalone (iOS fallback)
      setShowPWAPrompt(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPWAPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Unread notification count
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  // Handlers
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const handleOpenCoachDetail = (coach: Coach) => {
    setSelectedCoachModal(coach);
  };

  const handleSelectPackageToBuy = (coach: Coach, pkg: TrainingPackage) => {
    if (currentRole === "public") {
      setToastMessage(
          language === "id"
              ? "Silakan masuk atau daftar untuk membeli paket."
              : "Please login or register to buy a package.",
      );
      setActiveTab("profile");
      setSelectedCoachModal(null);
      return;
    }
    setSelectedCoachModal(null);
    setPaymentCoach(coach);
    setPaymentPkg(pkg);
    setIsRenewalPayment(false);
  };

  const handleRenewPackage = () => {
    setPaymentCoach(activeCoach);
    setPaymentPkg(activePackage);
    setIsRenewalPayment(true);
  };

  const handleChangeCoach = () => {
    setActiveTab("trainers");
    setToastMessage(
        t(language, "selectNewCoachPrompt") ||
        "Pilih coach baru untuk melakukan transaksi paket baru.",
    );
  };

  const handlePaymentSuccess = (coach: Coach, pkg: TrainingPackage) => {
    setPaymentCoach(null);
    setPaymentPkg(null);
    setActiveCoach(coach);
    setActivePackage(pkg);
    setRemainingSessions((prev) =>
        isRenewalPayment ? prev + pkg.sessions : pkg.sessions,
    );
    setHasPresensiedToday(false);
    setCurrentRole("client");
    setActiveTab("home");

    setToastMessage(
        isRenewalPayment
            ? `Perpanjangan Berhasil! Tambah ${pkg.sessions} sesi dengan ${coach.name}.`
            : `Pembayaran Berhasil! Anda sekarang terhubung dengan ${coach.name} (${pkg.sessions} Sesi Aktif).`,
    );
  };

  const handlePresensiCheckIn = (qrData?: string) => {
    if (remainingSessions <= 0 || hasPresensiedToday) return;

    if (qrData) {
      if (!qrData.startsWith("presensi_")) {
        setToastMessage("❌ QR Code tidak valid!");
        return;
      }

      const parts = qrData.split("_");
      if (parts.length === 2) {
        const timestamp = parseInt(parts[1], 10);
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (now - timestamp > oneHour) {
          setToastMessage(
              "❌ QR Code sudah kedaluwarsa (lebih dari 1 jam). Minta coach generate ulang.",
          );
          return;
        }
      }
    }

    setRemainingSessions((prev) => Math.max(0, prev - 1));
    setHasPresensiedToday(true);

    // Add presensi notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Presensi Berhasil Recorded",
        message: `Presensi Sukses! Absensi tercatat untuk sesi latihan hari ini dengan ${activeCoach.name}. Sisa sesi: ${remainingSessions - 1}.`,
        time: "Baru saja",
        type: "session",
        unread: true,
      },
      ...prev,
    ]);

    setToastMessage(
        `✅ Presensi Terverifikasi! Kehadiran dicatat untuk sesi latihan hari ini dengan ${activeCoach.name}.`,
    );
  };

  const handleToggleExerciseSet = (exerciseId: string, setIndex: number) => {
    setClientExercises((prev) =>
        prev.map((ex) => {
          if (ex.id === exerciseId) {
            const updatedSets = [...ex.completedSets];
            updatedSets[setIndex] = !updatedSets[setIndex];
            return { ...ex, completedSets: updatedSets };
          }
          return ex;
        }),
    );
  };

  const handleToggleMeal = (mealId: string) => {
    setClientMeals((prev) =>
        prev.map((m) =>
            m.id === mealId ? { ...m, completed: !m.completed } : m,
        ),
    );
  };

  const handleApproveAttendance = (sessionId: string) => {
    setTodaySessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, status: "completed" } : s)),
    );
    setToastMessage("Kehadiran client berhasil disetujui!");
  };

  const handleCreatePackage = (newPkg: Omit<TrainingPackage, "id">) => {
    const pkgWithId: TrainingPackage = {
      ...newPkg,
      id: `pkg-${Date.now()}`,
    };

    setCoaches((prev) =>
        prev.map((c) => {
          if (c.id === "coach-1") {
            return {
              ...c,
              packages: [pkgWithId, ...c.packages],
            };
          }
          return c;
        }),
    );

    setToastMessage(
        `Paket baru "${newPkg.name}" berhasil dibuat dengan sistem diskon perpanjangan!`,
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLoginRegisterClick = () => {
    setCurrentRole("registered");
    setToastMessage("Berhasil Login sebagai Registered User");
  };

  return (
      <div
          className={`min-h-screen flex flex-col items-center justify-center font-sans sm:py-6 transition-colors duration-200 ${
              isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
          }`}
      >
        {/* Toast Feedback */}
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

        {/* PWA Phone Frame Container */}
        <div
            className={`w-full max-w-[480px] min-h-screen sm:min-h-[850px] border-x shadow-2xl relative flex flex-col overflow-hidden sm:rounded-[36px] sm:border transition-colors duration-200 ${
                isDark
                    ? "bg-slate-950 border-slate-800"
                    : "bg-white border-slate-200 shadow-slate-200"
            }`}
        >
          {/* Global PWA Header */}
          <Header
              currentRole={currentRole}
              unreadNotificationsCount={unreadNotificationsCount}
              onOpenNotifications={() => setIsNotificationOpen(true)}
              language={language}
              theme={theme}
              onToggleLanguage={handleToggleLanguage}
              onToggleTheme={handleToggleTheme}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 overflow-y-auto">
            {/* Tab 1: Home - Role Specific Primary Views */}
            {activeTab === "home" && (
                <>
                  {(currentRole === "public" || currentRole === "registered") && (
                      <HomeFeedView
                          currentRole={currentRole}
                          onSwitchToRegistered={() => setActiveTab("profile")}
                          language={language}
                          theme={theme}
                      />
                  )}

                  {currentRole === "client" && (
                      <ClientView
                          activeCoach={activeCoach}
                          activePackage={activePackage}
                          remainingSessions={remainingSessions}
                          exercises={clientExercises}
                          meals={clientMeals}
                          onPresensiCheckIn={handlePresensiCheckIn}
                          onToggleExerciseSet={handleToggleExerciseSet}
                          onToggleMeal={handleToggleMeal}
                          hasPresensiedToday={hasPresensiedToday}
                          language={language}
                          theme={theme}
                          onRenewPackage={handleRenewPackage}
                          onChangeCoach={handleChangeCoach}
                      />
                  )}

                  {currentRole === "coach" && (
                      <CoachDashboardView language={language} theme={theme} />
                  )}
                </>
            )}

            {/* Tab 2: Search (for non-coach) / Packages (for coach) */}
            {activeTab === "search" && currentRole !== "coach" && (
                <RegisteredUserView
                    coaches={coaches}
                    onOpenCoachDetail={handleOpenCoachDetail}
                    onSelectPackage={handleSelectPackageToBuy}
                    language={language}
                    theme={theme}
                    currentRole={currentRole}
                />
            )}

            {activeTab === "packages" && currentRole === "coach" && (
                <PackageManagementView language={language} theme={theme} />
            )}

            {/* Tab 3: Schedule / Calendar */}
            {activeTab === "schedule" && (
                <div className="space-y-4 pb-20">
                  {currentRole === "coach" ? (
                      <CoachView
                          todaySessions={todaySessions}
                          clientRecords={clientRecords}
                          coachPackages={coaches[0].packages}

                          onCreatePackage={handleCreatePackage}
                          language={language}
                          theme={theme}
                      />
                  ) : (
                      <ClientView
                          activeCoach={activeCoach}
                          activePackage={activePackage}
                          remainingSessions={remainingSessions}
                          exercises={clientExercises}
                          meals={clientMeals}
                          onPresensiCheckIn={handlePresensiCheckIn}
                          onToggleExerciseSet={handleToggleExerciseSet}
                          onToggleMeal={handleToggleMeal}
                          hasPresensiedToday={hasPresensiedToday}
                          language={language}
                          theme={theme}
                          onRenewPackage={handleRenewPackage}
                          onChangeCoach={handleChangeCoach}
                      />
                  )}
                </div>
            )}

            {/* Tab 4: Standard Profile View */}
            {activeTab === "profile" && (
                <ProfileView
                    currentRole={currentRole}
                    language={language}
                    theme={theme}
                    onToggleLanguage={handleToggleLanguage}
                    onToggleTheme={handleToggleTheme}
                    onLoginAs={(role) => setCurrentRole(role)}
                    onLogout={() => {
                      setCurrentRole("public");
                    }}
                    transactions={[
                      {
                        id: "trx-1",
                        date: "28 Jul 2026",
                        coachName: "Budi Santoso",
                        packageName: "Paket 12 Sesi",
                        amount: 1500000,
                        status: "success",
                        isRenewal: false,
                      },
                    ]}
                />
            )}
          </main>

          {/* Global Bottom Navigation */}
          <BottomNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activeRole={currentRole}
              language={language}
              theme={theme}
          />

          {/* Coach Detail Modal */}
          <CoachDetailModal
              coach={selectedCoachModal}
              onClose={() => setSelectedCoachModal(null)}
              onSelectPackage={handleSelectPackageToBuy}
              language={language}
              theme={theme}
          />

          {/* Payment / Checkout Modal */}
          <PaymentModal
              isOpen={!!paymentCoach && !!paymentPkg}
              coach={paymentCoach}
              pkg={paymentPkg}
              isRenewal={isRenewalPayment}
              onClose={() => {
                setPaymentCoach(null);
                setPaymentPkg(null);
              }}
              onPaymentSuccess={handlePaymentSuccess}
              language={language}
              theme={theme}
          />

          {showPWAPrompt && (
              <div className="absolute inset-0 z-[20] flex items-start justify-center pt-[76px] p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div
                    className={`w-full max-w-sm p-4 rounded-3xl shadow-xl border animate-in slide-in-from-top-4 duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-2xl shrink-0">
                      <Download className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <h3
                          className={`text-sm font-black leading-tight ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {language === "id" ? "Install CoachKu" : "Install CoachKu"}
                      </h3>
                      <p
                          className={`text-[10px] font-medium mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {language === "id"
                            ? "Akses lebih cepat & ringan"
                            : "Fast & lightweight access"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setShowPWAPrompt(false)}
                        className={`flex-1 py-2 font-bold text-xs rounded-xl transition-all ${isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {language === "id" ? "Nanti Saja" : "Later"}
                    </button>
                    <button
                        onClick={() => {
                          alert(
                              language === "id"
                                  ? "Memicu prompt install PWA..."
                                  : "Triggering PWA install prompt...",
                          );
                          setShowPWAPrompt(false);
                        }}
                        className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-[0.98]"
                    >
                      Install
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Notification Modal */}
          <NotificationModal
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          />
        </div>

        {/* Role Simulator Component outside PWA Frame */}
        <RoleSimulator
            currentRole={currentRole}
            onChangeRole={(role) => {
              setCurrentRole(role);
              setToastMessage(`Switched to ${role} role`);
            }}
            theme={theme}
            onSimulatePushNotification={() => {
              setToastMessage(
                  language === "id"
                      ? "📲 Pengingat: Sesi Anda akan dimulai dalam 15 menit!"
                      : "📲 Reminder: Your session starts in 15 mins!",
              );
            }}
            onZeroSessions={() => {
              setRemainingSessions(0);
              setToastMessage("Remaining sessions set to 0 to test Rating feature");
            }}
        />
      </div>
  );
}
