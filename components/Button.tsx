import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "link" | "disabled";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-orange text-white hover:brightness-110 transition-[filter] duration-150",
  secondary:
    "bg-navy text-white hover:brightness-125 transition-[filter] duration-150",
  outline:
    "bg-transparent text-navy border-[1.5px] border-navy hover:bg-mint transition-colors duration-150",
  link: "bg-transparent text-navy border-b-[1.5px] border-navy/30 rounded-none px-1 py-3 hover:border-orange transition-colors duration-150",
  disabled: "bg-[#efebe0] text-[#a9a69b] cursor-not-allowed",
};

export function Button({
  children,
  href,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center font-medium text-body leading-none rounded-full px-7 py-[15px] no-underline";
  const cls = `${base} ${variantClass[disabled ? "disabled" : variant]}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
