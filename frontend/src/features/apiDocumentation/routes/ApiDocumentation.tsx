import React from 'react';
import { DashboardLayout } from '../../../components/DashboardLayout';
import { EndpointCard } from '../components/EndpointCard';
import { EndpointCardProps } from '../types';

export const ApiDocumentation: React.FC = () => {
    const endpoints: EndpointCardProps[] = [
        {
            name: "Get User Profile",
            description: "Retrieves the detailed profile information for the authenticated user, including subscription status and usage metrics.",
            method: "GET",
            url: "/api/v1/user/profile",
            parameters: [
                { name: "userId", type: "string", required: true, description: "The unique identifier of the user." },
                { name: "includeStats", type: "boolean", required: false, description: "Whether to include detailed usage statistics." }
            ],
            headers: {
                "Authorization": "Bearer <your_api_key>",
                "Content-Type": "application/json"
            },
            exampleResponse: {
                "status": "success",
                "data": {
                    "id": "user_12345",
                    "email": "user@example.com",
                    "plan": "premium",
                    "usage": {
                        "daily": 45,
                        "monthly": 1200
                    }
                }
            },
            statusCodes: [
                { code: 200, description: "Successfully retrieved profile." },
                { code: 401, description: "Unauthorized - Invalid API key." }
            ]
        },
        {
            name: "Create API Key",
            description: "Generates a new API key for the user. Note that this will invalidate any existing keys if the limit is reached.",
            method: "POST",
            url: "/api/v1/auth/keys",
            parameters: [
                { name: "name", type: "string", required: true, description: "A descriptive name for the API key." },
                { name: "expiresIn", type: "number", required: false, description: "Expiration time in seconds (default: never)." }
            ],
            headers: {
                "Authorization": "Bearer <your_api_key>",
                "Content-Type": "application/json"
            },
            exampleResponse: {
                "status": "created",
                "key": "sk_live_51P2vG6I9jK3mN7b8Q4r5t6y7u8i9o0p",
                "created_at": "2026-05-09T15:23:57Z"
            },
            statusCodes: [
                { code: 201, description: "Key created successfully." },
                { code: 400, description: "Bad Request - Invalid parameters." },
                { code: 429, description: "Too Many Requests - Rate limit exceeded." }
            ]
        },
        {
            name: "Delete Record",
            description: "Permanently deletes a specific data record from the platform. This action is irreversible.",
            method: "DELETE",
            url: "/api/v1/data/records/{recordId}",
            parameters: [
                { name: "recordId", type: "string", required: true, description: "The ID of the record to delete." }
            ],
            headers: {
                "Authorization": "Bearer <your_api_key>"
            },
            exampleResponse: {
                "status": "deleted",
                "message": "Record successfully removed."
            },
            statusCodes: [
                { code: 200, description: "Record deleted." },
                { code: 404, description: "Not Found - Record does not exist." }
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

                <div className="space-y-6 max-w-4xl mx-auto">
                    {endpoints.map((endpoint, i) => (
                        <EndpointCard key={i} {...endpoint} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};
