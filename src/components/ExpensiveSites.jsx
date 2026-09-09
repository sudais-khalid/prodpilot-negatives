import { useState } from 'react'
import { Heart } from 'lucide-react'
import { expensiveSites } from '../data/dashboard.js'

export default function ExpensiveSites() {
  const [selectedId, setSelectedId] = useState(null)
  const [favoriteIds, setFavoriteIds] = useState(() => new Set())

  const toggleFavorite = (id) =>
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className="bg-white rounded-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h3 className="text-base font-semibold text-ink">Top Revenue Clubs</h3>

      <ul className="mt-3 divide-y divide-black/5">
        {expensiveSites.map((site, index) => {
          const id = `${site.name}-${site.address}-${index}`
          const isSelected = selectedId === id
          const isFavorite = favoriteIds.has(id)
          return (
            <li
              key={id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => setSelectedId((prev) => (prev === id ? null : id))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedId((prev) => (prev === id ? null : id))
                }
              }}
              className={`-mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-shell focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                isSelected ? 'ring-1 ring-accent/30' : ''
              }`}
            >
              <img
                src={site.image}
                alt={site.name}
                className="w-11 h-11 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{site.name}</p>
                <p className="text-xs text-muted truncate">{site.address}</p>
              </div>
              <p className="text-sm font-bold text-ink text-right shrink-0">{site.price}</p>
              <button
                type="button"
                aria-pressed={isFavorite}
                aria-label={
                  isFavorite
                    ? `Remove ${site.name} from favorites`
                    : `Add ${site.name} to favorites`
                }
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(id)
                }}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full transition hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <Heart
                  className={`h-4 w-4 transition ${
                    isFavorite ? 'fill-current text-accent' : 'text-muted'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
