/**
 * 圖片空位清單。
 *
 * 版面先做好，圖片位置留著。把圖檔放進 `public/images/<代號>.jpg`
 * （或 .png / .webp）就會自動顯示，不用改任何程式；
 * 還沒補的位置會顯示一個規格框，寫明該放什麼圖。
 */

export type Ratio = "16/9" | "4/3" | "3/4" | "21/9" | "1/1";

export type ImageSlot = {
  /** 檔名代號。圖檔要命名為 <id>.jpg / .png / .webp */
  id: string;
  /**
   * 沿用別的空位的圖檔。
   * 例如「首頁卡片」和「內頁插圖」其實是同一張圖時，
   * 填上另一個代號就好，不用把同一個檔案存兩份。
   */
  file?: string;
  /** 這裡該放什麼圖（會顯示在空位框裡） */
  brief: string;
  ratio: Ratio;
  /**
   * 圖片要「填滿」還是「完整顯示」。
   * - cover（預設）＝填滿整個框，超出的部分裁掉。照片、卡片用這個。
   * - contain ＝整張圖完整顯示，比例對不上時左右或上下留邊。
   *   有文字標示的醫學圖解一定要用這個，否則標示會被裁掉。
   */
  fit?: "cover" | "contain";
  /** 用 contain 時，留邊的顏色。填圖片本身的底色就看不出接縫 */
  mat?: string;
  /** 替代文字，給讀螢幕軟體與 SEO 用 */
  alt: string;
  /** 圖說，顯示在圖片下方。省略則不顯示 */
  caption?: string;
  /** 依據的知識庫題號，供院內審閱時追溯 */
  source?: string;
};

/** 每種比例的建議像素尺寸（顯示在空位框裡） */
export const suggestedSize: Record<Ratio, string> = {
  "16/9": "1200×675",
  "4/3": "1000×750",
  "3/4": "750×1000",
  "21/9": "1400×600",
  "1/1": "800×800",
};

export const imageSlots: ImageSlot[] = [
  // ── 首頁五張主題卡 ──────────────────────────────
  {
    // ✅ 已補圖：正常髖關節 vs 髖關節發育不良 對照圖
    // 圖上有中文標示，所以用 contain（完整顯示），留邊配圖片本身的米白底色
    id: "card-about",
    brief: "骨盆全景，兩側放大對照：正常髖關節 vs 髖關節發育不良",
    ratio: "16/9",
    fit: "contain",
    mat: "#FDFDEF",
    alt: "髖關節示意：股骨頭像球，髖臼像碗",
  },
  {
    // ✅ 已補圖：嬰兒接受髖關節超音波檢查的插畫。畫面本來就滿版到邊，用 cover
    id: "card-screening",
    brief: "嬰兒側躺、探頭貼在髖部，接受髖關節超音波檢查",
    ratio: "16/9",
    alt: "嬰兒接受髖關節超音波檢查",
  },
  {
    // ✅ 已補圖：各月齡該用哪種檢查的時間軸
    id: "card-when",
    brief: "各月齡檢查方式時間軸：理學檢查 → 超音波 → X 光",
    ratio: "16/9",
    fit: "contain",
    mat: "#FDFDEF",
    alt: "各月齡建議的髖關節檢查方式時間軸",
  },
  {
    // ✅ 已補圖：用程式畫的示意報告單（scratchpad/make_card_results.py）
    // 這張圖只出現在首頁卡片，實際只有約 380px 寬，所以刻意只放兩個大數字
    id: "card-results",
    brief: "示意報告單：分型 Type I、α 角 64°、判讀正常",
    ratio: "16/9",
    fit: "contain",
    mat: "#FDFDEF",
    alt: "超音波報告示意：分型 Type I、Alpha 角 64 度，判讀正常",
  },
  {
    id: "card-daily",
    brief: "寶寶雙腿自然彎曲外展成 M 字型",
    ratio: "16/9",
    alt: "寶寶雙腿呈 M 字型的自然姿勢",
  },

  // ── ① DDH 是什麼 ───────────────────────────────
  {
    // ✅ 已補圖：跟首頁第一張卡片是同一張，所以用 file 指過去，不重複存檔
    id: "hip-ball-socket",
    file: "card-about",
    brief: "正常髖臼（碗夠深）與發育不良（碗太淺）並排對照",
    ratio: "16/9",
    fit: "contain",
    mat: "#FDFDEF",
    alt: "正常髖關節與發育不良髖關節對照",
    caption: "正常的髖臼夠深，能穩穩包住股骨頭；發育不良時碗太淺，球容易滑出去。",
    source: "A-001",
  },
  {
    id: "hip-baby-vs-adult",
    brief: "嬰兒髖關節（大部分是軟骨）與成人髖關節（已骨化）對照",
    ratio: "16/9",
    alt: "嬰兒與成人髖關節構造對照",
    caption: "嬰兒的髖關節大部分還是軟骨，X 光看不到，所以要用超音波。",
    source: "A-003 / C-001",
  },

  // ── ② 超音波檢查 ───────────────────────────────
  {
    id: "us-vs-xray",
    brief: "同一個髖關節：X 光看不到軟骨（留白），超音波看得到",
    ratio: "16/9",
    alt: "超音波與 X 光在嬰兒髖關節上看得到的範圍對照",
    caption: "六個月內的寶寶，關鍵構造還是軟骨——X 光照不出來，超音波可以。",
    source: "C-001 / C-002",
  },
  {
    // ✅ 已補圖：跟首頁第二張卡片同一張，畫面本來就滿版，所以用 cover
    id: "us-exam-day",
    file: "card-screening",
    brief: "檢查當天的實際情形：寶寶側躺、探頭貼在髖部",
    ratio: "16/9",
    alt: "髖關節超音波檢查進行中",
    caption: "寶寶側躺、髖關節微彎，探頭貼在髖部外側。全程約三到五分鐘。",
    source: "C-026 / C-027",
  },

  // ── ③ 什麼時候檢查 ─────────────────────────────
  {
    // ✅ 已補圖：跟首頁第三張卡片同一張。原圖接近 16:9，把 21:9 改成 16:9 才不會裁掉上下的標示
    id: "timeline-4-6w",
    file: "card-when",
    brief: "時間軸：各月齡分別用理學檢查、超音波、X 光",
    ratio: "16/9",
    fit: "contain",
    mat: "#FDFDEF",
    alt: "各月齡建議的髖關節檢查方式時間軸",
    caption:
      "不同月齡看的方式不一樣：六個月以前關鍵構造還是軟骨，要用超音波；六個月以後骨頭長出來了才改用 X 光。有危險因子的寶寶約在出生後四到六週安排超音波；若出生時理學檢查就摸到關節不穩，會提早在一到兩週內做。",
    source: "B-005 / C-001 / C-002",
  },
  {
    id: "risk-factors",
    brief: "危險因子一覽：臀位產、家族史、女嬰、第一胎、羊水過少、冬天出生、多胞胎",
    ratio: "4/3",
    alt: "DDH 的常見危險因子",
    caption: "有這些因子只代表「需要被檢查」，不代表寶寶有問題。",
    source: "A-021",
  },

  // ── ④ 看懂結果 ────────────────────────────────
  {
    id: "graf-angles",
    brief: "Graf 量法：基準線、骨性髖臼頂（Alpha 角）、軟骨頂（Beta 角）",
    ratio: "4/3",
    alt: "Graf 分類法的 Alpha 角與 Beta 角量法",
    caption: "Alpha 角量的是「碗有多深」，越大越好；Beta 角量的是「軟骨頂被推擠的程度」，越小越好。",
    source: "C-004 / C-005 / C-006",
  },
  {
    id: "graf-types",
    brief: "Graf 各分型的髖臼形狀對照（I、IIa、IIb、IIc、D、III、IV）",
    ratio: "16/9",
    alt: "Graf 各分型的髖關節形狀對照",
    caption: "從 Type I 到 Type IV，碗越來越淺、球越來越往外。",
    source: "C-004",
  },

  // ── ⑤ 日常照護 ────────────────────────────────
  {
    id: "three-habits",
    brief: "三格並排：包開開、抱開開、背開開，每格標出 M 字腿",
    ratio: "21/9",
    alt: "保護髖關節的三要訣：包開開、抱開開、背開開",
    caption: "三個動作涵蓋了寶寶一天中最主要的三種姿勢。",
    source: "D-004",
  },
  {
    id: "swaddle-do-dont",
    brief: "包巾對照：左為錯誤（雙腿拉直併攏綁緊），右為正確（包上不包下，下半身留空間）",
    ratio: "16/9",
    alt: "包巾的正確與錯誤包法對照",
    caption: "口訣是「包上不包下」——上半身可以包，下半身必須留空間。",
    source: "D-001 / D-002",
  },
  {
    id: "carry-do-dont",
    brief: "抱姿對照：左為錯誤（橫抱、雙腿併攏），右為正確（直立式、雙腿跨開）",
    ratio: "16/9",
    alt: "抱姿的正確與錯誤對照",
    caption: "直立式抱法讓雙腿自然跨開在照顧者身上。",
    source: "D-005",
  },
  {
    id: "carrier-do-dont",
    brief: "揹巾對照：左為錯誤（窄底、雙腿懸垂成 I 字），右為正確（寬基底、膝蓋略高於臀部）",
    ratio: "16/9",
    alt: "揹巾的正確與錯誤使用對照",
    caption: "重點在寬基底：要托住整個大腿，讓膝蓋略高於或等於臀部。",
    source: "D-006 / D-007",
  },
];

const bySlotId = new Map(imageSlots.map((s) => [s.id, s]));

export function imageSlot(id: string): ImageSlot {
  const slot = bySlotId.get(id);
  if (!slot) throw new Error(`lib/images.ts 沒有代號為 "${id}" 的圖片空位`);
  return slot;
}
