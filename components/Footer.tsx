export function Footer() {
  return (
    <footer className="bg-navy text-[#d6e4f1] px-8 sm:px-14 py-[52px] grid gap-[30px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
      <div>
        <div className="font-black text-[19px] text-white font-serif">
          DDH 家長照護指南
        </div>
        <p className="mt-3.5 text-sm leading-[1.85] font-light max-w-[20em]">
          由兒童骨科個案管理團隊維護，內容依主治醫師指示為準。
        </p>
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <div className="font-medium text-[11px] tracking-[.14em] text-[#9db8d6]">
          內容
        </div>
        <a href="/guide" className="text-[#d6e4f1]">
          認識 DDH
        </a>
        <a href="/guide" className="text-[#d6e4f1]">
          照護步驟
        </a>
        <a href="/faq" className="text-[#d6e4f1]">
          常見問題
        </a>
      </div>
      <div className="flex flex-col gap-2.5 text-sm">
        <div className="font-medium text-[11px] tracking-[.14em] text-[#9db8d6]">
          支援
        </div>
        <a href="/contact" className="text-[#d6e4f1]">
          聯絡個管師
        </a>
        <a href="/contact" className="text-[#d6e4f1]">
          回診預約
        </a>
        <a href="/disclaimer" className="text-[#d6e4f1]">
          免責聲明
        </a>
      </div>
      <div className="text-[13px] leading-[1.9] font-light text-[#9db8d6]">
        個管專線 <span className="font-mono">(02) 2727-5374</span>
        <br />
        週一至週五 09:00–18:00
        <br />
        <span className="font-mono">© 2026</span>
      </div>
    </footer>
  );
}
