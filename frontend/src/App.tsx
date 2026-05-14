import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./features/auth/routes/Register";
import { Login } from "./features/auth/routes/Login";
import { Dashboard } from "./features/dashboard/routes/Dashboard";
import { ApiKey } from "./features/apiKey/routes/ApiKey";
import { ApiDocumentation } from "./features/apiDocumentation/routes/ApiDocumentation";
import { ApiSimulation } from "./features/apiSimulation/routes/ApiSimulation";
import { ToastProvider } from "./context/ToastContext";
import { Toast } from "./components/Toast";
import { Settings } from "./features/profile/routes/Settings";
import { useAuthStore } from "./features/auth/store/useAuthStore";
import { getUser } from "./features/auth/api/authApi";

function App() {
  const { setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const hydrateSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getUser();
        if (response.data.success) {
          const userData = {
            username: response.data.user.username,
            email: response.data.user.email,
            plan: response.data.user.plan,
            apiKey: response.data.user.apiKey,
          };
          setUser(userData);
        }
      } catch (error) {
        console.error("Session hydration failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    hydrateSession();
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#16171d]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>

        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/api-key" element={<ApiKey />} />
          <Route path="/api-details" element={<ApiDocumentation />} />
          <Route path="/api-simulation" element={<ApiSimulation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}



export default App;