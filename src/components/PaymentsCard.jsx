import { useState } from 'react'
import { Building2, Wrench, Users, Check } from 'lucide-react'
import { payments } from '../data/dashboard.js'

const iconMap = {
  building: Building2,
  wrench: Wrench,
  users: Users,
}

// Extra entries revealed by the "View all" toggle (same shape as
// payments in src/data/dashboard.js).
const extraPayments = [
  { title: 'Liability Insurance', date: 'Jun 15', amount: '$2,410.00', icon: 'building' },
  { title: 'Floor Refinishing', date: 'Jun 21', amount: '$1,190.00', icon: 'wrench' },
]

export default function PaymentsCard() {
  const [paidIds, setPaidIds] = useState(() => new Set())
  const [showAll, setShowAll] = useState(false)

  const items = showAll ? [...payments, ...extraPayments] : payments

  const togglePaid = (id) =>
    setPaidIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="h-full rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink">Upcoming Payments</h3>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-xs font-medium text-accent transition hover:underline"
        >
          {showAll ? 'Show less' : 'View all'}
        </button>
      </div>
      <ul className="mt-3 divide-y divide-black/5">
        {items.map((payment, index) => {
          const Icon = iconMap[payment.icon] || Building2
          const id = `${payment.title}-${payment.date}-${index}`
          const isPaid = paidIds.has(id)
          return (
            <li
              key={id}
              className={`flex items-center gap-3 py-2.5 transition ${
                isPaid ? 'opacity-60' : ''
              }`}
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-shell">
                <Icon size={16} className="text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">{payment.title}</p>
                <p className="text-xs text-muted">{payment.date}</p>
              </div>
              <p
                className={`text-sm font-bold text-ink ${
                  isPaid ? 'line-through' : ''
                }`}
              >
                {payment.amount}
              </p>
              <button
                type="button"
                aria-pressed={isPaid}
                aria-label={
                  isPaid
                    ? `Mark ${payment.title} as unpaid`
                    : `Mark ${payment.title} as paid`
                }
                onClick={() => togglePaid(id)}
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                  isPaid
                    ? 'border-accent bg-accent'
                    : 'border-black/10 hover:border-accent'
                }`}
              >
                {isPaid && <Check className="h-3.5 w-3.5 text-white" />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
