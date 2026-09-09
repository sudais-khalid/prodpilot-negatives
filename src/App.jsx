import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Modal from './components/ui/Modal.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import DocumentsPage from './pages/DocumentsPage.jsx'
import ManagementPage from './pages/ManagementPage.jsx'
import WorkplacePage from './pages/WorkplacePage.jsx'
import DealsPage from './pages/DealsPage.jsx'
import SupportPage from './pages/SupportPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import TeamPage from './pages/TeamPage.jsx'

const PAGES = {
  Dashboard: DashboardPage,
  Documents: DocumentsPage,
  Memberships: ManagementPage,
  Studios: WorkplacePage,
  Partners: DealsPage,
  Support: SupportPage,
  Settings: SettingsPage,
  Team: TeamPage,
}

export default function App() {
  const [page, setPage] = useState('Dashboard')
  const [loggedOut, setLoggedOut] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleNavigate = (label) => {
    if (label === 'Log Out') {
      setLogoutOpen(true)
      return
    }
    if (PAGES[label]) setPage(label)
  }

  if (loggedOut) {
    return (
      <div className="grid min-h-screen place-items-center bg-shell p-6">
        <div className="rounded-card bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h1 className="text-lg font-semibold text-ink">You have been logged out</h1>
          <p className="mt-2 text-sm text-muted">
            Your session has ended. Log back in to keep working.
          </p>
          <button
            type="button"
            onClick={() => {
              setLoggedOut(false)
              setPage('Dashboard')
            }}
            className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Log Back In
          </button>
        </div>
      </div>
    )
  }

  const ActivePage = PAGES[page] || DashboardPage

  return (
    <div className="min-h-screen bg-shell">
      <Sidebar activePage={page} onNavigate={handleNavigate} />
      <main className="ml-[232px] flex flex-col gap-5 p-6">
        <ActivePage />
      </main>

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log out"
        footer={
          <>
            <button
              type="button"
              onClick={() => setLogoutOpen(false)}
              className="rounded-full bg-shell px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-backdrop"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setLogoutOpen(false)
                setLoggedOut(true)
              }}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Log Out
            </button>
          </>
        }
      >
        <p className="text-sm text-muted">Are you sure you want to log out of VoltFit?</p>
      </Modal>
    </div>
  )
}
