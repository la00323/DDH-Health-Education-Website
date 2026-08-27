import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopicPageHeader, TopicNav } from "@/components/Topic";
import { SeveritySpectrum, StatRow } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { Markdown } from "@/components/Markdown";
import { NoteBox, SummaryBox, DisclaimerBox } from "@/components/InfoBox";
import { byId, stripRefs } from "@/lib/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "DDH 是什麼｜DDH 家長照護指南",
  description:
    "發展性髖關節發育不良（DDH）是什麼？髖關節就像一個球放在碗裡。這一頁用白話說明什麼是 DDH、為什麼叫「發展性」、嚴重程度怎麼分，以及為什麼這不是家長的錯。",
};

const a005 = byId("A-005");

export default function AboutDdhPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TopicPageHeader
          eyebrow="① DDH 是什麼"
          title="DDH 是什麼"
          lede="先把名詞弄清楚，後面的檢查與報告才看得懂。這一頁不會有任何需要您現在做的事。"
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          {/* 球與碗 */}
          <h2 className="font-bold font-serif text-h2">
            髖關節就是一個球放在碗裡
          </h2>
          <p className="mt-5 text-lede text-ink-2 font-light">
            大腿骨最上端是一顆圓球（股骨頭），骨盆上有一個凹槽（髖臼）。正常情況下，球會穩穩嵌在碗裡。
            <span className="font-medium text-ink">
              DDH 就是這個碗太淺、或球沒有好好待在碗裡。
            </span>
          </p>

          <Figure id="hip-ball-socket" className="mt-8" priority />

          <NoteBox title="嬰兒的髖關節和大人不一樣">
            嬰兒的「碗」大部分還是軟骨，像有彈性的橡皮，可以被塑形；大人的已經硬化成骨頭，定型了。
            <span className="font-medium text-ink">
              這正是為什麼嬰兒期治療效果特別好
            </span>
            ——也是為什麼要用超音波而不是 X 光來看（X 光照不出軟骨）。
          </NoteBox>

          <Figure id="hip-baby-vs-adult" className="mt-6" />

          {/* 為什麼叫發展性 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              名詞
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              為什麼叫「發展性」，不叫「先天性」
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              因為它不是出生那一刻就定型的畸形，而是從懷孕後期、出生後到嬰兒期會一直
              <span className="font-medium text-ink">
                動態變化
              </span>
              的狀況——可能自己變好，也可能變壞。
            </p>

            <NoteBox title="球和碗會互相影響">
              碗要靠球持續往正中間頂，才會越長越深；球一旦滑出去，碗失去刺激就會越長越平。
              <br />
              <br />
              這件事有兩面：它解釋了為什麼放著不管可能惡化，但也解釋了
              <span className="font-medium text-ink">
                為什麼只要維持正確姿勢，多數寶寶會自己長好
              </span>
              。您在「日常照護」那一頁會做的事，作用就在這裡。
            </NoteBox>
          </section>

          {/* 嚴重度光譜 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              嚴重程度
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              這是一條光譜，不是一個開關
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              從「只是關節有點鬆」到「完全脫臼」都叫 DDH，中間的差別非常大。
              <span className="font-medium text-ink">
                聽到這個名詞先不要慌，要先問醫師落在哪一段。
              </span>
            </p>

            <SeveritySpectrum
              stops={[
                { label: "關節鬆動", note: "球還在碗裡，只是比較會晃。" },
                { label: "發育不良", note: "碗太淺，但球還在裡面。" },
                { label: "半脫位", note: "球部分滑出去了。" },
                { label: "脫臼", note: "球完全在碗外。" },
              ]}
            />
          </section>

          {/* 台灣多常見 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              發生率
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              在台灣有多常見
            </h2>

            <StatRow
              stats={[
                { value: "1.5‰", label: "台灣新生兒發生率", source: "A-005" },
                { value: "20–30‰", label: "世界平均" },
                { value: "175‰", label: "西藏（傳統緊包巾）", tone: "orange" },
              ]}
            />

            <div className="mt-8 text-body text-ink-2 font-light">
              <Markdown text={stripRefs(a005.detailAnswer)} />
            </div>
          </section>

          {/* 不是你的錯 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              為什麼會發生
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              這不是您造成的
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              懷孕後期讓寶寶動不了、腿被固定在伸直併攏姿勢的外在因素——臀位、羊水過少、多胞胎、第一胎子宮較緊——都屬於「子宮內機械因素」。這些都不是任何人能控制的。
            </p>

            <NoteBox title="超過 75% 的 DDH 寶寶沒有任何典型危險因子">
              也就是說，這件事大多數時候找不到「因為做了什麼」的理由。它就是會發生。
              <br />
              <br />
              另外值得知道的是：
              <span className="font-medium text-ink">
                嬰兒期的 DDH 幾乎不會痛
              </span>
              ，也不影響進食、睡眠、心情。所以寶寶看起來完全正常是正常的，不代表檢查做錯了。
            </NoteBox>

            <SummaryBox>
              懷孕四、五個月時，寶寶在子宮裡的大腿本來就是「彎曲＋微微張開」——也就是我們現在說的
              M 型腿。這是對髖關節發育最有利的姿勢。出生後我們做的，只是把這個姿勢還給他。
            </SummaryBox>
          </section>

          <QaList
            ids={["A-001", "A-002", "A-026", "A-027", "A-006", "A-037", "J-001", "J-002"]}
            title="這一頁相關的常見問題"
          />

          <TopicNav current="/about-ddh" />

          <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
        </div>
      </main>
      <Footer />
    </>
  );
}
