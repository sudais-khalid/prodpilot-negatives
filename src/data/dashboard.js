// Shared data contract for every dashboard module.
// Components import their data from here (no props); swap these stubs
// for real API data later without touching component signatures.

// KPI stat cards. `trend` drives the up/down badge color, `unit` is optional.
export const stats = [
  { label: 'Active Clubs', value: '48', change: '2.4%', trend: 'up' },
  { label: 'Monthly OpEx', value: '$840 K', change: '1.8%', trend: 'down' },
  { label: 'Active Members', value: '28,640', change: '3.1%', trend: 'up' },
  { label: 'Open Capacity', value: '4,120', unit: 'spots', change: '0.9%', trend: 'down' },
  { label: 'Expiring Plans', value: '312', change: '4.2%', trend: 'down' },
]

// Left column of the Operating Spend card.
export const expenseSummary = [
  { period: 'Last 5 Year', amount: '18.4 M', change: '4.1%', trend: 'up' },
  { period: 'Last 10 Year', amount: '41.2 M', change: '2.6%', trend: 'up' },
  { period: 'All Time', amount: '96.7 M', change: '5.4%', trend: 'up' },
]

// Red bar chart of the Operating Spend card.
export const expenseChart = [
  { month: 'Jan', value: 840 },
  { month: 'Feb', value: 1180 },
  { month: 'Mar', value: 500 },
  { month: 'Apr', value: 1120 },
  { month: 'May', value: 900 },
  { month: 'Jun', value: 820 },
]

// Club Map pins. x/y are percentage coordinates (0-100) within the map area.
// `type` keys map to CSS tokens: leased = franchise, owned = company-owned.
export const mapPins = [
  { x: 18, y: 48, type: 'leased' },
  { x: 30, y: 60, type: 'leased' },
  { x: 52, y: 52, type: 'leased' },
  { x: 64, y: 62, type: 'leased' },
  { x: 74, y: 40, type: 'owned' },
  { x: 82, y: 54, type: 'owned' },
  { x: 70, y: 64, type: 'owned' },
]

// Club popup shown on the Club Map card.
export const selectedProperty = {
  name: 'VoltFit Midtown',
  address: '412 Lexington Ave, 10017',
  beds: 64,
  baths: 18,
  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
}

// Bottom-left card.
export const criticalDates = [
  {
    title: 'Trainer Review',
    date: 'Feb 19',
    description: 'Quarterly trainer review with Oguz B for VoltFit Harbor in Brooklyn',
  },
  {
    title: 'Plan Renewal',
    date: 'Feb 19',
    description: 'Corporate plan renewal with Archie Edward for VoltFit Chelsea in New York',
  },
]

// Bottom-middle card.
export const expensiveSites = [
  {
    name: 'VoltFit Midtown',
    address: 'Lexington Ave, 10017',
    price: '$2.4M',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&q=80',
  },
  {
    name: 'VoltFit Harbor',
    address: 'Pier 17, 10038',
    price: '$1.9M',
    image: 'https://images.unsplash.com/photo-1571902942914-6c0fad3aba85?w=100&q=80',
  },
  {
    name: 'VoltFit Chelsea',
    address: 'W 23rd Street, 10011',
    price: '$1.6M',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=100&q=80',
  },
  {
    name: 'VoltFit Brooklyn',
    address: 'Flatbush Ave, 11217',
    price: '$1.3M',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80',
  },
]

// Bottom-right payments card. `icon` maps to a lucide-react icon name.
export const payments = [
  { title: 'Equipment Lease', date: 'May 30', amount: '$6,828.59', icon: 'building' },
  { title: 'Facility Repair', date: 'Feb 19', amount: '$6,828.59', icon: 'wrench' },
  { title: 'Trainer Payroll', date: 'Apr 30', amount: '$6,828.59', icon: 'users' },
  { title: 'Equipment Lease', date: 'May 30', amount: '$6,828.59', icon: 'building' },
]

// Sidebar navigation. `icon` maps to a lucide-react icon name.
export const navItems = [
  { label: 'Dashboard', icon: 'home', active: true },
  { label: 'Documents', icon: 'file-text' },
  { label: 'Memberships', icon: 'briefcase' },
  { label: 'Studios', icon: 'building' },
  { label: 'Partners', icon: 'handshake' },
]

export const footerNavItems = [
  { label: 'Support', icon: 'headphones' },
  { label: 'Settings', icon: 'settings' },
  { label: 'Team', icon: 'users' },
  { label: 'Log Out', icon: 'log-out' },
]

// Topbar filter pills.
export const filterPills = [{ label: 'All Clubs' }, { label: 'All Categories' }]
