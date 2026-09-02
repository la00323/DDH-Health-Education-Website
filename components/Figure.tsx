import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { imageSlot, suggestedSize, type Ratio } from "@/lib/images";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "21/9": "aspect-[21/9]",
  "1/1": "aspect-square",
};

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * 找出這個空位對應的圖檔。建置時執行一次，找不到就回 null。
 * 把圖放進 public/images/<id>.jpg 就會自動被撿到。
 */
function findImage(id: string): string | null {
  const dir = path.join(process.cwd(), "public", "images");
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${id}.${ext}`))) {
      return `/images/${id}.${ext}`;
    }
  }
  return null;
}

/**
 * 圖片空位。有圖就顯示圖，沒圖就顯示一個規格框，
 * 框裡寫明該放什麼圖、建議尺寸、檔名要叫什麼。
 */
export function Figure({
  id,
  className = "",
  priority = false,
  zoom = false,
}: {
  id: string;
  className?: string;
  priority?: boolean;
  /**
   * 讓圖可以點開原圖（雙指放大），並在圖說列右側顯示「點圖放大 ↗」。
   *
   * ⚠️ 預設關閉，而且一定要維持預設關閉。
   * 開啟時會在圖片外面包一層 <a>，但 <a> 不能巢狀——`TopicCard`
   * 整張卡片本身就是一個 <Link>，裡面再出現 <a> 會讓瀏覽器把外層連結
   * 提早關掉，整個卡片版面散開（首頁主題卡曾經因此跑版）。
   * 只有「不在連結裡」的內文插圖才可以打開這個。
   */
  zoom?: boolean;
}) {
  const slot = imageSlot(id);
  // slot.file 讓兩個空位共用同一個檔案（例如首頁卡片與內頁插圖是同一張圖）
  const src = findImage(slot.file ?? id);
  // 有文字標示的圖解要用 contain，避免標示被裁掉；留邊顏色配圖片自身底色
  const contain = slot.fit === "contain";
  // 還沒補圖的位置沒有原圖可以點開，所以要連 src 一起判斷
  const zoomable = zoom && !!src;

  return (
    <figure
      className={`bg-surface border border-ink/[.12] rounded-xl overflow-hidden ${className}`}
    >
      <div
        className={`relative ${ratioClass[slot.ratio]}`}
        style={contain && slot.mat ? { background: slot.mat } : undefined}
      >
        {src ? (
          /*
            zoom 開啟時包一層 <a>，讓圖可以點開原圖。
            這些圖解上的中文標示在手機寬度下只剩 5–8px，家長根本讀不到；
            點開原圖才能雙指放大。用原生連結，不需要 client JS。
          */
          zoomable ? (
            <a
              href={src}
              target="_blank"
              rel="noopener"
              className="absolute inset-0 block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              <Image
                src={src}
                alt={slot.alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 1180px"
                className={contain ? "object-contain" : "object-cover"}
              />
            </a>
          ) : (
            <Image
              src={src}
              alt={slot.alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 1180px"
              className={contain ? "object-contain" : "object-cover"}
            />
          )
        ) : (
          <Placeholder slot={slot} />
        )}
      </div>

      {/*
        沒有圖說時也要留下這一條，因為「點圖放大」住在這裡。
        圖解上的中文標示在手機寬度下只剩 5–8px，點開原圖是家長唯一
        看得清楚的方法——這個入口不能因為省掉一句圖說就跟著消失。
      */}
      {(slot.caption || zoomable) && (
        <figcaption
          className={`border-t border-ink/[.08] px-5 py-3.5 flex flex-wrap gap-x-4 gap-y-1 items-baseline ${
            slot.caption ? "justify-between" : "justify-end"
          }`}
        >
          {slot.caption && (
            <span className="text-caption text-ink-2 font-light">
              {slot.caption}
            </span>
          )}
          {zoomable && (
            <a
              href={src}
              target="_blank"
              rel="noopener"
              className="text-label font-medium text-navy whitespace-nowrap no-underline"
            >
              點圖放大 ↗
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/** 還沒補圖時顯示的規格框——它本身就是給院方的圖片規格單 */
function Placeholder({ slot }: { slot: ReturnType<typeof imageSlot> }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 py-5 text-center bg-[repeating-linear-gradient(135deg,#F4F1E7_0_14px,#FBF9F3_14px_28px)]">
      <span className="text-label font-mono tracking-[.14em] text-ink-3">
        待補圖 · {slot.ratio}
      </span>
      <span className="text-caption font-medium text-ink-2 max-w-[36em]">
        {slot.brief}
      </span>
      <span className="text-label font-mono text-ink-3/80">
        建議 {suggestedSize[slot.ratio]} · 檔名 {slot.id}.jpg
      </span>
    </div>
  );
}
