import { createContext, useContext, useState, useCallback } from "react"
import type { ToastProps } from "./ToastContext"
import ToastContext from "./ToastContext"

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback((options: Omit<ToastProps, "id">) => {
    const id = Date.now()
    const newToast: ToastProps = { id, ...options }
    setToasts((prev) => [...prev, newToast])
    setTimeout(() => removeToast(id), 3000) // auto-dismiss after 3s
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, removeToast }}>
      {children}
      {/* Toast Renderer */}
      <div className="fixed bottom-4 right-4 space-y-2 z-100">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-lg shadow-md text-white ${
              t.type === "success"
                ? "bg-green-500"
                : t.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            <strong>{t.title}</strong>
            {t.description && <div className="text-sm">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}