"use client";

import { useState } from "react";

const stages = [
  {
    name: "初診診斷",
    age: "0–1M",
    color: "#1B4A7A",
    body: "超音波確認髖臼角度，醫師會示範徒手檢查。這階段先了解診斷結果的意義，還不需要做任何處置。",
    items: ["超音波檢查", "徒手檢查說明", "解讀髖臼角度", "什麼時候要複檢"],
  },
  {
    name: "帕式吊帶期",
    age: "0–6M",
    color: "#E4611F",
    body: "24 小時穿戴，3–6 個月。每天檢查腳趾顏色、皮膚壓痕與綁帶刻度；洗澡需醫師許可才可取下。",
    items: ["24 小時穿戴", "每日皮膚檢查", "抱姿與睡姿", "換尿布"],
  },
  {
    name: "石膏固定期",
    age: "6–12M",
    color: "#E4611F",
    body: "全身麻醉下復位後打人字石膏，平均六週更換一次。重點在換尿布、翻身與保持石膏乾燥。",
    items: ["換尿布技巧", "翻身與清潔", "異味判斷", "搭車與外出"],
  },
  {
    name: "術後追蹤",
    age: "1Y+",
    color: "#A8C4E5",
    body: "拆除固定後改用開腿支架 3–6 個月，並定期回診至骨骼發育完成。復健以遊戲與日常活動為主。",
    items: ["開腿支架", "X 光追蹤", "日常復健"],
  },
];

export function StageTimeline({ defaultStage = 0 }: { defaultStage?: number }) {
  const [active, setActive] = useState(defaultStage);

  return (
    <div className="border border-ink/[.12] rounded-lg overflow-hidden bg-surface">
      <div className="bg-amber-bg px-5 sm:px-6 pt-[22px] pb-[26px]">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-caption text-ink-3">寶寶年紀 · 治療路徑</span>
          <span className="text-label font-mono text-ink-3 tracking-[.1em]">
            0M → 1Y+
          </span>
        </div>
        <div className="flex gap-2.5 items-stretch">
          {stages.map((s, i) => {
            const on = active === i;
            return (
              <div
                key={s.name}
                role="button"
                tabIndex={0}
                onClick={() => setActive(i)}
                onKeyDown={(e) => e.key === "Enter" && setActive(i)}
                style={{ flex: on ? "3.2 1 0%" : "1 1 0%" }}
                className={`min-w-0 cursor-pointer rounded-lg px-4 sm:px-[18px] pt-4 pb-[18px] transition-[background] duration-150 ${
                  on ? "bg-white" : "bg-white/45"
                }`}
              >
                <div
                  className="h-1 rounded-full"
                  style={{ background: s.color }}
                />
                <div className="mt-3 text-label font-mono tracking-[.1em] text-ink-3">
                  {s.age}
                </div>
                <h3
                  className={`mt-2 font-bold leading-[1.4] ${
                    on ? "text-[22px]" : "text-base"
                  }`}
                >
                  {s.name}
                </h3>
                {on && (
                  <div className="animate-ds-fade">
                    <p className="mt-3 text-body leading-[1.9] text-ink-2 font-light max-w-[34em]">
                      {s.body}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3.5">
                      {s.items.map((it) => (
                        <span
                          key={it}
                          className="text-caption px-3.5 py-2 rounded-full bg-white text-ink-2 border border-ink/10"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
