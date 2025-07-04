import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
}

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, type = 'info' }: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, title, description, type };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    toast,
    toasts,
    dismiss
  };
};

export { useToast };
export type { Toast, ToastOptions };