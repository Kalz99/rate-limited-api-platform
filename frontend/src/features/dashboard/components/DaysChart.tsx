import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Calendar } from 'lucide-react';

const data = [
    { day: 'Mon', count: 4 },
    { day: 'Tue', count: 7 },
    { day: 'Wed', count: 12 },
    { day: 'Thu', count: 9 },
    { day: 'Fri', count: 15 },
    { day: 'Sat', count: 8 },
    { day: 'Sun', count: 5 },
    { day: 'Mon ', count: 10 },
    { day: 'Tue ', count: 13 },
    { day: 'Wed ', count: 18 },
    { day: 'Thu ', count: 11 },
    { day: 'Fri ', count: 20 },
    { day: 'Sat ', count: 14 },
    { day: 'Sun ', count: 9 },
];

export const DaysChart: React.FC = () => {
    const [range, setRange] = useState('7d');

    const filteredData = range === '7d' ? data.slice(-7) : data;

    return (
        <div className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[var(--accent-bg)] text-[var(--accent)]">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-[var(--text-h)]">Request Activity</h3>
                        <p className="text-xs text-[var(--text)]">Daily request volume overview</p>
                    </div>
                </div>

                <div className="flex bg-[var(--code-bg)] p-1 rounded-xl border border-[var(--border)]">
                    {['7d', '14d'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                range === r
                                    ? 'bg-[var(--bg)] text-[var(--accent)] shadow-sm border border-[var(--border)]'
                                    : 'text-[var(--text)] hover:text-[var(--text-h)]'
                            }`}
                        >
                            {r.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'var(--text)', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'var(--text)', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'var(--accent-bg)', opacity: 0.4 }}
                            contentStyle={{
                                backgroundColor: 'var(--bg)',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow)',
                                color: 'var(--text-h)'
                            }}
                            itemStyle={{ color: 'var(--accent)', fontWeight: 'bold' }}
                        />
                        <Bar 
                            dataKey="count" 
                            radius={[6, 6, 0, 0]} 
                            barSize={32}
                        >
                            {filteredData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.count >= 20 ? '#ef4444' : 'var(--accent)'} 
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text)] border-t border-[var(--border)] pt-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <span>Within Limit</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span>Limit Exceeded</span>
                    </div>
                </div>
                <p>Updated just now</p>
            </div>
        </div>
    );
};
