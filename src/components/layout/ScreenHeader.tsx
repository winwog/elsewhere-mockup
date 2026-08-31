import Link from "next/link";

export default function ScreenHeader({ title }: { title: string }) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-latte bg-cream px-4 py-3">
      <span className="text-sm font-semibold text-espresso">{title}</span>
      <Link
        href="/"
        aria-label="ปิดและกลับไปหน้าแชท"
        className="flex h-7 w-7 items-center justify-center rounded-full text-espresso/60 active:bg-latte"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="4" x2="16" y2="16" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4" y2="16" strokeLinecap="round" />
        </svg>
      </Link>
    </header>
  );
}
