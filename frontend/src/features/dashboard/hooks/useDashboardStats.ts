import { useState, useEffect } from "react";
import { getUsage } from "../api/dashboardApi";

interface UsageStats {
    limit: number;
    usage: number;
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
                const res = await getUsage();
                const user = res.data;
                setStats({
                    limit: res.data.user.limit,
                    usage: res.data.user.usage,
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
