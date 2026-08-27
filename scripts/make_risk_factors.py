# -*- coding: utf-8 -*-
"""
產生 /when-to-screen 頁的 risk-factors.jpg：DDH 危險因子一覽。

為什麼這樣設計：
頁面上「RiskFactorGrid」已經用文字列出八個因子了，所以這張圖如果只是
把同樣的字再排一次，等於白佔一個版位。這裡改成「圖示版」，
並且把八個因子分成兩組，讓分組本身就帶訊息：

  上排＝小兒骨科的 5F's 口訣（女嬰、第一胎、家族史、臀位產、羊水過少）
  下排＝其他也要注意的三項（左側、冬天出生、多胞胎）

底部再放一句最重要的臨床提醒：超過 75% 的 DDH 寶寶其實一項都不符合。

所有圖示都用線條直接畫出來（圓形、線段、多邊形），
不依賴任何外部素材，之後要改顏色或加項目都只要改這支程式。

配色取自 app/globals.css。執行：python3 scripts/make_risk_factors.py
"""

import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ── 畫布：4:3 ─────────────────────────────────────────────
W, H = 2000, 1500

# ── 配色（來自 app/globals.css）───────────────────────────
GROUND = "#FDFDEF"
SHEET = "#FFFFFF"
SHEET_EDGE = "#E6E3D6"
INK = "#1C1B18"
INK2 = "#55534C"
INK3 = "#8E8B80"
NAVY = "#1B4A7A"
ORANGE = "#E4611F"
MINT_BG = "#DCEFE9"
AMBER_BG = "#FDF6E7"
AMBER_BORDER = "#E8C98F"
AMBER_TEXT = "#9A5B12"

# ── 字型 ─────────────────────────────────────────────────
BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"
LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"
MONO = "/System/Library/Fonts/Menlo.ttc"


def f(path, size):
    return ImageFont.truetype(path, size)


F_EYEBROW = f(BOLD, 28)
F_TITLE = f(BOLD, 58)
F_LEDE = f(LIGHT, 32)
F_GROUP = f(BOLD, 26)
F_FWORD = f(MONO, 22)
F_LABEL = f(BOLD, 38)
F_LINE = f(LIGHT, 26)
F_BANNER = f(BOLD, 34)
F_BANNER2 = f(LIGHT, 28)
F_NOTE = f(LIGHT, 24)


def text_ls(d, xy, s, font, fill, ls=0):
    """有字距的文字，PIL 沒內建，逐字畫。"""
    x, y = xy
    for ch in s:
        d.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + ls
    return x


def center(d, cx, y, s, font, fill):
    d.text((cx - font.getlength(s) / 2, y), s, font=font, fill=fill)


def wrap_center(d, cx, y, s, font, fill, max_w, lh):
    lines, cur = [], ""
    for ch in s:
        if font.getlength(cur + ch) > max_w and cur:
            lines.append(cur)
            cur = ch
        else:
            cur += ch
    if cur:
        lines.append(cur)
    for i, ln in enumerate(lines):
        center(d, cx, y + i * lh, ln, font, fill)
    return len(lines)


# ── 圖示：全部用線條畫，參數是圓心與半徑 ───────────────────
def ic_female(d, cx, cy, r, c, w):
    """♀：女嬰"""
    rr = r * 0.46
    top = cy - r * 0.28
    d.ellipse((cx - rr, top - rr, cx + rr, top + rr), outline=c, width=w)
    d.line((cx, top + rr, cx, cy + r * 0.72), fill=c, width=w)
    d.line((cx - r * 0.32, cy + r * 0.40, cx + r * 0.32, cy + r * 0.40), fill=c, width=w)


def ic_first(d, cx, cy, r, c, w):
    """圈起來的 1：第一胎"""
    d.ellipse((cx - r * 0.66, cy - r * 0.66, cx + r * 0.66, cy + r * 0.66),
              outline=c, width=w)
    fnt = f(BOLD, int(r * 0.95))
    s = "1"
    bb = d.textbbox((0, 0), s, font=fnt)
    d.text((cx - (bb[2] - bb[0]) / 2 - bb[0], cy - (bb[3] - bb[1]) / 2 - bb[1]),
           s, font=fnt, fill=c)


def _person(d, cx, cy, s, c, w):
    """一個簡化人形：頭 + 肩膀弧線。s 是縮放比例。"""
    hr = 13 * s
    hy = cy - 20 * s
    d.ellipse((cx - hr, hy - hr, cx + hr, hy + hr), outline=c, width=w)
    d.arc((cx - 22 * s, hy + 8 * s, cx + 22 * s, hy + 58 * s), 195, 345, fill=c, width=w)


def ic_family(d, cx, cy, r, c, w):
    """三個人形：家族史"""
    k = r / 44
    _person(d, cx - r * 0.62, cy + r * 0.06, 1.05 * k, c, w)
    _person(d, cx + r * 0.62, cy + r * 0.06, 1.05 * k, c, w)
    _person(d, cx, cy + r * 0.34, 0.78 * k, c, w)


def ic_breech(d, cx, cy, r, c, w):
    """子宮輪廓＋頭朝上、屁股朝下的寶寶：臀位產

    正常是頭朝下，臀位是反過來，所以頭畫在上面、
    下面用一個開口朝上的弧線代表屁股，再加兩條收起來的腿。
    """
    cx -= r * 0.12
    d.ellipse((cx - r * 0.74, cy - r * 0.92, cx + r * 0.74, cy + r * 0.88),
              outline=c, width=w)
    hr = r * 0.22
    hy = cy - r * 0.44
    d.ellipse((cx - hr, hy - hr, cx + hr, hy + hr), fill=c)              # 頭在上
    d.line((cx, hy + hr, cx, cy + r * 0.06), fill=c, width=w)            # 身體
    d.ellipse((cx - r * 0.36, cy + r * 0.06, cx + r * 0.36, cy + r * 0.62),
              fill=c)                                                     # 屁股在下
    # 向上的小箭頭，提示「頭朝上」
    ax = cx + r * 0.98
    d.line((ax, cy + r * 0.34, ax, cy - r * 0.44), fill=c, width=w)
    d.line((ax, cy - r * 0.44, ax - r * 0.15, cy - r * 0.22), fill=c, width=w)
    d.line((ax, cy - r * 0.44, ax + r * 0.15, cy - r * 0.22), fill=c, width=w)


def ic_fluid(d, cx, cy, r, c, w):
    """水滴＋向下箭頭：羊水過少"""
    cx -= r * 0.16
    rr = r * 0.50
    by = cy + r * 0.22
    # 弧線畫的是水滴下半部，兩條斜線要從弧的端點（角度 20°／160°）接上去，
    # PIL 的 y 軸往下，所以端點的 y 是 by + rr*sin(角度)。
    d.arc((cx - rr, by - rr, cx + rr, by + rr), 20, 160, fill=c, width=w)
    d.line((cx - rr * 0.94, by + rr * 0.34, cx, cy - r * 0.82), fill=c, width=w)
    d.line((cx + rr * 0.94, by + rr * 0.34, cx, cy - r * 0.82), fill=c, width=w)
    ax = cx + r * 0.98
    d.line((ax, cy - r * 0.52, ax, cy + r * 0.44), fill=c, width=w)
    d.line((ax, cy + r * 0.44, ax - r * 0.16, cy + r * 0.22), fill=c, width=w)
    d.line((ax, cy + r * 0.44, ax + r * 0.16, cy + r * 0.22), fill=c, width=w)


def ic_left(d, cx, cy, r, c, w):
    """兩側髖關節，左側實心：左側好發"""
    rr = r * 0.34
    gap = r * 0.52
    d.ellipse((cx - gap - rr, cy - rr, cx - gap + rr, cy + rr), fill=c)
    d.ellipse((cx + gap - rr, cy - rr, cx + gap + rr, cy + rr), outline=c, width=w)
    d.line((cx, cy - r * 0.66, cx, cy + r * 0.66), fill=c, width=max(2, w - 2))


def ic_winter(d, cx, cy, r, c, w):
    """雪花：冬天出生"""
    for i in range(6):
        a = math.radians(i * 60)
        ex, ey = cx + math.cos(a) * r * 0.80, cy + math.sin(a) * r * 0.80
        d.line((cx, cy, ex, ey), fill=c, width=w)
        for sgn in (-1, 1):
            b = a + sgn * math.radians(38)
            mx, my = cx + math.cos(a) * r * 0.50, cy + math.sin(a) * r * 0.50
            d.line((mx, my, mx + math.cos(b) * r * 0.26, my + math.sin(b) * r * 0.26),
                   fill=c, width=w)


def ic_twins(d, cx, cy, r, c, w):
    """兩個重疊的寶寶頭：多胞胎"""
    rr = r * 0.44
    d.ellipse((cx - r * 0.74, cy - rr - r * 0.10, cx - r * 0.74 + rr * 2,
               cy + rr - r * 0.10), outline=c, width=w)
    d.ellipse((cx - r * 0.06, cy - rr + r * 0.16, cx - r * 0.06 + rr * 2,
               cy + rr + r * 0.16), outline=c, width=w)


# ── 內容 ─────────────────────────────────────────────────
FIVE_F = [
    ("Female", "女嬰", "女男比約 6：1", ic_female),
    ("First-born", "第一胎", "子宮空間較緊", ic_first),
    ("Family", "家族史", "手足 6%、父母 12%", ic_family),
    ("Frank breech", "臀位產", "證據力最強的一項", ic_breech),
    ("Fluid", "羊水過少", "活動空間受限", ic_fluid),
]

OTHERS = [
    ("左側", "DDH 特別好發於左側髖關節", ic_left),
    ("冬天出生", "包裹通常較厚、較緊", ic_winter),
    ("多胞胎", "子宮內空間更受限", ic_twins),
]

# ── 開始畫 ────────────────────────────────────────────────
img = Image.new("RGB", (W, H), GROUND)
d = ImageDraw.Draw(img)

M = 70                                   # 左右邊界

text_ls(d, (M + 2, 56), "哪些寶寶會被安排檢查", F_EYEBROW, ORANGE, ls=5)
d.text((M, 96), "DDH 的危險因子", font=F_TITLE, fill=INK)
d.text((M, 178), "符合其中一項只代表「需要被檢查」，不代表寶寶有問題。",
       font=F_LEDE, fill=INK2)


def card(x, y, w, h, bg=SHEET, edge=SHEET_EDGE):
    """白色卡片＋很淡的陰影，跟站上其他圖同一種質感。"""
    sh = Image.new("L", (W, H), 0)
    ImageDraw.Draw(sh).rounded_rectangle((x + 3, y + 8, x + w + 3, y + h + 12),
                                         radius=20, fill=44)
    sh = sh.filter(ImageFilter.GaussianBlur(14))
    img.paste(Image.new("RGB", (W, H), "#C3C0B0"), (0, 0), sh)
    ImageDraw.Draw(img).rounded_rectangle((x, y, x + w, y + h), radius=20,
                                          fill=bg, outline=edge, width=2)


# ── 上排：5F's ────────────────────────────────────────────
GY = 262
text_ls(d, (M + 2, GY), "5F's ── 小兒骨科用來記憶的五個典型特徵", F_GROUP, NAVY, ls=2)

CY0 = GY + 52
CW = (W - M * 2 - 24 * 4) // 5
CH = 500
for i, (fw, label, line, icon) in enumerate(FIVE_F):
    x = M + i * (CW + 24)
    card(x, CY0, CW, CH)
    d = ImageDraw.Draw(img)
    cx = x + CW // 2

    # 圖示：薄荷色圓底 + 藏青線條
    icy = CY0 + 140
    d.ellipse((cx - 94, icy - 94, cx + 94, icy + 94), fill=MINT_BG)
    icon(d, cx, icy, 66, NAVY, 7)

    center(d, cx, CY0 + 266, fw, F_FWORD, INK3)
    center(d, cx, CY0 + 314, label, F_LABEL, INK)
    wrap_center(d, cx, CY0 + 392, line, F_LINE, INK2, CW - 48, 38)

# ── 下排：其他三項 ────────────────────────────────────────
GY2 = CY0 + CH + 54
text_ls(d, (M + 2, GY2), "其他也要注意的", F_GROUP, AMBER_TEXT, ls=2)

CY1 = GY2 + 52
CW2 = (W - M * 2 - 24 * 2) // 3
CH2 = 252
for i, (label, line, icon) in enumerate(OTHERS):
    x = M + i * (CW2 + 24)
    card(x, CY1, CW2, CH2, bg=AMBER_BG, edge=AMBER_BORDER)
    d = ImageDraw.Draw(img)

    icy = CY1 + CH2 // 2
    icx = x + 116
    d.ellipse((icx - 70, icy - 70, icx + 70, icy + 70), fill="#FFFFFF")
    icon(d, icx, icy, 50, AMBER_TEXT, 6)

    tx = x + 210
    d.text((tx, icy - 68), label, font=F_LABEL, fill=INK)
    # 說明文字自動斷行
    cur, ly = "", icy - 2
    for ch in line:
        if F_LINE.getlength(cur + ch) > CW2 - 236 and cur:
            d.text((tx, ly), cur, font=F_LINE, fill=INK2)
            ly += 38
            cur = ch
        else:
            cur += ch
    if cur:
        d.text((tx, ly), cur, font=F_LINE, fill=INK2)

# ── 底部提醒：這張圖真正要家長記住的一句話 ─────────────────
BY = CY1 + CH2 + 50
BH = 152
d.rounded_rectangle((M, BY, W - M, BY + BH), radius=18,
                    fill="#FDF3F1", outline="#E9BDB7", width=2)
d.rounded_rectangle((M, BY + 16, M + 8, BY + BH - 16), radius=4, fill="#C4342B")
d.text((M + 44, BY + 30), "超過 75% 的 DDH 寶寶，一項危險因子都沒有",
       font=F_BANNER, fill="#A82A22")
d.text((M + 44, BY + 86), "有 5F 要更警覺，沒有 5F 也不能鬆懈——這就是影像篩檢的價值。",
       font=F_BANNER2, fill=INK2)

d.text((M, BY + BH + 30),
       "資料來源：站內「什麼時候該做檢查」章節。5F's 是幫助記憶的口訣，不是篩檢標準。",
       font=F_NOTE, fill=INK3)

out = "public/images/risk-factors.jpg"
img.save(out, quality=92, subsampling=0)
print("已輸出", out, img.size)
