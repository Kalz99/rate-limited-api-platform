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

function App() {
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