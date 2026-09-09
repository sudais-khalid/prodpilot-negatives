import { useMemo, useState } from 'react'
import {
  Building2,
  ChevronRight,
  LayoutGrid,
  List,
  Ruler,
  Users,
} from 'lucide-react'
import Dropdown from '../components/ui/Dropdown.jsx'
import Modal from '../components/ui/Modal.jsx'

// ---- Mock data -------------------------------------------------------------

const BUILDINGS = ['All Clubs', 'VoltFit Midtown', 'VoltFit Harbor', 'VoltFit Chelsea']

const INITIAL_SPACES = [
  { id: 1, building: 'VoltFit Midtown', suite: 'Studio A · Strength Floor', rsf: 2400, desks: 18, status: 'Booked', rent: 880 },
  { id: 2, building: 'VoltFit Midtown', suite: 'Studio B · Cycle Room', rsf: 1150, desks: 28, status: 'Open', rent: 460 },
  { id: 3, building: 'VoltFit Harbor', suite: 'Studio C · HIIT Bay', rsf: 3100, desks: 24, status: 'Booked', rent: 1240 },
  { id: 4, building: 'VoltFit Harbor', suite: 'Studio D · Recovery Suite', rsf: 900, desks: 10, status: 'Held', rent: 360 },
  { id: 5, building: 'VoltFit Chelsea', suite: 'Studio E · Yoga Loft', rsf: 4800, desks: 36, status: 'Booked', rent: 2160 },
  { id: 6, building: 'VoltFit Chelsea', suite: 'Studio F · Boxing Cage', rsf: 1750, desks: 16, status: 'Open', rent: 700 },
]

const STATUS_STYLES = {
  Booked: 'bg-leased/10 text-leased',
  Open: 'bg-upSoft text-up',
  Held: 'bg-accentSoft text-accent',
}

const fmt = (n) => n.toLocaleString('en-US')

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  )
}

// ---- Page ------------------------------------------------------------------

export default function WorkplacePage() {
  const [building, setBuilding] = useState('All Clubs')
  const [view, setView] = useState('grid') // 'grid' | 'list'
  const [spaces, setSpaces] = useState(INITIAL_SPACES)
  const [selected, setSelected] = useState(null) // space shown in the modal

  const filtered = useMemo(
    () => spaces.filter((s) => building === 'All Clubs' || s.building === building),
    [spaces, building]
  )

  const kpis = useMemo(() => {
    const buildings = new Set(filtered.map((s) => s.building)).size
    const occupied = filtered.filter((s) => s.status === 'Booked').length
    const totalRsf = filtered.reduce((sum, s) => sum + s.rsf, 0)
    const availableRsf = filtered
      .filter((s) => s.status === 'Open')
      .reduce((sum, s) => sum + s.rsf, 0)
    const occupancy = filtered.length ? Math.round((occupied / filtered.length) * 100) : 0
    return [
      { label: 'Total Clubs', value: String(buildings), unit: '', hint: building === 'All Clubs' ? 'Across network' : `In ${building}` },
      { label: 'Studio Utilization', value: String(occupancy), unit: '%', hint: `${occupied} of ${filtered.length} studios` },
      { label: 'Total Floor Area', value: fmt(totalRsf), unit: 'SF', hint: 'Training square feet' },
      { label: 'Open Floor Area', value: fmt(availableRsf), unit: 'SF', hint: 'Ready to book' },
    ]
  }, [filtered, building])

  const reserveSpace = (id) => {
    setSpaces((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'Held' } : s)))
    setSelected(null)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">Studios</h1>
        <Dropdown options={BUILDINGS} value={building} onChange={setBuilding} icon={Building2} />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <p className="text-xs text-muted">{kpi.label}</p>
            <p className="mt-2 text-[28px] font-bold leading-none tracking-tight text-ink">
              {kpi.value}
              {kpi.unit && (
                <span className="ml-1 align-super text-sm font-medium text-muted">
                  {kpi.unit}
                </span>
              )}
            </p>
            <p className="mt-3 text-xs text-muted">{kpi.hint}</p>
          </div>
        ))}
      </div>

      {/* Spaces section header + view toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-ink">
          Studios <span className="ml-1 text-xs font-medium text-muted">{filtered.length}</span>
        </h2>
        <div className="flex items-center gap-1 rounded-full bg-shell p-1">
          {[
            { key: 'grid', icon: LayoutGrid },
            { key: 'list', icon: List },
          ].map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              aria-label={`${key} view`}
              className={`grid h-8 w-8 place-items-center rounded-full transition-all ${
                view === key
                  ? 'bg-white text-ink shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Spaces — grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((space) => (
            <button
              key={space.id}
              type="button"
              onClick={() => setSelected(space)}
              className="rounded-card bg-white p-5 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-shell text-muted">
                  <Building2 size={18} />
                </div>
                <StatusBadge status={space.status} />
              </div>
              <p className="mt-3 font-semibold text-ink">{space.building}</p>
              <p className="mt-0.5 text-xs text-muted">{space.suite}</p>
              <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Ruler size={13} /> {fmt(space.rsf)} SF
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Users size={13} /> {space.desks} spots
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Spaces — list view */}
      {view === 'list' && (
        <div className="divide-y divide-black/5 rounded-card bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {filtered.map((space) => (
            <button
              key={space.id}
              type="button"
              onClick={() => setSelected(space)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-shell/60"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-shell text-muted">
                <Building2 size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{space.building}</p>
                <p className="truncate text-xs text-muted">{space.suite}</p>
              </div>
              <span className="hidden w-24 text-right text-sm font-semibold text-ink sm:block">
                {fmt(space.rsf)}
                <span className="ml-1 text-xs font-normal text-muted">SF</span>
              </span>
              <span className="hidden w-20 text-right text-sm text-muted sm:block">
                {space.desks} spots
              </span>
              <StatusBadge status={space.status} />
              <ChevronRight size={16} className="text-muted" />
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="rounded-card border border-dashed border-black/10 p-8 text-center text-sm text-muted">
          No studios found for this club.
        </div>
      )}

      {/* Space details modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.building ?? ''}
        footer={
          selected?.status === 'Open' ? (
            <button
              type="button"
              onClick={() => reserveSpace(selected.id)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Hold Studio
            </button>
          ) : null
        }
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{selected.suite}</p>
              <StatusBadge status={selected.status} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Club', value: selected.building },
                { label: 'Studio', value: selected.suite },
                { label: 'Floor Area', value: `${fmt(selected.rsf)} SF` },
                { label: 'Class Spots', value: selected.desks },
              ].map((row) => (
                <div key={row.label} className="rounded-xl bg-shell px-3 py-2.5">
                  <p className="text-xs text-muted">{row.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-black/5 pt-3">
              <p className="text-sm text-muted">Hourly Rate</p>
              <p className="text-sm font-bold text-ink">${fmt(selected.rent)} / hr</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
