// useToast.tsx
import type { ToastContextType } from "@/context/toast/ToastContext"
import ToastContext from "@/context/toast/ToastContext"
import { createContext, useContext, useState, useCallback } from "react"

export const useToast = ():ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
