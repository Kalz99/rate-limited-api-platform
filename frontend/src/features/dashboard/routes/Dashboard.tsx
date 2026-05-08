import { NavBar } from "../../../components/NavBar";
import { StatCard } from "../components/StatCard";
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
                <div className="max-w-7xl mx-auto">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

