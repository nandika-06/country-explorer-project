import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg">Country Explorer</span>

          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-emerald-400 font-semibold" : "text-slate-200"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/countries"
              className={({ isActive }) =>
                isActive ? "text-emerald-400 font-semibold" : "text-slate-200"
              }
            >
              Countries
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                isActive ? "text-emerald-400 font-semibold" : "text-slate-200"
              }
            >
              Compare
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ? "text-emerald-400 font-semibold" : "text-slate-200"
              }
            >
              Favourites
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "text-emerald-400 font-semibold" : "text-slate-200"
              }
            >
              Settings
            </NavLink>

            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold">
              Avatar
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
