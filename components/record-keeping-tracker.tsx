'use client'

import { useMemo, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Bell, CalendarCheck2, Clock } from 'lucide-react'
import { type RecordEntry } from '@/lib/record-keeping'

const toDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseDateKey = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const addDays = (date: Date, offset: number) => {
  const next = new Date(date)
  next.setDate(date.getDate() + offset)
  return next
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

type RecordKeepingTrackerProps = {
  records: RecordEntry[]
}

export default function RecordKeepingTracker({ records }: RecordKeepingTrackerProps) {
  const today = new Date()
  const todayKey = toDateKey(today)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)
  const [reviewTime, setReviewTime] = useState('21:00')

  const selectedKey = selectedDate ? toDateKey(selectedDate) : todayKey

  const loggedDateKeys = useMemo(() => {
    const keys = new Set<string>()
    records.forEach((record) => keys.add(record.date))
    return keys
  }, [records])

  const loggedDates = useMemo(
    () => Array.from(loggedDateKeys).map(parseDateKey),
    [loggedDateKeys],
  )

  const needsReminderDates = useMemo(() => {
    if (loggedDateKeys.has(todayKey)) return []
    return [parseDateKey(todayKey)]
  }, [loggedDateKeys, todayKey])

  const selectedRecords = useMemo(
    () => records.filter((record) => record.date === selectedKey),
    [records, selectedKey],
  )

  const summary = useMemo(() => {
    const income = selectedRecords
      .filter((record) => record.type === 'income')
      .reduce((sum, record) => sum + record.amount, 0)
    const expense = selectedRecords
      .filter((record) => record.type === 'expense')
      .reduce((sum, record) => sum + record.amount, 0)
    return {
      income,
      expense,
      net: income - expense,
    }
  }, [selectedRecords])

  const isToday = selectedKey === todayKey
  const hasRecords = selectedRecords.length > 0

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">記帳行事曆</h3>
            <p className="text-sm text-muted-foreground">
              已記帳日期會標示，未記帳的今天會提醒
            </p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700">已記帳</Badge>
        </div>

        <div className="mt-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{ logged: loggedDates, needsReminder: needsReminderDates }}
            modifiersClassNames={{
              logged:
                'relative after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-emerald-500',
              needsReminder:
                'relative after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-amber-500',
            }}
            className="w-full"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            已完成記帳
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            今日待記帳提醒
          </div>
        </div>

        <div
          className={cn(
            'mt-4 flex items-start gap-3 rounded-xl border px-3 py-3 text-base',
            hasRecords
              ? 'border-emerald-100 bg-emerald-50/60 text-emerald-700'
              : 'border-amber-100 bg-amber-50/70 text-amber-700',
          )}
        >
          <Bell className="mt-0.5 h-4 w-4" />
          <div>
            {isToday ? (
              <p className="font-medium">
                {hasRecords ? '今天已完成記帳' : '今天尚未記帳，記得完成今日記帳'}
              </p>
            ) : (
              <p className="font-medium">已切換到 {selectedKey} 的記帳紀錄</p>
            )}
            {isToday ? (
              <p className="text-sm">回顧提醒時間：{reviewTime}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">每日回顧</h3>
            <p className="text-sm text-muted-foreground">
              設定提醒時間，快速查看今日紀錄與摘要
            </p>
          </div>
          <CalendarCheck2 className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-muted-foreground" htmlFor="review-time">
            回顧提醒時間
          </label>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Input
              id="review-time"
              type="time"
              value={reviewTime}
              onChange={(event) => setReviewTime(event.target.value)}
              className="w-full max-w-[180px] text-base"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted/30 px-3 py-2">
            <p className="text-sm text-muted-foreground">收入</p>
            <p className="text-base font-semibold text-emerald-600">
              {formatCurrency(summary.income)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 px-3 py-2">
            <p className="text-sm text-muted-foreground">支出</p>
            <p className="text-base font-semibold text-rose-600">
              {formatCurrency(summary.expense)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 px-3 py-2">
            <p className="text-sm text-muted-foreground">淨額</p>
            <p
              className={cn(
                'text-base font-semibold',
                summary.net >= 0 ? 'text-emerald-600' : 'text-rose-600',
              )}
            >
              {formatCurrency(summary.net)}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>今日紀錄</span>
            <span>{selectedRecords.length} 筆</span>
          </div>

          {hasRecords ? (
            <div className="space-y-3">
              {selectedRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-base font-medium text-foreground">{record.title}</p>
                    <p className="text-sm text-muted-foreground">
                  {record.category}
                  {record.note ? ` · ${record.note}` : ''}
                </p>
                  </div>
                  <span
                    className={cn(
                      'text-base font-semibold',
                      record.type === 'income' ? 'text-emerald-600' : 'text-rose-600',
                    )}
                  >
                    {record.type === 'income' ? '+' : '-'}
                {formatCurrency(record.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-center text-base text-muted-foreground">
              尚未有記帳紀錄，完成記帳後會顯示在這裡
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
