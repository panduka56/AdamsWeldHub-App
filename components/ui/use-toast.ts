import * as React from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

const toastContext = React.createContext<{
  toast: (props: ToastProps) => void
}>({
  toast: () => {},
})

export const useToast = () => {
  return React.useContext(toastContext)
}

export const toast = (props: ToastProps) => {
  console.log("Toast:", props) // For now, just log to console
} 