import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearAuthToken } from "../features/auth/auth-storage";
import { useTheme } from "../features/theme/ThemeContext";

const AppLayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    clearAuthToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen dark:bg-slate-950  dark:text-slate-100 flex flex-col">
      <header className="dark:border-b dark:border-slate-800 dark:bg-slate-900 border-slate-300 border-b shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg">Country Explorer</span>

          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "dark:text-slate-200"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/countries"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "dark:text-slate-200"
              }
            >
              Countries
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "dark:text-slate-200"
              }
            >
              Compare
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "dark:text-slate-200"
              }
            >
              Favourites
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "dark:text-slate-200"
              }
            >
              Settings
            </NavLink>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-2 py-1 rounded-md text-xs dark:bg-slate-800 border border-slate-700 cursor-pointer"
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>

            <div className="w-8 h-8 rounded-full dark:bg-slate-700 flex items-center justify-center text-xs font-semibold">
              Avatar
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1 rounded-md text-xs font-semibold bg-red-500 text-slate-950 cursor-pointer"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
