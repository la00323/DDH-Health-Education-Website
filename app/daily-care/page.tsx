import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopicPageHeader, TopicNav } from "@/components/Topic";
import { DoDontPair } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { Button } from "@/components/Button";
import { NoteBox, SummaryBox, DisclaimerBox } from "@/components/InfoBox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "日常可以怎麼幫寶寶｜DDH 家長照護指南",
  description:
    "包開開、抱開開、背開開——保護寶寶髖關節的三要訣。包巾怎麼包、怎麼抱、揹巾怎麼挑，以及換尿布時該避免的動作。",
};

/**
 * 這一頁刻意寫得比其他主題頁短。
 *
 * 四張圖（三習慣總圖＋包巾／抱姿／揹巾三張分解圖）本身就是自帶完整中文
 * 標示的資訊圖，不是插畫——圖上已經寫了「錯誤：拉直併攏／正確：包上不
 * 包下」這類句子。所以每一節只留一行 compact 對照，不再用兩張大文字卡
 * 把圖上的字重打一次。
 *
 * 但那一行不能省。圖上的標示在 375px 手機寬度下只剩 5–8px，家長讀不到，
 * 讀螢幕軟體與搜尋引擎也讀不到圖裡的字——那一行是手機讀者唯一讀得到的
 * 一層。
 *
 * 分工原則：圖負責「長什麼樣子」，文字只寫圖上沒有的東西
 * （為什麼、怎麼判斷自己做對了）。
 */
export default function DailyCarePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TopicPageHeader
          eyebrow="② 日常照護"
          title="包開開・抱開開・背開開"
          lede="這是等待期間您真正能做的事——而且它的效果有實證支持，不是安慰性質的建議。"
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          {/* 扣回主軸。全頁唯一講「為什麼」的地方，圖上沒有 */}
          <NoteBox title="為什麼這一頁很重要">
            出生時關節不穩定的寶寶，兩週後約
            <span className="font-medium text-ink">九成會自然穩定</span>
            ；出生時超音波不理想的，一個月後也有近九成自然改善。
            <br />
            <br />
            但這個自然復原能力有一個前提：
            <span className="font-medium text-ink">
              雙腿要能自由彎曲外展
            </span>
            。如果這段期間用緊包巾把腿拉直包住，就會直接關掉這個機制。
          </NoteBox>

          {/*
            圖說寫「怎麼看這張圖」（見 lib/images.ts），
            原本接在這張圖後面那段口訣由來的散文已經刪掉——
            它跟頁尾 D-004 的詳答是逐字重複。
          */}
          <Figure id="three-habits" className="mt-8" priority zoom />

          {/* 包開開 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              一
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">包開開</h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              口訣是
              <span className="font-medium text-ink">「包上不包下」</span>
              ——上半身可以適度包裹安撫保暖，下半身必須留下足夠空間。
            </p>

            <DoDontPair
              imageId="swaddle-do-dont"
              compact
              bad={{ title: "拉直、併攏、綁緊" }}
              good={{ title: "包上不包下" }}
            />

            {/* 圖上沒有的：可以自己動手做的檢查，以及不用技巧的替代方案 */}
            <NoteBox title="包好之後的檢查方法">
              把手輕輕伸進包巾的下半部——能輕鬆讓膝蓋往兩側張開就對了；感覺被綁住、張不開就太緊，請重包。更簡單的替代方案是
              <span className="font-medium text-ink">
                新生兒防踢被或寬鬆的防踢睡袋
              </span>
              ，保暖又完全不壓迫髖關節，而且不需要技巧、不會「包錯」。
            </NoteBox>
          </section>

          {/* 抱開開 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              二
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">抱開開</h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              直立式抱法——讓寶寶的大腿自然跨在您的腰部或腹部上，膝蓋略高於或等於臀部。
            </p>

            <DoDontPair
              imageId="carry-do-dont"
              compact
              bad={{ title: "橫抱、雙腿併攏" }}
              good={{ title: "直立式，膝蓋不低於臀部" }}
            />

            {/* 圖上沒有的：機轉 */}
            <NoteBox title="為什麼「托住大腿」這件事這麼關鍵">
              當大腿被充分支撐在彎曲外展的位置時，內收肌與腰肌的拉力會大幅減輕，股骨頭就能輕鬆穩固地嵌入髖臼深處——
              <span className="font-medium text-ink">
                給髖臼一個正確方向的發育刺激
              </span>
              。這就是前面說的「球往正中間頂，碗才會越長越深」。
            </NoteBox>
          </section>

          {/* 背開開 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              三
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">背開開</h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              揹巾要認明
              <span className="font-medium text-ink">「寬基底」</span>
              設計——底部要夠寬，能從臀部一路托到膝窩。
            </p>

            <DoDontPair
              imageId="carrier-do-dont"
              compact
              bad={{ title: "窄襠，雙腿懸垂成 I 字" }}
              good={{ title: "寬基底，托到膝窩" }}
            />

            {/*
              原本的「揹巾五點檢查」五條已經刪掉：
              carrier 圖右欄本來就列著寬基底支撐／膝蓋高於臀部／自然 M 字形，
              而且那五條跟 D-025 的短答是逐字重複。留一句最好記的就夠。
            */}
            <p className="mt-8 text-body text-ink-2 font-light">
              買揹巾只看一件事：
              <span className="font-medium text-ink">下緣要托到膝窩</span>
              ，不是只托住胯下。
            </p>
          </section>

          {/*
            其他器具。
            這一區沒有圖，文字是唯一載體，所以維持完整的雙卡對照，不精簡。
          */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              其他日常
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              汽座、推車、換尿布
            </h2>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mt-8">
              <div className="bg-surface border border-ink/[.12] rounded-xl p-6">
                <h3 className="font-bold text-h3">汽車安全座椅</h3>
                <p className="mt-3 text-body text-ink-2 font-light">
                  關鍵在下半部空間要夠寬，不能窄到把雙膝擠在一起。必須讓大腿能自然往兩側彎曲外展。
                  <span className="font-medium text-ink">
                    但無論如何，坐車一定要用汽座
                  </span>
                  ——抱著坐車是遠遠更大的危險。
                </p>
              </div>
              <div className="bg-surface border border-ink/[.12] rounded-xl p-6">
                <h3 className="font-bold text-h3">推車與學步車</h3>
                <p className="mt-3 text-body text-ink-2 font-light">
                  推車選座椅較寬的款式，小月齡可用平躺式。學步車（螃蟹車）則不建議使用。
                </p>
              </div>
            </div>

            <DoDontPair
              good={{
                title: "換尿布：托住下背與臀部",
                body: "用手托住下背與臀部往上托起，雙腿保持自然彎曲外展。",
              }}
              bad={{
                title: "換尿布：抓著雙腳提起來",
                body: "這個動作會把雙腿拉直併攏，同時用重力把股骨頭往外拉。一天做八次，累積下來影響不小。",
              }}
            />
          </section>

          {/* 收尾：釋放 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              最後
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">
              需要幫他做什麼運動嗎？
            </h2>
            <p className="mt-5 text-lede text-ink-2 font-light">
              不需要。
              <span className="font-medium text-ink">
                寶寶自己的自發踢腿就是最好的運動。
              </span>
            </p>

            {/* 最後一段收下了原本開場那句「把九個字傳給長輩、保母」 */}
            <SummaryBox>
              您要做的不是「增加訓練」，而是「移除限制」——給他空間，他自己會做對。
              <br />
              <br />
              讀到這裡就夠了。不需要額外做操、不需要買什麼器材、也不需要每天檢查他的腿好幾次。把上面三件事做對，剩下的交給時間。
              <br />
              <br />
              <span className="font-medium text-ink">
                建議把「包開開、抱開開、背開開」這九個字傳給所有會照顧寶寶的人——另一半、長輩、保母。
              </span>
            </SummaryBox>
          </section>

          {/*
            原本掛了 9 題，其中 7 題（D-004 / D-002 / D-001 / D-003 /
            D-025 / D-008 / D-010）正文已經完整講過，等於同一頁講兩次。
            只留正文沒涵蓋的兩題，其餘用一個連結導到分類頁。
          */}
          <QaList ids={["D-016", "J-015"]} title="這一頁相關的常見問題" />

          <div className="mt-8">
            {/* 文案長度受手機限制：375px 下按鈕內可用寬度約 15 個中文字，
                再長就會把「→」擠到第二行單獨一行 */}
            <Button href="/faq?cat=D" variant="outline">
              看日常照護的全部 38 題 →
            </Button>
          </div>

          <TopicNav current="/daily-care" />

          <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
        </div>
      </main>
      <Footer />
    </>
  );
}
