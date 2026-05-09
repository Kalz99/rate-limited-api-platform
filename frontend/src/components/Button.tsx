import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    copy?: boolean;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, loading, disabled, copy, variant = 'primary', ...props }) => {
    const bgColor = variant === 'secondary' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-indigo-600 hover:bg-indigo-500';
    
    return (
        <button
            disabled={disabled || loading}
            className={`
                w-full px-6 py-2.5 text-sm text-white font-bold rounded-2xl
                transition-all duration-300 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
                ${bgColor}
                shadow-[0_0_20px_rgba(79,70,229,0.2)]
                ${props.className || ''}
            `}
            {...props}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                </>
            ) : children}
        </button>
    );
};


