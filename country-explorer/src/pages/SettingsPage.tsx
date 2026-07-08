import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "../features/auth/auth-storage";
import { useTheme } from "../features/theme/ThemeContext";

const FAV_KEY = "ge_favourites";
const RECENT_KEY = "ge_recently_viewed";

function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleClearFavourites = () => {
    localStorage.removeItem(FAV_KEY);
  };

  const handleClearRecentlyViewed = () => {
    localStorage.removeItem(RECENT_KEY);
  };

  const handleResetApp = () => {
    localStorage.removeItem(FAV_KEY);
    localStorage.removeItem(RECENT_KEY);
    clearAuthToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <section className="p-4 rounded-lg dark:bg-slate-900 border border-slate-800">
        <h2 className="text-lg font-semibold mb-3">Theme</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`px-3 py-2 rounded text-sm cursor-pointer ${
              theme === "light"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-800 text-slate-100"
            }`}
          >
            Light
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`px-3 py-2 rounded text-sm cursor-pointer ${
              theme === "dark"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-300 text-slate-800"
            }`}
          >
            Dark
          </button>
        </div>
      </section>

      <section className="space-x-3 p-4 rounded-lg dark:bg-slate-900 border border-slate-800 space-y-3">
        <h2 className="text-lg font-semibold mb-2">Data</h2>
        <button
          type="button"
          onClick={handleClearFavourites}
          className="px-4 py-2 rounded dark:bg-slate-800 shadow-md bg-slate-300 text-sm cursor-pointer"
        >
          Clear favourites
        </button>
        <button
          type="button"
          onClick={handleClearRecentlyViewed}
          className="px-4 py-2 rounded dark:bg-slate-800 shadow-md bg-slate-300  text-sm cursor-pointer"
        >
          Clear recently viewed
        </button>
      </section>

      <section className="p-4 rounded-lg dark:bg-slate-900 border border-slate-800">
        <h2 className="text-lg font-semibold mb-2">Danger zone</h2>
        <p className="text-sm text-slate-400 mb-3">
          Resetting the application will clear all preferences, favourites, and
          recently viewed items, and sign you out.
        </p>
        <button
          type="button"
          onClick={handleResetApp}
          className="px-4 py-2 rounded bg-red-500 text-slate-950 font-semibold cursor-pointer"
        >
          Reset application
        </button>
      </section>
    </div>
  );
}

export default SettingsPage;
