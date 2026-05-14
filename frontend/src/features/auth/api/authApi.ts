// authApi.js
import apiClient from "@/lib/apiClient";

export const login = (data: any) => {
    return apiClient.post("/login", data);
};

export const register = (data: any) => {
    return apiClient.post("/register", data);
};

export const getUser = () => {
    return apiClient.get("/me");
};
