import { NavBar } from "../../../components/NavBar";

export const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-[var(--bg)]">
            <NavBar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder for dashboard cards */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-12 w-12 rounded-xl bg-[var(--accent-bg)] flex items-center justify-center text-[var(--accent)] mb-4">
                                    <div className="h-6 w-6 bg-current rounded-md opacity-20" />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--text-h)]">Stat Card {i}</h3>
                                <p className="text-sm text-[var(--text)] mt-2">Some useful information about your API usage and performance metrics.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
