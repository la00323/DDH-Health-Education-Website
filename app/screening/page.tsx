import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopicPageHeader, TopicNav } from "@/components/Topic";
import { ProcessSteps } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { NoteBox, SummaryBox, DisclaimerBox } from "@/components/InfoBox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "超音波能幫上什麼忙｜DDH 家長照護指南",
  description:
    "為什麼六個月內的寶寶要用超音波而不是 X 光？檢查會不會痛、有沒有輻射、要不要空腹？這一頁說明檢查那天實際會發生什麼事。",
};

export default function ScreeningPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TopicPageHeader
          eyebrow="② 超音波檢查"
          title="超音波能幫上什麼忙"
          lede="這一頁說明為什麼醫師請您來照一次超音波，以及檢查那天實際會發生什麼事。"
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          {/* 為什麼是超音波 */}
          <h2 className="font-bold font-serif text-h2">
            為什麼是超音波，不是 X 光
          </h2>
          <p className="mt-5 text-lede text-ink-2 font-light">
            六個月內的寶寶，髖關節最關鍵的部分還是軟骨——
            <span className="font-medium text-ink">
              而 X 光照不出軟骨
            </span>
            。超音波看得到軟骨、可以即時觀察關節活動，而且完全沒有輻射。這就是為什麼它是這個年紀的黃金標準。
          </p>

          <Figure id="us-vs-xray" className="mt-8" priority />

          {/* 摸不出來的部分 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              為什麼還要照影像
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              有些狀況是摸不出來的
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              醫師徒手檢查時做的是兩個方向相反的動作：Barlow 試著把球「推出去」看穩不穩，Ortolani
              試著把球「推回來」看能不能復位。這是很重要的第一關，但它有極限——
              <span className="font-medium text-ink">
                出生時的徒手檢查只能抓出約 20% 的病例。
              </span>
            </p>

            <NoteBox title="所以這不是在暗示寶寶有問題">
              醫師請您來照一次超音波，是因為手摸有它看不到的地方，而不是因為摸到了什麼。
              <br />
              <br />
              照一次，把那 80% 摸不出來的部分也看過，這件事就可以放下了。
            </NoteBox>
          </section>

          {/* 檢查那天 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              檢查當天
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              那天會發生什麼事
            </h2>

            <ProcessSteps
              steps={[
                {
                  title: "不用空腹",
                  body: "相反地，建議餵飽、換乾淨尿布、讓寶寶盡量放鬆——哭鬧反而會影響檢查準確度。",
                  meta: "帶著平常的東西就好",
                },
                {
                  title: "不會痛，三到五分鐘",
                  body: "過程就像塗一點涼涼的凝膠，探頭在屁股外側輕輕滑動。單側約 3–5 分鐘，兩側通常十分鐘內完成。",
                  meta: "單側 3–5 分鐘",
                },
                {
                  title: "完全沒有輻射",
                  body: "超音波用的是聲波，不是游離輻射。可以安全地重複檢查，不需要限制次數。",
                  meta: "沒有次數上限",
                },
              ]}
            />

            <Figure id="us-exam-day" className="mt-8" />

            <NoteBox title="結果什麼時候知道">
              如果是骨科醫師親自掃描，通常當場就會告訴您結果。如果由放射科執行，可能需要等一到三個工作天，回診時看報告。
            </NoteBox>
          </section>

          {/* 台灣的制度 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              篩檢制度
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              為什麼別人家的寶寶沒照，我們要照
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              台灣採
              <span className="font-medium text-ink">選擇性篩檢</span>
              ——不是每個寶寶都照超音波，只有有危險因子、或徒手檢查異常的寶寶才安排。這就是為什麼有些寶寶做了、有些沒做。
            </p>

            <ProcessSteps
              steps={[
                {
                  title: "第一階：嬰兒室",
                  body: "在嬰兒室或月子中心，由護理師與醫師做徒手檢查。",
                },
                {
                  title: "第二階：超音波",
                  body: "有危險因子或徒手檢查異常者，在兩個月內安排髖關節超音波。",
                },
                {
                  title: "第三階：專科門診",
                  body: "超音波發現異常，轉診兒童骨科專科門診確診與治療。",
                },
              ]}
            />

            <SummaryBox>
              值得知道的是：篩檢制度推廣後，台灣的「總發生率」並沒有下降。真正改變的是
              <b>早期診斷的比例上升</b>，以及<b>需要開刀的比例下降</b>
              ——這才是篩檢的價值。早一點知道，處理起來就簡單得多。
            </SummaryBox>
          </section>

          <QaList
            ids={["C-001", "C-002", "C-026", "C-027", "C-028", "C-030", "B-020", "B-002"]}
            title="這一頁相關的常見問題"
          />

          <TopicNav current="/screening" />

          <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
        </div>
      </main>
      <Footer />
    </>
  );
}
