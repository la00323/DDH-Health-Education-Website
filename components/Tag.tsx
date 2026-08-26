import type { ReactNode } from "react";

type Variant = "core" | "stage" | "hashtag" | "urgent" | "age" | "read";

const variantClass: Record<Variant, string> = {
  core: "bg-mint text-navy rounded-md font-medium",
  stage: "bg-[#fdf0df] text-[#9a5b12] rounded-md font-medium",
  hashtag: "bg-[#f2efe6] text-ink-2 rounded-full font-normal",
  urgent: "bg-[#fbe7e4] text-alert rounded-md font-medium",
  age: "border border-navy/35 text-navy rounded font-mono font-medium tracking-[.1em]",
  read: "text-ink-3 font-normal",
};

export function Tag({
  children,
  variant = "hashtag",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  if (variant === "urgent") {
    return (
      <span
        className={`inline-flex items-center gap-[7px] text-[12.5px] leading-none px-3.5 py-2.5 ${variantClass.urgent}`}
      >
        <span className="w-[7px] h-[7px] rounded-full bg-alert" />
        {children}
      </span>
    );
  }
  if (variant === "read") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[13px] leading-none ${variantClass.read}`}
      >
        <span className="w-4 h-4 rounded-full bg-navy text-white inline-flex items-center justify-center text-[9px]">
          ✓
        </span>
        {children}
      </span>
    );
  }
  const size = variant === "age" ? "text-[11px]" : "text-[12.5px]";
  return (
    <span
      className={`inline-block ${size} leading-none px-3.5 py-2.5 ${variantClass[variant]}`}
    >
      {children}
    </span>
  );
}
