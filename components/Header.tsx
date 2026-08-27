"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-surface border-b border-ink/10 sticky top-0 z-30">
      <div className="max-w-[1180px] mx-auto flex items-center gap-4 px-4 sm:px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {/*
            圓章本身細節很多（外圈有中英文字），太小就糊成一團深色斑點。
            手機 52px、桌機 60px；原圖 1024×1024，放大不會糊。
            width/height 給 60 是讓 next/image 產生足夠解析度，
            實際顯示尺寸由後面的 w-/h- 決定。
          */}
          <Image
            src="/logo.jpg"
            alt="高雄榮總小兒髖關節發育不良個案管理標誌"
            width={60}
            height={60}
            priority
            className="rounded-full w-[52px] h-[52px] sm:w-[60px] sm:h-[60px]"
          />
          <span className="font-bold text-h3 whitespace-nowrap">DDH 家長照護指南</span>
        </Link>

        <nav className="hidden lg:flex gap-4 xl:gap-5 flex-1 ml-3 xl:ml-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-caption pb-1 border-b-2 whitespace-nowrap transition-colors ${
                  active
                    ? "text-ink border-orange"
                    : "text-ink-2 border-transparent hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden lg:inline-flex ml-auto items-center text-caption font-medium px-5 py-2.5 rounded-full bg-orange text-white no-underline whitespace-nowrap"
        >
          聯絡個管師
        </Link>

        <button
          type="button"
          aria-label={open ? "關閉選單" : "開啟選單"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden ml-auto flex flex-col gap-1 p-2"
        >
          <span className="w-6 h-0.5 bg-ink block" />
          <span className="w-6 h-0.5 bg-ink block" />
          <span className="w-6 h-0.5 bg-ink block" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink/10 animate-ds-fade">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex justify-between items-center px-5 py-4 border-b border-ink/[.07] text-body no-underline ${
                  active ? "text-orange bg-[#fdf0df]" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="p-5">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block text-center text-body font-medium px-4 py-4 rounded-full bg-orange text-white no-underline"
            >
              聯絡個管師
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
