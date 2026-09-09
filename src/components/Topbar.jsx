import { useEffect, useRef, useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import Dropdown from './ui/Dropdown.jsx'
import Toggle from './ui/Toggle.jsx'

const CLIENT_OPTIONS = ['All Clubs', 'VoltFit Midtown', 'VoltFit Harbor', 'VoltFit Chelsea', 'VoltFit Brooklyn']
const CATEGORY_OPTIONS = ['All Categories', 'Strength', 'Cardio', 'Yoga', 'CrossFit']

const MODULES = [
  'Stats',
  'Operating Spend',
  'Club Map',
  'Upcoming Deadlines',
  'Top Revenue Clubs',
  'Payments',
]

export default function Topbar() {
  const [client, setClient] = useState('All Clubs')
  const [category, setCategory] = useState('All Categories')
  const [modulesOpen, setModulesOpen] = useState(false)
  const [modules, setModules] = useState(() =>
    MODULES.reduce((acc, name) => ({ ...acc, [name]: true }), {})
  )
  const modulesRef = useRef(null)

  useEffect(() => {
    if (!modulesOpen) return
    const handler = (e) => {
      if (modulesRef.current && !modulesRef.current.contains(e.target)) setModulesOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [modulesOpen])

  return (
    <header>
      <h1 className="text-xl font-bold text-ink">Dashboard</h1>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dropdown options={CLIENT_OPTIONS} value={client} onChange={setClient} />
          <Dropdown options={CATEGORY_OPTIONS} value={category} onChange={setCategory} />
        </div>
        <div ref={modulesRef} className="relative">
          <button
            type="button"
            onClick={() => setModulesOpen((o) => !o)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-shadow hover:shadow ${
              modulesOpen ? 'bg-ink text-white shadow' : 'bg-white text-ink shadow-sm'
            }`}
          >
            <LayoutGrid size={16} />
            Edit Modules
          </button>
          {modulesOpen && (
            <div className="absolute right-0 z-30 mt-2 w-64 rounded-card border border-black/5 bg-white p-4 shadow-lg">
              <div className="flex flex-col gap-3">
                {MODULES.map((name) => (
                  <Toggle
                    key={name}
                    label={name}
                    checked={modules[name]}
                    onChange={(next) => setModules((m) => ({ ...m, [name]: next }))}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
