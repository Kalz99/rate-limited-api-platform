import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/Input";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import { Label } from "@/components/Label";
import { useToast } from "@/context/ToastContext";

export default function RegisterForm() {
    const [form, setForm] = useState({ name: "", email: "", password: "", plan: "free" });
    const { registerUser, loading } = useAuth();

    const navigate = useNavigate();

    const { showToast } = useToast();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const result = await registerUser(form);
            if (result) {
                showToast("Account created successfully!", "success");
                navigate("/login");

            }
        } catch (error) {
            showToast("Registration failed. Please try again.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Name"
                type="text"
                placeholder="username"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
                label="Email"
                type="email"
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
            <div className="text-left space-y-3 mb-8">
                <Label>Select Subscription Plan</Label>
                <div className="grid grid-cols-1 gap-4">
                    {/* Free Plan */}
                    <label className={`
                        relative flex flex-col p-5 cursor-pointer border rounded-2xl transition-all duration-300
                        ${form.plan === 'free' ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50' : 'border-slate-800 bg-slate-950/30 hover:border-slate-700'}
                    `}>

                        <input
                            type="radio" name="plan" value="free" checked={form.plan === 'free'}
                            onChange={(e) => setForm({ ...form, plan: e.target.value })}

                            className="sr-only"
                        />
                        <div className="flex justify-between items-center">
                            <span className={`font-bold transition-colors ${form.plan === 'free' ? 'text-white' : 'text-slate-400'}`}>Free Plan</span>
                            {form.plan === 'free' && <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>}
                        </div>
                        <div className="mt-3 space-y-1.5">
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                5 requests per minute
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                20 requests per day
                            </p>
                        </div>
                    </label>



                    {/* Pro Plan */}
                    <label className={`
                        relative flex flex-col p-5 cursor-pointer border rounded-2xl transition-all duration-300
                        ${form.plan === 'pro' ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50' : 'border-slate-800 bg-slate-950/30 hover:border-slate-700'}
                    `}>

                        <input
                            type="radio" name="plan" value="pro" checked={form.plan === 'pro'}
                            onChange={(e) => setForm({ ...form, plan: e.target.value })}

                            className="sr-only"
                        />
                        <div className="flex justify-between items-center">
                            <span className={`font-bold transition-colors ${form.plan === 'pro' ? 'text-white' : 'text-slate-400'}`}>Pro Plan</span>
                            {form.plan === 'pro' && <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>}
                        </div>
                        <div className="mt-3 space-y-1.5">
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                10 requests per minute
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                                100 requests per day
                            </p>
                        </div>
                    </label>
                </div>
            </div>
            <div className="mt-8">
                <Button type="submit" loading={loading}>
                    Register
                </Button>
            </div>
        </form>
    );
}