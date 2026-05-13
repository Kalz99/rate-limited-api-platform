import React from 'react';
import { Button } from '../../../components/Button';
import { Key, Copy, RefreshCcw } from 'lucide-react';

interface CardViewProps {
    title: string;
    apiKey: string;
    copyButton: React.ReactNode;
    regenerateButton: React.ReactNode;
}

export const CardView: React.FC<CardViewProps> = ({ title, apiKey, copyButton, regenerateButton }) => {
    return (
        <div className="p-6 rounded-2xl bg-[var(--bg)] border border-[var(--border)] shadow-xl shadow-indigo-500/5 relative overflow-hidden group">
            {/* Premium Gradient Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-indigo-500/10 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-[60px] -ml-24 -mb-24 group-hover:bg-purple-500/10 transition-all duration-500" />

            <div className="relative z-10">
                {/* Top: Topic */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                        <Key size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-[var(--text-h)] tracking-tight">{title}</h2>
                        <p className="text-xs text-[var(--text)] opacity-70">Secret key for backend integration</p>
                    </div>
                </div>

                {/* Middle: API Key Display */}
                <div className="bg-[var(--accent-bg)] border border-indigo-500/20 p-4 rounded-2xl mb-8 group/key relative">
                    <div className="flex items-center justify-center gap-6">
                        <code className="text-xl font-mono text-indigo-500 break-all select-all tracking-wider">
                            {apiKey}
                        </code>
                    </div>

                </div>

                {/* Bottom: Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="w-full sm:w-auto sm:min-w-[160px]">
                        {copyButton}
                    </div>
                    <div className="w-full sm:w-auto sm:min-w-[160px]">
                        {regenerateButton}
                    </div>
                </div>
            </div>
        </div>
    );
};


