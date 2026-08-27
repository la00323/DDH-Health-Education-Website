This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 為什麼 tsconfig.json 排除「檔名 2.ts」

這個專案放在 iCloud 同步的桌面資料夾裡，iCloud/Finder 偶爾會產生
`routes.d 2.ts`、`cache-life.d 3.ts` 這種帶空格加數字的重複檔。
它們內容跟原檔一樣，會讓 TypeScript 誤判成「重複定義」而報一堆假錯誤。
`tsconfig.json` 的 `exclude` 已把這類檔名排除，不影響真正的程式碼。

## 圖片

補圖流程與進度見 `圖片需求清單.md`。補完圖後執行

```
python3 scripts/update_image_checklist.py
```

進度表就會自動更新。
