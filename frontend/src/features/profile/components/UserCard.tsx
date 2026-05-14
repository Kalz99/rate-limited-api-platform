import React from 'react';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { User as UserIcon } from 'lucide-react';

export const UserCard: React.FC = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <div className="p-8 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-xl shadow-indigo-500/5 relative overflow-hidden group h-full flex flex-col items-center justify-center text-center">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] -mr-16 -mt-16" />
            
            <div className="relative z-10 space-y-6">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-[var(--accent-bg)] border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] font-black text-3xl shadow-xl shadow-indigo-500/10 mx-auto">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-lg">
                        <UserIcon size={16} />
                    </div>
                </div>

                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[var(--text-h)] tracking-tight">
                        {user.username}
                    </h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] opacity-70">
                        {user.plan} account
                    </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] w-full">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <p className="text-[10px] uppercase tracking-tighter text-[var(--text)] opacity-50 font-black">Status</p>
                            <p className="text-xs font-bold text-emerald-500">Active</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] uppercase tracking-tighter text-[var(--text)] opacity-50 font-black">Plan</p>
                            <p className="text-xs font-bold text-[var(--text-h)]">{user.plan}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
