export interface UseApiKeyReturn {
    apiKey: string | null;
    loading: boolean;
    regenerating: boolean;
    error: string | null;
    regenerate: () => Promise<void>;
}

