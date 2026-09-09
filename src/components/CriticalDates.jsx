import { useState } from 'react'
import { CalendarDays, Check } from 'lucide-react'
import { criticalDates } from '../data/dashboard.js'

// Extra entries revealed by the "View all" toggle (same shape as
// criticalDates in src/data/dashboard.js).
const extraDates = [
  {
    title: 'Onboarding Day',
    date: 'Mar 02',
    description: 'Member onboarding with Mara Quinn for VoltFit Austin in Austin',
  },
  {
    title: 'Safety Inspection',
    date: 'Mar 11',
    description: 'Annual floor inspection with Devon Park for VoltFit Harbor in Brooklyn',
  },
]

// Renders a description like "Annual contract review with Oguz B for Miner
// House in Monterrey", bolding the person (between ' with ' and ' for ')
// and the property (between ' for ' and ' in ') as in the reference.
function Description({ text }) {
  const parts = text.split(/( with | for | in )/)
  return parts.map((part, i) => {
    const prev = parts[i - 1]
    const isName = prev === ' with ' || prev === ' for '
    return isName ? (
      <span key={i} className="font-semibold text-ink">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  })
}

export default function CriticalDates() {
  const [doneIds, setDoneIds] = useState(() => new Set())
  const [showAll, setShowAll] = useState(false)

  const items = showAll ? [...criticalDates, ...extraDates] : criticalDates

  const toggleDone = (id) =>
    setDoneIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="flex h-full flex-col rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink">Upcoming Deadlines</h3>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-xs font-medium text-accent transition hover:underline"
        >
          {showAll ? 'Show less' : 'View all'}
        </button>
      </div>

      <div className="mt-3 space-y-4 overflow-hidden">
        {items.map((item, index) => {
          const id = `${item.title}-${item.date}`
          const isDone = doneIds.has(id)
          return (
            <div key={id} className={index > 0 ? 'border-t border-black/5 pt-4' : ''}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => toggleDone(id)}
                className="-mx-2 -my-1 block rounded-lg px-2 py-1 text-left transition hover:bg-shell focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-sm font-semibold transition ${
                        isDone ? 'text-muted line-through' : 'text-ink'
                      }`}
                    >
                      {item.title}
                    </p>
                    {isDone && <Check className="h-3.5 w-3.5 text-accent" />}
                  </div>
                  <span className="text-xs text-muted">{item.date}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  <Description text={item.description} />
                  <CalendarDays className="ml-1 inline h-3 w-3 align-[-1.5px] text-muted" />
                </p>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
