"use client";

import { useState } from "react";

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const q = query.trim();
  const list = q
    ? faqs.filter((f) => (f.q + f.a).includes(q))
    : faqs;

  return (
    <div className="max-w-[46em]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋：洗澡、安全座椅、睡姿…"
        className="w-full box-border text-[15.5px] px-5 py-4 border-[1.5px] border-ink/[.18] rounded-full bg-surface outline-none mb-4 focus:border-navy"
      />
      <div className="bg-surface border border-ink/[.12] rounded-lg overflow-hidden">
        {list.map((f, i) => {
          const open = openId === f.id;
          return (
            <div key={f.id} className="border-b border-ink/[.08] last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : f.id)}
                className="w-full flex gap-3.5 items-center px-5 sm:px-[22px] py-[19px] text-left hover:bg-[#f8f5ec] transition-colors duration-150"
              >
                <span className="shrink-0 text-[11px] font-mono text-orange">
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-medium text-base leading-[1.6]">
                  {f.q}
                </span>
                <span className="shrink-0 font-mono text-lg text-ink-3">
                  {open ? "–" : "+"}
                </span>
              </button>
              {open && (
                <div className="px-5 sm:px-[22px] pb-5 pl-[52px] text-[15.5px] leading-[1.9] text-ink-2 font-light animate-ds-fade">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
        {list.length === 0 && (
          <div className="px-5 py-[30px] text-center text-[15px] leading-[1.9] text-ink-3">
            沒有找到相符的問題。
            <br />
            請直接聯絡個管師{" "}
            <span className="font-mono text-navy">(02) 2727-5374</span>
          </div>
        )}
      </div>
    </div>
  );
}
