'use client'

import { useEffect, useState } from 'react'
import { Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const OVERVIEW_BLOCK_KEYS = [
  { id: 'recordKeeping', label: '記帳專區' },
  { id: 'financialIndicators', label: '財務健康與財務安全' },
  { id: 'dreamGoals', label: '夢想完成狀況' },
  { id: 'emergencyFund', label: '緊急預備金狀況' },
  { id: 'consultShare', label: '預約諮詢與分享給家人' },
] as const

export type OverviewBlockId = (typeof OVERVIEW_BLOCK_KEYS)[number]['id']

export type OverviewSelection = Record<OverviewBlockId, boolean>

const DEFAULT_SELECTION: OverviewSelection = {
  recordKeeping: true,
  financialIndicators: true,
  dreamGoals: true,
  emergencyFund: true,
  consultShare: true,
}

const STORAGE_KEY = 'overview-selection'

function loadSelection(): OverviewSelection {
  if (typeof window === 'undefined') return DEFAULT_SELECTION
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SELECTION
    const parsed = JSON.parse(raw) as Partial<OverviewSelection>
    return { ...DEFAULT_SELECTION, ...parsed }
  } catch {
    return DEFAULT_SELECTION
  }
}

function saveSelection(selection: OverviewSelection) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
  } catch {
    // ignore
  }
}

type OverviewCustomizerProps = {
  selection: OverviewSelection
  onSelectionChange: (selection: OverviewSelection) => void
}

export function OverviewCustomizer({ selection, onSelectionChange }: OverviewCustomizerProps) {
  const [open, setOpen] = useState(false)

  const handleToggle = (id: OverviewBlockId, checked: boolean) => {
    const next = { ...selection, [id]: checked }
    onSelectionChange(next)
    saveSelection(next)
  }

  const handleReset = () => {
    onSelectionChange(DEFAULT_SELECTION)
    saveSelection(DEFAULT_SELECTION)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          自訂總覽
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">選擇要顯示的功能</p>
          <div className="space-y-3">
            {OVERVIEW_BLOCK_KEYS.map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={id}
                  checked={selection[id] ?? true}
                  onCheckedChange={(checked) => handleToggle(id, checked === true)}
                />
                <Label
                  htmlFor={id}
                  className="text-sm font-normal cursor-pointer leading-tight"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full" onClick={handleReset}>
            恢復預設
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { loadSelection, DEFAULT_SELECTION, OVERVIEW_BLOCK_KEYS }
export type { OverviewBlockId }
