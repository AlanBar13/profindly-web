import { useEffect } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number; // ms
}

export default function Toast({ message, show, type = "success", onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed left-1/2 bottom-8 z-50 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-sm sm:text-base font-medium transition-all duration-300
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
        animate-fade-in-up`}
      role="alert"
    >
      {message}
    </div>
  );
}
