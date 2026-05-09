import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./features/auth/routes/Register";
import { Login } from "./features/auth/routes/Login";
import { Dashboard } from "./features/dashboard/routes/Dashboard";
import { ApiKey } from "./features/apiKey/routes/ApiKey";
import { ToastProvider } from "./context/ToastContext";
import { Toast } from "./components/Toast";


function App() {
  return (
    <ToastProvider>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/api-key" element={<ApiKey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}


export default App;