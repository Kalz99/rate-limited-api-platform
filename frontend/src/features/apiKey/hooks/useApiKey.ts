import { useState, useEffect, useCallback } from "react";
import { getKey, regenerateKey } from "../api/Key";
import type { UseApiKeyReturn } from "../types";
import { useToast } from "../../../context/ToastContext";

export const useApiKey = (): UseApiKeyReturn => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [regenerating, setRegenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();

    const fetchKey = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getKey();
            setApiKey(response.data.user.apiKey);
            setError(null);
        } catch (err) {
            setError("Failed to fetch API key.");
        } finally {
            setLoading(false);
        }
    }, []);

    const regenerate = async () => {
        try {
            setRegenerating(true);
            const response = await regenerateKey();
            setApiKey(response.data.apiKey);
            setError(null);
            showToast("API key regenerated successfully", "success");
        } catch (err) {
            setError("Failed to regenerate API key.");
            showToast("Failed to regenerate API key", "error");
        } finally {
            setRegenerating(false);
        }
    };

    useEffect(() => {
        fetchKey();
    }, [fetchKey]);

    return { apiKey, loading, regenerating, error, regenerate };
};
