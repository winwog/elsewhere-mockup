"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/points", label: "แต้มของฉัน", icon: "★" },
  { href: "/membership", label: "บัตรสมาชิก", icon: "▤" },
  { href: "/game", label: "อวตาร", icon: "☺" },
] as const;

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="flex shrink-0 border-t border-latte bg-cream">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs ${
              active ? "text-terracotta font-medium" : "text-espresso/50"
            }`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
