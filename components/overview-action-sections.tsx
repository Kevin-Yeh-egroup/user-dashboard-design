import { Button } from '@/components/ui/button'
import { Link2, Mail, MessageSquare, Share2 } from 'lucide-react'

export default function OverviewActionSections() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-rose-100 bg-rose-50/70 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-rose-500">
              <MessageSquare className="h-6 w-6" />
            </span>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                需要進一步的專業建議？
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                如果你想要更細緻的規劃、投資建議，或是有複雜的家庭財務狀況需要討論，我們的財務健康諮詢師可以幫助你。
              </p>
            </div>
          </div>
          <Button
            asChild
            className="w-full h-auto border border-rose-100 bg-white px-6 py-4 text-base font-semibold text-foreground hover:bg-rose-100/60 sm:w-1/2 sm:py-5 sm:text-lg"
          >
            <a href="https://www.familyfinhealth.com/online-consultation">
              預約免費線上財務諮詢
            </a>
          </Button>
        </div>
      </section>

      <section className="rounded-3xl border border-rose-100 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <Share2 className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-semibold text-foreground sm:text-xl">分享給家人</h3>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            className="group flex flex-col items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-5 text-center shadow-sm transition hover:border-rose-200 hover:bg-rose-50/70"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-500">
              <Link2 className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold text-foreground">產生分享連結</span>
            <span className="text-sm text-muted-foreground">複製連結給家人查看</span>
          </button>

          <button
            type="button"
            className="group flex flex-col items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50/40 px-4 py-5 text-center shadow-sm transition hover:border-rose-200 hover:bg-rose-50/70"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-rose-500">
              <Mail className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold text-foreground">寄送電子郵件</span>
            <span className="text-sm text-muted-foreground">直接將計畫寄到信箱</span>
          </button>
        </div>
      </section>
    </div>
  )
}
