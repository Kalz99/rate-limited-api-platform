export type ToastType = 'success' | 'error';

export interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

export interface ToastContextType {
    toasts: ToastItem[];
    showToast: (message: string, type: ToastType) => void;
}
