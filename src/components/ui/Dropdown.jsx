import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

// Standard white pill dropdown used across the app.
// Props:
//   options  — string[] (or { label, value } objects)
//   value    — currently selected option (string)
//   onChange — called with the selected option
//   icon     — optional lucide icon component shown before the label
//   align    — 'left' (default) | 'right' menu alignment
//   className — extra classes for the trigger button
export default function Dropdown({ options = [], value, onChange, icon: Icon, align = 'left', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const normalize = (opt) => (typeof opt === 'object' ? opt : { label: opt, value: opt })

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition-shadow hover:shadow ${className}`}
      >
        {Icon && <Icon size={16} className="text-muted" />}
        <span>{value}</span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-30 mt-2 min-w-[180px] rounded-2xl border border-black/5 bg-white p-1.5 shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {options.map((raw) => {
            const opt = normalize(raw)
            const selected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange?.(opt.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  selected ? 'bg-accentSoft font-medium text-accent' : 'text-ink hover:bg-shell'
                }`}
              >
                <span className="flex-1">{opt.label}</span>
                {selected && <Check size={14} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
