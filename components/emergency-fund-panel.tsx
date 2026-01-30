'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PiggyBank, Edit2 } from 'lucide-react'

export default function EmergencyFundPanel() {
  const target = 300000
  const current = 100000
  const remaining = target - current
  const percentage = Math.round((current / target) * 100)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="bg-white border-accent/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4 border-b border-accent/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <PiggyBank className="w-6 h-6 text-accent" fill="currentColor" />
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
            緊急預備金狀況
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-accent/10 self-end sm:self-auto"
        >
          <Edit2 className="w-4 h-4 text-accent/60" />
        </Button>
      </CardHeader>

      <CardContent className="pt-4 sm:pt-6">
        <div className="space-y-5 sm:space-y-6">
          {/* Target Amount */}
          <div className="p-4 sm:p-5 rounded-lg bg-accent/5 border border-accent/15">
            <p className="text-sm text-muted-foreground mb-2">目標金額</p>
            <p className="text-2xl sm:text-3xl font-bold text-accent">
              {formatCurrency(target)}
            </p>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="w-full bg-accent/10 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-accent to-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Current Amount */}
          <div className="p-4 sm:p-5 rounded-lg bg-secondary/40 border border-accent/15">
            <p className="text-sm text-muted-foreground mb-2">目前金額</p>
            <p className="text-2xl sm:text-3xl font-bold text-accent">
              {formatCurrency(current)}
            </p>
          </div>

          {/* Remaining Amount */}
          <div className="p-4 sm:p-5 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-yellow-700 font-medium mb-1">距離目標還需要</p>
            <p className="text-xl sm:text-2xl font-bold text-yellow-600">
              {formatCurrency(remaining)}
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              才能達成目標 🎯
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between pt-1 sm:pt-2">
            <span className="text-sm text-muted-foreground">完成度</span>
            <span className="text-lg font-bold text-accent">{percentage}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
