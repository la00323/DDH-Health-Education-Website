import raw from "@/data/faqs.json";

export type RedFlag = "none" | "watch" | "urgent";

export type FaqEntry = {
  id: string;
  category: string;
  tags: string[];
  aliases: string[];
  redFlag: RedFlag;
  question: string;
  shortAnswer: string;
  detailAnswer: string;
};

export const faqs = raw as FaqEntry[];

export const categories = [
  { code: "A", label: "疾病認識" },
  { code: "B", label: "篩檢與就醫流程" },
  { code: "C", label: "影像檢查" },
  { code: "D", label: "日常照護" },
  { code: "E", label: "吊帶治療" },
  { code: "F", label: "石膏照護" },
  { code: "G", label: "手術與術後" },
  { code: "H", label: "併發症與長期追蹤" },
  { code: "I", label: "費用與行政" },
  { code: "J", label: "情緒與迷思" },
  { code: "K", label: "紅旗警訊" },
] as const;

export function categoryOf(id: string) {
  return id.split("-")[0];
}

const byIdMap = new Map(faqs.map((f) => [f.id, f]));

export function byId(id: string): FaqEntry {
  const entry = byIdMap.get(id);
  if (!entry) throw new Error(`知識庫沒有題號 "${id}"`);
  return entry;
}

/** 依題號取出多題，順序照傳入的陣列 */
export function getFaqs(ids: string[]): FaqEntry[] {
  return ids.map(byId);
}

/**
 * 拿掉內文裡的交叉引用標記，例如「（見 D-002）」「（見 E 類）」。
 *
 * 這些標記在 /faq 上還好（畫面上看得到題號），但放進主題頁的內文
 * 就是家長無法解讀的雜訊——298 題裡有 131 則帶著這種標記。
 */
export function stripRefs(text: string): string {
  return text
    .replace(/（見[^）]*）/g, "")
    .replace(/\(見[^)]*\)/g, "")
    .replace(/[ \t]+([，。、；：])/g, "$1");
}
