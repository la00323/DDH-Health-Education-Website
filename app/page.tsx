import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { TopicCardGrid } from "@/components/Topic";
import { StatRow, QuickRouter } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { NoteBox } from "@/components/InfoBox";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* 頁首橫幅：維持原本的底圖與米白漸層罩，純裝飾、上面不壓字 */}
        <section
          className="relative bg-mint-bg bg-repeat bg-top min-h-[230px] flex items-end px-6 sm:px-14 py-8 border-b-[3px] border-navy"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "560px auto",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(251,249,243,.96)_8%,rgba(251,249,243,.55)_55%,rgba(251,249,243,.15)_100%)]" />
        </section>

        {/* 標題區：第一句就點名讀者的處境 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-14 pb-16 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange">
            DDH CARE · 高雄榮民總醫院
          </div>
          <h1 className="mt-6 font-black font-serif text-[34px] sm:text-[52px] leading-[1.25] max-w-[16ch] text-balance">
            寶寶被安排做髖關節超音波
          </h1>
          <p className="mt-6 max-w-[44ch] text-lede text-ink-2 font-light">
            您的寶寶因為有一項危險因子，被安排了髖關節超音波檢查。
            <span className="font-medium text-ink bg-[linear-gradient(transparent_62%,var(--color-mint)_62%)]">
              這件事最常見的結果是：一切正常。
            </span>
            這個網站陪您把接下來幾週該知道的事看完。
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button href="/when-to-screen" variant="primary">
              醫師說要回來照 →
            </Button>
            <Button href="/results" variant="secondary">
              我拿到報告了 →
            </Button>
          </div>

          <StatRow
            stats={[
              {
                value: "1.5‰",
                label: "台灣每 1,000 名新生兒約 1.5 位",
                source: "A-005",
              },
              {
                value: "9 成",
                label: "出生時關節鬆動的寶寶，兩週內自然穩定",
                source: "A-019",
              },
              {
                value: "4–6 週",
                label: "建議做超音波檢查的時間",
                source: "B-005",
                tone: "orange",
              },
            ]}
          />
        </section>

        {/* 五大主題卡片 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange mb-4">
            從這五件事開始
          </div>
          <h2 className="font-bold font-serif text-h2 mb-8">
            您現在最需要知道的
          </h2>
          <TopicCardGrid />
        </section>

        {/* 快速分流：直接跳到段落，不只是頁面 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange mb-4">
            直接找到您要的那一段
          </div>
          <h2 className="font-bold font-serif text-h2">我現在的情況是⋯</h2>
          <QuickRouter
            items={[
              {
                q: "醫師說要四到六週再回來照",
                dest: "什麼時候該檢查",
                href: "/when-to-screen",
              },
              {
                q: "報告上寫 Type I",
                dest: "看懂檢查結果",
                href: "/results#type-i",
              },
              {
                q: "報告上寫 IIa",
                dest: "看懂檢查結果",
                href: "/results#type-iia",
              },
              {
                q: "醫師說要開始治療",
                dest: "如果需要治療",
                href: "/treatment",
              },
            ]}
          />
        </section>

        {/* 三要訣：這六週真正能做的事 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange mb-4">
            這幾週您可以做的事
          </div>
          <h2 className="font-black font-serif text-[30px] sm:text-[38px] leading-[1.35] text-navy tracking-[.03em]">
            包開開・抱開開・背開開
          </h2>
          <p className="mt-5 max-w-[46ch] text-lede text-ink-2 font-light">
            出生時關節鬆動的寶寶，兩週後約九成會自然穩定
            ——
            <span className="font-medium text-ink">
              但前提是雙腿能自由彎曲外展
            </span>
            。把腿包緊，會直接關掉這個機制。
          </p>
          <Figure id="three-habits" className="mt-8" />
          <div className="flex flex-wrap gap-3 mt-7">
            <Button href="/daily-care" variant="primary">
              看完整做法 →
            </Button>
          </div>
        </section>

        {/* 常見問題預覽 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange mb-4">
            常見問題
          </div>
          <h2 className="font-bold font-serif text-h2">家長最常問的三題</h2>
          <p className="mt-4 max-w-[42ch] text-lede text-ink-2 font-light">
            完整的 298 題可以搜尋關鍵字，或依階段分類查看。
          </p>
          <QaList ids={["A-038", "C-003", "D-004"]} title="" />
          <div className="mt-7">
            <Button href="/faq" variant="outline">
              查看完整常見問題 →
            </Button>
          </div>
        </section>

        {/* 情緒支持 + 治療入口 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14">
          <NoteBox title="如果您這幾天一直睡不好">
            擔心是正常的，而且很常見。知識庫裡有一整類是寫給家長自己的——包含「是不是我的錯」「長輩一直說是我害的」「我一天檢查孩子的腿好多次」這些沒人敢問的問題。
            <Link href="/faq?cat=J" className="ml-1 font-medium underline">
              看這一類 →
            </Link>
          </NoteBox>

          <div className="flex flex-wrap items-center gap-5 justify-between bg-[#F5F2E9] border border-ink/[.08] rounded-xl px-6 py-6 mt-6">
            <p className="text-caption text-ink-2 font-light max-w-[46ch]">
              已經確診、正在使用吊帶或石膏？治療期間的照護步驟、回診節奏與警訊判斷都在這裡。
            </p>
            <Button href="/treatment" variant="outline">
              如果需要治療 →
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
