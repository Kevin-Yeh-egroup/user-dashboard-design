import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type IndicatorHistoryRecord = {
  id: string
  date: string
  title: string
  value: string
  status?: 'good' | 'warning' | 'bad' | 'neutral'
  statusLabel?: string
  note?: string
}

type IndicatorHistoryPanelProps = {
  title: string
  description?: string
  records: IndicatorHistoryRecord[]
}

const STATUS_STYLES: Record<
  NonNullable<IndicatorHistoryRecord['status']>,
  string
> = {
  good: 'border-transparent bg-emerald-100 text-emerald-700',
  warning: 'border-transparent bg-amber-100 text-amber-700',
  bad: 'border-transparent bg-red-100 text-red-600',
  neutral: 'border-transparent bg-slate-100 text-slate-600',
}

const STATUS_LABELS: Record<
  NonNullable<IndicatorHistoryRecord['status']>,
  string
> = {
  good: '穩定',
  warning: '留意',
  bad: '風險',
  neutral: '一般',
}

export default function IndicatorHistoryPanel({
  title,
  description,
  records,
}: IndicatorHistoryPanelProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-base font-semibold text-foreground">{title}</h4>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <span className="text-xs text-muted-foreground">近三次</span>
      </div>

      <div className="mt-4 space-y-3">
        {records.map((record) => {
          const badgeText = record.status
            ? record.statusLabel ?? STATUS_LABELS[record.status]
            : null

          return (
            <div
              key={record.id}
              className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{record.title}</p>
                <p className="text-xs text-muted-foreground">
                  {record.date}
                  {record.note ? ` · ${record.note}` : ''}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-semibold text-foreground">{record.value}</p>
                {record.status ? (
                  <Badge className={cn('px-2 py-0.5', STATUS_STYLES[record.status])}>
                    {badgeText}
                  </Badge>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
