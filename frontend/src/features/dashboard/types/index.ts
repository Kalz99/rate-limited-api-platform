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
