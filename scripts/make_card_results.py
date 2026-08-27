# -*- coding: utf-8 -*-
"""
產生首頁卡片④「看懂檢查結果」的示意圖 card-results.jpg。

設計重點：這張圖在首頁只會顯示成大約 380 像素寬的小卡片，
所以字一定要夠大——畫布上 160px 的字，在卡片上大約只有 25px。
因此只放兩個關鍵數字（分型、α 角），其餘資訊一律省略。

配色取自網站的設計 token（app/globals.css），
米白底色取自前三張圖的底色，讓五張卡片看起來像同一套。
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ── 尺寸與配色 ────────────────────────────────────────────
W, H = 2400, 1350                    # 16:9
GROUND = "#FDFDEF"                   # 米白底，跟前三張圖同色
SHEET = "#FFFFFF"
SHEET_EDGE = "#DCD9CC"
RULE = "#E6E3D6"
INK = "#1C1B18"
INK2 = "#55534C"
INK3 = "#8E8B80"
NAVY = "#1B4A7A"
ORANGE = "#E4611F"
MINT = "#E2F0EA"

# ── 字型（macOS 內建的黑體，繁體字形正確）─────────────────
BOLD = "/System/Library/Fonts/STHeiti Medium.ttc"
LIGHT = "/System/Library/Fonts/STHeiti Light.ttc"


def f(path, size):
    return ImageFont.truetype(path, size)


img = Image.new("RGB", (W, H), GROUND)
d = ImageDraw.Draw(img)

# ── 報告單的柔和陰影：先在另一層畫黑色圓角矩形再模糊 ──────
SX0, SY0, SX1, SY1 = 260, 170, 2140, 1180
shadow = Image.new("L", (W, H), 0)
ImageDraw.Draw(shadow).rounded_rectangle(
    (SX0 + 6, SY0 + 16, SX1 + 6, SY1 + 22), radius=34, fill=70
)
shadow = shadow.filter(ImageFilter.GaussianBlur(22))
img.paste(Image.new("RGB", (W, H), "#B9B5A6"), (0, 0), shadow)
d = ImageDraw.Draw(img)

# ── 報告單本體 ───────────────────────────────────────────
d.rounded_rectangle((SX0, SY0, SX1, SY1), radius=34, fill=SHEET,
                    outline=SHEET_EDGE, width=4)

PAD_L, PAD_R = 350, 2050

# 抬頭
d.text((PAD_L, 250), "超音波報告", font=f(BOLD, 108), fill=INK)
d.text((PAD_L + 4, 392), "Hip Ultrasound Report", font=f(LIGHT, 46), fill=INK3)

# 右上角標明這是示意圖，避免被誤認成真的報告
tag = "示意範例"
tf = f(LIGHT, 42)
tw = d.textlength(tag, font=tf)
d.rounded_rectangle((PAD_R - tw - 44, 262, PAD_R, 336), radius=16,
                    outline=RULE, width=3)
d.text((PAD_R - tw - 22, 276), tag, font=tf, fill=INK3)

d.line((PAD_L, 490, PAD_R, 490), fill=RULE, width=4)

# ── 兩個關鍵欄位 ─────────────────────────────────────────
d.line((1200, 560, 1200, 960), fill=RULE, width=3)


def block(x, badge, label, en, value, colour):
    """畫一個關鍵欄位：編號徽章 + 中文標籤 + 英文小字 + 大數字"""
    cy = 596
    d.ellipse((x, cy - 36, x + 72, cy + 36), fill=colour)      # 圓形編號
    bw = d.textlength(badge, font=f(BOLD, 44))
    d.text((x + 36 - bw / 2, cy - 27), badge, font=f(BOLD, 44), fill="#FFFFFF")
    d.text((x + 100, cy - 40), label, font=f(BOLD, 72), fill=colour)
    d.text((x + 102, 660), en, font=f(LIGHT, 44), fill=INK3)
    d.text((x, 740), value, font=f(BOLD, 165), fill=INK)


block(PAD_L, "1", "分型", "(Graf type)", "Type I", ORANGE)
block(1290, "2", "α 角", "(Alpha angle)", "64°", NAVY)

d.line((PAD_L, 1000, PAD_R, 1000), fill=RULE, width=4)

# ── 底部結論 ─────────────────────────────────────────────
d.rounded_rectangle((PAD_L, 1032, PAD_L + 700, 1146), radius=30, fill=MINT)
d.text((PAD_L + 60, 1052), "判讀：正常", font=f(BOLD, 68), fill=NAVY)

note = "α 角 ≧ 60° 為正常"
nf = f(LIGHT, 58)
d.text((PAD_R - d.textlength(note, font=nf), 1062), note, font=nf, fill=INK2)

img.save(
    "/Users/nipeilun/Desktop/Lauren claude Agent/DDH line官方及網頁資料/"
    "DDH衛教網站/public/images/card-results.jpg",
    quality=92, subsampling=0, optimize=True,
)
print("已輸出 card-results.jpg", img.size)
