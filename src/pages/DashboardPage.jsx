import Topbar from '../components/Topbar.jsx'
import StatsRow from '../components/StatsRow.jsx'
import ExpenseChart from '../components/ExpenseChart.jsx'
import EstateMap from '../components/EstateMap.jsx'
import CriticalDates from '../components/CriticalDates.jsx'
import ExpensiveSites from '../components/ExpensiveSites.jsx'
import PaymentsCard from '../components/PaymentsCard.jsx'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <Topbar />
      <StatsRow />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <ExpenseChart />
        </div>
        <div className="col-span-5">
          <EstateMap />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <CriticalDates />
        </div>
        <div className="col-span-4">
          <ExpensiveSites />
        </div>
        <div className="col-span-5">
          <PaymentsCard />
        </div>
      </div>
    </div>
  )
}
