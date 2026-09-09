import { useEffect, useRef, useState } from 'react'
import { Search, Minus, Plus, Dumbbell, Users, X } from 'lucide-react'
import { mapPins, selectedProperty } from '../data/dashboard.js'

const MIN_ZOOM = 1
const MAX_ZOOM = 2
const ZOOM_STEP = 0.25

const TYPE_LABELS = { leased: 'franchise', owned: 'owned' }

// Local mock clubs (same shape as selectedProperty in dashboard.js);
// pins select among these by index.
const properties = [
  selectedProperty,
  {
    name: 'VoltFit Harbor',
    address: '17 Pier Walk, 10038',
    beds: 48,
    baths: 14,
    image:
      'https://images.unsplash.com/photo-1571902942914-6c0fad3aba85?w=400&q=80',
  },
  {
    name: 'VoltFit Chelsea',
    address: '220 W 23rd Street, 10011',
    beds: 36,
    baths: 12,
    image:
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80',
  },
]

export default function EstateMap() {
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [selectedPin, setSelectedPin] = useState(null)
  const [property, setProperty] = useState(selectedProperty)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const [visibleTypes, setVisibleTypes] = useState({ leased: true, owned: true })
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)

  // Close the search results dropdown on outside click.
  useEffect(() => {
    const onPointerDown = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const trimmedQuery = query.trim().toLowerCase()
  const results = trimmedQuery
    ? properties.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.address.toLowerCase().includes(trimmedQuery)
      )
    : []

  const zoomOutDisabled = zoom <= MIN_ZOOM
  const zoomInDisabled = zoom >= MAX_ZOOM

  const selectPin = (i) => {
    setSelectedPin(i)
    setProperty(properties[i % properties.length])
    setOverlayVisible(true)
  }

  const selectProperty = (p) => {
    setSelectedPin(null)
    setProperty(p)
    setOverlayVisible(true)
    setQuery('')
    setSearchOpen(false)
  }

  const toggleType = (type) =>
    setVisibleTypes((v) => ({ ...v, [type]: !v[type] }))

  const overlayDot =
    selectedPin != null && mapPins[selectedPin].type === 'leased'
      ? 'bg-leased'
      : 'bg-owned'

  return (
    <div className="h-full rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink">Club Map</h3>
        <div className="flex items-center gap-3 text-xs text-muted">
          {['leased', 'owned'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              aria-pressed={visibleTypes[type]}
              className={`flex cursor-pointer select-none items-center gap-1.5 capitalize transition-opacity ${
                visibleTypes[type] ? 'hover:opacity-70' : 'opacity-40'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  visibleTypes[type]
                    ? type === 'leased'
                      ? 'bg-leased'
                      : 'bg-owned'
                    : 'bg-muted'
                }`}
              />
              {TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Map body */}
      <div className="relative mt-3 h-[260px] overflow-hidden rounded-2xl bg-[#E9EEEA]">
        {/* Zoomable layer: stylized static map + pins */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease',
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 290"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* park blob */}
            <path
              d="M270 40 C320 20 370 45 385 90 C400 135 360 165 315 155 C270 145 235 110 245 75 C250 58 258 46 270 40 Z"
              fill="#DFE9DC"
            />
            <path
              d="M-20 230 C40 200 90 240 140 225 C190 210 210 250 180 275 C150 300 40 300 -20 285 Z"
              fill="#DFE9DC"
            />
            {/* roads */}
            <path
              d="M-10 120 C60 100 110 140 180 125 C250 110 300 140 410 115"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M90 -10 C100 60 70 120 95 190 C110 235 95 265 105 300"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M-10 210 C70 195 160 220 240 205 C310 192 360 210 410 195"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M250 -10 C245 50 275 90 265 150 C258 195 280 240 270 300"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* location labels */}
            <text
              x="298"
              y="88"
              fontSize="11"
              fill="#8B8D91"
              opacity="0.4"
              transform="rotate(-24 298 88)"
            >
              Jose
            </text>
            <text
              x="330"
              y="130"
              fontSize="11"
              fill="#8B8D91"
              opacity="0.4"
              transform="rotate(-24 330 130)"
            >
              Juan
            </text>
            <text
              x="150"
              y="70"
              fontSize="11"
              fill="#8B8D91"
              opacity="0.4"
              transform="rotate(-18 150 70)"
            >
              Alba
            </text>
          </svg>

          {/* Pins */}
          {mapPins.map((pin, i) =>
            visibleTypes[pin.type] ? (
              <button
                key={i}
                type="button"
                aria-label={`${TYPE_LABELS[pin.type]} club pin`}
                onClick={() => selectPin(i)}
                className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full shadow-sm transition hover:scale-110 ${
                  pin.type === 'leased'
                    ? 'border-[3px] border-leased bg-white'
                    : 'border-[3px] border-white bg-owned'
                }`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              />
            ) : null
          )}
        </div>

        {/* Search pill */}
        <div
          ref={searchRef}
          className="pointer-events-auto absolute left-3 top-3 w-44"
        >
          <div className="flex items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 shadow-md">
            <Search size={14} className="shrink-0 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => trimmedQuery && setSearchOpen(true)}
              placeholder="Search Club…"
              className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-muted"
            />
          </div>
          {searchOpen && trimmedQuery.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-xl bg-white py-1 shadow-lg">
              {results.length > 0 ? (
                results.map((p) => (
                  <button
                    key={`${p.name}-${p.address}`}
                    type="button"
                    onClick={() => selectProperty(p)}
                    className="block w-full px-3 py-2 text-left transition hover:bg-shell"
                  >
                    <span className="block truncate text-xs font-medium text-ink">
                      {p.name}
                    </span>
                    <span className="block truncate text-[11px] text-muted">
                      {p.address}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-muted">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            disabled={zoomOutDisabled}
            onClick={() =>
              setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)))
            }
            aria-label="Zoom out"
            className={`grid h-8 w-8 place-items-center rounded-full bg-white text-ink shadow-md transition ${
              zoomOutDisabled
                ? 'cursor-not-allowed opacity-40'
                : 'hover:bg-shell'
            }`}
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            disabled={zoomInDisabled}
            onClick={() =>
              setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)))
            }
            aria-label="Zoom in"
            className={`grid h-8 w-8 place-items-center rounded-full bg-white text-ink shadow-md transition ${
              zoomInDisabled
                ? 'cursor-not-allowed opacity-40'
                : 'hover:bg-shell'
            }`}
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Property overlay card */}
        {overlayVisible && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg">
            <img
              src={property.image}
              alt={property.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-ink">
                  {property.name}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${overlayDot}`} />
              </div>
              <p className="mt-0.5 truncate text-xs text-muted">
                {property.address}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Dumbbell size={12} />
                  {property.beds} Stations
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {property.baths} Classes
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOverlayVisible(false)}
              aria-label="Close club details"
              className="absolute right-2 top-2 text-muted transition hover:text-ink"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
