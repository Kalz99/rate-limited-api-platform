// LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
    const { loginUser, loading } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginUser(form);
            if (result) {
                alert("login successfully");
            }
        } catch (error) {
            alert("login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button disabled={loading}>Login</button>
        </form>
    );
}