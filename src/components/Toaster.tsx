import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'

export type ToastType = 'info' | 'success' | 'warning' | 'danger'

interface Toast {
  id: number
  message: string
  type: ToastType
}

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {})

const styles: Record<ToastType, { icon: typeof Info, className: string }> = {
  info: { icon: Info, className: 'text-muted' },
  success: { icon: CircleCheck, className: 'text-accent' },
  warning: { icon: TriangleAlert, className: 'text-warning' },
  danger: { icon: CircleAlert, className: 'text-danger' }
}

export function ToastProvider ({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = counter.current++
    setToasts((current) => [...current, { id, message, type }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-xs flex-col gap-2" aria-live="polite" aria-atomic="false">
        {toasts.map(({ id, message, type }) => {
          const { icon: Icon, className } = styles[type]
          return (
            <div key={id} role="status" className="toast-in pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-bg p-3 text-sm shadow-lg shadow-black/5 dark:shadow-black/40">
              <Icon className={`mt-0.5 size-4 shrink-0 ${className}`} aria-hidden="true" />
              <span>{message}</span>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast () {
  return useContext(ToastContext)
}
