import { ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"

interface Props { open: boolean; onClose: () => void; title: string; children: ReactNode }

export function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [open, onClose])
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
