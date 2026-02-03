'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PiggyBank, Edit2 } from 'lucide-react'

type EmergencyFundData = {
  target: number
  current: number
}

type EmergencyFundPanelProps = {
  data?: EmergencyFundData
  onChange?: (data: EmergencyFundData) => void
}

export default function EmergencyFundPanel({
  data: externalData,
  onChange,
}: EmergencyFundPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [internalData, setInternalData] = useState<EmergencyFundData>({
    target: 300000,
    current: 100000,
  })

  const data = externalData ?? internalData
  const setData = onChange ?? setInternalData

  const [formData, setFormData] = useState({
    target: String(data.target),
    current: String(data.current),
  })

  const safeTarget = Number.isFinite(data.target) && data.target > 0 ? data.target : 0
  const safeCurrent = Number.isFinite(data.current) && data.current >= 0 ? data.current : 0
  const remaining = Math.max(0, safeTarget - safeCurrent)
  const percentage = safeTarget === 0 ? 0 : Math.round((safeCurrent / safeTarget) * 100)

  const isSaveDisabled = useMemo(() => {
    const targetValue = Number(formData.target)
    const currentValue = Number(formData.current)
    if (!Number.isFinite(targetValue) || targetValue <= 0) return true
    if (!Number.isFinite(currentValue) || currentValue < 0) return true
    return false
  }, [formData])

  const openDialog = () => {
    setFormData({
      target: String(data.target),
      current: String(data.current),
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    const targetValue = Number(formData.target)
    const currentValue = Number(formData.current)
    if (!Number.isFinite(targetValue) || targetValue <= 0) return
    if (!Number.isFinite(currentValue) || currentValue < 0) return

    const nextCurrent = Math.min(currentValue, targetValue)
    setData({ target: targetValue, current: nextCurrent })
    setDialogOpen(false)
  }

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
          onClick={openDialog}
          aria-label="編輯緊急預備金"
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
              {formatCurrency(safeTarget)}
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
              {formatCurrency(safeCurrent)}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>編輯緊急預備金</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="emergency-target">目標金額</Label>
              <Input
                id="emergency-target"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.target}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, target: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergency-current">目前金額</Label>
              <Input
                id="emergency-current"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.current}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, current: event.target.value }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaveDisabled}>
              儲存變更
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
