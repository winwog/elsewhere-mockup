"use client";

import { useState } from "react";
import type { AdminAvatarItem, ObtainMethod, Rarity } from "@/lib/store";
import { avatarCategoryOptions } from "@/lib/store";
import type { AvatarCategory } from "@/lib/mock-data";

const rarities: Rarity[] = ["ธรรมดา", "หายาก", "พิเศษ"];
const obtainMethods: ObtainMethod[] = ["แจกฟรี", "แลกด้วยแต้ม", "ได้จากโปรโมชั่น"];

export type ItemDraft = {
  label: string;
  category: AvatarCategory;
  rarity: Rarity;
  obtainMethod: ObtainMethod;
  status: "active" | "inactive";
  artworkUrl?: string;
};

export default function ItemDrawer({
  initial,
  onSave,
  onClose,
}: {
  initial?: AdminAvatarItem;
  onSave: (draft: ItemDraft) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<ItemDraft>({
    label: initial?.label ?? "",
    category: initial?.category ?? "hair",
    rarity: initial?.rarity ?? "ธรรมดา",
    obtainMethod: initial?.obtainMethod ?? "แจกฟรี",
    status: initial?.status ?? "active",
    artworkUrl: initial?.artworkUrl,
  });
  const [artworkFileName, setArtworkFileName] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-latte px-5 py-4">
          <h3 className="text-sm font-semibold text-espresso">
            {initial ? "แก้ไขไอเทม" : "เพิ่มไอเทมใหม่"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="ปิด"
            className="flex h-7 w-7 items-center justify-center rounded-full text-espresso/50 active:bg-latte"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">ชื่อไอเทม</span>
            <input
              value={draft.label}
              onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
              placeholder="เช่น หมวกชมพูวิบวับ"
              className="w-full rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">หมวดหมู่</span>
            <select
              value={draft.category}
              onChange={(e) =>
                setDraft((d) => ({ ...d, category: e.target.value as AvatarCategory }))
              }
              className="w-full rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
            >
              {avatarCategoryOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">ความหายาก</span>
            <div className="flex gap-2">
              {rarities.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, rarity: r }))}
                  className={`flex-1 rounded-xl border px-2 py-2 text-xs font-medium ${
                    draft.rarity === r
                      ? "border-terracotta bg-accent/40 text-espresso"
                      : "border-latte text-espresso/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">ไฟล์อาร์ตเวิร์ก</span>
            <div className="flex items-center gap-3 rounded-xl border border-dashed border-latte px-3 py-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setArtworkFileName(e.target.files?.[0]?.name ?? null)}
                className="text-xs text-espresso/60 file:mr-3 file:rounded-full file:border-0 file:bg-latte file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-espresso"
              />
            </div>
            <p className="mt-1 text-[11px] text-espresso/40">
              {artworkFileName
                ? `เลือกไฟล์: ${artworkFileName} (ตัวอย่างนี้ยังไม่อัปโหลดจริง)`
                : "ยังไม่ได้เลือกไฟล์ — ใช้ภาพ SVG ตัวอย่างไปก่อน"}
            </p>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">วิธีได้รับ</span>
            <select
              value={draft.obtainMethod}
              onChange={(e) =>
                setDraft((d) => ({ ...d, obtainMethod: e.target.value as ObtainMethod }))
              }
              className="w-full rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
            >
              {obtainMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center justify-between rounded-xl border border-latte px-3 py-2.5">
            <span className="text-xs font-medium text-espresso/60">เปิดใช้งานไอเทมนี้</span>
            <button
              type="button"
              role="switch"
              aria-checked={draft.status === "active"}
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  status: d.status === "active" ? "inactive" : "active",
                }))
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                draft.status === "active" ? "bg-terracotta" : "bg-latte"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  draft.status === "active" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
        </div>

        <div className="border-t border-latte px-5 py-4">
          <button
            type="button"
            disabled={!draft.label.trim()}
            onClick={() => onSave(draft)}
            className="w-full rounded-full bg-terracotta py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            บันทึกไอเทม
          </button>
        </div>
      </div>
    </div>
  );
}
