import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./features/auth/routes/Register";
import { Login } from "./features/auth/routes/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;