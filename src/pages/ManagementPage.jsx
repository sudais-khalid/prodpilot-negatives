import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import Dropdown from '../components/ui/Dropdown.jsx'
import Modal from '../components/ui/Modal.jsx'

const STATUSES = ['Active', 'Expiring', 'Terminated']
const TABS = ['All', ...STATUSES]

const statusBadgeStyles = {
  Active: '!bg-upSoft !text-up',
  Expiring: '!bg-accentSoft !text-accent',
  Terminated: '!bg-shell !text-muted',
}

const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const formatDues = (n) => `$${n.toLocaleString('en-US')}`

const initialMemberships = [
  { id: 1, tenant: 'Elena Rodriguez', property: 'VoltFit Midtown', rent: 89, start: 'Jan 15, 2025', end: 'Jan 14, 2027', status: 'Active' },
  { id: 2, tenant: 'Marcus Chen', property: 'VoltFit Harbor', rent: 69, start: 'Apr 1, 2025', end: 'Sep 30, 2026', status: 'Expiring' },
  { id: 3, tenant: 'Priya Nair', property: 'VoltFit Chelsea', rent: 119, start: 'Jun 1, 2024', end: 'May 31, 2026', status: 'Terminated' },
  { id: 4, tenant: 'David Okafor', property: 'VoltFit Brooklyn', rent: 59, start: 'Aug 1, 2025', end: 'Jul 31, 2027', status: 'Active' },
  { id: 5, tenant: 'Sofia Marino', property: 'VoltFit Austin', rent: 79, start: 'Oct 15, 2025', end: 'Aug 14, 2026', status: 'Expiring' },
  { id: 6, tenant: 'James Whitfield', property: 'VoltFit Midtown', rent: 149, start: 'Feb 1, 2026', end: 'Jan 31, 2028', status: 'Active' },
  { id: 7, tenant: 'Anaïs Laurent', property: 'VoltFit Chelsea', rent: 99, start: 'May 1, 2025', end: 'Apr 30, 2027', status: 'Active' },
]

const gridCols = 'grid grid-cols-12 items-center gap-4'

export default function ManagementPage() {
  const [leases, setLeases] = useState(initialMemberships)
  const [tab, setTab] = useState('All')
  const [addOpen, setAddOpen] = useState(false)
  const [tenant, setTenant] = useState('')
  const [property, setProperty] = useState('')
  const [rent, setRent] = useState('')

  const kpis = useMemo(() => {
    const active = leases.filter((l) => l.status === 'Active').length
    const expiring = leases.filter((l) => l.status === 'Expiring').length
    const rentTotal = leases
      .filter((l) => l.status !== 'Terminated')
      .reduce((sum, l) => sum + l.rent, 0)
    return [
      { label: 'Active Memberships', value: String(active), sub: `${leases.length} total on record` },
      { label: 'Expiring in 90 Days', value: String(expiring), sub: 'Need renewal outreach' },
      { label: 'Monthly Dues Total', value: formatDues(rentTotal), sub: 'Active and expiring plans' },
    ]
  }, [leases])

  const visibleLeases = useMemo(
    () => (tab === 'All' ? leases : leases.filter((l) => l.status === tab)),
    [leases, tab],
  )

  const setStatus = (id, status) =>
    setLeases((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)))

  const addLease = () => {
    const name = tenant.trim()
    const place = property.trim()
    const monthly = Number(rent)
    if (!name || !place || !monthly || monthly <= 0) return
    const now = new Date()
    const endDate = new Date(now)
    endDate.setFullYear(endDate.getFullYear() + 1)
    setLeases((rows) => [
      ...rows,
      {
        id: Date.now(),
        tenant: name,
        property: place,
        rent: monthly,
        start: formatDate(now),
        end: formatDate(endDate),
        status: 'Active',
      },
    ])
    setTenant('')
    setProperty('')
    setRent('')
    setAddOpen(false)
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl bg-shell px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:ring-2 focus:ring-accent/30'

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">Membership Management</h1>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <Plus size={16} />
          Add Membership
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <p className="text-xs text-muted">{kpi.label}</p>
            <p className="mt-2 text-[28px] font-bold leading-none tracking-tight text-ink">
              {kpi.value}
            </p>
            <p className="mt-2 text-xs text-muted">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex w-fit items-center gap-1 rounded-full bg-shell p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t
                ? 'bg-white text-ink shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className={`${gridCols} border-b border-black/5 pb-3`}>
          <p className="col-span-2 text-xs font-medium text-muted">Member</p>
          <p className="col-span-2 text-xs font-medium text-muted">Home Club</p>
          <p className="col-span-2 text-xs font-medium text-muted">Monthly Dues</p>
          <p className="col-span-2 text-xs font-medium text-muted">Start Date</p>
          <p className="col-span-2 text-xs font-medium text-muted">End Date</p>
          <p className="col-span-2 text-xs font-medium text-muted">Status</p>
        </div>

        {visibleLeases.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            No memberships in this category.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {visibleLeases.map((lease) => (
              <li
                key={lease.id}
                className={`${gridCols} -mx-2 rounded-xl px-2 py-3 transition-colors hover:bg-shell`}
              >
                <p className="col-span-2 truncate text-sm font-medium text-ink">
                  {lease.tenant}
                </p>
                <p className="col-span-2 truncate text-sm text-muted">{lease.property}</p>
                <p className="col-span-2 text-sm font-semibold text-ink">
                  {formatDues(lease.rent)}
                </p>
                <p className="col-span-2 text-sm text-muted">{lease.start}</p>
                <p className="col-span-2 text-sm text-muted">{lease.end}</p>
                <div className="col-span-2">
                  <Dropdown
                    options={STATUSES}
                    value={lease.status}
                    onChange={(status) => setStatus(lease.id, status)}
                    className={`!px-3 !py-1 !text-xs !font-semibold !shadow-none transition hover:brightness-95 ${
                      statusBadgeStyles[lease.status] || '!bg-shell !text-muted'
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Membership"
        footer={
          <>
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-shell hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addLease}
              disabled={!tenant.trim() || !property.trim() || !(Number(rent) > 0)}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Membership
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="text-xs font-medium text-muted">Member</span>
            <input
              type="text"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
              placeholder="e.g. Elena Rodriguez"
              autoFocus
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted">Home Club</span>
            <input
              type="text"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              placeholder="e.g. VoltFit Midtown"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted">Monthly dues</span>
            <input
              type="number"
              min="0"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              placeholder="e.g. 89"
              className={inputClass}
            />
          </label>
        </div>
      </Modal>
    </div>
  )
}
