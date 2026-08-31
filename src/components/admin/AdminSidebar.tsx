"use client";

import { useStore } from "@/lib/store";

const panels = [
  { id: "items", label: "ไอเทมอวตาร", icon: "👕" },
  { id: "rules", label: "โปรโมชั่น", icon: "🎁" },
  { id: "simulate", label: "จำลองการซื้อ", icon: "🛒" },
] as const;

export type AdminPanelId = (typeof panels)[number]["id"];

export default function AdminSidebar({
  activePanel,
  onSelectPanel,
}: {
  activePanel: AdminPanelId;
  onSelectPanel: (panel: AdminPanelId) => void;
}) {
  const { resetToDemoData } = useStore();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-latte bg-cream">
      <div className="px-5 py-5">
        <p className="text-sm font-semibold text-espresso">Elsewhere</p>
        <p className="text-xs text-espresso/50">Back office</p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {panels.map((panel) => {
          const active = panel.id === activePanel;
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => onSelectPanel(panel.id)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm ${
                active ? "bg-accent text-accent-ink font-medium" : "text-espresso/60"
              }`}
            >
              <span aria-hidden>{panel.icon}</span>
              {panel.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-latte px-3 py-4">
        <a
          href="/demo"
          className="block rounded-xl px-3 py-2.5 text-sm text-espresso/60 active:bg-latte"
        >
          ↗ เปิดหน้าจำลองสาธิต
        </a>
        <button
          type="button"
          onClick={resetToDemoData}
          className="w-full rounded-xl px-3 py-2.5 text-left text-xs text-espresso/40 active:bg-latte"
        >
          รีเซ็ตข้อมูลตัวอย่าง (Shift+R)
        </button>
      </div>
    </aside>
  );
}
