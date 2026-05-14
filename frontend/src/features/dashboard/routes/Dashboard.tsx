import { DashboardLayout } from "../../../components/DashboardLayout";
import { StatCard } from "../components/StatCard";
import { DaysChart } from "../components/DaysChart";
import { StatCardProps } from "../types";
import { Zap, BarChart3, History, Loader2 } from "lucide-react";
import { useDashboardStats } from "../hooks/useDashboardStats";

export const Dashboard = () => {
    const { stats, loading, error } = useDashboardStats();

    const displayStats: StatCardProps[] = [
        {
            title: "Plan Limit",
            description: "Your current plan's rate limit. This is the maximum number of requests you can make.",
            icon: <Zap size={20} />,
            value: stats?.limit?.toString() || "0",
            suffix: "requests",
            trend: { value: "Fixed", isPositive: true }
        },
        {
            title: "Today's Usage",
            description: "Number of API requests processed in the last 24 hours.",
            icon: <BarChart3 size={20} />,
            value: stats?.todayUsage?.toString() || "0",
            suffix: "today",
            trend: { value: "Live", isPositive: true }
        },
        {
            title: "Total Usage",
            description: "Total cumulative requests made during the current billing or reset period.",
            icon: <History size={20} />,
            value: stats?.usage?.toString() || "0",
            suffix: "all time",
            trend: { value: stats && stats.limit > 0 ? `${Math.round((stats.usage / stats.limit) * 100)}%` : "0%", isPositive: true }
        }
    ];

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader2 className="animate-spin text-[var(--accent)]" size={40} />
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Retry
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                    <h2 className="text-3xl font-medium text-[var(--text-h)] tracking-tighter">
                        Usage Dashboard
                    </h2>
                    <p className="text-lg text-[var(--text)] max-w-3xl">
                        Monitor your API consumption and rate-limit status in real-time.
                    </p>
                </div>

                {/* Top Row: Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayStats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {/* Bottom Row: Chart */}
                <div className="w-full">
                    <DaysChart />
                </div>
            </div>
        </DashboardLayout>
    );
};
