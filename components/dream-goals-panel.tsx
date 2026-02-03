'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Heart, Plus, Edit2 } from 'lucide-react'

export interface Dream {
  id: string
  name: string
  target: number
  completed: number
  icon: 'heart' | 'star' | 'home' | 'book'
}

const DREAM_ICONS = {
  heart: '❤️',
  star: '⭐',
  home: '🏠',
  book: '📚',
}

const DEFAULT_FORM = {
  name: '',
  target: '',
  completed: '',
  icon: 'heart' as Dream['icon'],
}

const DREAM_ICON_OPTIONS: Array<{ value: Dream['icon']; label: string }> = [
  { value: 'heart', label: '愛心' },
  { value: 'star', label: '星星' },
  { value: 'home', label: '房子' },
  { value: 'book', label: '書本' },
]

type DreamGoalsPanelProps = {
  dreams?: Dream[]
  onDreamsChange?: (dreams: Dream[]) => void
}

export default function DreamGoalsPanel({
  dreams: externalDreams,
  onDreamsChange,
}: DreamGoalsPanelProps) {
  const [internalDreams, setInternalDreams] = useState<Dream[]>([
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
  const dreams = externalDreams ?? internalDreams
  const setDreams = onDreamsChange ?? setInternalDreams
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(DEFAULT_FORM)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculatePercentage = (completed: number, target: number) => {
    if (target === 0) return 0
    return Math.round((completed / target) * 100)
  }

  const isSaveDisabled = useMemo(() => {
    const targetValue = Number(formData.target)
    return !formData.name.trim() || !Number.isFinite(targetValue) || targetValue <= 0
  }, [formData.name, formData.target])

  const openAddDialog = () => {
    setEditingId(null)
    setFormData(DEFAULT_FORM)
    setDialogOpen(true)
  }

  const openEditDialog = (dream: Dream) => {
    setEditingId(dream.id)
    setFormData({
      name: dream.name,
      target: String(dream.target),
      completed: String(dream.completed),
      icon: dream.icon,
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    const targetValue = Number(formData.target)
    const completedValue = Number(formData.completed)
    if (!Number.isFinite(targetValue) || targetValue <= 0) return

    const safeCompleted = Math.min(
      Math.max(0, Number.isFinite(completedValue) ? completedValue : 0),
      targetValue,
    )

    const nextDream: Dream = {
      id: editingId ?? `${Date.now()}-${Math.round(Math.random() * 1000)}`,
      name: formData.name.trim() || '未命名夢想',
      target: targetValue,
      completed: safeCompleted,
      icon: formData.icon,
    }

    setDreams((prev) => {
      if (editingId) {
        return prev.map((dream) => (dream.id === editingId ? nextDream : dream))
      }
      return [nextDream, ...prev]
    })
    setDialogOpen(false)
  }

  return (
    <Card className="bg-white border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-4 border-b border-primary/10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" fill="currentColor" />
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
            夢想完成狀況
          </CardTitle>
        </div>
        <Button
          size="sm"
          className="w-full sm:w-auto justify-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={openAddDialog}
        >
          <Plus className="w-4 h-4" />
          新增夢想
        </Button>
      </CardHeader>

      <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
        {dreams.map((dream) => {
          const percentage = calculatePercentage(dream.completed, dream.target)
          const remaining = Math.max(0, dream.target - dream.completed)

          return (
            <div
              key={dream.id}
              className="p-4 sm:p-5 rounded-lg bg-primary/5 border border-primary/15 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl">{DREAM_ICONS[dream.icon]}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-base mb-1">
                      {dream.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      目標：<span className="font-medium">{formatCurrency(dream.target)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <div className="text-primary font-semibold text-lg">{percentage}%</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                    onClick={() => openEditDialog(dream)}
                    aria-label={`編輯 ${dream.name}`}
                  >
                    <Edit2 className="w-4 h-4 text-primary/60" />
                  </Button>
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm">
                <span className="text-muted-foreground">
                  已完成：
                  <span className="font-semibold text-primary ml-1">
                    {formatCurrency(dream.completed)}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  還需要：
                  <span className="font-semibold text-primary ml-1">
                    {formatCurrency(remaining)}
                  </span>
                </span>
              </div>

              <div className="mt-2 text-[11px] sm:text-xs text-muted-foreground bg-secondary/30 rounded px-2 py-1.5 leading-relaxed">
                ✨ 已完成金額 - 初始設定金額 - 記帳中的儲備金額
              </div>
            </div>
          )
        })}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? '編輯夢想' : '新增夢想'}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dream-name">夢想名稱</Label>
              <Input
                id="dream-name"
                placeholder="例如：日本家庭旅遊"
                value={formData.name}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>夢想圖示</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, icon: value as Dream['icon'] }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="選擇圖示" />
                </SelectTrigger>
                <SelectContent>
                  {DREAM_ICON_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="mr-2">{DREAM_ICONS[option.value]}</span>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dream-target">目標金額</Label>
              <Input
                id="dream-target"
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
              <Label htmlFor="dream-completed">已完成金額</Label>
              <Input
                id="dream-completed"
                type="number"
                min={0}
                inputMode="numeric"
                value={formData.completed}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, completed: event.target.value }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaveDisabled}>
              {editingId ? '儲存變更' : '新增夢想'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
