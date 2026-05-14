import apiClient from "@/lib/simulationClient";

export const validateEmail = (email: string) => {
    return apiClient.post("api/email/validate?email=" + email);
};


export const checkPassword = (password: string) => {
    return apiClient.post("api/password/check", { password });
};


export const checkIP = (ip: string) => {
    return apiClient.post("api/ip/info", { ip });
};
