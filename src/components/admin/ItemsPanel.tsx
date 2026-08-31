"use client";

import { useMemo, useState } from "react";
import { useStore, avatarCategoryOptions, type AdminAvatarItem } from "@/lib/store";
import type { AvatarCategory } from "@/lib/mock-data";
import ItemsTable from "@/components/admin/ItemsTable";
import ItemDrawer, { type ItemDraft } from "@/components/admin/ItemDrawer";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function ItemsPanel() {
  const { avatarItems, addAvatarItem, updateAvatarItem, deleteAvatarItem, isAvatarItemUsedByActiveRule } =
    useStore();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<AvatarCategory | "all">("all");
  const [drawerItem, setDrawerItem] = useState<AdminAvatarItem | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminAvatarItem | null>(null);

  const filteredItems = useMemo(() => {
    return avatarItems.filter((item) => {
      const matchesSearch = item.label.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [avatarItems, search, categoryFilter]);

  function handleSave(draft: ItemDraft) {
    if (drawerItem && drawerItem !== "new") {
      updateAvatarItem(drawerItem.id, draft);
    } else {
      addAvatarItem(draft);
    }
    setDrawerItem(null);
  }

  function handleConfirmDelete() {
    if (pendingDelete) deleteAvatarItem(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-espresso">ไอเทมอวตาร</h2>
          <p className="text-sm text-espresso/50">จัดการไอเทมที่ลูกค้าใช้แต่งตัวอวตาร</p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerItem("new")}
          className="rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-white active:bg-terracotta-dark"
        >
          + เพิ่มไอเทม
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาชื่อไอเทม..."
          className="w-56 rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as AvatarCategory | "all")}
          className="rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
        >
          <option value="all">ทุกหมวดหมู่</option>
          {avatarCategoryOptions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <ItemsTable items={filteredItems} onEdit={setDrawerItem} onDelete={setPendingDelete} />

      {drawerItem && (
        <ItemDrawer
          initial={drawerItem === "new" ? undefined : drawerItem}
          onSave={handleSave}
          onClose={() => setDrawerItem(null)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={`ลบ "${pendingDelete.label}"?`}
          description="ไอเทมนี้จะหายไปจากตู้เสื้อผ้าของลูกค้าทันที"
          warning={
            isAvatarItemUsedByActiveRule(pendingDelete.id)
              ? "ไอเทมนี้ถูกใช้เป็นรางวัลในโปรโมชั่นที่กำลังใช้งานอยู่ ลบแล้วโปรโมชั่นจะมอบรางวัลนี้ไม่ได้"
              : undefined
          }
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
