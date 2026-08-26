import Link from "next/link";

const items = [
  {
    title: "衛教專區",
    sub: "髖關節健康知識與照護",
    bg: "bg-menu-blue",
    dot: "bg-menu-blue-dot",
    href: "/guide",
  },
  {
    title: "吊帶使用說明",
    sub: "正確穿戴與日常照護",
    bg: "bg-menu-green",
    dot: "bg-menu-green-dot",
    href: "/guide/pavlik",
  },
  {
    title: "醫病共享決策",
    sub: "共同討論治療計畫",
    bg: "bg-menu-yellow",
    dot: "bg-menu-yellow-dot",
    href: "/guide/decision",
  },
  {
    title: "個管諮詢",
    sub: "專屬個管師線上服務",
    bg: "bg-menu-pink",
    dot: "bg-menu-pink-dot",
    href: "/contact",
  },
];

export function MenuGrid() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {items.map((m) => (
        <Link
          key={m.title}
          href={m.href}
          className={`block rounded-2xl overflow-hidden ${m.bg} px-6 pt-[22px] pb-5 border border-ink/[.08] transition-[filter] duration-150 hover:brightness-[.97]`}
        >
          <div className="font-bold text-[25px] leading-[1.35] text-[#3a2e23]">
            {m.title}
          </div>
          <div className="mt-2 font-medium text-[14.5px] leading-[1.6] text-[#5c4b3b]">
            {m.sub}
          </div>
          <div className="flex justify-end mt-3.5">
            <span
              className={`w-[34px] h-[34px] rounded-full ${m.dot} text-white flex items-center justify-center text-sm`}
            >
              ›
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
