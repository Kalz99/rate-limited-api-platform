import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
    const [form, setForm] = useState({ name: "", email: "", password: "", plan: "" });
    const { registerUser, loading } = useAuth();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const result = await registerUser(form);
            if (result) {
                alert("Registered successfully");
            }
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="username"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
                type="text"
                placeholder="subscription plan"
                value={form.plan}
                onChange={(e) => setForm({ ...form, plan: e.target.value })}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
        </form>
    );
}