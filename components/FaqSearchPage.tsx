"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { categories, categoryOf, type FaqEntry } from "@/lib/faqs";
import { site } from "@/lib/site";
import { Markdown } from "./Markdown";

const redFlagStyle: Record<FaqEntry["redFlag"], string> = {
  urgent: "border-alert",
  watch: "border-amber-border",
  none: "border-transparent",
};

function QuestionRow({ entry, open, onToggle }: { entry: FaqEntry; open: boolean; onToggle: () => void }) {
  return (
    <div
      id={`faq-${entry.id}`}
      className={`scroll-mt-24 border-b border-ink/[.08] last:border-b-0 border-l-[3px] ${redFlagStyle[entry.redFlag]}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex gap-3.5 items-center px-4 sm:px-[22px] py-[19px] text-left hover:bg-[#f8f5ec] transition-colors duration-150"
      >
        <span className="shrink-0 text-label font-mono text-orange">
          {entry.id}
        </span>
        <span className="flex-1 font-medium text-body leading-[1.6]">
          {entry.question}
        </span>
        {entry.redFlag === "urgent" && (
          <span className="shrink-0 text-label font-medium px-2.5 py-1 rounded-md bg-[#fbe7e4] text-alert">
            立即回診
          </span>
        )}
        <span className="shrink-0 font-mono text-lg text-ink-3">
          {open ? "–" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-4 sm:px-[22px] pb-6 pl-[52px] animate-ds-fade">
          <p className="text-body leading-[1.9] font-medium text-ink mb-3">
            {entry.shortAnswer}
          </p>
          {entry.detailAnswer && (
            <div className="text-caption text-ink-2 font-light border-t border-ink/[.08] pt-3.5">
              <Markdown text={entry.detailAnswer} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function FaqSearchPage({ faqs }: { faqs: FaqEntry[] }) {
  const searchParams = useSearchParams();
  const initialCats = useMemo(() => {
    const raw = searchParams.get("cat");
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<string[]>(initialCats);
  const [openId, setOpenId] = useState<string | null>(
    () => searchParams.get("open")
  );

  // 導覽列在同一個 /faq 路徑下切換不同的 ?cat= 分類時，元件不會重新掛載，
  // 所以要用 effect 把網址上的分類同步回篩選狀態，點擊才會生效。
  const initialCatsKey = initialCats.join(",");
  useEffect(() => {
    setCats(initialCatsKey ? initialCatsKey.split(",") : []);
  }, [initialCatsKey]);

  // ?open=A-038 直接展開並捲到那一題。
  // 沒有這個，主題頁每一條「看完整回答」都會把家長丟到 298 題列表的最上面。
  const openParam = searchParams.get("open");
  useEffect(() => {
    if (!openParam) return;
    setOpenId(openParam);
    const el = document.getElementById(`faq-${openParam}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [openParam]);

  function toggleCat(code: string) {
    setCats((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  const list = useMemo(() => {
    const q = query.trim();
    return faqs.filter((f) => {
      if (cats.length > 0 && !cats.includes(categoryOf(f.id))) return false;
      if (!q) return true;
      const hay = `${f.question} ${f.shortAnswer} ${f.tags.join(" ")} ${f.aliases.join(" ")}`;
      return hay.includes(q);
    });
  }, [faqs, query, cats]);

  return (
    <div>
      <div className="max-w-[46em] mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋：洗澡、安全座椅、睡姿…"
          className="w-full box-border text-body px-5 py-4 border-[1.5px] border-ink/[.18] rounded-full bg-surface outline-none focus:border-navy"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setCats([])}
          className={`text-caption px-4 py-2 rounded-full border transition-colors duration-150 ${
            cats.length === 0
              ? "bg-navy text-white border-navy"
              : "bg-surface text-ink-2 border-ink/15 hover:border-navy"
          }`}
        >
          全部 {faqs.length}
        </button>
        {categories.map((c) => {
          const count = faqs.filter((f) => categoryOf(f.id) === c.code).length;
          const active = cats.includes(c.code);
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => toggleCat(c.code)}
              className={`text-caption px-4 py-2 rounded-full border transition-colors duration-150 ${
                active
                  ? "bg-navy text-white border-navy"
                  : "bg-surface text-ink-2 border-ink/15 hover:border-navy"
              }`}
            >
              {c.label} {count}
            </button>
          );
        })}
      </div>

      <p className="text-caption text-ink-3 mb-3">
        找到 {list.length} 題
        {list.length > 0 && "，點題目展開詳細說明"}
      </p>

      <div className="bg-surface border border-ink/[.12] rounded-lg overflow-hidden">
        {list.map((f) => (
          <QuestionRow
            key={f.id}
            entry={f}
            open={openId === f.id}
            onToggle={() => setOpenId(openId === f.id ? null : f.id)}
          />
        ))}
        {list.length === 0 && (
          <div className="px-5 py-[30px] text-center text-caption leading-[1.9] text-ink-3">
            沒有找到相符的問題。
            <br />
            請直接聯絡個管師{" "}
            <span className="font-mono text-navy">{site.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
