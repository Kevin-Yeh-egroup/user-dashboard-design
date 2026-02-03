import { FileText, Mic, Upload } from 'lucide-react'

export default function RecordKeepingPanel() {
  return (
    <section className="rounded-3xl border border-primary/10 bg-rose-50/70 p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <FileText className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">記帳專區</h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            透過語音輸入或上傳帳務資訊，我們會自動幫您分類整理並分析現金流
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
          <span className="text-base font-semibold text-primary-foreground">記帳開口說</span>
          <span className="text-sm text-primary-foreground/80">
            用說的就能記帳，自動辨識時間、內容與金額
          </span>
        </button>
      </div>

      <div className="mt-4 sm:mt-5">
        <button
          type="button"
          className="group flex w-full flex-col items-center gap-2 rounded-2xl border border-rose-100 bg-white px-4 py-4 text-center shadow-sm transition hover:border-rose-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <Upload className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold text-foreground">上傳帳務資訊</span>
          <span className="text-sm text-muted-foreground">
            上傳記帳訊息，自動分類整理成表格並分析
          </span>
        </button>
      </div>
    </section>
  )
}
