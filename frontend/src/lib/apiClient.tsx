import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://54.177.105.15:5000", // your backend
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;