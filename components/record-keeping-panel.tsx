'use client'

import { useMemo, useState } from 'react'
import { FileText, Mic, PenLine } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RECORD_DEFINITIONS, type RecordEntry, type RecordType } from '@/lib/record-keeping'

type RecordKeepingPanelProps = {
  onAddRecord?: (record: RecordEntry) => void
}

const getTodayKey = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getDefaultSelection = (type: RecordType) => {
  const categories = RECORD_DEFINITIONS[type]
  const defaultCategory = categories.find((option) => option.label.includes('生活')) ?? categories[0]
  const defaultGroup =
    defaultCategory?.groups.find((option) => option.label.includes('生活')) ??
    defaultCategory?.groups[0]
  const defaultItem = defaultGroup?.items?.[0] ?? ''

  return {
    category: defaultCategory?.label ?? '',
    group: defaultGroup?.label ?? '',
    item: defaultItem,
  }
}

export default function RecordKeepingPanel({ onAddRecord }: RecordKeepingPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [recordType, setRecordType] = useState<RecordType>('expense')
  const [category, setCategory] = useState('')
  const [group, setGroup] = useState('')
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [recordDate, setRecordDate] = useState(getTodayKey())

  const categoryOptions = RECORD_DEFINITIONS[recordType]
  const selectedCategory =
    categoryOptions.find((option) => option.label === category) ?? categoryOptions[0]
  const groupOptions = selectedCategory?.groups ?? []
  const selectedGroup = groupOptions.find((option) => option.label === group) ?? groupOptions[0]
  const itemOptions = selectedGroup?.items ?? []

  const openManualEntry = () => {
    const defaults = getDefaultSelection(recordType)

    setCategory(defaults.category)
    setGroup(defaults.group)
    setItem(defaults.item)
    setAmount('')
    setNote('')
    setRecordDate(getTodayKey())
    setDialogOpen(true)
  }

  const handleTypeChange = (value: RecordType) => {
    const defaults = getDefaultSelection(value)

    setRecordType(value)
    setCategory(defaults.category)
    setGroup(defaults.group)
    setItem(defaults.item)
  }

  const handleCategoryChange = (value: string) => {
    const nextCategory = RECORD_DEFINITIONS[recordType].find((option) => option.label === value)
    const nextGroup =
      nextCategory?.groups.find((option) => option.label.includes('生活')) ??
      nextCategory?.groups[0]
    const nextItem = nextGroup?.items?.[0] ?? ''

    setCategory(value)
    setGroup(nextGroup?.label ?? '')
    setItem(nextItem)
  }

  const handleGroupChange = (value: string) => {
    const nextGroup = groupOptions.find((option) => option.label === value)
    const nextItem = nextGroup?.items?.[0] ?? ''

    setGroup(value)
    setItem(nextItem)
  }

  const isSaveDisabled = useMemo(() => {
    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) return true
    if (!recordDate) return true
    if (!category || !group || !item) return true
    return false
  }, [amount, recordDate, category, group, item])

  const handleSave = () => {
    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) return

    const record: RecordEntry = {
      id: `record-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      date: recordDate,
      title: item,
      category: `${category} / ${group}`,
      amount: numericAmount,
      type: recordType,
      note: note.trim() || undefined,
    }

    onAddRecord?.(record)
    setDialogOpen(false)
  }

  return (
    <section className="rounded-3xl border border-primary/10 bg-rose-50/70 p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <FileText className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">記帳專區</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            透過語音輸入或手動記帳，我們會自動幫您分類整理並分析現金流
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4 sm:mt-6">
        <button
          type="button"
          className="group flex w-full flex-col items-center gap-3 rounded-2xl bg-primary px-5 py-6 text-center text-primary-foreground shadow-md transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-primary-foreground">
            <Mic className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold text-primary-foreground">記帳開口說</span>
          <span className="text-base text-primary-foreground/80">
            用說的就能記帳，自動辨識時間、內容與金額
          </span>
        </button>
      </div>

      <div className="mt-4 sm:mt-5">
        <button
          type="button"
          className="group flex w-full flex-col items-center gap-2 rounded-2xl border border-rose-100 bg-white px-4 py-4 text-center shadow-sm transition hover:border-rose-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
          onClick={openManualEntry}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <PenLine className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold text-foreground">手動記帳</span>
          <span className="text-base text-muted-foreground">
            依照收支定義選擇類別，完成紀錄
          </span>
        </button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">手動記帳</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-base">收支類型</Label>
              <Select
                value={recordType}
                onValueChange={(value) => handleTypeChange(value as RecordType)}
              >
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="選擇類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income" className="text-base">
                    收入
                  </SelectItem>
                  <SelectItem value="expense" className="text-base">
                    支出
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-base">分類</Label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="選擇分類" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.label} value={option.label} className="text-base">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-base">子分類</Label>
              <Select value={group} onValueChange={handleGroupChange}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="選擇子分類" />
                </SelectTrigger>
                <SelectContent>
                  {groupOptions.map((option) => (
                    <SelectItem key={option.label} value={option.label} className="text-base">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-base">項目</Label>
              <Select value={item} onValueChange={setItem}>
                <SelectTrigger className="w-full text-base">
                  <SelectValue placeholder="選擇項目" />
                </SelectTrigger>
                <SelectContent>
                  {itemOptions.map((option) => (
                    <SelectItem key={option} value={option} className="text-base">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="record-amount" className="text-base">
                金額
              </Label>
              <Input
                id="record-amount"
                type="number"
                min={0}
                inputMode="numeric"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="text-base"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="record-date" className="text-base">
                日期
              </Label>
              <Input
                id="record-date"
                type="date"
                value={recordDate}
                onChange={(event) => setRecordDate(event.target.value)}
                className="text-base"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="record-note" className="text-base">
                備註
              </Label>
              <Input
                id="record-note"
                placeholder="可填寫補充說明"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaveDisabled}>
              儲存紀錄
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
