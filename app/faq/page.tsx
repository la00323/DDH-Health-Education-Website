import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqSearchPage } from "@/components/FaqSearchPage";
import { DisclaimerBox } from "@/components/InfoBox";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "常見問題｜DDH 家長照護指南",
  description: "髖關節發育不良（DDH）常見問題搜尋——疾病認識、篩檢就醫、影像檢查、日常照護、吊帶、石膏、手術、併發症、費用、情緒與紅旗警訊。",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-12 pb-8 border-b border-ink/10">
          <div className="text-[12px] font-mono tracking-[.16em] text-orange mb-3.5">
            常見問題
          </div>
          <h1 className="font-black font-serif text-[32px] sm:text-[42px] leading-[1.3]">
            DDH 家長常見問題
          </h1>
          <p className="mt-4 max-w-[42em] text-[15.5px] leading-[1.9] text-ink-2 font-light">
            收錄 {faqs.length} 題家長最常問的問題，依照護階段分類，也可以直接搜尋關鍵字（例如「洗澡」「安全座椅」「發燒」）。
          </p>
        </section>

        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-10">
          <Suspense fallback={null}>
            <FaqSearchPage faqs={faqs} />
          </Suspense>
        </section>

        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pb-16">
          <DisclaimerBox>
            本頁內容整理自本院衛教講義與護理指引，僅供照護參考，不能取代醫師診斷。任何個別化的判斷（例如影像判讀、是否需要手術、治療進度調整），都必須由主治醫師當面評估。若出現緊急狀況（見標示「立即回診」的題目），請直接聯絡個管師或掛急診，不要只依賴本頁內容自行判斷。
          </DisclaimerBox>
        </section>
      </main>
      <Footer />
    </>
  );
}
