import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Database, Settings, LogOut, ChevronRight, Key, Play, X } from 'lucide-react';

import { useAuthStore } from '../features/auth/store/useAuthStore';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Home', path: '/', icon: <Home size={15} /> },
        { label: 'API Key', path: '/api-key', icon: <Key size={15} /> },
        { label: 'API Documentation', path: '/api-details', icon: <Database size={15} /> },
        { label: 'API Simulation', path: '/api-simulation', icon: <Play size={15} /> },
        { label: 'Settings', path: '/settings', icon: <Settings size={15} /> },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--border)] bg-[var(--bg)] transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex h-full flex-col px-3 pt-8 pb-4 overflow-y-auto">
                    <div className="mb-10 flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20">
                                <Database size={24} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[var(--text-h)]">
                                Rate<span className="text-[var(--accent)]">Guard</span>
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-[var(--accent-bg)] text-[var(--text)] lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <ul className="space-y-2 font-medium flex-1">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        if (window.innerWidth < 1024) onClose();
                                    }}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${isActive
                                            ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                                            : 'text-[var(--text)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)]'
                                        }`
                                    }
                                >
                                    <span className="flex-shrink-0">{item.icon}</span>
                                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                                    <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-4 border-t border-[var(--border)]">
                        {user && (
                            <div className="px-2 flex items-center justify-between rounded-2xl py-2 hover:bg-[var(--accent-bg)]/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[var(--accent-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] font-bold shadow-sm">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold text-[var(--text-h)] truncate">{user.username}</span>
                                        <span className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-black opacity-70">{user.plan} plan</span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 rounded-xl text-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};
