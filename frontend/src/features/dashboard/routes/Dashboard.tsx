import { NavBar } from "../../../components/NavBar";
import { StatCard } from "../components/StatCard";
import { DaysChart } from "../components/DaysChart";
import { StatCardProps } from "../types";
import { Zap, BarChart3, History } from "lucide-react";

export const Dashboard = () => {
    const stats: StatCardProps[] = [
        {
            title: "API Requests",
            description: "Real-time throughput. Your current plan allows a maximum of 5 requests per minute.",
            icon: <Zap size={20} />,
            value: "3",
            suffix: "per minute",
            trend: { value: "Normal", isPositive: true }
        },
        {
            title: "API Requests",
            description: "Daily aggregate volume. You are restricted to 20 total requests per 24-hour period.",
            icon: <BarChart3 size={20} />,
            value: "14",
            suffix: "today",
            trend: { value: "70%", isPositive: true }
        },
        {
            title: "API Requests",
            description: "Historical data overview. Total cumulative requests processed since monitoring began.",
            icon: <History size={20} />,
            value: "1.2k",
            suffix: "all time",
            trend: { value: "Stable", isPositive: true }
        }
    ];

    return (
        <div className="flex min-h-screen bg-[var(--bg)]">
            <NavBar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                        <h2 className="text-3xl font-black text-[var(--text-h)] tracking-tighter">
                            Usage Dashboard
                        </h2>
                        <p className="text-lg text-[var(--text)] max-w-3xl">
                            Monitor your API consumption and rate-limit status in real-time.
                        </p>
                    </div>

                    {/* Top Row: Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>

                    {/* Bottom Row: Chart */}
                    <div className="w-full">
                        <DaysChart />
                    </div>
                </div>
            </main>
        </div>
    );
};


