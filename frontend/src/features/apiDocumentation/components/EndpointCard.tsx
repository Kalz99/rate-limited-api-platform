import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Clock } from 'lucide-react';
import { EndpointCardProps } from '../types';

export const EndpointCard: React.FC<EndpointCardProps> = ({
    name,
    description,
    method,
    url,
    parameters = [],
    headers = {},
    exampleResponse,
    statusCodes = []
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const methodColors = {
        GET: 'bg-green-500/10 text-green-500 border-green-500/20',
        POST: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        PUT: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        DELETE: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        PATCH: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    };

    return (
        <div 
            className={`w-full rounded-2xl bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 overflow-hidden ${
                isExpanded ? 'shadow-xl ring-1 ring-[var(--accent)]/20' : 'hover:shadow-md hover:border-[var(--accent-border)]'
            }`}
        >
            {/* Header (Always Visible) */}
            <div 
                className="p-5 cursor-pointer flex items-center justify-between gap-4 group"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4 flex-1">
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${methodColors[method]}`}>
                        {method}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-[var(--text-h)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-[var(--text)] font-mono opacity-80 mt-0.5 truncate max-w-2xl">
                            {url}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {!isExpanded && (
                        <div className="hidden md:flex items-center gap-4 text-[var(--text)] opacity-40 mr-4">
                            <div className="flex items-center gap-1.5 text-xs">
                                <Globe size={14} />
                                <span>Public</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                                <Clock size={14} />
                                <span>200ms</span>
                            </div>
                        </div>
                    )}
                    <div className="p-2 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-6 pb-8 border-t border-[var(--border)] bg-[var(--bg)] animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="mt-6 space-y-8">
                        {/* Description */}
                        <div>
                            <h4 className="text-sm font-bold text-[var(--text-h)] uppercase tracking-wider mb-2 flex items-center gap-2">
                                Description
                            </h4>
                            <p className="text-[var(--text)] leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Parameters */}
                        {parameters.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-[var(--text-h)] uppercase tracking-wider mb-4">
                                    Required Parameters
                                </h4>
                                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-[var(--accent-bg)]/30">
                                            <tr>
                                                <th className="px-4 py-3 text-xs font-bold text-[var(--text-h)]">Name</th>
                                                <th className="px-4 py-3 text-xs font-bold text-[var(--text-h)]">Type</th>
                                                <th className="px-4 py-3 text-xs font-bold text-[var(--text-h)]">Required</th>
                                                <th className="px-4 py-3 text-xs font-bold text-[var(--text-h)]">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border)]">
                                            {parameters.map((param, i) => (
                                                <tr key={i} className="hover:bg-[var(--accent-bg)]/10 transition-colors">
                                                    <td className="px-4 py-3 text-sm font-mono text-[var(--accent)]">{param.name}</td>
                                                    <td className="px-4 py-3 text-sm text-[var(--text)]">{param.type}</td>
                                                    <td className="px-4 py-3 text-sm text-[var(--text)]">
                                                        {param.required ? 
                                                            <span className="text-rose-500 font-bold">Yes</span> : 
                                                            <span className="opacity-40">No</span>
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-[var(--text)]">{param.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Headers */}
                        {Object.keys(headers).length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-[var(--text-h)] uppercase tracking-wider mb-4">
                                    Headers
                                </h4>
                                <div className="bg-[var(--code-bg)] p-4 rounded-xl border border-[var(--border)] font-mono text-sm space-y-1">
                                    {Object.entries(headers).map(([key, value]) => (
                                        <div key={key} className="flex gap-2">
                                            <span className="text-indigo-400">{key}:</span>
                                            <span className="text-[var(--text)]">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Example Response */}
                        {exampleResponse && (
                            <div>
                                <h4 className="text-sm font-bold text-[var(--text-h)] uppercase tracking-wider mb-4 flex justify-between items-center">
                                    Example Response
                                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">JSON</span>
                                </h4>
                                <div className="bg-[#1e1e2e] p-6 rounded-xl border border-slate-800 shadow-inner overflow-x-auto">
                                    <pre className="text-sm font-mono text-slate-300">
                                        {JSON.stringify(exampleResponse, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* Status Codes */}
                        {statusCodes.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-[var(--text-h)] uppercase tracking-wider mb-4">
                                    Status Codes
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {statusCodes.map((status, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                                            <span className={`font-bold px-2 py-1 rounded-lg text-xs ${
                                                status.code >= 200 && status.code < 300 ? 'bg-green-500/10 text-green-500' :
                                                status.code >= 400 ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                                {status.code}
                                            </span>
                                            <span className="text-sm text-[var(--text)]">{status.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
