import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Check if user is logged in via session cookie
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/current`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loadingUser) return <p className="text-white text-center mt-20">Loading...</p>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage user={user} setUser={setUser} />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
