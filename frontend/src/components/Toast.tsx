import React from 'react';
import { useToast } from '../context/ToastContext';

export const Toast: React.FC = () => {
    const { toasts } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3
                        animate-in slide-in-from-right fade-in duration-300
                        ${toast.type === 'success' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}
                    `}
                >
                    {toast.type === 'success' ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                    <span className="text-sm font-semibold tracking-tight">{toast.message}</span>
                </div>
            ))}
        </div>
    );
};
