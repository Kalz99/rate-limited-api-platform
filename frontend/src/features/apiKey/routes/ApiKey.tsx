import React from 'react';
import { DashboardLayout } from '../../../components/DashboardLayout';
import { CardView } from '../components/CardView';
import { Button } from '../../../components/Button';
import { Copy, RefreshCcw } from 'lucide-react';
import { useApiKey } from '../hooks/useApiKey';

import { useToast } from '../../../context/ToastContext';

export const ApiKey: React.FC = () => {
    const { apiKey, loading, regenerating, error, regenerate } = useApiKey();
    const { showToast } = useToast();

    const handleCopy = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            showToast("API key copied to clipboard", "success");
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                    <h2 className="text-3xl font-black text-[var(--text-h)] tracking-tighter">
                        API Authentication
                    </h2>
                    <p className="text-lg text-[var(--text)] max-w-3xl">
                        Manage your secret keys to authenticate requests to our API.
                    </p>
                </div>

                <div className="space-y-6 max-w-6xl mx-auto">
                    {/* API Key Card View Component */}
                    <CardView
                        title="API key"
                        apiKey={loading ? "Loading..." : regenerating ? "Regenerating..." : error ? "Error loading key" : apiKey || "No key found"}
                        copyButton={
                            <Button
                                onClick={handleCopy}
                                disabled={loading || regenerating || !!error || !apiKey}
                            >
                                <Copy size={20} />
                                Copy Key
                            </Button>
                        }
                        regenerateButton={
                            <Button
                                variant="secondary"
                                onClick={regenerate}
                                disabled={loading || regenerating || !!error}
                            >
                                <RefreshCcw size={20} className={regenerating ? "animate-spin" : ""} />
                                {regenerating ? "Regenerating..." : "Regenerate"}
                            </Button>
                        }
                    />

                    {/* Security Tip */}
                    <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 flex gap-4 items-start">
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-800 dark:text-amber-200 text-sm">Security Recommendation</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                Never share your API key in publicly accessible areas like GitHub, client-side code, or insecure environments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
