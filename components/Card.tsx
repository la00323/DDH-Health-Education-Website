import type { ReactNode } from "react";
import { Tag } from "./Tag";

export function ArticleCard({
  stageTag,
  title,
  meta,
  cover,
}: {
  stageTag: string;
  title: string;
  meta: string;
  cover?: ReactNode;
}) {
  return (
    <div className="bg-surface border border-ink/[.12] rounded-lg overflow-hidden transition-colors duration-150 hover:border-navy">
      <div className="aspect-[3/2] flex items-center justify-center text-[11.5px] font-mono text-ink-3 bg-[repeating-linear-gradient(135deg,#f2efe6_0_12px,#fbf9f3_12px_24px)]">
        {cover ?? "［ 封面 3:2 ］"}
      </div>
      <div className="p-[18px]">
        <Tag variant="stage">{stageTag}</Tag>
        <h3 className="mt-3 mb-2 font-bold text-[17px] leading-[1.55]">
          {title}
        </h3>
        <p className="text-[13px] text-ink-3">{meta}</p>
      </div>
    </div>
  );
}

export function VideoCard({
  tag,
  title,
  duration,
}: {
  tag: string;
  title: string;
  duration: string;
}) {
  return (
    <div className="bg-surface border border-ink/[.12] rounded-lg overflow-hidden transition-colors duration-150 hover:border-navy">
      <div className="aspect-[3/2] bg-navy flex items-center justify-center relative">
        <span className="w-12 h-12 rounded-full bg-white/[.16] flex items-center justify-center text-white text-base">
          ▶
        </span>
        <span className="absolute right-3 bottom-3 text-[11px] font-mono text-amber-soft">
          {duration}
        </span>
      </div>
      <div className="p-[18px]">
        <Tag variant="core">{tag}</Tag>
        <h3 className="mt-3 font-bold text-[17px] leading-[1.55]">{title}</h3>
      </div>
    </div>
  );
}

export function StageEntryCard({
  ageTag,
  title,
  desc,
  href,
}: {
  ageTag: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-surface border border-ink/[.12] rounded-lg p-[22px] flex flex-col gap-3.5 transition-colors duration-150 hover:border-orange"
    >
      <div className="text-[11px] font-mono text-ink-3 tracking-[.1em]">
        {ageTag}
      </div>
      <h3 className="font-bold text-[19px] leading-[1.5]">{title}</h3>
      <p className="text-[14.5px] leading-[1.85] text-ink-2 font-light">
        {desc}
      </p>
      <span className="font-medium text-sm text-orange">進入這個階段 →</span>
    </a>
  );
}
