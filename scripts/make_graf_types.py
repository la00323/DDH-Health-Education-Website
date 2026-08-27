# -*- coding: utf-8 -*-
"""
產生 /results 頁的 graf-types.jpg：Graf 分型與處置對照表。

設計重點：
1. 這是一張「表」，不是插畫，所以字級必須撐到家長在手機上放大就能讀。
   畫布 2400×1350（顯示尺寸 1200×675 的兩倍），內文 40px。
2. 配色全部取自網站設計 token（app/globals.css），
   並且沿用網站既有的語意：
     薄荷綠 = 正常          （沒事）
     琥珀   = 追蹤          （一個月後再看）
     橘     = 需要治療      （網站唯一的「要做的事」顏色）
     警訊紅 = 已脫位        （最嚴重）
3. 用語沿用網站的比喻：碗 = 髖臼、球 = 股骨頭、軟骨頂 = 關節唇。

執行：python3 scripts/make_graf_types.py
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ── 畫布 ──────────────────────────────────────────────────
W, H = 2400, 1350                     # 16:9

# ── 配色（來自 app/globals.css）───────────────────────────
GROUND = "#FDFDEF"                    # 米白底，跟其他四張卡片同色
SHEET = "#FFFFFF"
SHEET_EDGE = "#E6E3D6"
RULE = "#EDEBE0"                      # 表格分隔線（比邊框更淡）
INK = "#1C1B18"
INK2 = "#55534C"
INK3 = "#8E8B80"
NAVY = "#1B4A7A"
ORANGE = "#E4611F"

# 四種嚴重度：色條、文字色、標籤底色
SEV = {
    "normal": ("#4F8B52", "#3C6E3F", "#DCEFE9"),   # 薄荷綠
    "watch":  ("#C99326", "#9A5B12", "#FDF6E7"),   # 琥珀
    "treat":  ("#E4611F", "#C24E14", "#FBEADD"),   # 行動橘
    "luxate": ("#C4342B", "#A82A22", "#FDF3F1"),   # 警訊紅
}

# ── 字型（macOS 內建黑體，繁體字形正確）───────────────────
BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"
LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"


def f(path, size):
    return ImageFont.truetype(path, size)


F_EYEBROW = f(BOLD, 32)
F_TITLE = f(BOLD, 66)
F_CHIP = f(BOLD, 28)
F_TH = f(BOLD, 34)                    # 表頭
F_TYPE = f(BOLD, 44)                  # 分型名稱
F_BODY = f(LIGHT, 40)                 # 內文
F_BODY_M = f(BOLD, 38)                # 需要強調的內文
F_NUM = f(BOLD, 40)                   # 角度數字
F_NOTE = f(LIGHT, 30)                 # 底部註解


def text_ls(d, xy, s, font, fill, ls=0):
    """畫有字距（letter-spacing）的文字，PIL 沒有內建，只能逐字畫。"""
    x, y = xy
    for ch in s:
        d.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + ls
    return x


def wrap(s, font, max_w):
    """依實際像素寬度斷行；中文逐字判斷即可。"""
    lines, cur = [], ""
    for ch in s:
        if ch == "\n":
            lines.append(cur)
            cur = ""
            continue
        if font.getlength(cur + ch) > max_w and cur:
            lines.append(cur)
            cur = ch
        else:
            cur += ch
    if cur:
        lines.append(cur)
    return lines


# ── 表格內容 ──────────────────────────────────────────────
# (嚴重度, 分型, 髖關節狀況, α角, β角, 月齡, 處置建議)
ROWS = [
    ("normal", "第 I 型", "碗夠深，球包得剛剛好", "≥ 60", "Ia ≤55\nIb >55", "不分月齡",
     "關節成熟，不需治療\n高風險寶寶滿 1 歲再照一次 X 光"),
    ("watch", "第 IIa+ 型", "碗還沒長好，但符合月齡", "50–59", "—", "未滿 3 個月",
     "發育符合年齡\n高風險寶寶回診追蹤"),
    ("treat", "第 IIa− 型", "碗還沒長好，且落後月齡", "50–59", "—", "未滿 3 個月",
     "發育落後，開始穿吊帶"),
    ("treat", "第 IIb 型", "碗長得不夠，可能穩或不穩", "50–59", "—", "3 個月以上",
     "超過 3 個月仍不良，穿吊帶"),
    ("treat", "第 IIc 型", "碗很淺，但球還在碗裡", "43–49", "β < 77", "不分月齡",
     "穩定：立刻穿吊帶\n不穩定：改用 Pavlik 吊帶"),
    ("luxate", "第 D 型", "球開始往外滑出碗外", "43–49", "β > 77", "不分月齡", None),
    ("luxate", "第 III 型", "球已脫出，軟骨頂被往上推", "< 43", "—", "不分月齡", None),
    ("luxate", "第 IV 型", "球已脫出，軟骨頂被往下壓", "< 43", "—", "不分月齡", None),
]

# D / III / IV 三型共用同一段處置，畫成一個跨三列的合併儲存格
MERGED_TEXT = "先用 Pavlik 吊帶把球推回碗裡\n必要時再以石膏維持復位姿勢"
MERGED_FROM, MERGED_TO = 5, 7         # ROWS 的索引範圍（含）

LEGEND = [
    ("normal", "正常"),
    ("watch", "追蹤"),
    ("treat", "需治療"),
    ("luxate", "已脫位"),
]

# ── 開始畫 ────────────────────────────────────────────────
img = Image.new("RGB", (W, H), GROUND)
d = ImageDraw.Draw(img)

# 標題區（畫在米白底上，不進白色表格）
text_ls(d, (72, 58), "超音波結果對照", F_EYEBROW, ORANGE, ls=6)
d.text((70, 100), "Graf 分型與處置一覽", font=F_TITLE, fill=INK)

# 標題右側的色彩圖例
chip_h, chip_gap, chip_pad = 52, 16, 22
chip_w = [chip_pad * 2 + 26 + F_CHIP.getlength(t) for _, t in LEGEND]
lx = W - 72 - sum(chip_w) - chip_gap * (len(LEGEND) - 1)
ly = 116
for (key, label), cw in zip(LEGEND, chip_w):
    bar, txt, bg = SEV[key]
    d.rounded_rectangle((lx, ly, lx + cw, ly + chip_h), radius=chip_h // 2, fill=bg)
    d.ellipse((lx + chip_pad, ly + chip_h // 2 - 8, lx + chip_pad + 16, ly + chip_h // 2 + 8),
              fill=bar)
    d.text((lx + chip_pad + 26, ly + 10), label, font=F_CHIP, fill=txt)
    lx += cw + chip_gap

# ── 白色表格底板（帶柔和陰影，跟 card-results 同一種質感）──
SX0, SY0, SX1, SY1 = 60, 206, 2340, 1232
shadow = Image.new("L", (W, H), 0)
ImageDraw.Draw(shadow).rounded_rectangle(
    (SX0 + 4, SY0 + 12, SX1 + 4, SY1 + 18), radius=28, fill=58
)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
img.paste(Image.new("RGB", (W, H), "#BFBCAC"), (0, 0), shadow)
d = ImageDraw.Draw(img)
d.rounded_rectangle((SX0, SY0, SX1, SY1), radius=28, fill=SHEET,
                    outline=SHEET_EDGE, width=3)

# ── 欄位定義：(表頭, 左邊界, 寬度, 對齊)────────────────────
PAD = 40
C0 = SX0 + PAD                        # 100
COLS = [
    ("分型",      C0,          300, "left"),
    ("髖關節狀況", C0 + 316,    640, "left"),
    ("α 角",      C0 + 976,    180, "left"),
    ("β 角",      C0 + 1166,   230, "left"),
    ("月齡",      C0 + 1406,   230, "left"),
    ("處置建議",   C0 + 1646,   660, "left"),
]

# 表頭
TH_Y = SY0 + PAD
for name, x, w, _ in COLS:
    text_ls(d, (x, TH_Y), name, F_TH, INK3, ls=3)
HEAD_RULE_Y = TH_Y + 62
d.line((C0, HEAD_RULE_Y, SX1 - PAD, HEAD_RULE_Y), fill="#DCD9CC", width=3)

# ── 逐列排版：先算每列高度，再畫 ──────────────────────────
CELL_PAD = 22
LH = 52
COL_MAX_W = [w - 20 for _, _, w, _ in COLS]

layout = []
for sev, tname, cond, a, b, age, plan in ROWS:
    cells = [
        wrap(cond, F_BODY, COL_MAX_W[1]),
        wrap(a, F_NUM, COL_MAX_W[2]),
        wrap(b, F_NUM, COL_MAX_W[3]),
        wrap(age, F_BODY, COL_MAX_W[4]),
        wrap(plan, F_BODY, COL_MAX_W[5]) if plan else [],
    ]
    n = max([1] + [len(c) for c in cells])
    layout.append((sev, tname, cells, n * LH + CELL_PAD * 2))

total = sum(h for *_, h in layout)
y = HEAD_RULE_Y + 8
# 若還有剩餘空間，平均分給每一列，讓表格填滿底板
spare = (SY1 - PAD) - (y + total)
extra = max(0, spare // len(layout))

row_tops = []
for i, (sev, tname, cells, h) in enumerate(layout):
    h += extra
    row_tops.append((y, h))
    bar, txt_c, bg = SEV[sev]

    # 列與列之間的細分隔線（合併儲存格範圍內不畫到處置欄）
    if i > 0:
        x_end = COLS[5][1] - 24 if MERGED_FROM < i <= MERGED_TO else SX1 - PAD
        d.line((C0, y, x_end, y), fill=RULE, width=2)

    # 最左側的嚴重度色條
    d.rounded_rectangle((C0 - 22, y + 16, C0 - 14, y + h - 16), radius=4, fill=bar)

    cy = y + CELL_PAD
    # 分型名稱（用嚴重度色，一眼認出自己的孩子在哪一列）
    d.text((COLS[0][1], cy + 2), tname, font=F_TYPE, fill=txt_c)

    for ci, lines in enumerate(cells, start=1):
        if ci == 5 and MERGED_FROM <= i <= MERGED_TO:
            continue
        font = F_NUM if ci in (2, 3) else F_BODY
        color = INK2 if ci in (1, 4) else (NAVY if ci in (2, 3) else INK)
        if ci == 5:
            color = INK
        for li, ln in enumerate(lines):
            d.text((COLS[ci][1], cy + li * LH), ln, font=font, fill=color)
    y += h

# ── D / III / IV 的合併儲存格 ─────────────────────────────
m_top = row_tops[MERGED_FROM][0]
m_bot = row_tops[MERGED_TO][0] + row_tops[MERGED_TO][1]
mx = COLS[5][1]
bar, txt_c, bg = SEV["luxate"]
d.rounded_rectangle((mx - 24, m_top + 14, SX1 - PAD, m_bot - 14), radius=14, fill=bg)
m_lines = wrap(MERGED_TEXT, F_BODY, COL_MAX_W[5])
mh = len(m_lines) * LH
my = m_top + (m_bot - m_top - mh) // 2
for li, ln in enumerate(m_lines):
    d.text((mx, my + li * LH), ln, font=F_BODY_M, fill=txt_c)
# 用一個小括號提示這三型共用同一段處置
d.line((mx - 34, m_top + 26, mx - 34, m_bot - 26), fill=bar, width=3)

# ── 底部註解 ──────────────────────────────────────────────
note = ("「吊帶」泛指讓大腿維持彎曲、外開的固定裝置，包含 Pavlik 吊帶與外展支架，"
        "實際用哪一種由醫師決定。β 角欄位「—」表示該分型主要看 α 角。")
d.text((72, SY1 + 32), note, font=F_NOTE, fill=INK2)

out = "public/images/graf-types.jpg"
img.save(out, quality=92, subsampling=0)
print("已輸出", out, img.size)
