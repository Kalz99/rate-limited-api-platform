import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/DashboardLayout';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Mail, Lock, Globe, Play } from 'lucide-react';
import { ApiTabs } from '../components/ApiTabs';
import { ApiType } from '../types';
import { ResponseConsole } from '../components/ResponseConsole';

import { useApiSimulation } from '../hooks/useApiSimulation';

export const ApiSimulation: React.FC = () => {
    const {
        selectedApi,
        setSelectedApi,
        inputs,
        handleInputChange,
        response,
        isLoading,
        handleRunSimulation
    } = useApiSimulation();

    const apiOptions = [
        { id: 'email' as ApiType, label: 'Email Validation', path: 'api/email/validate', icon: <Mail size={18} /> },
        { id: 'password' as ApiType, label: 'Password Check', path: 'api/password/check', icon: <Lock size={18} /> },
        { id: 'ip' as ApiType, label: 'IP Information', path: 'api/ip/info', icon: <Globe size={18} /> },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                    <h2 className="text-3xl font-medium text-[var(--text-h)] tracking-tighter">
                        API Simulation
                    </h2>
                    <p className="text-lg text-[var(--text)] max-w-3xl">
                        Test your API integration and rate-limit handling in a controlled environment.
                    </p>
                </div>


                <div className="space-y-6 max-w-6xl mx-auto">
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
                                        <h3 className="font-medium text-[var(--text-h)] leading-tight">Request Configuration</h3>
                                        <p className="text-xs text-[var(--text)] opacity-70">Endpoint: {apiOptions.find(o => o.id === selectedApi)?.path}</p>
                                    </div>
                                </div>

                                {selectedApi === 'email' && (
                                    <Input
                                        label="Email Address"
                                        placeholder="Enter email to validate (e.g. test@example.com)"
                                        type="email"
                                        value={inputs.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                )}

                                {selectedApi === 'password' && (
                                    <Input
                                        label="Password"
                                        placeholder="Enter password to check strength"
                                        type="password"
                                        value={inputs.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                    />
                                )}

                                {selectedApi === 'ip' && (
                                    <Input
                                        label="IP Address"
                                        placeholder="Enter IP address (e.g. 192.168.1.1)"
                                        type="text"
                                        value={inputs.ip}
                                        onChange={(e) => handleInputChange('ip', e.target.value)}
                                    />
                                )}

                                <Button
                                    className="mt-4"
                                    onClick={handleRunSimulation}
                                    disabled={isLoading}
                                >
                                    <Play size={18} className={isLoading ? 'animate-pulse' : ''} />
                                    {isLoading ? 'Running...' : 'Run Simulation'}
                                </Button>

                            </div>
                        </div>


                        <ResponseConsole
                            response={response}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
