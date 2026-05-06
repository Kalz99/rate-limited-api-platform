// app/router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    );
}