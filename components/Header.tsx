"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navItems = [
  { label: "認識 DDH", href: "/faq?cat=A", n: "38 題" },
  { label: "照護步驟", href: "/faq?cat=D,E,F,G", n: "138 題" },
  { label: "警訊與回診", href: "/faq?cat=K", n: "10 題" },
  { label: "常見問題", href: "/faq", n: "298 題" },
];

function useCurrentUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

function DesktopNav() {
  const currentUrl = useCurrentUrl();
  return (
    <nav className="hidden md:flex gap-5 flex-1 ml-3.5">
      {navItems.map((item) => {
        const active = currentUrl === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[14.5px] pb-1 ${
              active
                ? "text-ink border-b-2 border-orange"
                : "text-ink-2 border-b-2 border-transparent"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const currentUrl = useCurrentUrl();
  return (
    <div className="md:hidden border-t border-ink/10 animate-ds-fade">
      {navItems.map((item) => {
        const active = currentUrl === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex justify-between items-center px-[18px] py-4 border-b border-ink/[.07] text-[15px] ${
              active ? "text-orange bg-[#fdf0df]" : "text-ink"
            }`}
          >
            <span>{item.label}</span>
            <span className="text-ink-3 font-mono text-xs">{item.n}</span>
          </Link>
        );
      })}
      <div className="p-[18px]">
        <a
          href="/contact"
          className="block text-center text-sm font-medium px-3.5 py-3.5 rounded-full bg-orange text-white"
        >
          聯絡個管師
        </a>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-ink/10 sticky top-0 z-30">
      <div className="max-w-[1180px] mx-auto flex items-center gap-4 px-4 sm:px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.jpg"
            alt="高雄榮總小兒髖關節發育不良個案管理標誌"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-bold text-base">DDH 家長照護指南</span>
        </Link>

        <Suspense fallback={<div className="hidden md:flex flex-1" />}>
          <DesktopNav />
        </Suspense>

        <a
          href="/contact"
          className="hidden md:inline-flex ml-auto items-center text-[13px] font-medium px-[18px] py-2.5 rounded-full bg-orange text-white"
        >
          聯絡個管師
        </a>

        <button
          type="button"
          aria-label="開啟選單"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-auto flex flex-col gap-1 p-1.5"
        >
          <span className="w-5 h-0.5 bg-ink block" />
          <span className="w-5 h-0.5 bg-ink block" />
          <span className="w-5 h-0.5 bg-ink block" />
        </button>
      </div>

      {open && (
        <Suspense fallback={null}>
          <MobileNav onNavigate={() => setOpen(false)} />
        </Suspense>
      )}
    </header>
  );
}
