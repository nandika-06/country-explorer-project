import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./features/auth/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CountriesPage = lazy(() => import("./pages/CountriesPage"));
const CountryDetailsPage = lazy(() => import("./pages/CountryDetailsPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const FavouritesPage = lazy(() => import("./pages/FavouritesPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 text-slate-100">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:code" element={<CountryDetailsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
