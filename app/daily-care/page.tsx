import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopicPageHeader, TopicNav } from "@/components/Topic";
import { DoDontPair, Checklist } from "@/components/Blocks";
import { QaList } from "@/components/QaList";
import { Figure } from "@/components/Figure";
import { NoteBox, SummaryBox, DisclaimerBox } from "@/components/InfoBox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "日常可以怎麼幫寶寶｜DDH 家長照護指南",
  description:
    "包開開、抱開開、背開開——保護寶寶髖關節的三要訣。包巾怎麼包、怎麼抱、揹巾怎麼挑，以及換尿布時該避免的動作。",
};

export default function DailyCarePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <TopicPageHeader
          eyebrow="⑤ 日常照護"
          title="包開開・抱開開・背開開"
          lede="這是等待期間您真正能做的事——而且它的效果有實證支持，不是安慰性質的建議。"
        />

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          {/* 扣回主軸 */}
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

          <Figure id="three-habits" className="mt-8" priority />

          <p className="mt-8 max-w-[48ch] text-lede text-ink-2 font-light">
            這是高雄榮總護理衛教與國民健康署共同推廣的三句話口訣，涵蓋了嬰兒一天中最主要的三種姿勢。它完全免費、不需要任何器材，而且是
            <span className="font-medium text-ink">
              少數被證實有效的 DDH 預防措施
            </span>
            。
          </p>

          <SummaryBox>
            建議把這九個字寫在紙上貼在尿布台旁邊，或存成手機桌布傳給所有會照顧寶寶的人——另一半、長輩、保母。
          </SummaryBox>

          {/* 包開開 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              一
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">包開開</h2>
            <p className="mt-5 max-w-[48ch] text-lede text-ink-2 font-light">
              口訣是
              <span className="font-medium text-ink">「包上不包下」</span>
              ——上半身可以適度包裹安撫保暖，下半身必須留下足夠空間。
            </p>

            <DoDontPair
              imageId="swaddle-do-dont"
              good={{
                title: "包上不包下",
                body: "上半身適度包裹，下半身寬鬆。雙腳可以自由彎曲、張開，維持自然的 M 型。",
              }}
              bad={{
                title: "整齊漂亮、愈緊愈好",
                body: "把雙腿拉直、併攏、綁緊。這正好是髖關節最不穩定的姿勢組合。",
              }}
            />

            <NoteBox title="包好之後的檢查方法">
              把手輕輕伸進包巾的下半部——如果能輕鬆讓寶寶的膝蓋往兩側張開，就對了；如果感覺被綁住、張不開，就太緊了，請重包。
            </NoteBox>

            <p className="mt-6 max-w-[48ch] text-body text-ink-2 font-light">
              有一個更簡單的替代方案：
              <span className="font-medium text-ink">
                新生兒防踢被或寬鬆的防踢睡袋
              </span>
              。既保暖又完全不壓迫髖關節，而且不需要技巧、不會「包錯」。
            </p>
          </section>

          {/* 抱開開 */}
          <section className="mt-16 pt-12 border-t border-ink/10">
            <div className="text-label font-mono tracking-[.16em] text-orange">
              二
            </div>
            <h2 className="mt-4 font-bold font-serif text-h2">抱開開</h2>
            <p className="mt-5 max-w-[48ch] text-lede text-ink-2 font-light">
              直立式抱法——讓寶寶的大腿自然跨在您的腰部或腹部上，膝蓋略高於或等於臀部。
            </p>

            <DoDontPair
              imageId="carry-do-dont"
              good={{
                title: "直立式，雙腿跨開",
                body: "大腿自然跨在照顧者身上，膝蓋略高於或等於臀部。",
              }}
              bad={{
                title: "橫抱、雙腿併攏",
                body: "把兩條大腿併攏壓在一起，等於在關節上加了一個往外拉的力。",
              }}
            />

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
            <p className="mt-5 max-w-[48ch] text-lede text-ink-2 font-light">
              揹巾要認明
              <span className="font-medium text-ink">「寬基底」</span>
              設計——底部要夠寬，能從臀部一路托到膝窩。絕對避免雙腿無支撐地筆直下垂。
            </p>

            <DoDontPair
              imageId="carrier-do-dont"
              good={{
                title: "寬基底，M 型腿",
                body: "大腿被完整托住、雙膝微彎，膝蓋高度略高於或等於臀部。",
              }}
              bad={{
                title: "窄襠，雙腿懸垂成 I 字",
                body: "只托住胯下，大腿沒有支撐，全身重量掛在髖關節上。",
              }}
            />

            <Checklist
              title="揹巾五點檢查"
              items={[
                "M 型腿：膝蓋與臀部等高，或略高於臀部",
                "揹巾下緣托到膝窩，不是只托住胯下",
                "大腿張開的角度足夠，沒有被夾緊",
                "寶寶的背是自然的 C 型，沒有被拉直",
                "雙腿絕對不是懸空下垂的",
              ]}
            />
          </section>

          {/* 其他器具 */}
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
            <p className="mt-5 max-w-[48ch] text-lede text-ink-2 font-light">
              不需要。
              <span className="font-medium text-ink">
                寶寶自己的自發踢腿就是最好的運動。
              </span>
            </p>

            <SummaryBox>
              您要做的不是「增加訓練」，而是「移除限制」——給他空間，他自己會做對。
              <br />
              <br />
              讀到這裡就夠了。不需要額外做操、不需要買什麼器材、也不需要每天檢查他的腿好幾次。把上面三件事做對，剩下的交給時間。
            </SummaryBox>
          </section>

          <QaList
            ids={["D-004", "D-002", "D-001", "D-003", "D-016", "D-025", "D-008", "D-010", "J-015"]}
            title="這一頁相關的常見問題"
          />

          <TopicNav current="/daily-care" />

          <div className="mt-10">
            <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
