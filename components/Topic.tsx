import Link from "next/link";
import { Figure } from "./Figure";
import { topics, topicNeighbours, type TopicRoute } from "@/lib/site";

/** 五個主題頁共用的頁首 */
export function TopicPageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="max-w-[1180px] mx-auto px-6 sm:px-14 pt-12 pb-9 border-b border-ink/10">
      <div className="text-label font-mono tracking-[.16em] text-orange">
        {eyebrow}
      </div>
      <h1 className="mt-5 font-black font-serif text-[32px] sm:text-h1 leading-[1.28] text-balance">
        {title}
      </h1>
      <p className="mt-5 text-lede text-ink-2 font-light">
        {lede}
      </p>
    </section>
  );
}

/** 首頁的主題卡：16:9 圖片在上、文字在下 */
export function TopicCard({ topic }: { topic: TopicRoute }) {
  return (
    <Link
      href={topic.href}
      className="group flex flex-col bg-surface border border-ink/[.12] rounded-xl overflow-hidden transition-colors duration-150 hover:border-navy"
    >
      <Figure id={topic.image} className="border-0 rounded-none" />
      <div className="flex flex-col gap-2.5 p-6 flex-1">
        <h3 className="font-bold text-h3">{topic.label}</h3>
        <p className="text-caption text-ink-2 font-light flex-1">
          {topic.blurb}
        </p>
        <span className="text-caption font-medium text-orange">看說明 →</span>
      </div>
    </Link>
  );
}

export function TopicCardGrid() {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((t) => (
        <TopicCard key={t.href} topic={t} />
      ))}
    </div>
  );
}

/**
 * 主題頁底部的上下頁導引。
 * 沒有這個，家長讀完一頁就會卡在頁尾——那正是她最願意繼續讀的時候。
 */
export function TopicNav({
  current,
  nextOverride,
}: {
  current: string;
  /** 覆寫「下一頁」。例如 /results 讀完應該去 /daily-care，不是照順序 */
  nextOverride?: TopicRoute;
}) {
  const { prev, next } = topicNeighbours(current);
  const forward = nextOverride ?? next;

  if (!prev && !forward) return null;

  return (
    <nav className="mt-10 pt-8 border-t border-ink/10 flex flex-wrap gap-6 justify-between items-start">
      {prev ? (
        <Link href={prev.href} className="group max-w-[15em]">
          <div className="text-label font-mono tracking-[.14em] text-ink-3">
            上一頁
          </div>
          <div className="mt-2 text-h3 font-bold text-navy group-hover:text-orange transition-colors">
            ← {prev.label}
          </div>
        </Link>
      ) : (
        <span />
      )}
      {forward && (
        <Link href={forward.href} className="group max-w-[18em] sm:text-right">
          <div className="text-label font-mono tracking-[.14em] text-ink-3">
            接下來
          </div>
          <div className="mt-2 text-h3 font-bold text-navy group-hover:text-orange transition-colors">
            {forward.label} →
          </div>
          <p className="mt-2 text-caption text-ink-2 font-light">
            {forward.blurb}
          </p>
        </Link>
      )}
    </nav>
  );
}
