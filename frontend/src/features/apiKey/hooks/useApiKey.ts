import { useState } from "react";
import { regenerateKey } from "../api/Key";
import type { UseApiKeyReturn } from "../types";
import { useToast } from "../../../context/ToastContext";
import { useAuthStore } from "../../auth/store/useAuthStore";

export const useApiKey = (): UseApiKeyReturn => {
    const { user, setUser } = useAuthStore();
    const [regenerating, setRegenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    const apiKey = user?.apiKey || null;
    const loading = false;
    const regenerate = async () => {
        try {
            setRegenerating(true);
            const response = await regenerateKey();
            const newKey = response.data.apiKey;


            if (user) {
                const updatedUser = { ...user, apiKey: newKey };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }

            setError(null);
            showToast("API key regenerated successfully", "success");
        } catch (err) {
            setError("Failed to regenerate API key.");
            showToast("Failed to regenerate API key", "error");
        } finally {
            setRegenerating(false);
        }
    };

    return { apiKey, loading, regenerating, error, regenerate };
};
