import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopicPageHeader, TopicNav } from "@/components/Topic";
import { ProcessSteps, StopCue } from "@/components/Blocks";
import { GrafLadder } from "@/components/GrafLadder";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { NoteBox, SummaryBox, DisclaimerBox } from "@/components/InfoBox";
import { topics, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "看懂檢查結果｜DDH 家長照護指南",
  description:
    "拿到髖關節超音波報告，只要看三件事：第幾型、Alpha 角多少、跟上次比是進步還是退步。Graf Type I 與 IIa 分別代表什麼，這一頁用白話說明。",
};

const dailyCare = topics.find((t) => t.href === "/daily-care");

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TopicPageHeader
          eyebrow="④ 看懂檢查結果"
          title="拿到報告，只要看三件事"
          lede="這一頁是給拿到髖關節超音波報告的家長。如果寶寶還沒照，可以先看「什麼時候該檢查」。"
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          <ProcessSteps
            steps={[
              {
                title: "找「Type」或「Graf」",
                body: (
                  <>
                    報告上會寫左右各是第幾型。
                    <br />
                    <b className="font-medium text-ink">Type I</b> ＝ 完全正常
                    <br />
                    <b className="font-medium text-ink">Type IIa</b> ＝
                    還沒長熟，多數會自己好
                    <br />
                    其他 ＝ 找兒童骨科
                  </>
                ),
              },
              {
                title: "找 Alpha 角，記住三個數字",
                body: (
                  <>
                    Alpha 角代表「碗有多深」，越大越好。
                    <br />
                    <b className="font-medium text-ink">60 以上</b> ＝ 正常
                    <br />
                    <b className="font-medium text-ink">50–59</b> ＝
                    未成熟或發育不良
                    <br />
                    <b className="font-medium text-ink">43 以下</b> ＝ 脫臼
                  </>
                ),
                meta: "60 → 50 → 43，越低越嚴重",
              },
              {
                title: "跟上次比（最重要）",
                body: "趨勢比單次數字重要得多。一次 55 度不代表什麼，但「48 → 55 → 61」就是一路進步的鐵證。把每次的數字記在手機備忘錄裡。",
                meta: "右髖 2/20 → 3/25 → 4/28",
              },
            ]}
          />

          {/* Alpha / Beta */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              兩個角度
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              Alpha 角與 Beta 角在量什麼
            </h2>

            <Figure id="graf-angles" className="mt-8" />

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mt-6">
              <div className="bg-surface border border-ink/[.12] rounded-xl p-6">
                <div className="font-bold text-h3 text-navy">
                  Alpha 角 ── 越大越好
                </div>
                <p className="mt-3 text-body text-ink-2 font-light">
                  量的是骨性髖臼的深度，白話說就是「這個碗有多深、多能包住球」。角度大＝碗深＝包覆好。
                </p>
                <p className="mt-3 text-caption font-mono text-navy">
                  正常 ≥ 60°
                </p>
              </div>
              <div className="bg-surface border border-ink/[.12] rounded-xl p-6">
                <div className="font-bold text-h3 text-navy">
                  Beta 角 ── 越小越好
                </div>
                <p className="mt-3 text-body text-ink-2 font-light">
                  量的是軟骨頂被推擠的程度。當股骨頭往外滑，會把軟骨頂往上推，角度就變大。
                </p>
                <p className="mt-3 text-caption font-mono text-navy">
                  正常 &lt; 55°
                </p>
              </div>
            </div>

            <NoteBox title="為什麼醫師主要看 Alpha 角">
              講義有個很好的比喻：Alpha 角像是量糖化血色素（HbA1c），Beta
              角像是量當下的血糖。
              <br />
              <br />
              髖臼的深淺是一種「結構」，不會因為寶寶哭鬧或腿的姿勢而改變，重複測量的一致性好；股骨頭的位置則是「動態」的。測結構比測位置可靠得多，所以臨床上直接用
              Alpha 角來分級。
            </NoteBox>
          </section>

          {/* Graf 分型 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              Graf 分型
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              報告上那個型，是什麼意思
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              講義給家長的簡化理解是：第一線只要分辨三種就夠——
              <span className="font-medium text-ink">
                正常、一個月後再看、其他都轉診。
              </span>
            </p>

            <GrafLadder />

            <Figure id="graf-types" className="mt-8" />
          </section>

          {/* Type I */}
          <section id="type-i" className="mt-16 pt-12 border-t border-ink/10 scroll-mt-24">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              Type I
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              Type I ── 這是篩檢的終極目標
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              髖臼骨化程度已經達到三個月齡的成熟度，Alpha 角大於 60
              度。一旦確診為成熟的 Type I，預期終身健康。
            </p>
            <NoteBox title="但請跟醫師確認您的寶寶屬於哪一種">
              <b className="font-medium text-ink">
                從來沒有問題、直接就是 Type I
              </b>
              ：基本上可以放心。
              <br />
              <b className="font-medium text-ink">
                原本有問題、治療後才變成 Type I
              </b>
              ：仍需要長期追蹤，因為可能有殘餘發育不良。
              <br />
              <br />
              建議直接問：「我的寶寶屬於哪一種？還需要追蹤嗎？追蹤到什麼時候？」
            </NoteBox>
          </section>

          {/* Type IIa */}
          <section id="type-iia" className="mt-16 pt-12 border-t border-ink/10 scroll-mt-24">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              Type IIa
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              Type IIa ── 最常見的「一個月後再看一次」
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              IIa 指的是三個月以下寶寶的「生理性不成熟」——髖臼還沒長熟，但球穩穩在碗裡。它佔所有新生兒約
              10%，是相當常見的暫時狀態。
            </p>

            <NoteBox title="聽到 IIa 不需要慌">
              這比較像是「發育進度稍微落後一點」，而不是「生病」。約 90%
              會自然成熟為 Type I。
              <br />
              <br />
              真正要做的只有兩件事：
              <b className="font-medium text-ink">回去追蹤</b>、
              <b className="font-medium text-ink">照護姿勢做對</b>。
            </NoteBox>

            <StopCue>
              如果您的報告是 Type I 或 IIa，看到這裡就夠了。
              <br />
              <Link href="/daily-care" className="font-medium underline">
                接下來可以看「日常可以怎麼幫寶寶」→
              </Link>
            </StopCue>
          </section>

          <SummaryBox>
            不要拿網路查到的標準值自行判斷。同樣的 Alpha 55 度，在 6 週大和 4
            個月大意義完全不同。把每次的數字記下來、帶著趨勢回去問醫師，比對照任何一張表都有用。
          </SummaryBox>

          <QaList
            ids={["C-024", "C-005", "C-006", "C-017", "C-025", "C-031", "C-030"]}
            title="這一頁相關的常見問題"
          />

          <TopicNav current="/results" nextOverride={dailyCare} />

          <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
        </div>
      </main>
      <Footer />
    </>
  );
}
