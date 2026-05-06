// useAuth.js
import { useState } from "react";
import * as authApi from "../api/authApi";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: any) => {
        try {
            setLoading(true);
            const res = await authApi.login(data);

            localStorage.setItem("token", res.data.token);

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