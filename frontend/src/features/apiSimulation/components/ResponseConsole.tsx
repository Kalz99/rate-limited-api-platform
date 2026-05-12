import React from 'react';
import { Terminal } from 'lucide-react';

interface ResponseConsoleProps {
    status?: string;
    isActive?: boolean;
    children?: React.ReactNode;
}

export const ResponseConsole: React.FC<ResponseConsoleProps> = ({ status = 'Idle', isActive = false, children }) => {
    return (
        <div className="flex flex-col rounded-3xl bg-[#0d0d12] border border-slate-800 shadow-2xl overflow-hidden h-[450px]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-indigo-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Response Console</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
            </div>
            
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto">
                <div className="space-y-2">
                    {children || (
                        <>
                            <div className="flex gap-2">
                                <span className="text-emerald-500 font-bold">➜</span>
                                <span className="text-slate-500 italic">// Ready to simulate requests...</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-indigo-400 font-bold">➜</span>
                                <span className="text-slate-400">Select an API and click "Run Simulation"</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="px-6 py-3 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Status: {status}</span>
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-indigo-500 animate-pulse' : 'bg-slate-600'}`} />
                    <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                        {isActive ? 'Active Request' : 'No Active Requests'}
                    </span>
                </div>
            </div>
        </div>
    );
};
