import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => onClose(toast.id), toast.duration || 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 flex-shrink-0" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 flex-shrink-0" />;
      default:
        return <Info className="h-5 w-5 flex-shrink-0" />;
    }
  };

  return (
    <div
      className={`flex items-center gap-3 px-6 py-4 rounded-xl border shadow-lg animate-in slide-in-from-top-4 fade-in duration-300 ${getStyles()}`}
    >
      {getIcon()}
      <span className="flex-1 font-medium text-sm">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
