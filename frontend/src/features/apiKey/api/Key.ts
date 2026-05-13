import apiClient from "@/lib/apiClient";

export const getKey = () => {
    return apiClient.get("/me");
};


export const regenerateKey = () => {
    return apiClient.post("/regenerate-api-key");
};

