import { getFaqs, stripRefs } from "@/lib/faqs";
import { Markdown } from "./Markdown";

/**
 * 主題頁底部的問答清單。
 *
 * 用原生 <details>，不需要任何 client JS，關掉 JavaScript 也能展開。
 *
 * 兩條規則（見計劃）：
 * 1. 這裡刻意不渲染 redFlag 樣式。A/B/C/D 類有 24 則是 watch 級，
 *    包含「臀位產」——那是這群讀者最常見的收案原因，標成警示等於
 *    在視覺上把大多數讀者判定成有問題。紅旗樣式只留在 /faq 與 /treatment。
 * 2. 問句照抄不改寫。家長要認出「這就是我心裡那句話」才有安撫效果。
 */
export function QaList({
  ids,
  title = "這一頁相關的常見問題",
}: {
  ids: string[];
  title?: string;
}) {
  const entries = getFaqs(ids);

  return (
    <section className="mt-7">
      {title && (
        <h2 className="font-bold font-serif text-h2 mb-5 mt-5">{title}</h2>
      )}
      <div className="bg-surface border border-ink/[.12] rounded-xl overflow-hidden">
        {entries.map((f) => (
          <details
            key={f.id}
            className="border-b border-ink/[.08] last:border-b-0 group"
          >
            <summary className="flex gap-4 items-center px-5 sm:px-6 py-5 cursor-pointer list-none hover:bg-[#f8f5ec] transition-colors duration-150 [&::-webkit-details-marker]:hidden">
              <span className="flex-1 font-medium text-body leading-[1.6]">
                {f.question}
              </span>
              <span className="shrink-0 font-mono text-h3 text-ink-3 group-open:text-navy">
                <span className="group-open:hidden">＋</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <div className="px-5 sm:px-6 pb-6">
              <p className="text-body font-medium text-ink mb-3">
                {stripRefs(f.shortAnswer)}
              </p>
              {f.detailAnswer && (
                <div className="text-caption text-ink-2 font-light border-t border-ink/[.08] pt-4">
                  <Markdown text={stripRefs(f.detailAnswer)} />
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
