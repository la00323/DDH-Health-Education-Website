import type { ReactNode } from "react";

/**
 * 四種提示框，對應設計系統「05 / 提示框」：
 * - alert：紅框，立即回診警訊。全站每頁最多一個。
 * - note：藏青左框＋薄荷底，一般重點提醒。
 * - summary：琥珀框，段落小結。
 * - disclaimer：灰框白底，免責聲明或次要備註。
 */

export function AlertBox({
  title,
  items,
  action,
}: {
  title: string;
  items: string[];
  action: ReactNode;
}) {
  return (
    <div className="border-[1.5px] border-alert bg-alert-bg rounded-lg px-6 py-[22px]">
      <div className="font-bold text-sm text-alert mb-3">{title}</div>
      <div className="flex flex-col gap-[9px] text-body leading-[1.8] text-[#3d3b36] font-light">
        {items.map((it) => (
          <div key={it} className="flex gap-2.5">
            <span className="text-alert">▲</span>
            <span>{it}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-caption font-medium leading-[1.7] text-alert">
        {action}
      </div>
    </div>
  );
}

export function NoteBox({
  title = "重點",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-4 border-navy bg-mint rounded-r-lg px-6 py-[22px]">
      <div className="font-bold text-sm text-navy mb-2.5">{title}</div>
      <p className="text-body leading-[1.85] text-[#3d3b36] font-light">
        {children}
      </p>
    </div>
  );
}

export function SummaryBox({ children }: { children: ReactNode }) {
  return (
    <div className="border border-amber-border bg-amber-bg rounded-lg px-6 py-[22px]">
      <div className="font-medium text-label tracking-[.14em] text-amber-text mb-2.5">
        小結
      </div>
      <p className="text-body leading-[1.85] text-[#3d3b36] font-light">
        {children}
      </p>
    </div>
  );
}

export function DisclaimerBox({ children }: { children: ReactNode }) {
  return (
    <div className="border border-ink/[.14] bg-surface rounded-lg px-6 py-[22px]">
      <div className="font-medium text-caption text-ink-3 mb-2.5">
        ※ 免責聲明
      </div>
      <p className="text-caption leading-[1.85] text-ink-2 font-light">
        {children}
      </p>
    </div>
  );
}
