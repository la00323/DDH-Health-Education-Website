/**
 * 全站共用設定。
 *
 * 導覽列、頁尾、首頁卡片、上下頁導引全部從這裡讀，
 * 之後要加一個主題或改電話，只改這個檔就好。
 */

export const site = {
  name: "DDH 家長照護指南",
  hospital: "高雄榮民總醫院",

  /**
   * ⚠️ 這組號碼來自 Claude Design 的設計稿，知識庫裡查無出處，
   * 而且 (02) 是台北區碼。待院方提供正確號碼後改這一行即可。
   */
  phone: "(02) 2727-5374",
  hours: "週一至週五 09:00–18:00",

  disclaimer:
    "本站內容整理自本院衛教講義與護理指引，僅供照護參考，不能取代醫師診斷。任何個別化的判斷——包括影像判讀、是否需要治療、治療進度調整——都必須由主治醫師當面評估。",
} as const;

export type TopicRoute = {
  href: string;
  /** 導覽列與卡片上的短標題 */
  label: string;
  /** 頁面大標 */
  title: string;
  /** 卡片上的一句說明 */
  blurb: string;
  /** 頁首導言 */
  lede: string;
  /** 圖片空位代號，對應 lib/images.ts */
  image: string;
};

/** 五個主題頁，順序即為上下頁導引的順序 */
export const topics: TopicRoute[] = [
  {
    href: "/about-ddh",
    label: "DDH 是什麼",
    title: "DDH 是什麼",
    blurb: "髖關節就是一個球放在碗裡。碗太淺、或球沒好好待在碗裡，就是 DDH。",
    lede: "先把名詞弄清楚，後面的檢查與報告才看得懂。這一頁不會有任何需要您現在做的事。",
    image: "card-about",
  },
  {
    href: "/screening",
    label: "超音波檢查",
    title: "超音波能幫上什麼忙",
    blurb: "不痛、三到五分鐘、沒有輻射。有些問題是摸不出來的，只有影像看得到。",
    lede: "這一頁說明為什麼醫師請您來照一次超音波，以及檢查那天實際會發生什麼事。",
    image: "card-screening",
  },
  {
    href: "/when-to-screen",
    label: "什麼時候檢查",
    title: "什麼時候該檢查",
    blurb: "為什麼是四到六週，不是一出生就照？因為太早照，九成會是虛驚一場。",
    lede: "如果醫師告訴您「寶寶屬於高風險，過幾週回來照」，這一頁是專門寫給您的。",
    image: "card-when",
  },
  {
    href: "/results",
    label: "看懂結果",
    title: "看懂檢查結果",
    blurb: "拿到報告，只要看三件事：第幾型、Alpha 角多少、跟上次比是進步還退步。",
    lede: "這一頁是給拿到髖關節超音波報告的家長。如果寶寶還沒照，可以先看「什麼時候該檢查」。",
    image: "card-results",
  },
  {
    href: "/daily-care",
    label: "日常照護",
    title: "日常可以怎麼幫寶寶",
    blurb: "包開開、抱開開、背開開。免費、不需要器材，而且是少數被證實有效的做法。",
    lede: "這是等待期間您真正能做的事——而且它的效果有實證支持，不是安慰性質的建議。",
    image: "card-daily",
  },
];

/** 導覽列（五個主題 + 常見問題） */
export const nav = [
  ...topics.map((t) => ({ href: t.href, label: t.label })),
  { href: "/faq", label: "常見問題" },
];

export function topicIndex(href: string) {
  return topics.findIndex((t) => t.href === href);
}

/** 上一頁／下一頁，用在主題頁底部 */
export function topicNeighbours(href: string) {
  const i = topicIndex(href);
  if (i === -1) return { prev: undefined, next: undefined };
  return { prev: topics[i - 1], next: topics[i + 1] };
}
