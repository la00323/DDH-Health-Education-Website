import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AlertBox, NoteBox, DisclaimerBox } from "@/components/InfoBox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "聯絡個管師｜DDH 家長照護指南",
  description:
    "高雄榮總小兒髖關節發育不良個案管理團隊的聯絡方式、門診時段，以及什麼情況該打電話、什麼情況該直接掛急診。",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-12 pb-9 border-b border-ink/10">
          <div className="text-label font-mono tracking-[.16em] text-orange">
            聯絡我們
          </div>
          <h1 className="mt-5 font-black font-serif text-[32px] sm:text-h1 leading-[1.28] text-balance">
            聯絡個管師
          </h1>
          <p className="mt-5 text-lede text-ink-2 font-light">
            有任何照護上的疑問，都歡迎在門診時間聯絡個管師。不確定要不要打的時候，就打。
          </p>
        </section>

        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-12">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
            <div className="bg-surface border border-ink/[.12] rounded-xl p-7">
              <div className="text-label font-mono tracking-[.14em] text-ink-3">
                個管專線
              </div>
              <div className="mt-3 font-medium font-mono text-[26px] text-navy tabular-nums">
                {site.phone}
              </div>
              <p className="mt-3 text-caption text-ink-2 font-light">
                {site.hours}
              </p>
            </div>
            <div className="bg-surface border border-ink/[.12] rounded-xl p-7">
              <div className="text-label font-mono tracking-[.14em] text-ink-3">
                院區
              </div>
              <div className="mt-3 font-bold text-h3">{site.hospital}</div>
              <p className="mt-3 text-caption text-ink-2 font-light">
                兒童骨科門診 · 詳細門診時段與掛號方式請洽本院服務台。
              </p>
            </div>
          </div>

          <section className="mt-14">
            <h2 className="font-bold font-serif text-h2">
              什麼情況該直接掛急診
            </h2>
            <AlertBox
              title="不要等下次回診，也不要等電話"
              items={[
                "腳趾發紫、發白、發黑或冰冷",
                "寶寶原本會踢腿，突然不踢了",
                "腿部腫脹或完全無法活動",
                "皮膚出現傷口、破皮、滲液",
                "石膏濕透、變軟、裂開或散發異味",
                "發燒、呼吸費力、持續劇烈哭鬧無法安撫",
              ]}
              action="→ 夜間或假日請直接掛急診，不需要先打電話確認"
            />

            <NoteBox title="白天可以先打電話問的狀況">
              皮膚持續發紅、壓痕不退；石膏邊緣磨到皮膚；輔具反覆跑位或尺寸明顯不合；尿布反覆滲漏；餵食量明顯減少。
            </NoteBox>
          </section>

          <DisclaimerBox>{site.disclaimer}</DisclaimerBox>
        </div>
      </main>
      <Footer />
    </>
  );
}
