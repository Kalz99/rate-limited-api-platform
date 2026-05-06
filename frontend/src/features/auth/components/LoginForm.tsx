import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function LoginForm() {
    const { loginUser, loading } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: any) => {
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