import { useQuery } from "@apollo/client/react";
import { GET_DASHBOARD_DATA } from "../features/dashboard/dashboard-queries";
import {
  getCountriesByContinent,
  getTopLanguages,
} from "../features/dashboard/dashboard-utils";
import { CountriesByContinentChart } from "../features/dashboard/components/CountriesByContinentChart";
import { TopLanguagesChart } from "../features/dashboard/components/TopLanguagesChart";
import { useMemo } from "react";
import type { CountrySummary } from "../features/dashboard/dashboard-types";

const FAV_KEY = "ge_favourites";
const RECENT_KEY = "ge_recently_viewed";

type DashboardData = {
  countries: CountrySummary[];
  continents: { code: string; name: string }[];
  languages: { code: string; name: string }[];
};

function getFavouritesCount() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as string[];
    return parsed.length;
  } catch {
    return 0;
  }
}

function getRecentlyViewedCount() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as string[];
    return parsed.length;
  } catch {
    return 0;
  }
}

const DashboardPage = () => {
  const { data, loading, error, refetch } =
    useQuery<DashboardData>(GET_DASHBOARD_DATA);

  const favouritesCount = getFavouritesCount();
  const recentlyViewedCount = getRecentlyViewedCount();

  const handleRefresh = () => {
    refetch();
  };

  const continentChartData = useMemo(() => {
    return getCountriesByContinent(data?.countries ?? []);
  }, [data]);

  const topLanguagesData = useMemo(() => {
    return getTopLanguages(data?.countries ?? [], 10);
  }, [data]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-slate-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3 py-1 rounded-md text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            Retry
          </button>
        </div>

        <div className="p-4 rounded-lg bg-red-900/40 border border-red-700 text-red-200">
          <p className="font-semibold mb-1">Failed to load dashboard data.</p>
          <p className="text-xs">{error.message}</p>
        </div>
      </div>
    );
  }

  const totalCountries = data?.countries.length ?? 0;
  const totalContinents = data?.continents.length ?? 0;
  const totalLanguages = data?.languages.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          type="button"
          onClick={handleRefresh}
          className="px-3 py-1 rounded-md text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard label="Total Countries" value={totalCountries} />
        <DashboardCard label="Total Continents" value={totalContinents} />
        <DashboardCard label="Total Languages" value={totalLanguages} />
        <DashboardCard
          label="Favourite Countries"
          value={favouritesCount}
          subtle
        />
        <DashboardCard
          label="Recently Viewed"
          value={recentlyViewedCount}
          subtle
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CountriesByContinentChart data={continentChartData} />
        <TopLanguagesChart data={topLanguagesData} />
      </div>
    </div>
  );
};

type DashboardCardProps = {
  label: string;
  value: number;
  subtle?: boolean;
};

function DashboardCard({ label, value, subtle }: DashboardCardProps) {
  return (
    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-2">
      <span className="text-sm text-slate-400">{label}</span>
      <span
        className={
          subtle
            ? "text-xl font-semibold text-slate-100"
            : "text-2xl font-bold text-emerald-400"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default DashboardPage;
