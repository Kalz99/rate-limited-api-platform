import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useToast } from "@/context/ToastContext";

export default function LoginForm() {
    const { loginUser, loading } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const result = await loginUser(form);
            if (result) {
                showToast("Logged in successfully!", "success");
                navigate("/");
            }
        } catch (error) {
            showToast("Login failed. Please check your credentials.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Email"
                placeholder="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
                label="Password"
                type="password"
                placeholder="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="mt-8">
                <Button type="submit" loading={loading}>
                    Login
                </Button>
            </div>
        </form>
    );
}