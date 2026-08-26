import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopicPageHeader, TopicNav } from "@/components/Topic";
import { RiskFactorGrid, ProcessSteps } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { Markdown } from "@/components/Markdown";
import { NoteBox, SummaryBox, DisclaimerBox } from "@/components/InfoBox";
import { byId, stripRefs } from "@/lib/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "什麼時候該檢查｜DDH 家長照護指南",
  description:
    "醫師說寶寶是高風險、要過幾週回來照超音波？「高風險」是篩檢用詞，不是診斷。這一頁說明為什麼建議四到六週、哪些寶寶會被安排檢查，以及檢查正常後為什麼還要追蹤。",
};

const a038 = byId("A-038");

export default function WhenToScreenPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TopicPageHeader
          eyebrow="③ 什麼時候該檢查"
          title="什麼時候該檢查"
          lede="如果醫師告訴您「寶寶屬於高風險，過幾週回來照」，這一頁是專門寫給您的。"
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          {/* 開頭刻意先拆掉「高風險」這個標籤，而不是先列風險因子 */}
          <h2 className="font-bold font-serif text-h2">
            先說最重要的一件事
          </h2>
          <NoteBox title={a038.question}>{a038.shortAnswer}</NoteBox>

          <div className="mt-8 text-body text-ink-2 font-light">
            <Markdown text={stripRefs(a038.detailAnswer)} />
          </div>

          {/* 為什麼是 4–6 週 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              時機
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              為什麼是四到六週，不是一出生就照
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              出生後四週內，寶寶體內還有媽媽的荷爾蒙，關節囊極度鬆弛。這個時候照超音波會量到很差的角度，
              <span className="font-medium text-ink">
                偽陽性高達九成
              </span>
              ——而其中絕大多數兩週內就會自己恢復正常。
            </p>

            <Figure id="timeline-4-6w" className="mt-8" />

            <ProcessSteps
              steps={[
                {
                  title: "出生 ── 0 到 4 週",
                  body: "關節本來就鬆，這是正常現象。這段期間照，很容易白緊張一場，寶寶還可能被過度治療。",
                  meta: "太早，偽陽性高",
                },
                {
                  title: "四到六週 ── 標準時機",
                  body: "荷爾蒙代謝得差不多了，量出來的角度才有意義。台灣的篩檢流程建議在兩個月內完成。",
                  meta: "建議在這時候做",
                },
                {
                  title: "一個月後 ── 如果需要",
                  body: "如果第一次結果是「還沒長熟」，一個月後再看一次，確認是往好的方向走。",
                  meta: "確認趨勢",
                },
              ]}
            />

            <NoteBox title="唯一的例外">
              如果出生時徒手檢查就是 Ortolani
              陽性（已經脫臼、可以復位），代表有明確的病理性脫位，不需要等——立刻照、立刻開始治療。
            </NoteBox>
          </section>

          {/* 風險因子 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              哪些寶寶會被安排檢查
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              您的寶寶可能符合其中一項
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              小兒骨科用「5F's」記住五個典型的高風險特徵。
              <span className="font-medium text-ink">
                符合其中一項只代表「需要被檢查」，不代表寶寶有問題。
              </span>
            </p>

            <RiskFactorGrid
              items={[
                { label: "女嬰", line: "約佔 DDH 的 80%，女男比約 6 比 1。" },
                { label: "第一胎", line: "第一胎的子宮空間較緊。" },
                {
                  label: "臀位產",
                  line: "證據力最強的因子之一。但絕大多數臀位寶寶的髖關節是完全正常的。",
                },
                {
                  label: "家族史",
                  line: "手足有過 6%、父母一方有過 12%。",
                },
                { label: "左側", line: "DDH 特別好發於左側髖關節。" },
                { label: "羊水過少", line: "子宮內的活動空間受限。" },
                { label: "冬天出生", line: "包裹通常較厚、較緊。" },
                { label: "多胞胎", line: "子宮內空間更受限。" },
              ]}
            />

            <Figure id="risk-factors" className="mt-8" />

            <SummaryBox>
              5F&rsquo;s 只是幫助記憶的口訣，不是篩檢標準。超過 75% 的 DDH
              寶寶並不符合這些典型因子——有 5F 要更警覺，沒有 5F 也不能鬆懈。這也是為什麼影像篩檢有它的價值。
            </SummaryBox>

            {/* A-011 的 36% 一定要附上 64% 的反面 */}
            <NoteBox title="關於家族史的數字">
              手足有過 DDH，下一個孩子的機率約 6%；父母一方有過約 12%；父母一方加上手足都有過，最高到
              36%。
              <br />
              <br />
              這些數字看起來嚇人，但請把它反過來讀：
              <span className="font-medium text-ink">
                即使是風險最高的組合，仍有約 64% 完全正常
              </span>
              ；一般族群則是 99.85% 不會有 DDH。
            </NoteBox>
          </section>

          {/* 正常了為什麼還要回來 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              追蹤
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              檢查正常了，為什麼還要回診
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              這是門診最常接到的電話。答案是：因為 DDH
              是「發展性」的，出生正常不代表以後都正常；而且單次數字沒有意義，醫師要看的是趨勢。
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "確認會不會自己長熟",
                  body: "如果這次是「還沒長熟」，九成會自然成熟為正常。一個月後的複查，是為了把那一成找出來。",
                },
                {
                  title: "確認第一次不是照太早",
                  body: "如果第一次在四週前做，偽陽性與偽陰性都可能。醫師會在標準時機再確認一次。",
                },
                {
                  title: "看趨勢，不是看單點",
                  body: "一次 Alpha 58 度不能說明什麼。但「58 → 62 → 65」和「58 → 55 → 52」意義完全相反。",
                },
              ]}
            />

            <NoteBox title="如果您想確認，可以直接這樣問醫師">
              「這次結果是正常的嗎？為什麼還需要再看一次？如果下次也正常，就結束了嗎？」
              <br />
              <br />
              醫師會給您明確的答案。追蹤是標準流程，不是壞消息的預告。
            </NoteBox>

            <SummaryBox>
              把追蹤當成「定期存款」，而不是「病歷」。每一次正常的檢查，都是在確認寶寶走在正確的軌道上。
            </SummaryBox>
          </section>

          <QaList
            ids={["A-021", "A-011", "A-025", "C-032", "C-038", "A-024"]}
            title="這一頁相關的常見問題"
          />

          <TopicNav current="/when-to-screen" />

          <div className="mt-10">
            <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
