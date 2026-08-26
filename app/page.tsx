import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StageTimeline } from "@/components/StageTimeline";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { AlertBox } from "@/components/InfoBox";
import { Button } from "@/components/Button";

const homeFaqs: FaqItem[] = [
  {
    id: "E-024",
    q: "穿吊帶可以洗澡嗎？",
    a: "可以。洗澡時可暫時解開搭扣拆下，洗完立刻穿回，全程盡量讓雙腿保持分開。但是否可以拆，要由醫師決定——有些寶寶（例如 Ortolani 陽性）不能自行拆卸，請務必先在門診問清楚。",
  },
  {
    id: "E-033",
    q: "穿吊帶可以坐汽車安全座椅嗎？",
    a: "可以，而且必須用汽座（法律規定＋安全考量）。需要選下半部空間夠寬的款式，讓雙腿保持外展，安全帶繫緊但不要壓迫腿帶。如果現有汽座塞不下，回診時可請教醫師或個管師建議。",
  },
  {
    id: "F-007",
    q: "打石膏後要怎麼換尿布？",
    a: "把小一號的尿布塞入石膏與屁股之間，外面再插入一片夜安型衛生棉防滲漏，然後勤更換。石膏受潮會軟化失效，也容易造成皮膚潰爛與感染，發現潮濕要立即回診。",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative bg-mint-bg bg-repeat bg-top min-h-[230px] flex items-end px-6 sm:px-14 py-8 border-b-[3px] border-navy"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "560px auto",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(251,249,243,.96)_8%,rgba(251,249,243,.55)_55%,rgba(251,249,243,.15)_100%)]" />
        </section>

        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-14 pb-16 border-b border-ink/10">
          <div className="flex items-baseline gap-3 text-[12px] font-mono tracking-[.16em] text-orange">
            <span>DDH CARE · 家長照護指南</span>
          </div>
          <h1 className="mt-6 font-black font-serif text-[38px] sm:text-[56px] leading-[1.25] max-w-[15em]">
            髖關節發育不良
            <br />
            家長照護指南
          </h1>
          <p className="mt-6 max-w-[40em] text-[17.5px] leading-[1.95] text-ink-2 font-light">
            從診斷、吊帶、石膏到術後追蹤，這裡整理了每個階段最需要知道的照護重點與警訊判斷。有任何疑問，隨時可以聯絡個管師。
          </p>
          <div className="flex flex-wrap gap-9 mt-10 pt-7 border-t border-ink/10">
            <div>
              <div className="font-bold text-[30px] font-mono text-navy leading-none">
                4
              </div>
              <div className="mt-2 text-[13px] text-ink-3">個 · 治療階段</div>
            </div>
            <div>
              <div className="font-bold text-[30px] font-mono text-navy leading-none">
                300
              </div>
              <div className="mt-2 text-[13px] text-ink-3">題 · 常見問答</div>
            </div>
            <div>
              <div className="font-bold text-[30px] font-mono text-orange leading-none">
                1%
              </div>
              <div className="mt-2 text-[13px] text-ink-3">
                新生兒 · DDH 發生率
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button href="/contact" variant="primary">
              預約回診
            </Button>
            <Button href="/guide" variant="secondary">
              看照護步驟
            </Button>
          </div>
        </section>

        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <div className="text-[12px] font-mono tracking-[.16em] text-orange mb-3.5">
            治療路徑
          </div>
          <h2 className="font-bold font-serif text-[26px] sm:text-[28px] leading-[1.4] mb-6">
            寶寶年紀 · 各階段照護重點
          </h2>
          <StageTimeline />
        </section>

        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <AlertBox
            title="立即回診：出現以下任一狀況"
            items={[
              "腳趾發紫、發白或冰冷",
              "吊帶下皮膚破皮、紅腫或壓傷",
              "吊帶鬆脫、綁帶位置跑掉",
              "石膏散發異味或明顯潮濕",
            ]}
            action="→ 白天請電個管師 (02) 2727-5374；夜間直接掛急診"
          />
        </section>

        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14">
          <div className="text-[12px] font-mono tracking-[.16em] text-orange mb-3.5">
            常見問題
          </div>
          <h2 className="font-bold font-serif text-[26px] sm:text-[28px] leading-[1.4] mb-2.5">
            家長最常問的幾個問題
          </h2>
          <p className="mb-6 max-w-[38em] text-[15px] leading-[1.9] text-ink-2 font-light">
            這裡先列出幾個高頻提問，完整的 298 題常見問答可以搜尋或依階段分類查看。
          </p>
          <FaqAccordion faqs={homeFaqs} />
          <div className="mt-6">
            <Button href="/faq" variant="outline">
              查看完整常見問題 →
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
