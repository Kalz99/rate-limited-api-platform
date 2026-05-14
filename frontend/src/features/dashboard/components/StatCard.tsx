import React from 'react';
import { StatCardProps } from '../types';

export const StatCard: React.FC<StatCardProps> = ({ title, description, icon, value, suffix, trend }) => {
    return (
        <div className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-[var(--text)] uppercase tracking-wider">{title}</span>
                <div className="h-8 w-8 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center text-[var(--accent)] transition-transform group-hover:scale-110">
                    {icon || <div className="h-4 w-4 bg-current rounded-md opacity-20" />}
                </div>
            </div>
            
            <div className="flex items-baseline gap-1 mb-2">
                {value && (
                    <span className="text-5xl font-medium text-[var(--text-h)] tracking-tight">{value}</span>
                )}
                {suffix && (
                    <span className="text-lg text-[var(--text)] font-medium">
                        <span className="mx-1 text-[var(--border)]">/</span>
                        {suffix}
                    </span>
                )}
            </div>

            <div className="mt-auto pt-4 flex justify-between items-end">
                <p className="text-sm text-[var(--text)] leading-relaxed flex-1 mr-4">{description}</p>
                {trend && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        trend.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                    }`}>
                        {trend.value}
                    </span>
                )}
            </div>
        </div>
    );
};

