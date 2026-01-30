import DreamGoalsPanel from '@/components/dream-goals-panel'
import EmergencyFundPanel from '@/components/emergency-fund-panel'
import RecordKeepingPanel from '@/components/record-keeping-panel'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 px-4 py-6 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">我的儀表板</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            追蹤您的夢想目標和緊急預備金進度
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DreamGoalsPanel />
          <EmergencyFundPanel />
        </div>

        <div className="mt-6 sm:mt-8">
          <RecordKeepingPanel />
        </div>
      </div>
    </main>
  )
}
