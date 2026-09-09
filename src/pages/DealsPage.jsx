import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Plus, Search } from 'lucide-react'
import Modal from '../components/ui/Modal.jsx'

// ---- Mock data -------------------------------------------------------------

const COLUMNS = [
  { key: 'lead', title: 'Prospect', dot: 'bg-leased' },
  { key: 'negotiation', title: 'In Talks', dot: 'bg-amber-400' },
  { key: 'closed', title: 'Signed', dot: 'bg-up' },
]

const AVATAR_COLORS = [
  'bg-leased/10 text-leased',
  'bg-owned/10 text-owned',
  'bg-upSoft text-up',
  'bg-amber-100 text-amber-600',
  'bg-accentSoft text-accent',
]

const INITIAL_DEALS = [
  { id: 1, company: 'Atlas Ventures', property: 'VoltFit Midtown · Corporate 50', value: 42000, days: 3, stage: 'lead', color: 0 },
  { id: 2, company: 'Brightline Media', property: 'VoltFit Chelsea · Day Pass Pack', value: 28500, days: 6, stage: 'lead', color: 1 },
  { id: 3, company: 'Northwind Labs', property: 'VoltFit Harbor · Team 25', value: 15800, days: 12, stage: 'negotiation', color: 2 },
  { id: 4, company: 'Copper & Co.', property: 'VoltFit Midtown · Executive', value: 52400, days: 9, stage: 'negotiation', color: 3 },
  { id: 5, company: 'Helio Robotics', property: 'VoltFit Chelsea · Campus Pass', value: 96000, days: 21, stage: 'closed', color: 4 },
  { id: 6, company: 'Fernwell Group', property: 'VoltFit Harbor · Wellness Pack', value: 61200, days: 15, stage: 'closed', color: 1 },
]

const fmt = (n) => n.toLocaleString('en-US')

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

// ---- Page ------------------------------------------------------------------

export default function DealsPage() {
  const [deals, setDeals] = useState(INITIAL_DEALS)
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ company: '', property: '', value: '' })

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return deals
    return deals.filter(
      (d) =>
        d.company.toLowerCase().includes(q) || d.property.toLowerCase().includes(q)
    )
  }, [deals, query])

  const moveDeal = (id, dir) => {
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d
        const idx = COLUMNS.findIndex((c) => c.key === d.stage)
        const next = Math.min(Math.max(idx + dir, 0), COLUMNS.length - 1)
        return { ...d, stage: COLUMNS[next].key, days: 0 }
      })
    )
  }

  const addDeal = () => {
    const value = Number(form.value.replace(/[^0-9]/g, '')) || 0
    setDeals((prev) => [
      ...prev,
      {
        id: Date.now(),
        company: form.company.trim(),
        property: form.property.trim(),
        value,
        days: 0,
        stage: 'lead',
        color: prev.length % AVATAR_COLORS.length,
      },
    ])
    setForm({ company: '', property: '', value: '' })
    setModalOpen(false)
  }

  const canAdd = form.company.trim() && form.property.trim()

  const inputClass =
    'w-full rounded-xl border border-black/5 bg-shell px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent/40 focus:bg-white'

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">Partners</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search partners..."
              className="w-64 rounded-full bg-white py-2 pl-9 pr-4 text-sm text-ink shadow-sm outline-none transition placeholder:text-muted focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent/90"
          >
            <Plus size={16} />
            New Partnership
          </button>
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-3 gap-5">
        {COLUMNS.map((col, colIdx) => {
          const cards = visible.filter((d) => d.stage === col.key)
          return (
            <div key={col.key} className="flex flex-col gap-3 rounded-card bg-backdrop/40 p-3">
              <div className="flex items-center gap-2 px-1">
                <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                <h2 className="text-sm font-semibold text-ink">{col.title}</h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-muted">
                  {cards.length}
                </span>
              </div>

              {cards.map((deal) => (
                <div
                  key={deal.id}
                  className="rounded-card bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold ${AVATAR_COLORS[deal.color]}`}
                    >
                      {initials(deal.company)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{deal.company}</p>
                      <p className="truncate text-xs text-muted">{deal.property}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {colIdx > 0 && (
                        <button
                          type="button"
                          onClick={() => moveDeal(deal.id, -1)}
                          aria-label={`Move ${deal.company} to ${COLUMNS[colIdx - 1].title}`}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:bg-shell hover:text-ink"
                        >
                          <ChevronLeft size={14} />
                        </button>
                      )}
                      {colIdx < COLUMNS.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveDeal(deal.id, 1)}
                          aria-label={`Move ${deal.company} to ${COLUMNS[colIdx + 1].title}`}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:bg-shell hover:text-ink"
                        >
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-bold text-ink">${fmt(deal.value)}</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-shell px-2 py-0.5 text-xs text-muted">
                      <Clock size={12} />
                      {deal.days} days in stage
                    </span>
                  </div>
                </div>
              ))}

              {cards.length === 0 && (
                <div className="rounded-card border border-dashed border-black/10 p-4 text-center text-xs text-muted">
                  No partnerships
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* New deal modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Partnership"
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-full bg-shell px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-backdrop"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addDeal}
              disabled={!canAdd}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add Partnership
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Company</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              placeholder="e.g. Atlas Ventures"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Package</label>
            <input
              type="text"
              value={form.property}
              onChange={(e) => setForm((f) => ({ ...f, property: e.target.value }))}
              placeholder="e.g. VoltFit Midtown · Corporate 50"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Annual Value</label>
            <input
              type="text"
              inputMode="numeric"
              value={form.value}
              onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
              placeholder="e.g. 42000"
              className={inputClass}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
