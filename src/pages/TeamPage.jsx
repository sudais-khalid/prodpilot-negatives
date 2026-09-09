import { useState } from 'react'
import { Search, Trash2, UserPlus } from 'lucide-react'
import Dropdown from '../components/ui/Dropdown.jsx'
import Modal from '../components/ui/Modal.jsx'

const INITIAL_MEMBERS = [
  { id: 1, name: 'Jane Cooper', email: 'jane@voltfit.com', role: 'Owner', status: 'Active', color: 'bg-accentSoft text-accent' },
  { id: 2, name: 'Marcus Chen', email: 'marcus@voltfit.com', role: 'Admin', status: 'Active', color: 'bg-upSoft text-up' },
  { id: 3, name: 'Priya Nair', email: 'priya@voltfit.com', role: 'Member', status: 'Active', color: 'bg-shell text-muted' },
  { id: 4, name: 'Tom Alvarez', email: 'tom@voltfit.com', role: 'Member', status: 'Pending', color: 'bg-accentSoft text-accent' },
  { id: 5, name: 'Sofia Ricci', email: 'sofia@voltfit.com', role: 'Admin', status: 'Active', color: 'bg-upSoft text-up' },
  { id: 6, name: 'David Kim', email: 'david@voltfit.com', role: 'Member', status: 'Pending', color: 'bg-shell text-muted' },
  { id: 7, name: 'Amara Osei', email: 'amara@voltfit.com', role: 'Member', status: 'Active', color: 'bg-accentSoft text-accent' },
  { id: 8, name: 'Liam Novak', email: 'liam@voltfit.com', role: 'Member', status: 'Active', color: 'bg-upSoft text-up' },
]

const ROLE_BADGE = {
  Owner: 'bg-ink text-white',
  Admin: 'bg-accentSoft text-accent',
  Member: 'bg-shell text-muted',
}

const inputBase =
  'w-full rounded-xl border bg-shell/50 px-3 py-2 text-sm outline-none transition-colors'

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export default function TeamPage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS)
  const [search, setSearch] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [invite, setInvite] = useState({ name: '', email: '', role: 'Member' })
  const [errors, setErrors] = useState({})

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  )

  const setRole = (id, role) =>
    setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, role } : m)))

  const removeMember = (id) => setMembers((ms) => ms.filter((m) => m.id !== id))

  const sendInvite = () => {
    const next = { name: !invite.name.trim(), email: !invite.email.trim() }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    setMembers((ms) => [
      ...ms,
      {
        id: Math.max(...ms.map((m) => m.id), 0) + 1,
        name: invite.name.trim(),
        email: invite.email.trim(),
        role: invite.role,
        status: 'Pending',
        color: 'bg-accentSoft text-accent',
      },
    ])
    setInvite({ name: '', email: '', role: 'Member' })
    setErrors({})
    setInviteOpen(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold text-ink">Team</h1>
        <div className="flex-1" />
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-64 rounded-full bg-white py-2 pl-9 pr-4 text-sm text-ink shadow-[0_1px_3px_rgba(0,0,0,0.04)] outline-none transition-shadow placeholder:text-muted focus:shadow"
          />
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <UserPlus size={14} />
          Invite Member
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted">
          No team members match “{search}”.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="relative rounded-card bg-white p-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              {m.role !== 'Owner' && (
                <button
                  type="button"
                  onClick={() => removeMember(m.id)}
                  className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:bg-shell hover:text-accent"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <div
                className={`mx-auto grid h-12 w-12 place-items-center rounded-full text-sm font-semibold ${m.color}`}
              >
                {initials(m.name)}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{m.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted">{m.email}</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_BADGE[m.role]}`}>
                  {m.role}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${m.status === 'Active' ? 'bg-up' : 'bg-amber-400'}`}
                  />
                  {m.status}
                </span>
              </div>
              {m.role !== 'Owner' && (
                <div className="mt-3 flex justify-center">
                  <Dropdown
                    options={['Admin', 'Member']}
                    value={m.role}
                    onChange={(v) => setRole(m.id, v)}
                    className="px-3 py-1 text-xs shadow-none ring-1 ring-black/5"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite Member"
        footer={
          <>
            <button
              type="button"
              onClick={() => setInviteOpen(false)}
              className="rounded-full bg-shell px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-backdrop"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={sendInvite}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Send Invite
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Name</label>
            <input
              type="text"
              value={invite.name}
              onChange={(e) => {
                setInvite((i) => ({ ...i, name: e.target.value }))
                setErrors((er) => ({ ...er, name: false }))
              }}
              placeholder="Full name"
              className={`${inputBase} ${errors.name ? 'border-accent' : 'border-black/10 focus:border-accent'}`}
            />
            {errors.name && <p className="mt-1 text-xs text-accent">Please enter a name.</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Email</label>
            <input
              type="email"
              value={invite.email}
              onChange={(e) => {
                setInvite((i) => ({ ...i, email: e.target.value }))
                setErrors((er) => ({ ...er, email: false }))
              }}
              placeholder="name@company.com"
              className={`${inputBase} ${errors.email ? 'border-accent' : 'border-black/10 focus:border-accent'}`}
            />
            {errors.email && <p className="mt-1 text-xs text-accent">Please enter an email.</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Role</label>
            <Dropdown
              options={['Admin', 'Member']}
              value={invite.role}
              onChange={(v) => setInvite((i) => ({ ...i, role: v }))}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
