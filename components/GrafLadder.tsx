/**
 * Graf 分型階梯。
 *
 * 刻意不用知識庫 C-004 原本那張表格：那張表七列裡有四列寫著
 * 「嚴重發育不良／即將脫位／脫臼／脫臼」，對一個絕大多數是 I 或 IIa
 * 的族群，那是最糟的第一印象。
 *
 * 這裡把 Type I 與 IIa 放大、並排在最上面，其餘壓成一列並收合。
 * 數值全部出自 C-004。
 */

type Rung = {
  type: string;
  meaning: string;
  desc: string;
  alpha: string;
  beta?: string;
};

const headline: Rung[] = [
  {
    type: "Type I",
    meaning: "正常",
    desc: "碗夠深，球穩穩在裡面。一旦確診為成熟的 Type I，預期終身健康。",
    alpha: "α > 60°",
    beta: "β < 55°",
  },
  {
    type: "Type IIa",
    meaning: "生理性不成熟",
    desc: "三個月以下寶寶「還沒長熟」，球仍穩穩在碗裡。約 90% 一個月後自然成熟為正常。",
    alpha: "α 50–59°",
    beta: "< 3 個月",
  },
];

const rest: Rung[] = [
  {
    type: "Type IIb",
    meaning: "骨化遲緩",
    desc: "超過三個月仍停在 50–59 度。",
    alpha: "α 50–59°",
    beta: "> 3 個月",
  },
  {
    type: "Type IIc",
    meaning: "嚴重發育不良",
    desc: "碗明顯太淺，但球還在碗裡。",
    alpha: "α 43–49°",
    beta: "β < 77°",
  },
  {
    type: "Type D",
    meaning: "即將脫位",
    desc: "軟骨頂已經被明顯推開。",
    alpha: "α 43–49°",
    beta: "β > 77°",
  },
  {
    type: "Type III／IV",
    meaning: "脫臼",
    desc: "軟骨頂被往上（III）或往下（IV）推。",
    alpha: "α < 43°",
  },
];

function Row({ r, big = false }: { r: Rung; big?: boolean }) {
  return (
    <div
      className={
        big
          ? "flex flex-wrap items-start gap-5 rounded-xl border border-navy/25 bg-gradient-to-r from-mint to-surface px-6 py-6"
          : "flex flex-wrap items-start gap-5 rounded-xl border border-ink/[.12] bg-surface px-6 py-5"
      }
    >
      <div className="flex-1 min-w-[14rem]">
        <div
          className={`font-bold text-navy ${big ? "text-[24px] leading-tight" : "text-h3"}`}
        >
          {r.type}
          <span className="text-ink-2 font-normal"> ・ {r.meaning}</span>
        </div>
        <p className="mt-2.5 text-caption text-ink-2 font-light max-w-[46ch]">
          {r.desc}
        </p>
      </div>
      <div className="text-label font-mono text-ink-3 tabular-nums whitespace-nowrap sm:text-right">
        {r.alpha}
        {r.beta && (
          <>
            <br />
            {r.beta}
          </>
        )}
      </div>
    </div>
  );
}

export function GrafLadder() {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {headline.map((r) => (
        <Row key={r.type} r={r} big />
      ))}

      <details className="group rounded-xl border border-ink/[.12] bg-surface overflow-hidden">
        <summary className="flex items-center gap-3 px-6 py-5 cursor-pointer list-none font-medium text-body hover:bg-[#f8f5ec] transition-colors [&::-webkit-details-marker]:hidden">
          <span className="flex-1">如果報告上不是 I 或 IIa</span>
          <span className="font-mono text-h3 text-ink-3 group-open:text-navy">
            <span className="group-open:hidden">＋</span>
            <span className="hidden group-open:inline">−</span>
          </span>
        </summary>
        <div className="px-6 pb-6 pt-1 border-t border-ink/[.08]">
          <p className="mt-4 mb-5 text-caption text-ink-2 font-light max-w-[52ch]">
            以下幾型都需要兒童骨科進一步評估。實際處置一定要依主治醫師當面判斷，不要只看這一頁自行推論。
          </p>
          <div className="flex flex-col gap-3">
            {rest.map((r) => (
              <Row key={r.type} r={r} />
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
