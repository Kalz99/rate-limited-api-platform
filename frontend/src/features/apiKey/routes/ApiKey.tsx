import React from 'react';
import { NavBar } from '../../../components/NavBar';
import { CardView } from '../components/CardView';
import { Button } from '../../../components/Button';
import { Copy, RefreshCcw } from 'lucide-react';

export const ApiKey: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-[var(--bg)]">
            <NavBar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-black text-[var(--text-h)] tracking-tighter">
                            API Authentication
                        </h2>
                        <p className="text-lg text-[var(--text)]">
                            Manage your secret keys to authenticate requests to our API.
                        </p>
                    </div>

                    {/* API Key Card View Component */}
                    <CardView
                        title="API key"
                        apiKey="sk_live_51P2vG6I9jK3mN7b8Q4r5t6y7u8i9o0p"
                        copyButton={
                            <Button copy>
                                <Copy size={20} />
                                Copy Key
                            </Button>
                        }
                        regenerateButton={
                            <Button variant="secondary">
                                <RefreshCcw size={20} />
                                Regenerate
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
            </main>
        </div>
    );
};
