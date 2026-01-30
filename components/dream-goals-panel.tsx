'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Plus, Edit2 } from 'lucide-react'

interface Dream {
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

export default function DreamGoalsPanel() {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculatePercentage = (completed: number, target: number) => {
    return Math.round((completed / target) * 100)
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
        >
          <Plus className="w-4 h-4" />
          新增夢想
        </Button>
      </CardHeader>

      <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
        {dreams.map((dream) => {
          const percentage = calculatePercentage(dream.completed, dream.target)
          const remaining = dream.target - dream.completed

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
    </Card>
  )
}
