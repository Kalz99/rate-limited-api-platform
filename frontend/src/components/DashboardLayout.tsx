import React, { useState } from 'react';
import { NavBar } from './NavBar';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            {/* Sidebar */}
            <NavBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--bg)] sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20">
                            <span className="font-bold text-xs">RG</span>
                        </div>
                        <span className="font-bold text-[var(--text-h)]">RateGuard</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-[var(--accent-bg)] text-[var(--text)]"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Content Area */}
                <main className="flex-1 lg:ml-64 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};
