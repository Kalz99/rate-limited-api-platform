import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // your backend
});

apiClient.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
        config.headers["X-Api-Key"] = `${apiKey}`;
    }
    return config;
});

export default apiClient;