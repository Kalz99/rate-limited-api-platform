import { ReactNode } from 'react';

export interface StatCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    value?: string | number;
    suffix?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export interface UsageStats {
    limit: number;
    usage: number;
    todayUsage: number;
}

export interface UseDashboardStatsReturn {
    stats: UsageStats | null;
    loading: boolean;
    error: string | null;
}

