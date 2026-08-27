# -*- coding: utf-8 -*-
"""
用 Python 直接把「表格型／圖示型」插圖畫成 JPG 的共用工具。

什麼時候用它：
    衛教網站的插圖分兩種。人物、器官、情境那種要畫的插畫，交給繪師或
    AI 生圖；但「分型對照表」「危險因子一覽」「時間軸」這種**由文字與
    方塊組成**的圖，用程式畫比用生圖穩得多——中文字不會糊、不會缺筆畫、
    不會生出不存在的字，而且要改一個字只要改一行程式重跑。

為什麼不用瀏覽器截圖：
    這台環境沒有 Chrome 也沒有 Playwright，HTML→圖片這條路走不通。
    PIL（Pillow）是唯一穩定可用的方式，macOS 內建的黑體繁體字形也正確。

配色從哪來：
    load_tokens() 會直接去讀專案的 app/globals.css，把 :root 裡的 CSS
    變數抓出來。這樣圖的顏色永遠跟網站一致，改了 globals.css 重跑就同步，
    不會出現「網站是藏青、圖是深藍」這種對不上的情況。

用法：
    from figure_kit import load_tokens, font, Canvas

    T = Canvas.tokens()                      # 讀 globals.css
    c = Canvas(2400, 1350, bg=T["bg"])       # 16:9，兩倍解析度
    c.card(60, 200, 2280, 1000)              # 白色卡片＋柔和陰影
    c.text((100, 240), "標題", font(BOLD, 66), T["ink"])
    c.save("public/images/xxx.jpg")

直接執行這支檔案會產生一張示範圖，可以先跑看看確認字型正常：
    python3 figure_kit.py
"""

import os
import re

from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ── 字型：macOS 內建的黑體，繁體字形正確、不必另外安裝 ──────────
BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"   # 標題、強調
LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"   # 內文
MONO = "/System/Library/Fonts/Menlo.ttc"            # 數字、英文代號

_font_cache = {}


def font(path, size):
    """取字型。同樣的字型與大小只會載入一次。"""
    key = (path, int(size))
    if key not in _font_cache:
        _font_cache[key] = ImageFont.truetype(path, int(size))
    return _font_cache[key]


# ── 從 globals.css 讀色票 ──────────────────────────────────────
def load_tokens(css_path=None):
    """
    讀 app/globals.css 的 :root 區塊，回傳 {名稱: 色碼}。

    `--color-navy: #1b4a7a;` 會變成 tokens["navy"] = "#1b4a7a"，
    前綴 --color- 會拿掉，用起來比較短。
    """
    if css_path is None:
        css_path = os.path.join("app", "globals.css")
    if not os.path.exists(css_path):
        return {}

    css = open(css_path, encoding="utf-8").read()
    m = re.search(r":root\s*\{(.*?)\n\}", css, re.S)
    if not m:
        return {}

    tokens = {}
    for name, value in re.findall(r"--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;",
                                  m.group(1)):
        tokens[name.replace("color-", "", 1)] = value
    return tokens


class Canvas:
    """一張畫布，包好最常用的幾個動作。"""

    # 畫布尺寸一律用「顯示尺寸的兩倍」，Retina 螢幕才不會糊。
    # 內頁插圖顯示寬度是 1180px，所以 16:9 用 2400×1350、4:3 用 2000×1500。
    PRESETS = {
        "16/9": (2400, 1350),
        "4/3": (2000, 1500),
        "3/4": (1500, 2000),
        "21/9": (2800, 1200),
        "1/1": (1600, 1600),
    }

    def __init__(self, w, h, bg="#FDFDEF"):
        self.w, self.h = w, h
        self.img = Image.new("RGB", (w, h), bg)
        self.d = ImageDraw.Draw(self.img)

    @classmethod
    def for_ratio(cls, ratio, bg="#FDFDEF"):
        """照版位比例開一張兩倍解析度的畫布。"""
        w, h = cls.PRESETS[ratio]
        return cls(w, h, bg)

    @staticmethod
    def tokens(css_path=None):
        return load_tokens(css_path)

    # ── 文字 ──────────────────────────────────────────────
    def text(self, xy, s, fnt, fill):
        self.d.text(xy, s, font=fnt, fill=fill)

    def text_ls(self, xy, s, fnt, fill, ls=0):
        """
        有字距（letter-spacing）的文字。

        PIL 沒有這個功能，只能一個字一個字畫。中文小標加一點字距
        會明顯好讀，網站上的 eyebrow 小標也是這樣設定的。
        """
        x, y = xy
        for ch in s:
            self.d.text((x, y), ch, font=fnt, fill=fill)
            x += fnt.getlength(ch) + ls
        return x

    def center(self, cx, y, s, fnt, fill):
        self.d.text((cx - fnt.getlength(s) / 2, y), s, font=fnt, fill=fill)

    @staticmethod
    def wrap(s, fnt, max_w):
        """
        依「實際像素寬度」斷行，不是依字數。

        中文不能用字數估，因為一行裡常混著半形數字與英文
        （「手足 6%、父母 12%」）。`\\n` 會被當成強制換行。
        """
        lines, cur = [], ""
        for ch in s:
            if ch == "\n":
                lines.append(cur)
                cur = ""
                continue
            if fnt.getlength(cur + ch) > max_w and cur:
                lines.append(cur)
                cur = ch
            else:
                cur += ch
        if cur:
            lines.append(cur)
        return lines

    def para(self, xy, s, fnt, fill, max_w, lh, align="left"):
        """畫一段會自動斷行的文字，回傳實際用掉的高度。"""
        x, y = xy
        lines = self.wrap(s, fnt, max_w)
        for i, ln in enumerate(lines):
            if align == "center":
                self.center(x, y + i * lh, ln, fnt, fill)
            else:
                self.d.text((x, y + i * lh), ln, font=fnt, fill=fill)
        return len(lines) * lh

    # ── 方塊 ──────────────────────────────────────────────
    def card(self, x, y, w, h, fill="#FFFFFF", edge="#E6E3D6",
             radius=20, shadow=True):
        """
        白色卡片＋很淡的落下陰影。

        PIL 沒有陰影功能，作法是：另外開一張灰階圖畫一個位移過的圓角矩形，
        高斯模糊之後當成遮罩，把一層灰色貼上去，再把卡片本體疊在上面。
        """
        if shadow:
            mask = Image.new("L", (self.w, self.h), 0)
            ImageDraw.Draw(mask).rounded_rectangle(
                (x + 3, y + 8, x + w + 3, y + h + 12), radius=radius, fill=48
            )
            mask = mask.filter(ImageFilter.GaussianBlur(15))
            self.img.paste(Image.new("RGB", (self.w, self.h), "#C3C0B0"), (0, 0), mask)
            self.d = ImageDraw.Draw(self.img)
        self.d.rounded_rectangle((x, y, x + w, y + h), radius=radius,
                                 fill=fill, outline=edge, width=2)

    def bar(self, x, y, w, h, color, radius=4):
        """左側的分類色條，用來標嚴重度或分組。"""
        self.d.rounded_rectangle((x, y, x + w, y + h), radius=radius, fill=color)

    # ── 存檔 ──────────────────────────────────────────────
    def save(self, path, quality=92):
        """
        subsampling=0 很重要：JPEG 預設會壓縮色彩解析度，
        細的中文筆畫與彩色文字邊緣會糊掉、出現色斑。
        """
        self.img.save(path, quality=quality, subsampling=0)
        print("已輸出", path, self.img.size)


# ── 直接執行時畫一張示範圖，用來確認字型與色票都正常 ──────────────
if __name__ == "__main__":
    T = load_tokens()
    ink = T.get("ink", "#1C1B18")
    ink2 = T.get("ink-2", "#55534C")
    navy = T.get("navy", "#1B4A7A")
    orange = T.get("orange", "#E4611F")

    c = Canvas.for_ratio("16/9")
    c.text_ls((72, 60), "示範", font(BOLD, 30), orange, ls=6)
    c.text((70, 104), "figure_kit 測試圖", font(BOLD, 64), ink)
    c.card(60, 210, c.w - 120, 380)
    c.bar(84, 250, 8, 300, navy)
    c.para((130, 250), "如果這行中文顯示正常、沒有缺字也沒有變成方框，"
                       "就代表字型路徑正確，可以開始畫真正的圖了。"
                       "數字與英文也一起測：Graf IIa 43–49 度、β < 77。",
           font(LIGHT, 38), ink2, max_w=c.w - 320, lh=58)
    c.para((130, 440), f"從 globals.css 讀到 {len(T)} 個色票。"
                       f"藏青 {navy}、行動橘 {orange}。",
           font(LIGHT, 32), ink2, max_w=c.w - 320, lh=50)
    c.save("figure_kit_demo.jpg")
