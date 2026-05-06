import { BrowserRouter, Routes, Route } from "react-router-dom";

// auth
import LoginForm from "@/features/auth/components/LoginForm";
import { Login } from "./features/auth/routes/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;