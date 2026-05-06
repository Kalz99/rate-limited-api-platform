import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, loading, disabled, ...props }) => {
    return (
        <button
            disabled={disabled || loading}
            className={`
                w-full px-6 py-2.5 text-sm text-white font-bold bg-indigo-600 rounded-2xl
                hover:bg-indigo-500 active:scale-[0.98] transition-all duration-300
                shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                flex items-center justify-center gap-2
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
