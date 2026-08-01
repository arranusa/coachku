import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Percent,
  Tag,
  Dumbbell,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit2,
  Search,
} from "lucide-react";
import { TrainingPackage, Language, Theme } from "../types";
import { t } from "../utils/i18n";

interface PackageManagementViewProps {
  language: Language;
  theme: Theme;
}

export const PackageManagementView: React.FC<PackageManagementViewProps> = ({
  language,
  theme,
}) => {
  const isDark = theme === "dark";

  const [showPackageForm, setShowPackageForm] = useState(false);
  const [pkgName, setPkgName] = useState("");
  const [pkgSessions, setPkgSessions] = useState("4");
  const [pkgPrice, setPkgPrice] = useState("500000");
  const [pkgRenewalDiscount, setPkgRenewalDiscount] = useState("15");
  const [pkgDescription, setPkgDescription] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [locationSearchQuery, setLocationSearchQuery] = useState("");

  const availableGyms = [
    "Independent (Anywhere / Home Visit)",
    "FitHub Sudirman",
    "MegaGym Kuningan",
    "CoreFitness Kemang",
    "ActiveLife Bintaro",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const filteredGyms = availableGyms.filter((g) =>
    g.toLowerCase().includes(locationSearchQuery.toLowerCase()),
  );

  const [coachPackages, setCoachPackages] = useState<TrainingPackage[]>([
    {
      id: "pkg-1",
      name: "Starter 4 Sesi",
      sessions: 4,
      price: 500000,
      renewalDiscountPercent: 10,
      renewalPrice: 450000,
      description: "Mulai latihan dengan pendampingan personal trainer.",
      features: ["1-on-1 Training", "Program Dasar"],
    },
    {
      id: "pkg-2",
      name: "Intensive 12 Sesi",
      sessions: 12,
      price: 1500000,
      renewalDiscountPercent: 20,
      renewalPrice: 1200000,
      description: "Program intensif dengan nutrisi dan pemantauan harian.",
      popular: true,
      features: ["1-on-1 Training", "Custom Program", "Nutrisi", "Prioritas"],
    },
  ]);

  const numPrice = parseInt(pkgPrice) || 0;
  const numDiscount = parseInt(pkgRenewalDiscount) || 0;
  const calculatedRenewalPrice = numPrice - numPrice * (numDiscount / 100);

  const toggleLocation = (gym: string) => {
    if (selectedLocations.includes(gym)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== gym));
    } else {
      setSelectedLocations([...selectedLocations, gym]);
    }
  };

  const toggleAllLocations = () => {
    if (selectedLocations.length === availableGyms.length) {
      setSelectedLocations([]);
    } else {
      setSelectedLocations([...availableGyms]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName || !pkgSessions || !pkgPrice) return;

    const newPkg: TrainingPackage = {
      id: `pkg-${Date.now()}`,
      name: pkgName,
      sessions: parseInt(pkgSessions),
      price: numPrice,
      renewalDiscountPercent: numDiscount,
      renewalPrice: calculatedRenewalPrice,
      description: pkgDescription,
      features: ["Custom Program"],
    };

    if (editingPkgId) {
      setCoachPackages(
        coachPackages.map((p) =>
          p.id === editingPkgId ? { ...newPkg, id: editingPkgId } : p,
        ),
      );
    } else {
      setCoachPackages([newPkg, ...coachPackages]);
    }

    // Reset
    setShowPackageForm(false);
    setEditingPkgId(null);
    setPkgName("");
    setPkgSessions("4");
    setPkgPrice("500000");
    setPkgRenewalDiscount("15");
    setPkgDescription("");
    setSelectedLocations([]);
  };

  const handleEditClick = (pkg: TrainingPackage) => {
    setEditingPkgId(pkg.id);
    setPkgName(pkg.name);
    setPkgSessions(pkg.sessions.toString());
    setPkgPrice(pkg.price.toString());
    setPkgRenewalDiscount(pkg.renewalDiscountPercent?.toString() || "0");
    setPkgDescription(pkg.description);
    setSelectedLocations([...availableGyms]);
    setShowPackageForm(true);
  };

  return (
    <div
      className={`space-y-4 pb-20 ${isDark ? "text-white" : "text-slate-900"}`}
    >
      <div
        className={`p-4 border rounded-2xl ${
          isDark
            ? "bg-slate-900 border-slate-800"
            : "bg-slate-50 border-slate-200"
        }`}
      >
        <h2
          className={`text-base font-bold flex items-center gap-2 mb-1 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          <Dumbbell className="w-5 h-5 text-emerald-500" />{" "}
          {t(language, "packageManagement")}
        </h2>
        <p
          className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          Atur paket latihan dan tentukan di gym mana paket ini berlaku. Anda
          bisa membuat harga yang mengikuti standar gym atau harga independen
          Anda.
        </p>
      </div>

      <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-sm">
          Paket Aktif ({coachPackages.length})
        </h3>
        <button
          onClick={() => {
            setShowPackageForm(!showPackageForm);
            if (showPackageForm) {
              setEditingPkgId(null);
              setPkgName("");
              setPkgSessions("4");
              setPkgPrice("500000");
              setPkgRenewalDiscount("15");
              setPkgDescription("");
              setSelectedLocations([]);
            }
          }}
          className="py-1.5 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>
            {showPackageForm
              ? t(language, "cancel")
              : editingPkgId
                ? "Batal Edit"
                : t(language, "createPackage")}
          </span>
        </button>
      </div>

      {/* Create Package Form */}
      {showPackageForm && (
        <form
          onSubmit={handleFormSubmit}
          className={`p-4 rounded-xl border space-y-4 animate-in fade-in duration-200 shadow-xl ${
            isDark
              ? "bg-slate-950/80 border-emerald-500/30"
              : "bg-white border-emerald-200"
          }`}
        >
          <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {t(language, "createPackage")}
          </h3>

          <div>
            <label
              className={`text-[11px] font-semibold block mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(language, "packageName")}
            </label>
            <input
              type="text"
              required
              value={pkgName}
              onChange={(e) => setPkgName(e.target.value)}
              placeholder="Contoh: 8 Sesi Sculpt & Muscle Building"
              className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white"
                  : "bg-slate-50 border-slate-300 text-slate-900"
              }`}
            />
          </div>

          <div>
            <label
              className={`text-[11px] font-semibold block mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              Pilih Lokasi Gym (Bisa lebih dari 1)
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs border focus:outline-none transition-colors ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              >
                <span className="truncate">
                  {selectedLocations.length === 0
                    ? "Pilih lokasi..."
                    : selectedLocations.length === availableGyms.length
                      ? "Semua Lokasi"
                      : `${selectedLocations.length} lokasi dipilih`}
                </span>
                {isDropdownOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute z-10 w-full mt-1 rounded-xl border shadow-lg max-h-60 overflow-y-auto ${
                    isDark
                      ? "bg-slate-900 border-slate-700"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="p-2">
                    <div className="relative mb-2">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari lokasi..."
                        value={locationSearchQuery}
                        onChange={(e) => setLocationSearchQuery(e.target.value)}
                        className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border focus:outline-none focus:border-emerald-500 ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-slate-50 border-slate-300 text-slate-900"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}
                        onClick={toggleAllLocations}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${selectedLocations.length === availableGyms.length ? "bg-emerald-500 border-emerald-500 text-white" : isDark ? "bg-slate-800 border-slate-600" : "bg-white border-slate-300"}`}
                        >
                          {selectedLocations.length ===
                            availableGyms.length && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                          Pilih Semua / All
                        </span>
                      </div>
                      <div
                        className={`h-px w-full my-1 ${isDark ? "bg-slate-800" : "bg-slate-100"}`}
                      />
                      {filteredGyms.map((gym) => (
                        <div
                          key={gym}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${isDark ? "hover:bg-slate-800" : "hover:bg-slate-50"}`}
                          onClick={() => toggleLocation(gym)}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                              selectedLocations.includes(gym)
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : isDark
                                  ? "bg-slate-800 border-slate-600"
                                  : "bg-white border-slate-300"
                            }`}
                          >
                            {selectedLocations.includes(gym) && (
                              <CheckCircle2 className="w-3 h-3" />
                            )}
                          </div>
                          <span
                            className={`text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}
                          >
                            {gym}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-amber-500 mt-1">
              *Harga paket di gym tertentu mungkin akan otomatis disesuaikan
              dengan standar gym.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                className={`text-[11px] font-semibold block mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                {t(language, "numSessions")}
              </label>
              <input
                type="number"
                required
                min="1"
                max="50"
                value={pkgSessions}
                onChange={(e) => setPkgSessions(e.target.value)}
                className={`w-full rounded-xl px-3 py-2 text-xs font-mono border focus:outline-none focus:border-emerald-500 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>

            <div>
              <label
                className={`text-[11px] font-semibold block mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
              >
                {t(language, "desiredPrice")}
              </label>
              <input
                type="number"
                required
                min="50000"
                step="50000"
                value={pkgPrice}
                onChange={(e) => setPkgPrice(e.target.value)}
                className={`w-full rounded-xl px-3 py-2 text-xs font-mono border focus:outline-none focus:border-emerald-500 ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-slate-50 border-slate-300 text-slate-900"
                }`}
              />
            </div>
          </div>

          {/* Renewal Discount Input System */}
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5" />
                {t(language, "renewalDiscountLabel")}
              </label>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                {numDiscount}% Diskon
              </span>
            </div>

            <input
              type="number"
              min="0"
              max="50"
              value={pkgRenewalDiscount}
              onChange={(e) => setPkgRenewalDiscount(e.target.value)}
              className={`w-full rounded-xl px-3 py-1.5 text-xs font-mono border focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white"
                  : "bg-slate-50 border-slate-300 text-slate-900"
              }`}
            />

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className={isDark ? "text-slate-300" : "text-slate-700"}>
                {t(language, "renewalPriceLabel")}
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {calculatedRenewalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div>
            <label
              className={`text-[11px] font-semibold block mb-1 ${isDark ? "text-slate-300" : "text-slate-700"}`}
            >
              {t(language, "packageDesc")}
            </label>
            <textarea
              rows={2}
              value={pkgDescription}
              onChange={(e) => setPkgDescription(e.target.value)}
              placeholder="Jelaskan manfaat dan materi dalam paket ini..."
              className={`w-full rounded-xl px-3 py-2 text-xs border focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white"
                  : "bg-slate-50 border-slate-300 text-slate-900"
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            {t(language, "publishPackage")}
          </button>
        </form>
      )}

      {/* Currently Published Packages List */}
      <div className="space-y-3">
        {coachPackages.map((p) => {
          const renewalPrice =
            p.renewalPrice ||
            Math.round(p.price * (1 - (p.renewalDiscountPercent || 15) / 100));

          return (
            <div
              key={p.id}
              className={`p-4 rounded-xl border flex flex-col gap-3 shadow-sm ${
                isDark
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4
                    className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    {p.name}
                  </h4>
                  <p
                    className={`text-[11px] font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {p.sessions} Sesi • {p.features?.[0] || "1-on-1"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-emerald-500 block">
                    Rp {p.price.toLocaleString("id-ID")}
                  </span>
                  {p.renewalDiscountPercent > 0 && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                      <Tag className="w-3 h-3" /> Renew: Rp{" "}
                      {renewalPrice.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span
                    className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Berlaku di: Independent, FitHub, MegaGym (+2 lainnya)
                  </span>
                </div>
                <button
                  onClick={() => handleEditClick(p)}
                  className={`p-1.5 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"}`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
