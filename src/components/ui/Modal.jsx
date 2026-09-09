import { X } from 'lucide-react'

// Centered dialog. Props: open, onClose, title, children, footer (optional actions row).
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="w-full max-w-md rounded-card bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-shell hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
