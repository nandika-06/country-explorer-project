import { Route, Routes, Navigate } from "react-router-dom";
import { TestCountries } from "./features/countries/TestCountries";

function LoginPage() {
  return <div className="p-4">Login</div>;
}

function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <TestCountries />
      <p>hii</p>
    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
