import { useMemo, useState } from 'react'
import {
  ArrowUpDown,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import Dropdown from '../components/ui/Dropdown.jsx'
import Modal from '../components/ui/Modal.jsx'

const DOC_TYPES = ['Membership', 'Contract', 'Invoice', 'Insurance']

const typeBadgeStyles = {
  Membership: 'bg-leased/10 text-leased',
  Contract: 'bg-owned/10 text-owned',
  Invoice: 'bg-upSoft text-up',
  Insurance: 'bg-accentSoft text-accent',
}

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

const initialDocuments = [
  { id: 1, name: 'Membership Agreement — VoltFit Midtown.pdf', type: 'Membership', property: 'VoltFit Midtown', size: '2.4 MB', uploaded: '2026-06-28' },
  { id: 2, name: 'Liability Certificate — VoltFit Harbor.pdf', type: 'Insurance', property: 'VoltFit Harbor', size: '1.1 MB', uploaded: '2026-06-15' },
  { id: 3, name: 'Invoice #1042 — Treadmill Service.pdf', type: 'Invoice', property: 'VoltFit Chelsea', size: '842 KB', uploaded: '2026-05-30' },
  { id: 4, name: 'Franchise Operations Contract.pdf', type: 'Contract', property: 'VoltFit Brooklyn', size: '3.2 MB', uploaded: '2026-05-12' },
  { id: 5, name: 'Plan Renewal — Member Alvarez.pdf', type: 'Membership', property: 'VoltFit Chelsea', size: '1.8 MB', uploaded: '2026-04-22' },
  { id: 6, name: 'Safety Inspection — VoltFit Austin.pdf', type: 'Insurance', property: 'VoltFit Austin', size: '964 KB', uploaded: '2026-03-18' },
  { id: 7, name: 'Invoice #1038 — HVAC Service.pdf', type: 'Invoice', property: 'VoltFit Midtown', size: '512 KB', uploaded: '2026-02-27' },
  { id: 8, name: 'Corporate Wellness Agreement — Helio.pdf', type: 'Contract', property: 'VoltFit Midtown', size: '1.5 MB', uploaded: '2026-01-30' },
]

const gridCols = 'grid grid-cols-12 items-center gap-4'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' })
  const [uploadOpen, setUploadOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState(DOC_TYPES[0])

  const toggleSort = (key) =>
    setSort((s) =>
      s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' },
    )

  const visibleDocuments = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = documents.filter((doc) => {
      const matchesType = typeFilter === 'All Types' || doc.type === typeFilter
      const matchesQuery =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.property.toLowerCase().includes(q)
      return matchesType && matchesQuery
    })
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) =>
      sort.key === 'name'
        ? dir * a.name.localeCompare(b.name)
        : dir * a.uploaded.localeCompare(b.uploaded),
    )
  }, [documents, query, typeFilter, sort])

  const removeDocument = (id) => setDocuments((docs) => docs.filter((d) => d.id !== id))

  const downloadDocument = (doc) => {
    const blob = new Blob([`Mock contents of ${doc.name}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = doc.name
    a.click()
    URL.revokeObjectURL(url)
  }

  const uploadDocument = () => {
    const name = newName.trim()
    if (!name) return
    const doc = {
      id: Date.now(),
      name,
      type: newType,
      property: 'Unassigned',
      size: '—',
      uploaded: new Date().toISOString().slice(0, 10),
    }
    setDocuments((docs) => [doc, ...docs])
    setNewName('')
    setNewType(DOC_TYPES[0])
    setUploadOpen(false)
  }

  const sortHeader = (key, label, span) => (
    <button
      type="button"
      onClick={() => toggleSort(key)}
      className={`flex items-center gap-1 text-left text-xs font-medium transition-colors hover:text-ink ${span} ${
        sort.key === key ? 'text-ink' : 'text-muted'
      }`}
    >
      {label}
      <ArrowUpDown
        size={12}
        className={`transition-transform duration-200 ${
          sort.key === key && sort.dir === 'desc' ? 'rotate-180' : ''
        }`}
      />
    </button>
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink">Documents</h1>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <Plus size={16} />
          Upload Document
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or club"
            className="w-72 rounded-full bg-white py-2 pl-10 pr-4 text-sm text-ink shadow-sm outline-none transition placeholder:text-muted focus:ring-2 focus:ring-accent/30"
          />
        </div>
        <Dropdown
          options={['All Types', ...DOC_TYPES]}
          value={typeFilter}
          onChange={setTypeFilter}
          icon={Filter}
        />
      </div>

      <div className="rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className={`${gridCols} border-b border-black/5 pb-3`}>
          {sortHeader('name', 'Name', 'col-span-4')}
          <p className="col-span-2 text-xs font-medium text-muted">Type</p>
          <p className="col-span-2 text-xs font-medium text-muted">Club</p>
          <p className="col-span-1 text-xs font-medium text-muted">Size</p>
          {sortHeader('date', 'Uploaded', 'col-span-2')}
          <p className="col-span-1 text-right text-xs font-medium text-muted">Actions</p>
        </div>

        {visibleDocuments.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            No documents match your filters.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {visibleDocuments.map((doc) => (
              <li
                key={doc.id}
                className={`${gridCols} -mx-2 rounded-xl px-2 py-3 transition-colors hover:bg-shell`}
              >
                <div className="col-span-4 flex min-w-0 items-center gap-2.5">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-shell">
                    <FileText size={15} className="text-muted" />
                  </div>
                  <p className="truncate text-sm font-medium text-ink">{doc.name}</p>
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      typeBadgeStyles[doc.type] || 'bg-shell text-muted'
                    }`}
                  >
                    {doc.type}
                  </span>
                </div>
                <p className="col-span-2 truncate text-sm text-muted">{doc.property}</p>
                <p className="col-span-1 text-sm text-muted">{doc.size}</p>
                <p className="col-span-2 text-sm text-muted">{formatDate(doc.uploaded)}</p>
                <div className="col-span-1 flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => downloadDocument(doc)}
                    title={`Download ${doc.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    <Download size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    title={`Delete ${doc.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload Document"
        footer={
          <>
            <button
              type="button"
              onClick={() => setUploadOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-shell hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={uploadDocument}
              disabled={!newName.trim()}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Upload
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="text-xs font-medium text-muted">Document name</span>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Membership Agreement — VoltFit Midtown.pdf"
              autoFocus
              className="mt-1.5 w-full rounded-xl bg-shell px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <div>
            <span className="text-xs font-medium text-muted">Type</span>
            <div className="mt-1.5">
              <Dropdown options={DOC_TYPES} value={newType} onChange={setNewType} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
