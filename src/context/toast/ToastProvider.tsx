import { useState, useCallback } from "react"
import type { ToastProps } from "./ToastContext"
import ToastContext from "./ToastContext"

const TOAST_DURATION = 3000

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback((options: Omit<ToastProps, "id">) => {
    const id = Date.now()
    const newToast: ToastProps = { id, ...options }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => removeToast(id), TOAST_DURATION)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      {/* Toast Renderer */}
      <div className="fixed top-4 right-4 space-y-3 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`relative w-72 px-4 py-3 rounded-lg shadow-lg text-white overflow-hidden
              transform transition-all duration-300 ease-out
              animate-slide-in-right 
              ${
                t.type === "success"
                  ? "bg-green-700"
                  : t.type === "error"
                  ? "bg-red-700"
                  : "bg-blue-700"
              }`}
          >
            {t.message}
            {/* Progress bar */}
            <div
              className="absolute bottom-0 right-0 h-1 bg-white/50"
              style={{
                animation: `shrink ${TOAST_DURATION}ms linear forwards`,
              }}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
