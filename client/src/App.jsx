import DashboardPage from "./pages/DashboardPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import Login from "./pages/Login";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setInvoices={setInvoices} setUser={setUser} />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
