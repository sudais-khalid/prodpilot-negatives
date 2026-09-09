import { useState } from 'react'
import { Check, User } from 'lucide-react'
import Dropdown from '../components/ui/Dropdown.jsx'
import Toggle from '../components/ui/Toggle.jsx'

const TABS = ['Profile', 'Notifications', 'Preferences']

const NOTIFICATION_OPTIONS = [
  { key: 'digests', label: 'Email digests', description: 'A daily summary of club activity in your inbox.' },
  { key: 'leaseExpiry', label: 'Membership expiry alerts', description: 'Get notified 60 days before a plan ends.' },
  { key: 'payments', label: 'Payment reminders', description: 'Alerts for upcoming and overdue dues or vendor bills.' },
  { key: 'reports', label: 'Weekly reports', description: 'Receive a weekly club performance report every Monday.' },
  { key: 'updates', label: 'Product updates', description: 'Occasional news about new features and improvements.' },
]

const inputBase =
  'w-full rounded-xl border border-black/10 bg-shell/50 px-3 py-2 text-sm outline-none transition-colors focus:border-accent'

export default function SettingsPage() {
  const [tab, setTab] = useState('Profile')

  const [profile, setProfile] = useState({
    name: 'Jane Cooper',
    email: 'jane@voltfit.com',
    company: 'VoltFit Group',
  })
  const [saved, setSaved] = useState(false)

  const [notifications, setNotifications] = useState({
    digests: true,
    leaseExpiry: true,
    payments: true,
    reports: false,
    updates: false,
  })

  const [currency, setCurrency] = useState('USD')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [darkMode, setDarkMode] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-ink">Settings</h1>

      <div className="flex w-fit gap-1 rounded-full bg-shell p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profile' && (
        <div className="max-w-lg rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-backdrop">
              <User size={28} className="text-muted" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{profile.name}</p>
              <p className="text-xs text-muted">{profile.email}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Full name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className={inputBase}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                className={inputBase}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
                className={inputBase}
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className={`flex w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                saved ? 'bg-upSoft text-up' : 'bg-accent text-white hover:opacity-90'
              }`}
            >
              {saved && <Check size={14} />}
              {saved ? 'Saved' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {tab === 'Notifications' && (
        <div className="max-w-lg rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h2 className="text-base font-semibold text-ink">Notifications</h2>
          <div className="mt-3 divide-y divide-black/5">
            {NOTIFICATION_OPTIONS.map((opt) => (
              <div key={opt.key} className="py-3">
                <Toggle
                  label={opt.label}
                  description={opt.description}
                  checked={notifications[opt.key]}
                  onChange={(v) => setNotifications((n) => ({ ...n, [opt.key]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Preferences' && (
        <div className="max-w-lg rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h2 className="text-base font-semibold text-ink">Preferences</h2>
          <div className="mt-4 flex flex-col gap-5">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Currency</label>
              <Dropdown options={['USD', 'EUR', 'GBP']} value={currency} onChange={setCurrency} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Date format</label>
              <Dropdown
                options={['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']}
                value={dateFormat}
                onChange={setDateFormat}
              />
            </div>
            <div className="border-t border-black/5 pt-4">
              <Toggle
                label="Dark mode"
                description="Coming soon"
                checked={darkMode}
                onChange={setDarkMode}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
