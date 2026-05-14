import { useState } from "react";
import * as authApi from "../api/authApi";
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuthStore();

    const loginUser = async (data: any) => {
        try {
            setLoading(true);
            const res = await authApi.login(data);

            localStorage.setItem("token", res.data.token);
            
            const userRes = await authApi.getUser();
            
            if (userRes.data.success && userRes.data.user) {
                const { username, email, plan, apiKey } = userRes.data.user;
                const userData = { username, email, plan, apiKey };
                
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }

            return res.data;
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (data: any) => {
        try {
            setLoading(true);
            const res = await authApi.register(data);


            return res.data;
        } finally {
            setLoading(false);
        }
    };

    return { loginUser, registerUser, loading };
};