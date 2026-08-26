import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoteBox } from "@/components/InfoBox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "免責聲明｜DDH 家長照護指南",
  description: "本站內容的來源、用途與限制。",
};

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-12 pb-9 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange">
            免責聲明
          </div>
          <h1 className="mt-5 font-black font-serif text-[32px] sm:text-h1 leading-[1.28] max-w-[18ch] text-balance">
            這個網站能做什麼、不能做什麼
          </h1>
        </section>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12 max-w-[52em]">
          <p className="text-body text-ink-2 font-light">{site.disclaimer}</p>

          <h2 className="mt-12 font-bold font-serif text-h2">這裡可以做的</h2>
          <ul className="mt-5 flex flex-col gap-3 text-body text-ink-2 font-light">
            <li>解釋名詞：Graf 分型、Alpha 角、帕氏吊帶、髖臼⋯⋯</li>
            <li>說明照護方式：包巾、抱姿、洗澡、換尿布、石膏照顧</li>
            <li>幫您整理回診時可以問醫師的問題</li>
            <li>說明什麼情況需要立刻就醫</li>
          </ul>

          <h2 className="mt-12 font-bold font-serif text-h2">這裡不能做的</h2>
          <ul className="mt-5 flex flex-col gap-3 text-body text-ink-2 font-light">
            <li>判讀您孩子的超音波或 X 光影像</li>
            <li>告訴您「這個角度嚴不嚴重」「要不要開刀」</li>
            <li>決定要不要繼續穿吊帶、什麼時候停</li>
            <li>調整任何治療內容，或取代回診</li>
          </ul>

          <NoteBox title="為什麼不能靠一張截圖判讀">
            同一個髖關節的不同切面，可以量出完全不同的結果。一張截圖無法判斷切面是否標準——這不是推託，是有明確醫學理由的。
          </NoteBox>

          <h2 className="mt-12 font-bold font-serif text-h2">內容來源</h2>
          <p className="mt-5 text-body text-ink-2 font-light">
            本站內容整理自本院衛教講義與護理指引，由兒童骨科個案管理團隊維護。每一段說明都可以追溯到對應的問答題號，供院內審閱。完整的問答收錄在
            <Link href="/faq" className="font-medium underline mx-1">
              常見問題
            </Link>
            頁。
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
