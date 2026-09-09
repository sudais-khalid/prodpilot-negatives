import { useState } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { stats } from '../data/dashboard.js'

export default function StatsRow() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="grid grid-cols-5 gap-5">
      {stats.map((stat, index) => {
        const isDown = stat.trend === 'down'
        const TrendIcon = isDown ? TrendingDown : TrendingUp
        return (
          <div
            key={stat.label}
            onClick={() => setSelected(index)}
            className={`cursor-pointer rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-md ${
              selected === index ? 'ring-2 ring-accent/30' : ''
            }`}
          >
            <p className="text-xs text-muted">{stat.label}</p>
            <p className="mt-2 text-[28px] font-bold leading-none tracking-tight text-ink">
              {stat.value}
              {stat.unit && (
                <span className="ml-1 align-super text-sm font-medium text-muted">
                  {stat.unit}
                </span>
              )}
            </p>
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isDown ? 'bg-accentSoft text-accent' : 'bg-upSoft text-up'
                }`}
              >
                <TrendIcon size={12} />
                {stat.change}
              </span>
              <p className="mt-1 text-xs text-muted">vs last month</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
