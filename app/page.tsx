'use client'

import { useMemo, useState } from 'react'
import DreamGoalsPanel, { type Dream } from '@/components/dream-goals-panel'
import EmergencyFundPanel from '@/components/emergency-fund-panel'
import FinancialIndicatorsPanel from '@/components/financial-indicators-panel'
import IndicatorHistoryPanel from '@/components/indicator-history-panel'
import OverviewActionSections from '@/components/overview-action-sections'
import RecordKeepingPanel from '@/components/record-keeping-panel'
import RecordKeepingTracker from '@/components/record-keeping-tracker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type RecordEntry } from '@/lib/record-keeping'

const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const addDays = (date: Date, offset: number) => {
  const next = new Date(date)
  next.setDate(date.getDate() + offset)
  return next
}

export default function Dashboard() {
  const [dreams, setDreams] = useState<Dream[]>([
    {
      id: '1',
      name: '日本家庭旅遊',
      target: 150000,
      completed: 10000,
      icon: 'heart',
    },
    {
      id: '2',
      name: '孩子才藝課程',
      target: 30000,
      completed: 15000,
      icon: 'star',
    },
  ])
  const [emergencyFund, setEmergencyFund] = useState({
    target: 300000,
    current: 100000,
  })
  const [recordEntries, setRecordEntries] = useState<RecordEntry[]>(() => {
    const today = new Date()
    const todayKey = toDateKey(today)
    const yesterdayKey = toDateKey(addDays(today, -1))
    const twoDaysAgoKey = toDateKey(addDays(today, -2))

    return [
      {
        id: 'record-1',
        date: todayKey,
        title: '早餐',
        category: '生活支出 / 生活變動支出',
        amount: 85,
        type: 'expense',
      },
      {
        id: 'record-2',
        date: todayKey,
        title: '交通卡加值',
        category: '生活支出 / 生活變動支出',
        amount: 200,
        type: 'expense',
      },
      {
        id: 'record-3',
        date: todayKey,
        title: '兼職收入',
        category: '月收入 / 生活收入 / 變動收入',
        amount: 1200,
        type: 'income',
      },
      {
        id: 'record-4',
        date: yesterdayKey,
        title: '晚餐',
        category: '生活支出 / 生活變動支出',
        amount: 260,
        type: 'expense',
      },
      {
        id: 'record-5',
        date: twoDaysAgoKey,
        title: '書籍',
        category: '生活支出 / 生活變動支出',
        amount: 520,
        type: 'expense',
      },
    ]
  })
  const dreamSummary = useMemo(() => {
    const totalTarget = dreams.reduce((sum, dream) => sum + dream.target, 0)
    const totalCompleted = dreams.reduce((sum, dream) => sum + dream.completed, 0)
    const percent = totalTarget === 0 ? 0 : Math.round((totalCompleted / totalTarget) * 100)

    return {
      totalTarget,
      totalCompleted,
      percent,
    }
  }, [dreams])
  const emergencyPercent =
    emergencyFund.target === 0
      ? 0
      : Math.round((emergencyFund.current / emergencyFund.target) * 100)

  const handleAddRecord = (record: RecordEntry) => {
    setRecordEntries((prev) => [record, ...prev])
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProgressStatus = (percent: number) => {
    if (percent >= 70) return { status: 'good' as const, label: '進度良好' }
    if (percent >= 40) return { status: 'warning' as const, label: '追蹤中' }
    return { status: 'bad' as const, label: '需加強' }
  }

  const dreamStatus = getProgressStatus(dreamSummary.percent)
  const emergencyStatus = getProgressStatus(emergencyPercent)

  const healthHistory = [
    {
      id: 'health-1',
      date: '2026/02/03',
      title: '財務健康總分',
      value: '75分',
      status: 'good' as const,
      statusLabel: '優秀',
      note: '本月',
    },
    {
      id: 'health-2',
      date: '2026/01/10',
      title: '財務健康總分',
      value: '68分',
      status: 'warning' as const,
      statusLabel: '留意',
      note: '上月',
    },
    {
      id: 'health-3',
      date: '2025/12/15',
      title: '財務健康總分',
      value: '62分',
      status: 'warning' as const,
      statusLabel: '留意',
      note: '上上月',
    },
  ]

  const safetyHistory = [
    {
      id: 'safety-1',
      date: '2026/02/03',
      title: '財務安全總分',
      value: '25分',
      status: 'bad' as const,
      statusLabel: '風險',
      note: '本月',
    },
    {
      id: 'safety-2',
      date: '2026/01/10',
      title: '財務安全總分',
      value: '30分',
      status: 'bad' as const,
      statusLabel: '風險',
      note: '上月',
    },
    {
      id: 'safety-3',
      date: '2025/12/15',
      title: '財務安全總分',
      value: '28分',
      status: 'bad' as const,
      statusLabel: '風險',
      note: '上上月',
    },
  ]

  const dreamHistory = [
    {
      id: 'dream-1',
      date: '今天',
      title: '夢想總完成度',
      value: `${dreamSummary.percent}%`,
      status: dreamStatus.status,
      statusLabel: dreamStatus.label,
      note: `共${dreams.length}個目標`,
    },
    {
      id: 'dream-2',
      date: '2026/01/05',
      title: '夢想總完成度',
      value: '58%',
      status: 'warning' as const,
      statusLabel: '追蹤中',
      note: '共2個目標',
    },
    {
      id: 'dream-3',
      date: '2025/12/08',
      title: '夢想總完成度',
      value: '42%',
      status: 'warning' as const,
      statusLabel: '追蹤中',
      note: '共2個目標',
    },
  ]

  const emergencyHistory = [
    {
      id: 'emergency-1',
      date: '今天',
      title: '預備金進度',
      value: `${formatCurrency(emergencyFund.current)} / ${formatCurrency(
        emergencyFund.target,
      )}`,
      status: emergencyStatus.status,
      statusLabel: emergencyStatus.label,
      note: `${emergencyPercent}%`,
    },
    {
      id: 'emergency-2',
      date: '2026/01/10',
      title: '預備金進度',
      value: 'NT$90,000 / NT$300,000',
      status: 'warning' as const,
      statusLabel: '追蹤中',
      note: '30%',
    },
    {
      id: 'emergency-3',
      date: '2025/12/12',
      title: '預備金進度',
      value: 'NT$75,000 / NT$300,000',
      status: 'warning' as const,
      statusLabel: '追蹤中',
      note: '25%',
    },
  ]

  const recordHistory = [
    {
      id: 'record-1',
      date: '本週',
      title: '新增記帳筆數',
      value: '12筆',
      status: 'good' as const,
      statusLabel: '活躍',
      note: '語音 7 / 手動 5',
    },
    {
      id: 'record-2',
      date: '上週',
      title: '新增記帳筆數',
      value: '9筆',
      status: 'warning' as const,
      statusLabel: '追蹤中',
      note: '語音 5 / 手動 4',
    },
    {
      id: 'record-3',
      date: '兩週前',
      title: '新增記帳筆數',
      value: '6筆',
      status: 'warning' as const,
      statusLabel: '追蹤中',
      note: '語音 4 / 手動 2',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20 px-4 py-6 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">我的儀表板</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            追蹤你的夢想進度 掌握你的財務
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="rounded-2xl border border-border bg-card shadow-sm">
            <TabsList className="h-auto w-full justify-start gap-2 rounded-none border-b border-border bg-transparent px-4 pt-4 pb-2 overflow-x-auto">
              <TabsTrigger
                value="overview"
                className="flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                總覽
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                記帳專區
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                財務健康
              </TabsTrigger>
              <TabsTrigger
                value="safety"
                className="flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                財務安全
              </TabsTrigger>
              <TabsTrigger
                value="dream"
                className="flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                夢想完成狀況
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="flex-none rounded-none border-0 border-b-2 border-transparent bg-transparent px-3 py-2 text-sm font-semibold text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                緊急預備金狀況
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0 p-4 sm:p-6">
              <div className="space-y-6">
                <RecordKeepingPanel onAddRecord={handleAddRecord} />
                <FinancialIndicatorsPanel />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DreamGoalsPanel dreams={dreams} onDreamsChange={setDreams} />
                  <EmergencyFundPanel data={emergencyFund} onChange={setEmergencyFund} />
                </div>
                <OverviewActionSections />
              </div>
            </TabsContent>

            <TabsContent value="recording" className="mt-0 p-4 sm:p-6">
              <div className="space-y-6">
                <RecordKeepingPanel onAddRecord={handleAddRecord} />
                <RecordKeepingTracker records={recordEntries} />
                <IndicatorHistoryPanel title="歷史紀錄" description="記帳專區" records={recordHistory} />
              </div>
            </TabsContent>

            <TabsContent value="health" className="mt-0 p-4 sm:p-6">
              <div className="space-y-6">
                <FinancialIndicatorsPanel variant="health" />
                <IndicatorHistoryPanel
                  title="歷史紀錄"
                  description="財務健康指標"
                  records={healthHistory}
                />
              </div>
            </TabsContent>

            <TabsContent value="safety" className="mt-0 p-4 sm:p-6">
              <div className="space-y-6">
                <FinancialIndicatorsPanel variant="safety" />
                <IndicatorHistoryPanel
                  title="歷史紀錄"
                  description="財務安全指標"
                  records={safetyHistory}
                />
              </div>
            </TabsContent>

            <TabsContent value="dream" className="mt-0 p-4 sm:p-6">
              <div className="space-y-6">
                <DreamGoalsPanel dreams={dreams} onDreamsChange={setDreams} />
                <IndicatorHistoryPanel
                  title="歷史紀錄"
                  description="夢想完成狀況"
                  records={dreamHistory}
                />
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="mt-0 p-4 sm:p-6">
              <div className="space-y-6">
                <EmergencyFundPanel data={emergencyFund} onChange={setEmergencyFund} />
                <IndicatorHistoryPanel
                  title="歷史紀錄"
                  description="緊急預備金狀況"
                  records={emergencyHistory}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
