import apiClient from "@/lib/apiClient";

export const getUsage = () => {
    return apiClient.get("/usage");
};

export const getUsageHistory = (days: number = 7) => {
    return apiClient.get(`/usage/history?days=${days}`);
};