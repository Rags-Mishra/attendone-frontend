import { createContext, useContext, useState, useCallback } from "react"

export interface ToastProps  {
  id: number
  title: string
  description?: string
  type?: "success" | "error" | "info"
}

export interface  ToastContextType {
  toasts: ToastProps[]
  toast: (options: Omit<ToastProps, "id">) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)
export default ToastContext
