import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { topics } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-[1180px] mx-auto px-6 sm:px-14 py-20">
          <div className="text-label font-mono tracking-[.16em] text-orange">
            找不到這一頁
          </div>
          <h1 className="mt-5 font-black font-serif text-[32px] sm:text-h1 leading-[1.28]">
            這個網址可能已經換了
          </h1>
          <p className="mt-5 text-lede text-ink-2 font-light">
            從下面這幾個地方，應該可以找到您要的內容。
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {topics.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="text-body font-medium text-navy hover:text-orange"
                >
                  {t.label} →
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" variant="primary">
              回首頁
            </Button>
            <Button href="/faq" variant="outline">
              搜尋常見問題
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
