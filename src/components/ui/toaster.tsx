import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { Button } from "./button";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 w-full max-w-sm space-y-4 p-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
            toast.type === 'success' ? 'border-green-200 bg-green-50' :
            toast.type === 'error' ? 'border-red-200 bg-red-50' :
            toast.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
            'border-blue-200 bg-blue-50'
          }`}
        >
          <div className="grid gap-1">
            <div className={`text-sm font-semibold ${
              toast.type === 'success' ? 'text-green-800' :
              toast.type === 'error' ? 'text-red-800' :
              toast.type === 'warning' ? 'text-yellow-800' :
              'text-blue-800'
            }`}>
              {toast.title}
            </div>
            {toast.description && (
              <div className={`text-sm opacity-90 ${
                toast.type === 'success' ? 'text-green-700' :
                toast.type === 'error' ? 'text-red-700' :
                toast.type === 'warning' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>
                {toast.description}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-6 w-6 rounded-md p-0 opacity-70 hover:opacity-100"
            onClick={() => dismiss(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}