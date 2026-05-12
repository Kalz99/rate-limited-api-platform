import React, { useState } from 'react';
import { NavBar } from '../../../components/NavBar';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Mail, Lock, Globe, Play } from 'lucide-react';
import { ApiTabs, ApiType } from '../components/ApiTabs';
import { ResponseConsole } from '../components/ResponseConsole';

export const ApiSimulation: React.FC = () => {
    const [selectedApi, setSelectedApi] = useState<ApiType>('email');

    const apiOptions = [
        { id: 'email' as ApiType, label: 'Email Validation', path: 'api/email/validate', icon: <Mail size={18} /> },
        { id: 'password' as ApiType, label: 'Password Check', path: 'api/password/check', icon: <Lock size={18} /> },
        { id: 'ip' as ApiType, label: 'IP Information', path: 'api/ip/info', icon: <Globe size={18} /> },
    ];

    return (
        <div className="flex min-h-screen bg-[var(--bg)]">
            <NavBar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                        <h2 className="text-3xl font-black text-[var(--text-h)] tracking-tighter">
                            API Simulation
                        </h2>
                        <p className="text-lg text-[var(--text)] max-w-3xl">
                            Test your API integration and rate-limit handling in a controlled environment.
                        </p>
                    </div>


                    <ApiTabs
                        options={apiOptions}
                        selected={selectedApi}
                        onSelect={setSelectedApi}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        <div className="p-8 rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-xl shadow-indigo-500/5 relative overflow-hidden group">

                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] -mr-32 -mt-32" />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-[var(--accent-bg)] text-[var(--accent)]">
                                        {apiOptions.find(o => o.id === selectedApi)?.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-[var(--text-h)] leading-tight">Request Configuration</h3>
                                        <p className="text-xs text-[var(--text)] opacity-70">Endpoint: {apiOptions.find(o => o.id === selectedApi)?.path}</p>
                                    </div>
                                </div>

                                {selectedApi === 'email' && (
                                    <Input
                                        label="Email Address"
                                        placeholder="Enter email to validate (e.g. test@example.com)"
                                        type="email"
                                    />
                                )}

                                {selectedApi === 'password' && (
                                    <Input
                                        label="Password"
                                        placeholder="Enter password to check strength"
                                        type="password"
                                    />
                                )}

                                {selectedApi === 'ip' && (
                                    <Input
                                        label="IP Address"
                                        placeholder="Enter IP address (e.g. 192.168.1.1)"
                                        type="text"
                                    />
                                )}

                                <Button className="mt-4">
                                    <Play size={18} />
                                    Run Simulation
                                </Button>

                            </div>
                        </div>


                        <ResponseConsole />
                    </div>
                </div>
            </main>
        </div>
    );
};
