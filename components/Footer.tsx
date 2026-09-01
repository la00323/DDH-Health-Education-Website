import Link from "next/link";
import Image from "next/image";
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

        {/*
          認證徽章在頁尾再出現一次，因為這裡是機構資訊的自然歸屬，
          而且頁尾每一頁都有——不是只有從首頁進來的家長才看得到。
          徽章本身是透明背景的金色標章，壓在藏青底上剛好。
        */}
        <div className="mt-7 flex items-center gap-3.5">
          <Image
            src="/certification.png"
            alt="財團法人醫院評鑑暨醫療品質策進會 小兒髖關節發育不良照護品質認證標章"
            width={72}
            height={79}
            className="w-[62px] h-auto shrink-0"
          />
          <div className="text-label leading-[1.6] font-light">
            小兒髖關節發育不良照護品質認證
            <br />
            <span className="text-[#9db8d6]">
              醫策會 ·{" "}
              <span className="font-mono whitespace-nowrap">
                2026.04–2029.03
              </span>
            </span>
          </div>
        </div>
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
