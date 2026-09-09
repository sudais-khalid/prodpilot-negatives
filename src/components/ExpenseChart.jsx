import { useState } from 'react'
import { Info, TrendingUp } from 'lucide-react'
import { expenseSummary, expenseChart } from '../data/dashboard.js'

// Y-axis scale labels, top to bottom, exactly as in the reference.
const yAxisLabels = ['1.2', '1.1', '800', '500', '0']

// Chart datasets per period tab. '6M' comes from the shared data contract;
// the others are local stubs with plausible values.
const chartDatasets = {
  '6M': expenseChart,
  '1Y': [
    { month: 'Jan', value: 840 },
    { month: 'Feb', value: 1180 },
    { month: 'Mar', value: 500 },
    { month: 'Apr', value: 1120 },
    { month: 'May', value: 900 },
    { month: 'Jun', value: 820 },
    { month: 'Jul', value: 1050 },
    { month: 'Aug', value: 640 },
    { month: 'Sep', value: 980 },
    { month: 'Oct', value: 1140 },
    { month: 'Nov', value: 760 },
    { month: 'Dec', value: 1090 },
  ],
  All: [
    { month: '2020', value: 720 },
    { month: '2021', value: 940 },
    { month: '2022', value: 1180 },
    { month: '2023', value: 860 },
    { month: '2024', value: 1040 },
    { month: '2025', value: 1120 },
  ],
}

const periods = ['6M', '1Y', 'All']

export default function ExpenseChart() {
  const [period, setPeriod] = useState('6M')
  const [hoveredBar, setHoveredBar] = useState(null)

  const data = chartDatasets[period]
  const maxValue = Math.max(...data.map((bar) => bar.value))

  return (
    <div className="h-full rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink">Operating Spend</h3>
        {/* Period switcher */}
        <div className="flex items-center rounded-full bg-shell p-0.5">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPeriod(p)
                setHoveredBar(null)
              }}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                period === p
                  ? 'bg-white font-semibold text-ink shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <Info size={14} className="shrink-0 text-muted" />
        <p className="text-xs text-muted">
          Club operating costs have held steady over the last year.
        </p>
      </div>

      <div className="mt-4 flex gap-6">
        {/* Summary blocks */}
        <div className="flex w-2/5 flex-col justify-between divide-y divide-black/5">
          {expenseSummary.map((item) => (
            <div
              key={item.period}
              className="-mx-2 rounded-xl bg-white px-2 py-3"
            >
              <p className="text-xs text-muted">{item.period}</p>
              <div className="mt-1 flex items-center">
                <p className="text-2xl font-bold tracking-tight text-ink">
                  {item.amount}
                  <span className="ml-0.5 text-sm font-medium text-muted">$</span>
                </p>
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-upSoft px-2 py-0.5 text-xs font-semibold text-up">
                  <TrendingUp size={12} />
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="flex flex-1 gap-2">
          <div className="flex h-[160px] shrink-0 flex-col justify-between text-[10px] leading-none text-muted">
            {yAxisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="flex-1">
            <div className="flex h-[160px] items-end justify-around">
              {data.map((bar, index) => (
                <div
                  key={bar.month}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="flex h-full w-5 items-end rounded-full bg-shell"
                >
                  <div
                    className={`relative w-full rounded-full transition-colors ${
                      hoveredBar === index ? 'bg-[#C93224]' : 'bg-accent'
                    }`}
                    style={{ height: `${(bar.value / maxValue) * 100}%` }}
                  >
                    {hoveredBar === index && (
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-xs text-white">
                        {bar.month} — ${bar.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-around">
              {data.map((bar) => (
                <span key={bar.month} className="text-center text-[10px] text-muted">
                  {bar.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
