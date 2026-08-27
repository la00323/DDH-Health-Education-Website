import type { ReactNode } from "react";
import { Figure } from "./Figure";

/** 首頁的三個白話數字 */
export function StatRow({
  stats,
}: {
  /** source 是知識庫題號，保留在資料裡供院內審閱追溯，不顯示給家長看 */
  stats: { value: string; label: string; source?: string; tone?: "navy" | "orange" }[];
}) {
  return (
    <div className="flex flex-wrap gap-8 sm:gap-10 mt-10 pt-8 border-t border-ink/10">
      {stats.map((s) => (
        <div key={s.label} className="flex-1 min-w-[9rem]">
          <div
            className={`font-medium font-mono text-stat tabular-nums ${
              s.tone === "orange" ? "text-orange" : "text-navy"
            }`}
          >
            {s.value}
          </div>
          <div className="mt-3 text-caption text-ink-2 max-w-[15em]">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/** 編號步驟：檢查當天流程、篩檢制度、看報告三步 */
export function ProcessSteps({
  steps,
}: {
  steps: { title: string; body: ReactNode; meta?: string }[];
}) {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-3 [&:not(:first-child)]:mt-8">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="bg-surface border border-ink/[.12] rounded-xl p-6"
        >
          <div className="text-label font-mono tracking-[.12em] text-orange">
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-3 font-bold text-h3">{s.title}</h3>
          <div className="mt-3 text-caption text-ink-2 font-light">{s.body}</div>
          {s.meta && (
            <div className="mt-4 text-label font-mono text-navy">{s.meta}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/** 勾選清單，例如揹巾五點檢查 */
export function Checklist({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-navy/25 bg-mint rounded-xl px-6 py-6 [&:not(:first-child)]:mt-8">
      <div className="font-bold text-h3 text-navy">{title}</div>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 items-start text-body font-light text-ink">
            <span className="shrink-0 mt-1.5 w-5 h-5 rounded-md bg-navy text-white inline-flex items-center justify-center text-[13px]">
              ✓
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 正確／錯誤對照。
 * 刻意用薄荷綠 vs 中性灰，不用紅色——紅色全站只保留給「立即回診」。
 */
export function DoDontPair({
  imageId,
  good,
  bad,
}: {
  /** 對照圖的空位代號，省略則只顯示文字 */
  imageId?: string;
  good: { title: string; body: string };
  bad: { title: string; body: string };
}) {
  return (
    <div className="[&:not(:first-child)]:mt-8">
      {imageId && <Figure id={imageId} className="mb-5" />}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="border border-navy/25 bg-mint rounded-xl px-6 py-5">
          <div className="flex gap-2.5 items-center">
            <span className="w-6 h-6 rounded-full bg-navy text-white inline-flex items-center justify-center text-[14px]">
              ✓
            </span>
            <span className="font-bold text-h3 text-navy">{good.title}</span>
          </div>
          <p className="mt-3 text-caption text-ink-2 font-light">{good.body}</p>
        </div>
        <div className="border border-ink/15 bg-[#F5F2E9] rounded-xl px-6 py-5">
          <div className="flex gap-2.5 items-center">
            <span className="w-6 h-6 rounded-full bg-ink-3 text-white inline-flex items-center justify-center text-[14px]">
              ✕
            </span>
            <span className="font-bold text-h3 text-ink-2">{bad.title}</span>
          </div>
          <p className="mt-3 text-caption text-ink-2 font-light">{bad.body}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 嚴重程度光譜。
 * 重點是讓家長看到這是一條連續的線，不是「有病／沒病」的開關。
 */
export function SeveritySpectrum({
  stops,
}: {
  stops: { label: string; note: string }[];
}) {
  return (
    <div className="[&:not(:first-child)]:mt-8">
      <div className="flex gap-1.5">
        {stops.map((s, i) => (
          <div
            key={s.label}
            className="flex-1 h-2 rounded-full"
            style={{
              background: [
                "var(--color-mint-bg)",
                "var(--color-illus-blue)",
                "var(--color-amber-soft)",
                "var(--color-illus-peach)",
              ][i % 4],
            }}
          />
        ))}
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mt-5">
        {stops.map((s) => (
          <div key={s.label}>
            <div className="font-bold text-h3">{s.label}</div>
            <p className="mt-2 text-caption text-ink-2 font-light">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 因子格。
 *
 * 全部白底，跟 CriteriaGroups 長得一模一樣——因為它們是同一件事的兩半，
 * 用不同顏色反而會讓讀者以為有輕重之分。
 * 「是不是本院收案條件」的區別由小標題與說明文字負責，不靠顏色。
 */
export function RiskFactorGrid({
  items,
}: {
  items: { label: string; line: string }[];
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&:not(:first-child)]:mt-8">
      {items.map((it) => (
        <div
          key={it.label}
          className="bg-surface border border-ink/[.12] rounded-xl px-5 py-5"
        >
          <div className="font-bold text-h3">{it.label}</div>
          <p className="mt-2 text-caption text-ink-2 font-light">{it.line}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * 分組條列。用在「檢查發現了什麼」這種一個標題底下掛好幾個項目的內容。
 * 刻意不編號——這些是「符合任一項」的並列關係，不是先後順序。
 */
export function CriteriaGroups({
  groups,
}: {
  groups: { title: string; note?: string; items: string[] }[];
}) {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 [&:not(:first-child)]:mt-8">
      {groups.map((g) => (
        <div
          key={g.title}
          className="bg-surface border border-ink/[.12] rounded-xl px-5 py-5"
        >
          <div className="font-bold text-h3">{g.title}</div>
          {g.note && (
            <p className="mt-2 text-caption text-ink-3 font-light">{g.note}</p>
          )}
          <ul className="mt-3 flex flex-col gap-2">
            {g.items.map((it) => (
              <li
                key={it}
                className="flex gap-2.5 items-start text-caption text-ink-2 font-light"
              >
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-navy/50" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** 「我現在的情況是⋯」快速分流 */
export function QuickRouter({
  items,
}: {
  items: { q: string; dest: string; href: string }[];
}) {
  return (
    <div className="bg-surface border border-ink/[.12] rounded-xl overflow-hidden [&:not(:first-child)]:mt-8">
      {items.map((it) => (
        <a
          key={it.q}
          href={it.href}
          className="flex items-center gap-4 px-5 sm:px-6 py-5 border-b border-ink/[.08] last:border-b-0 text-ink no-underline hover:bg-[#f8f5ec] transition-colors duration-150"
        >
          <span className="flex-1 text-body">{it.q}</span>
          <span className="text-caption font-medium text-navy whitespace-nowrap hidden sm:inline">
            {it.dest}
          </span>
          <span className="text-orange font-mono text-h3">→</span>
        </a>
      ))}
    </div>
  );
}

/** 段落之間的「到這裡就夠了」停止訊號 */
export function StopCue({ children }: { children: ReactNode }) {
  return (
    <p className="[&:not(:first-child)]:mt-8 py-5 text-center text-caption text-ink-2 border-t border-b border-ink/[.08]">
      {children}
    </p>
  );
}
