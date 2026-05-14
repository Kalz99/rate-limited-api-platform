import React from 'react';
import { DashboardLayout } from '../../../components/DashboardLayout';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { UserCard } from '../components/UserCard';
import { Input } from '../../../components/Input';
import { User, Mail, Shield, Key } from 'lucide-react';

export const Settings: React.FC = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                    <h2 className="text-3xl font-black text-[var(--text-h)] tracking-tighter">
                        Profile Settings
                    </h2>
                    <p className="text-lg text-[var(--text)] max-w-3xl">
                        View and manage your account information and preferences.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: User Card */}
                    <div className="lg:col-span-1">
                        <UserCard />
                    </div>

                    {/* Right Column: User Details Form */}
                    <div className="lg:col-span-2 p-8 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32" />

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
                                <div className="p-2.5 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)]">
                                    <Shield size={20} />
                                </div>
                                <h3 className="text-xl font-black text-[var(--text-h)]">Account Details</h3>
                            </div>

                            <div className="flex flex-col gap-8 max-w-xl">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <User size={14} className="text-[var(--accent)]" />
                                        <span className="text-[10px] uppercase tracking-widest font-black text-[var(--text)] opacity-50">Username</span>
                                    </div>
                                    <Input 
                                        value={user.username}
                                        readOnly
                                        className="bg-[var(--accent-bg)]/20 border-[var(--border)] font-bold opacity-90 rounded-md py-3"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Mail size={14} className="text-[var(--accent)]" />
                                        <span className="text-[10px] uppercase tracking-widest font-black text-[var(--text)] opacity-50">Email Address</span>
                                    </div>
                                    <Input 
                                        value={user.email}
                                        readOnly
                                        className="bg-[var(--accent-bg)]/20 border-[var(--border)] font-bold opacity-90 rounded-md py-3"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Shield size={14} className="text-[var(--accent)]" />
                                        <span className="text-[10px] uppercase tracking-widest font-black text-[var(--text)] opacity-50">Current Plan</span>
                                    </div>
                                    <Input 
                                        value={user.plan.toUpperCase()}
                                        readOnly
                                        className="bg-[var(--accent-bg)]/20 border-[var(--border)] font-black text-[var(--accent)] rounded-md py-3 tracking-widest"
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
