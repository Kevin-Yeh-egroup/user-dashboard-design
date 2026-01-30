import DreamGoalsPanel from '@/components/dream-goals-panel'
import EmergencyFundPanel from '@/components/emergency-fund-panel'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">財務規劃儀表板</h1>
          <p className="text-muted-foreground">追蹤您的夢想目標和緊急預備金進度</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DreamGoalsPanel />
          <EmergencyFundPanel />
        </div>
      </div>
    </main>
  )
}
