import React from 'react';

export type ApiType = 'email' | 'password' | 'ip';

interface ApiOption {
    id: ApiType;
    label: string;
    icon: React.ReactNode;
}

interface ApiTabsProps {
    options: ApiOption[];
    selected: ApiType;
    onSelect: (id: ApiType) => void;
}

export const ApiTabs: React.FC<ApiTabsProps> = ({ options, selected, onSelect }) => {
    return (
        <div className="flex bg-[var(--social-bg)] p-1.5 rounded-2xl border border-[var(--border)] w-fit">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={`
                        flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                        ${selected === option.id 
                            ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20 scale-[1.02]' 
                            : 'text-[var(--text)] hover:text-[var(--text-h)] hover:bg-[var(--accent-bg)]'}
                    `}
                >
                    {option.icon}
                    {option.label}
                </button>
            ))}
        </div>
    );
};
