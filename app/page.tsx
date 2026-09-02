import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { TopicCardGrid } from "@/components/Topic";
import { QuickRouter } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { NoteBox } from "@/components/InfoBox";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/*
          頁首橫幅：上半是裝飾底圖，下半放「這是誰、憑什麼」的識別列。

          原本這一條純裝飾、上面不壓字，是全站最大的一塊空地；
          而標語跟認證徽章都需要一個「不打斷閱讀」的位置——
          放在標題區裡會卡在 h1 跟按鈕之間，把家長真正要讀的那段擠開。
          擺在這裡，家長往下捲之前就看到，但不必停下來讀。
        */}
        <section
          className="relative bg-mint-bg bg-repeat bg-top border-b-[3px] border-navy"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "560px auto",
          }}
        >
          {/*
            裝飾帶：底圖完整露出來的那一段，往下淡入米白。

            漸層刻意只蓋這一段、不用百分比蓋整個 section——用百分比的話，
            視窗一變窄、識別列換行變高，不透明的那一段就會被推到文字上方，
            底圖的插畫會透過來干擾文字（768px 時實測就是這樣）。

            底部收在 92%（不是全實心），跟下面識別列的罩子同一個濃度，
            這樣整條橫幅看起來是連續的一張圖，不會有一條接縫。
          */}
          <div className="relative h-[104px] lg:h-[148px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(251,249,243,.92)_0%,rgba(251,249,243,.5)_60%,rgba(251,249,243,.1)_100%)]" />
          </div>

          {/*
            識別列：實心米白，不管換不換行都不會被底圖干擾。

            上下都留 28px。上方那一段是為了捲動時——Header 是 sticky，
            往下捲超過裝飾帶的高度後，這一列會直接貼到 Header 底下，
            沒有留白就會擠成一團。

            底色用 92% 而不是全實心：底圖的插畫會很淡地透出來，
            整條橫幅才像同一張圖。文字是藏青粗體，8% 的花紋不影響對比。
          */}
          <div className="relative bg-[rgba(251,249,243,.92)]">
            <div className="max-w-[1180px] mx-auto px-6 sm:px-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 pt-7 pb-7">
              {/* 左：院徽 + 標語 */}
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.jpg"
                  alt="高雄榮總小兒髖關節發育不良群組標誌"
                  width={88}
                  height={88}
                  priority
                  className="rounded-full w-[64px] lg:w-[80px] h-auto shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-serif font-bold text-navy text-[17px] lg:text-[23px] leading-[1.4]">
                    從髖開始，守護寶寶的第一步
                  </div>
                  <div className="mt-1 text-label lg:text-caption text-ink-2 font-light">
                    高雄榮總　骨科 × 兒科　聯合守護
                  </div>
                </div>
              </div>

              {/* 右：疾病別照護認證 */}
              <div className="flex items-center gap-3.5">
                <Image
                  src="/certification.png"
                  alt="財團法人醫院評鑑暨醫療品質策進會 小兒髖關節發育不良照護品質認證標章"
                  width={88}
                  height={96}
                  priority
                  className="w-[64px] lg:w-[80px] h-auto shrink-0"
                />
                <div className="min-w-0 text-label leading-[1.55]">
                  <div className="font-medium text-navy">
                    小兒髖關節發育不良
                    <br />
                    照護品質認證
                  </div>
                  <div className="mt-0.5 text-ink-3">
                    醫策會 ·{" "}
                    <span className="font-mono whitespace-nowrap">
                      2026.04–2029.03
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 標題區：第一句就點名讀者的處境 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-14 pb-16 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange">
            DDH CARE · 高雄榮民總醫院
          </div>
          <h1 className="mt-6 font-black font-serif text-[34px] sm:text-[52px] leading-[1.25] text-balance">
            寶寶被安排做髖關節超音波
          </h1>
          <p className="mt-6 text-lede text-ink-2 font-light">
            您的寶寶因為有一項危險因子，被安排了髖關節超音波檢查。
            <span className="font-medium text-ink bg-[linear-gradient(transparent_62%,var(--color-mint)_62%)]">
              這件事最常見的結果是：一切正常。
            </span>
            這個網站陪您把接下來幾週該知道的事看完。
          </p>

          {/*
            這一段刻意只有兩個按鈕，中間不插任何東西。

            這裡曾經放過三個數字（1.5‰ 發生率、9 成自然穩定、4–6 週），
            也放過認證徽章，兩者都拿掉了：
            數字在各自的主題頁有更完整的脈絡（發生率在 /about-ddh 還配了
            「175‰ 西藏（傳統緊包巾）」的對照），徽章則移到上方的識別列。
            家長讀到「最常見的結果是一切正常」之後，下一個動作應該是點按鈕，
            中間不該再有東西要消化。
          */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Button href="/when-to-screen" variant="primary">
              醫師說要回來照 →
            </Button>
            <Button href="/results" variant="secondary">
              我拿到報告了 →
            </Button>
          </div>
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

        {/* 三要訣：這六週真正能做的事 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange mb-4">
            這幾週您可以做的事
          </div>
          <h2 className="font-black font-serif text-[30px] sm:text-[38px] leading-[1.35] text-navy tracking-[.03em]">
            包開開・抱開開・背開開
          </h2>
          {/*
            這裡刻意只留一句。
            「九成會自然穩定，但前提是雙腿能自由彎曲外展」那段完整論證
            住在 /daily-care 的開場提示框裡——同一個論證只該有一個家，
            首頁再講一次會變成整站第二份副本。
          */}
          <p className="mt-5 text-lede text-ink-2 font-light">
            包、抱、背三個動作，是這幾週您
            <span className="font-medium text-ink">真正能做的事</span>。
          </p>
          <Figure id="three-habits" className="mt-8" zoom />
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
          {/*
            刻意不寫題數。「298 題」對想查資料的人是「內容很齊全」，
            但對剛得知消息、正在焦慮的家長會讀成「還有 298 件我不知道的事」。
          */}
          <p className="mt-4 text-lede text-ink-2 font-light">
            完整的常見問題可以搜尋關鍵字，或依階段分類查看。
          </p>
          <QaList ids={["A-038", "C-003", "D-004"]} title="" />
          <div className="mt-7">
            <Button href="/faq" variant="outline">
              查看完整常見問題 →
            </Button>
          </div>
        </section>

        {/*
          快速分流：直接跳到段落，不只是頁面。

          刻意放在後段。這一區是給「已經知道自己要找什麼」的家長用的捷徑
          （複診前想快速確認、拿到報告想直接查分型），而它的四個目的地
          跟上方的主題卡、開場兩個按鈕其實高度重疊。
          放在開場等於把同一批目的地用三種方式問了三次，
          剛得知消息的家長會覺得選項太多。
        */}
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

        {/* 情緒支持 + 治療入口 */}
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 py-14">
          <NoteBox title="如果您這幾天一直睡不好">
            擔心是正常的，而且很常見。知識庫裡有一整類是寫給家長自己的——包含「是不是我的錯」「長輩一直說是我害的」「我一天檢查孩子的腿好多次」這些沒人敢問的問題。
            <Link href="/faq?cat=J" className="ml-1 font-medium underline">
              看這一類 →
            </Link>
          </NoteBox>

          <div className="flex flex-wrap items-center gap-5 justify-between bg-[#F5F2E9] border border-ink/[.08] rounded-xl px-6 py-6 mt-6">
            <p className="text-caption text-ink-2 font-light">
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
