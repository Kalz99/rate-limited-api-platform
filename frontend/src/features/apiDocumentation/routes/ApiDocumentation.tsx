import React from 'react';
import { DashboardLayout } from '../../../components/DashboardLayout';
import { EndpointCard } from '../components/EndpointCard';
import { EndpointCardProps } from '../types';

export const ApiDocumentation: React.FC = () => {
    const endpoints: EndpointCardProps[] = [
        {
            name: "Email Validation",
            description: "Verifies if an email address is valid and returns its domain information.",
            method: "POST",
            url: "/api/email/validate",
            parameters: [
                { name: "email", type: "string", required: true, description: "The email address to validate (passed as a query parameter)." }
            ],
            headers: {
                "x-api-key": "<your_api_key>",
                "Content-Type": "application/json"
            },
            exampleResponse: {
                "success": true,
                "source": "server",
                "data": {
                    "email": "user@example.com",
                    "valid": true,
                    "domain": "example.com"
                }
            },
            statusCodes: [
                { code: 200, description: "Successfully validated email." },
                { code: 400, description: "Bad Request - Email is required." },
                { code: 401, description: "Unauthorized - API key required." },
                { code: 403, description: "Forbidden - Invalid API key." },
                { code: 429, description: "Too Many Requests - Rate limit or daily quota exceeded." }
            ]
        },
        {
            name: "Password Strength Check",
            description: "Evaluates the strength of a password based on length and character variety.",
            method: "POST",
            url: "/api/password/check",
            parameters: [
                { name: "password", type: "string", required: true, description: "The password to evaluate (passed in the request body)." }
            ],
            headers: {
                "x-api-key": "<your_api_key>",
                "Content-Type": "application/json"
            },
            exampleResponse: {
                "success": true,
                "source": "server",
                "data": {
                    "strength": "strong",
                    "score": 3
                }
            },
            statusCodes: [
                { code: 200, description: "Successfully evaluated password." },
                { code: 400, description: "Bad Request - Password is required." },
                { code: 401, description: "Unauthorized - API key required." },
                { code: 429, description: "Too Many Requests - Rate limit or daily quota exceeded." }
            ]
        },
        {
            name: "IP Information",
            description: "Retrieves location information for a given IP address. Defaults to the requester's IP if none provided.",
            method: "POST",
            url: "/api/ip/info",
            parameters: [
                { name: "ip", type: "string", required: false, description: "The IP address to look up (passed as a query parameter)." }
            ],
            headers: {
                "x-api-key": "<your_api_key>",
                "Content-Type": "application/json"
            },
            exampleResponse: {
                "success": true,
                "source": "server",
                "data": {
                    "ip": "8.8.8.8",
                    "country": "United States",
                    "city": "Mountain View"
                }
            },
            statusCodes: [
                { code: 200, description: "Successfully retrieved IP info." },
                { code: 401, description: "Unauthorized - API key required." },
                { code: 429, description: "Too Many Requests - Rate limit or daily quota exceeded." }
            ]
        }
    ];

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col gap-2 border-b border-[var(--border)] pb-8">
                    <h2 className="text-3xl font-black text-[var(--text-h)] tracking-tighter">
                        API Documentation
                    </h2>
                    <p className="text-lg text-[var(--text)] max-w-3xl">
                        Welcome to the RateGuard API reference. Use these endpoints to integrate our rate-limiting and monitoring capabilities into your own applications.
                    </p>
                </div>

                <div className="space-y-6 max-w-6xl mx-auto">
                    {endpoints.map((endpoint, i) => (
                        <EndpointCard key={i} {...endpoint} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};
