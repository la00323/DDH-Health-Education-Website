# -*- coding: utf-8 -*-
"""
自動更新「圖片需求清單.md」裡的進度表。

用法（在專案資料夾裡執行）：
    python3 scripts/update_image_checklist.py

它會做三件事：
1. 讀 lib/images.ts，取得所有圖片空位的代號、說明、比例
2. 掃 public/images/，看哪些檔案真的存在，並讀出實際尺寸
3. 掃 app/ 與 lib/site.ts，找出每個空位實際用在哪幾頁

然後把結果寫回 圖片需求清單.md 裡 <!-- AUTO --> 兩個標記中間那一段。
標記以外的文字（說明、注意事項）不會被動到，可以放心手動編輯。

這樣做的原因：之前清單是手打的，補了圖卻忘記改清單，
下次就會搞不清楚到底哪幾張還缺。讓程式去數就不會錯。
"""

import os
import re
import glob
import difflib

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD = os.path.join(ROOT, "圖片需求清單.md")
IMG_DIR = os.path.join(ROOT, "public", "images")
EXTENSIONS = ("jpg", "jpeg", "png", "webp")

# 優先補的空位（首頁曝光最高、或內容最關鍵）
PRIORITY = {"card-about", "card-screening", "card-when", "card-results",
            "card-daily", "graf-angles", "three-habits"}

SUGGESTED = {
    "16/9": "1200×675",
    "4/3": "1000×750",
    "3/4": "750×1000",
    "21/9": "1400×600",
    "1/1": "800×800",
}


def read_slots():
    """從 lib/images.ts 把每個圖片空位的欄位抓出來"""
    src = open(os.path.join(ROOT, "lib", "images.ts"), encoding="utf-8").read()
    body = src.split("export const imageSlots: ImageSlot[] = [", 1)[1]
    body = body.split("\n];", 1)[0]

    slots = []
    for block in re.findall(r"\n  \{(.*?)\n  \},", body, re.S):
        def field(name):
            m = re.search(rf'{name}:\s*"([^"]*)"', block)
            return m.group(1) if m else None

        slots.append({
            "id": field("id"),
            "file": field("file"),
            "brief": field("brief"),
            "ratio": field("ratio"),
        })
    return slots


def find_file(name):
    """這個代號有沒有對應的圖檔？有的話回傳路徑"""
    for ext in EXTENSIONS:
        p = os.path.join(IMG_DIR, f"{name}.{ext}")
        if os.path.exists(p):
            return p
    return None


def read_usage():
    """掃程式碼，找出每個代號實際被用在哪幾頁"""
    usage = {}

    # 內頁插圖：<Figure id="..." /> 或 <DoDontPair imageId="..." />
    for path in glob.glob(os.path.join(ROOT, "app", "**", "*.tsx"), recursive=True):
        txt = open(path, encoding="utf-8").read()
        rel = os.path.relpath(path, os.path.join(ROOT, "app"))
        folder = os.path.dirname(rel)
        route = "首頁" if folder == "" else f"`/{folder}`"
        for slot_id in re.findall(r'(?:<Figure\s+id|imageId)="([a-z0-9-]+)"', txt):
            usage.setdefault(slot_id, [])
            if route not in usage[slot_id]:
                usage[slot_id].append(route)

    # 首頁五張主題卡：lib/site.ts 的 image 欄位，順序就是卡片順序
    site = open(os.path.join(ROOT, "lib", "site.ts"), encoding="utf-8").read()
    circled = "①②③④⑤⑥⑦⑧⑨"
    for i, slot_id in enumerate(re.findall(r'image:\s*"([a-z0-9-]+)"', site)):
        usage.setdefault(slot_id, [])
        usage[slot_id].insert(0, f"首頁卡片{circled[i]}")

    return usage


def build_table(slots, usage):
    """組出 Markdown 表格與進度統計"""
    rows = []
    done = 0
    todo = 0

    for s in slots:
        # file 欄位代表「沿用另一個空位的圖檔」
        source_name = s["file"] or s["id"]
        path = find_file(source_name)

        where = "、".join(usage.get(s["id"], [])) or "（目前沒有頁面使用）"

        if path:
            done += 1
            with Image.open(path) as im:
                w, h = im.size
            size_kb = os.path.getsize(path) // 1024
            spec = f"{w}×{h}・{size_kb} KB"
            if s["file"]:
                status = f"✅ 與 `{s['file']}` 共用"
            else:
                status = "✅ 已補"
        else:
            todo += 1
            status = "★ 待補" if s["id"] in PRIORITY else "⬜ 待補"
            spec = f"建議 {SUGGESTED.get(s['ratio'], '')}"

        rows.append(
            f"| {status} | `{s['id']}` | {s['brief']} | {s['ratio']} | {spec} | {where} |"
        )

    # 共用的不算成另外一張要拍的圖
    shared = sum(1 for s in slots if s["file"] and find_file(s["file"]))
    unique_done = done - shared

    header = (
        f"**{len(slots)} 個圖片位置，已補上 {done} 個**"
        f"（實際只用了 {unique_done} 張圖，其中 {shared} 個位置與別的位置共用同一張），"
        f"**還缺 {todo} 個**。\n\n"
        "★ ＝ 優先補。首頁曝光最高，或是該頁最關鍵的一張。\n\n"
        "| 狀態 | 檔名代號 | 圖片內容 | 比例 | 尺寸 | 用在哪裡 |\n"
        "|---|---|---|---|---|---|\n"
    )
    return header + "\n".join(rows) + "\n"


def find_orphans(slots):
    """
    找出「放進資料夾但網站不會用到」的圖檔。

    這是最容易踩到又最難自己發現的坑：檔名只要差一個字
    （graft-angle vs graf-angles、card-result vs card-results），
    網站就當作那張圖不存在，而且完全不會報錯，畫面上還是空框。
    這裡把這種檔案抓出來，並猜最接近的代號給你參考。
    """
    known = {s["id"] for s in slots} | {s["file"] for s in slots if s["file"]}
    orphans = []

    for path in glob.glob(os.path.join(IMG_DIR, "**", "*"), recursive=True):
        if os.path.isdir(path):
            continue
        stem, ext = os.path.splitext(os.path.basename(path))
        if ext.lower().lstrip(".") not in EXTENSIONS:
            continue

        rel = os.path.relpath(path, IMG_DIR)
        in_subfolder = os.sep in rel

        if stem in known and not in_subfolder:
            continue  # 正常，會被網站用到

        # 猜最接近的代號
        guess = difflib.get_close_matches(stem, sorted(known), n=1, cutoff=0.5)
        if in_subfolder and stem in known:
            reason = "放在子資料夾裡，網站只看 public/images/ 最上層"
        elif in_subfolder:
            reason = "放在子資料夾裡，而且檔名沒有對應的位置"
        else:
            reason = "檔名沒有對應到任何位置"

        orphans.append({
            "rel": rel,
            "reason": reason,
            "guess": guess[0] if guess else None,
        })

    return orphans


def build_orphan_block(orphans):
    if not orphans:
        return "目前沒有這種檔案，資料夾裡每張圖都有對應的位置。\n"

    lines = [
        "以下檔案放在 `public/images/` 裡，但**網站不會用到**：\n",
        "| 檔案 | 為什麼沒被用到 | 是不是想放這個位置？ |",
        "|---|---|---|",
    ]
    for o in orphans:
        guess = f"`{o['guess']}`" if o["guess"] else "—"
        lines.append(f"| `{o['rel']}` | {o['reason']} | {guess} |")
    lines.append("")
    lines.append("改成右邊那一欄的檔名（副檔名不用改）就會自動上線。")
    lines.append("")
    return "\n".join(lines)


def main():
    slots = read_slots()
    table = build_table(slots, read_usage())
    orphans = find_orphans(slots)

    md = open(MD, encoding="utf-8").read()

    for marker, content in (("AUTO", table),
                            ("AUTO-ORPHAN", build_orphan_block(orphans))):
        md, n = re.subn(
            rf"<!-- {marker} -->\n.*?<!-- /{marker} -->",
            lambda m: f"<!-- {marker} -->\n{content}<!-- /{marker} -->",
            md,
            flags=re.S,
        )
        if n == 0:
            raise SystemExit(f"圖片需求清單.md 裡找不到 <!-- {marker} --> 標記")

    open(MD, "w", encoding="utf-8").write(md)
    print("圖片需求清單.md 的進度表已更新")

    # 檔名對不上是最常見的失敗，所以在終端機也大聲講一次
    if orphans:
        print("\n⚠️  以下檔案不會出現在網站上：")
        for o in orphans:
            hint = f"  → 檔名改成 {o['guess']}？" if o["guess"] else ""
            print(f"    {o['rel']}（{o['reason']}）{hint}")


if __name__ == "__main__":
    main()
