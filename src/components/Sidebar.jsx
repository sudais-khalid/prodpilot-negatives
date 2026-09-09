import { useEffect, useRef, useState } from 'react'
import {
  Home,
  FileText,
  Briefcase,
  Building2,
  Handshake,
  Headphones,
  Settings,
  Users,
  LogOut,
  Bell,
  User,
  ChevronDown,
  Check,
} from 'lucide-react'
import { navItems, footerNavItems } from '../data/dashboard.js'

const ICONS = {
  home: Home,
  'file-text': FileText,
  briefcase: Briefcase,
  building: Building2,
  handshake: Handshake,
  headphones: Headphones,
  settings: Settings,
  users: Users,
  'log-out': LogOut,
}

const WORKSPACES = ['VoltFit HQ', 'East Region', 'West Region', 'Franchise Ops']

const WORKSPACE_COLORS = {
  'VoltFit HQ': 'bg-accent text-white',
  'East Region': 'bg-ink text-white',
  'West Region': 'bg-leased text-white',
  'Franchise Ops': 'bg-owned text-white',
}

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'New member joined VoltFit Harbor', time: '5 min ago' },
  { id: 2, title: 'Equipment lease of $6,828.59 due May 30', time: '1 hour ago' },
  { id: 3, title: 'Trainer review with Oguz B', time: 'Yesterday' },
]

function WorkspaceMark({ name }) {
  const color = WORKSPACE_COLORS[name] || 'bg-muted text-white'
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${color}`}
    >
      {name[0]}
    </span>
  )
}

function NavItem({ item, active, onNavigate }) {
  const Icon = ICONS[item.icon] || Home
  const base =
    'flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-sm transition-colors'
  const state = active
    ? 'bg-white text-ink font-semibold shadow-sm'
    : 'text-muted hover:bg-white/70 hover:text-ink'
  return (
    <button type="button" onClick={() => onNavigate?.(item.label)} className={`${base} ${state}`}>
      <Icon size={18} strokeWidth={1.8} />
      <span>{item.label}</span>
    </button>
  )
}

export default function Sidebar({ activePage, onNavigate }) {
  const [workspace, setWorkspace] = useState('VoltFit HQ')
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const menuRef = useRef(null)

  // Close workspace / notification popups on outside click.
  useEffect(() => {
    if (!workspaceOpen && !notifOpen) return undefined
    const handleMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setWorkspaceOpen(false)
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [workspaceOpen, notifOpen])

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[232px] flex-col overflow-y-auto bg-sidebar p-5">
      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-backdrop">
        <User size={18} className="text-muted" strokeWidth={1.8} />
      </div>

      {/* Workspace selector + notifications */}
      <div className="relative mt-6 shrink-0" ref={menuRef}>
        <div className="flex items-center rounded-full bg-white px-2 py-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setWorkspaceOpen((open) => !open)
              setNotifOpen(false)
            }}
            className="flex flex-1 items-center gap-2.5 rounded-full px-2 py-1 text-left transition-colors hover:bg-shell"
          >
            <WorkspaceMark name={workspace} />
            <span className="text-sm font-medium text-ink">{workspace}</span>
            <ChevronDown
              size={14}
              strokeWidth={1.8}
              className={`ml-auto text-muted transition-transform ${workspaceOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setNotifOpen((open) => !open)
              setWorkspaceOpen(false)
            }}
            className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-shell hover:text-ink"
          >
            <Bell size={16} strokeWidth={1.8} />
            {notifications.length > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            )}
          </button>
        </div>

        {/* Workspace popup */}
        {workspaceOpen && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-ink/5">
            {WORKSPACES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setWorkspace(name)
                  setWorkspaceOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-shell ${
                  name === workspace ? 'font-semibold text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <WorkspaceMark name={name} />
                <span>{name}</span>
                {name === workspace && (
                  <Check size={14} strokeWidth={2} className="ml-auto text-accent" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Notifications popup */}
        {notifOpen && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-ink/5">
            {notifications.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted">No new notifications</p>
            ) : (
              <>
                {notifications.map((n) => (
                  <div key={n.id} className="px-3 py-2">
                    <p className="text-sm font-medium text-ink">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{n.time}</p>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setNotifications([])
                    setNotifOpen(false)
                  }}
                  className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-accent transition-colors hover:bg-accentSoft"
                >
                  Mark all read
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Main nav */}
      <nav className="mt-6 flex shrink-0 flex-col gap-1">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            active={activePage === item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* Footer nav */}
      <nav className="mt-auto flex shrink-0 flex-col gap-1 pt-6">
        {footerNavItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            active={activePage === item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </aside>
  )
}
