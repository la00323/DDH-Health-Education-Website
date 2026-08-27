import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { imageSlot, suggestedSize, type Ratio } from "@/lib/images";

const ratioClass: Record<Ratio, string> = {
  "16/9": "aspect-[16/9]",
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
}: {
  id: string;
  className?: string;
  priority?: boolean;
}) {
  const slot = imageSlot(id);
  // slot.file 讓兩個空位共用同一個檔案（例如首頁卡片與內頁插圖是同一張圖）
  const src = findImage(slot.file ?? id);
  // 有文字標示的圖解要用 contain，避免標示被裁掉；留邊顏色配圖片自身底色
  const contain = slot.fit === "contain";

  return (
    <figure
      className={`bg-surface border border-ink/[.12] rounded-xl overflow-hidden ${className}`}
    >
      <div
        className={`relative ${ratioClass[slot.ratio]}`}
        style={contain && slot.mat ? { background: slot.mat } : undefined}
      >
        {src ? (
          <Image
            src={src}
            alt={slot.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1180px"
            className={contain ? "object-contain" : "object-cover"}
          />
        ) : (
          <Placeholder slot={slot} />
        )}
      </div>

      {slot.caption && (
        <figcaption className="border-t border-ink/[.08] px-5 py-3.5 flex flex-wrap gap-x-4 gap-y-1 justify-between items-baseline">
          <span className="text-caption text-ink-2 font-light">
            {slot.caption}
          </span>
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
