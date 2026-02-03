import { CheckCircle2, Info, Shield, TrendingUp, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

type IndicatorStatus = 'good' | 'bad'

const INDICATORS = [
  {
    key: 'health',
    title: '財務健康',
    score: 75,
    badge: '優秀',
    icon: TrendingUp,
    scoreClass: 'text-emerald-600',
    badgeClass: 'bg-slate-900 text-white',
    borderClass: 'border-l-emerald-500',
    progressClass: 'bg-slate-900',
    iconClass: 'text-emerald-600',
    items: [
      { label: '月收支平衡', status: 'good' as IndicatorStatus },
      { label: '年收支平衡', status: 'bad' as IndicatorStatus },
      { label: '資產 > 負債', status: 'good' as IndicatorStatus },
      { label: '有增加持續性累積非工資收入的能力', status: 'good' as IndicatorStatus },
    ],
  },
  {
    key: 'safety',
    title: '財務安全',
    score: 25,
    badge: '風險',
    icon: Shield,
    scoreClass: 'text-blue-600',
    badgeClass: 'bg-red-100 text-red-600',
    borderClass: 'border-l-blue-500',
    progressClass: 'bg-blue-600',
    iconClass: 'text-blue-600',
    items: [
      {
        label: '準備3-6個月支出總金額做為緊急預備金',
        status: 'bad' as IndicatorStatus,
      },
      { label: '有基本避險工具', status: 'good' as IndicatorStatus },
      { label: '有因應未來財務風險的準備', status: 'bad' as IndicatorStatus },
      { label: '有家庭支持系統 + 信用與社會資源', status: 'bad' as IndicatorStatus },
    ],
  },
]

type FinancialIndicatorVariant = 'health' | 'safety' | 'all'

type FinancialIndicatorsPanelProps = {
  variant?: FinancialIndicatorVariant
}

export default function FinancialIndicatorsPanel({
  variant = 'all',
}: FinancialIndicatorsPanelProps) {
  const visibleIndicators = INDICATORS.filter((indicator) => {
    if (variant === 'all') return true
    return indicator.key === variant
  })
  const gridClassName =
    visibleIndicators.length === 1 ? 'grid gap-6' : 'grid gap-6 lg:grid-cols-2'

  return (
    <section className={gridClassName}>
      {visibleIndicators.map((indicator) => {
        const Icon = indicator.icon

        return (
          <div
            key={indicator.key}
            className={cn(
              'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm',
              'border-l-4',
              indicator.borderClass,
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={cn('h-5 w-5', indicator.iconClass)} />
                <h3 className="text-lg font-semibold text-foreground">{indicator.title}</h3>
              </div>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold',
                  indicator.badgeClass,
                )}
              >
                {indicator.badge}
              </span>
            </div>

            <div className={cn('mt-4 text-center text-3xl font-semibold', indicator.scoreClass)}>
              {indicator.score}分
            </div>

            <div className="mt-3 h-3 w-full rounded-full bg-slate-200/70">
              <div
                className={cn('h-3 rounded-full transition-all', indicator.progressClass)}
                style={{ width: `${indicator.score}%` }}
              />
            </div>

            <div className="mt-4 space-y-3 text-sm text-foreground">
              {indicator.items.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    {item.status === 'good' ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 text-red-500" />
                    )}
                    <span>{item.label}</span>
                  </div>
                  <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
