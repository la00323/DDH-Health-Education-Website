import Link from "next/link";
import { site, topics } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-[#d6e4f1] px-6 sm:px-14 py-14 grid gap-9 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      <div>
        <div className="font-black text-h3 text-white font-serif">
          {site.name}
        </div>
        <p className="mt-4 text-caption leading-[1.85] font-light max-w-[15em]">
          由兒童骨科個案管理團隊維護，內容依主治醫師指示為準。
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="font-medium text-label font-mono tracking-[.14em] text-[#9db8d6]">
          內容
        </div>
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="text-caption text-[#d6e4f1] no-underline hover:text-white hover:underline"
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="font-medium text-label font-mono tracking-[.14em] text-[#9db8d6]">
          支援
        </div>
        <Link
          href="/faq"
          className="text-caption text-[#d6e4f1] no-underline hover:text-white hover:underline"
        >
          常見問題
        </Link>
        <Link
          href="/treatment"
          className="text-caption text-[#d6e4f1] no-underline hover:text-white hover:underline"
        >
          如果需要治療
        </Link>
        <Link
          href="/contact"
          className="text-caption text-[#d6e4f1] no-underline hover:text-white hover:underline"
        >
          聯絡個管師
        </Link>
        <Link
          href="/disclaimer"
          className="text-caption text-[#d6e4f1] no-underline hover:text-white hover:underline"
        >
          免責聲明
        </Link>
      </div>

      <div className="text-caption leading-[1.9] font-light text-[#9db8d6]">
        個管專線 <span className="font-mono">{site.phone}</span>
        <br />
        {site.hours}
        <br />
        <span className="font-mono">© 2026</span>
      </div>
    </footer>
  );
}
