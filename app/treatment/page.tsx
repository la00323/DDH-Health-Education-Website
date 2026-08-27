import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { StageTimeline } from "@/components/StageTimeline";
import { AlertBox, NoteBox, DisclaimerBox } from "@/components/InfoBox";
import { QaList } from "@/components/QaList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "如果需要治療｜DDH 家長照護指南",
  description:
    "已經確定需要治療的寶寶，各階段的照護重點：帕式吊帶、人字石膏、術後追蹤，以及什麼情況要立刻回診。",
};

export default function TreatmentPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-12 pb-9 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange">
            如果需要治療
          </div>
          <h1 className="mt-5 font-black font-serif text-[32px] sm:text-h1 leading-[1.28] text-balance">
            治療期間的照護
          </h1>

          {/* 界定範圍：擋住從 Google 搜「Graf IIa 治療」直接掉進來的人 */}
          <div className="mt-6 border-l-4 border-amber-border bg-amber-bg rounded-r-lg px-6 py-5">
            <p className="text-body text-ink font-light">
              以下內容適用於
              <span className="font-medium">已經確定需要治療</span>
              的寶寶。如果您的報告是 Type I 或 IIa，
              <Link href="/results" className="font-medium underline">
                請看「看懂檢查結果」
              </Link>
              ——那兩型多數不需要治療。
            </p>
          </div>
        </section>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          <h2 className="font-bold font-serif text-h2">
            寶寶年紀 · 各階段照護重點
          </h2>
          <p className="mt-4 text-lede text-ink-2 font-light">
            點選階段可以展開該階段的照護重點。實際的治療方式與時程一定要依主治醫師的安排。
          </p>
          <div className="mt-8">
            <StageTimeline />
          </div>

          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              警訊
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              什麼情況要立刻回診
            </h2>
            <AlertBox
              title="立即回診：出現以下任一狀況"
              items={[
                "腳趾發紫、發白或冰冷",
                "吊帶下皮膚破皮、紅腫或壓傷",
                "吊帶鬆脫、綁帶位置跑掉",
                "石膏散發異味或明顯潮濕",
                "寶寶原本會踢腿，突然不踢了",
              ]}
              action={
                <>
                  → 白天請聯絡個管師 {site.phone}；夜間直接掛急診
                </>
              }
            />

            <NoteBox title="建議您現在就做的三件事">
              把這一段存在手機裡（截圖或加入書籤）、把醫院聯絡電話設成快速撥號、讓所有照顧者都看過這份清單（另一半、長輩、保母）。
            </NoteBox>
          </section>

          <QaList
            ids={["E-024", "E-033", "F-007", "K-001"]}
            title="治療期間的常見問題"
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/faq?cat=E,F,G" variant="primary">
              吊帶、石膏、手術的完整問答 →
            </Button>
            <Button href="/daily-care" variant="outline">
              日常照護三要訣 →
            </Button>
          </div>

          <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
        </div>
      </main>
      <Footer />
    </>
  );
}
