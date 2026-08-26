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
