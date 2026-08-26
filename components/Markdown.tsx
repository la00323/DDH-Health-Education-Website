import type { ReactNode } from "react";

/**
 * 知識庫內容用的極簡 markdown 渲染器。
 * 只涵蓋知識庫實際會用到的語法：## 標題、**粗體**、- 清單、1. 編號清單、
 * > 引言、| 表格 |、一般段落。不是完整的 CommonMark 實作。
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts
    .filter((p) => p !== "")
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
      }
      return <span key={`${keyPrefix}-${i}`}>{part}</span>;
    });
}

function isTableBlock(lines: string[]) {
  return lines.every((l) => l.trim().startsWith("|"));
}
function isQuoteBlock(lines: string[]) {
  return lines.every((l) => l.trim().startsWith(">"));
}
function isHeadingBlock(lines: string[]) {
  return lines.length === 1 && /^#{2,4}\s+/.test(lines[0]);
}
function isUListBlock(lines: string[]) {
  return lines.every((l) => /^[-*]\s+/.test(l.trim()));
}
function isOListBlock(lines: string[]) {
  return lines.every((l) => /^\d+[.\)]\s+/.test(l.trim()));
}

function renderTable(lines: string[], key: string) {
  const rows = lines
    .map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()))
    .filter((cells) => !cells.every((c) => /^-+$/.test(c)));
  const [head, ...body] = rows;
  return (
    <div key={key} className="overflow-x-auto my-3">
      <table className="w-full border-collapse text-caption">
        <thead>
          <tr>
            {head.map((c, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 bg-navy text-white font-medium text-label"
              >
                {renderInline(c, `${key}-th-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? "bg-[#f8f5ec]" : undefined}>
              {row.map((c, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 border-b border-ink/[.08] text-ink-2"
                >
                  {renderInline(c, `${key}-td-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Markdown({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.trim() !== "");
        if (lines.length === 0) return null;
        const key = `b-${bi}`;

        if (isTableBlock(lines)) return renderTable(lines, key);

        if (isHeadingBlock(lines)) {
          const m = lines[0].match(/^(#{2,4})\s+(.*)$/)!;
          const level = m[1].length;
          const content = renderInline(m[2], key);
          const cls =
            level === 2
              ? "font-bold text-lede mt-1"
              : "font-bold text-body mt-1";
          return (
            <div key={key} className={cls}>
              {content}
            </div>
          );
        }

        if (isQuoteBlock(lines)) {
          return (
            <blockquote
              key={key}
              className="border-l-[3px] border-ink/20 pl-4 text-ink-3 italic"
            >
              {lines.map((l, li) => (
                <div key={li}>
                  {renderInline(l.trim().replace(/^>\s?/, ""), `${key}-${li}`)}
                </div>
              ))}
            </blockquote>
          );
        }

        if (isUListBlock(lines)) {
          return (
            <ul key={key} className="list-disc pl-5 flex flex-col gap-1.5">
              {lines.map((l, li) => (
                <li key={li}>
                  {renderInline(l.trim().replace(/^[-*]\s+/, ""), `${key}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (isOListBlock(lines)) {
          return (
            <ol key={key} className="list-decimal pl-5 flex flex-col gap-1.5">
              {lines.map((l, li) => (
                <li key={li}>
                  {renderInline(
                    l.trim().replace(/^\d+[.\)]\s+/, ""),
                    `${key}-${li}`
                  )}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={key} className="leading-[1.9]">
            {lines.map((l, li) => (
              <span key={li}>
                {renderInline(l, `${key}-${li}`)}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
