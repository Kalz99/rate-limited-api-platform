import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Database, Settings, LogOut, ChevronRight, Key } from 'lucide-react';

export const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { label: 'Home', path: '/', icon: <Home size={15} /> },
        { label: 'API Key', path: '/api-key', icon: <Key size={15} /> },
        { label: 'API Details', path: '/api-details', icon: <Database size={15} /> },
        { label: 'Settings', path: '/settings', icon: <Settings size={15} /> },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--border)] bg-[var(--bg)] transition-transform sm:translate-x-0">
            <div className="flex h-full flex-col px-3 py-4 overflow-y-auto">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20">
                        <Database size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[var(--text-h)]">
                        Rate<span className="text-[var(--accent)]">Guard</span>
                    </span>
                </div>

                <ul className="space-y-2 font-medium flex-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
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
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200"
                    >
                        <LogOut size={22} />
                        <span className="flex-1 text-left font-medium">Logout</span>
                    </button>

                </div>
            </div>
        </aside>
    );
};
