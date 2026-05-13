import { useState, useEffect } from "react";
import { getUsage, getTodayUsage } from "../api/dashboardApi";

interface UsageStats {
    limit: number;
    usage: number;
    todayUsage: number;
}

interface UseDashboardStatsReturn {
    stats: UsageStats | null;
    loading: boolean;
    error: string | null;
}

export const useDashboardStats = (): UseDashboardStatsReturn => {
    const [stats, setStats] = useState<UsageStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const [usageRes, todayRes] = await Promise.all([
                    getUsage(),
                    getTodayUsage()
                ]);

                setStats({
                    limit: usageRes.data.user.limit,
                    usage: usageRes.data.user.usage,
                    todayUsage: todayRes.data.data || 0,
                });
            } catch (err) {
                setError("Failed to load usage stats.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};
