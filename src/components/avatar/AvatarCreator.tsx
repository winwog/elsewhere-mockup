"use client";

import { useEffect, useState } from "react";
import type { AvatarCategory, AvatarItem } from "@/lib/mock-data";
import { defaultAvatarState } from "@/lib/mock-data";
import CharacterPreview from "@/components/avatar/CharacterPreview";
import WardrobeDrawer from "@/components/avatar/WardrobeDrawer";
import Toast from "@/components/avatar/Toast";

export default function AvatarCreator() {
  const [avatarState, setAvatarState] =
    useState<Record<AvatarCategory, string>>(defaultAvatarState);
  const [activeCategory, setActiveCategory] = useState<AvatarCategory>("hair");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  function handleSelectItem(item: AvatarItem) {
    setAvatarState((prev) => ({ ...prev, [item.category]: item.id }));
  }

  function handleSave() {
    setToastMessage("บันทึกอวตารเรียบร้อย!");
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 flex-col items-center justify-center gap-3 bg-cream px-4 py-6">
        <CharacterPreview avatarState={avatarState} />
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-terracotta px-6 py-2 text-sm font-medium text-white active:bg-terracotta-dark"
        >
          บันทึกอวตาร
        </button>
      </div>

      <WardrobeDrawer
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        avatarState={avatarState}
        onSelectItem={handleSelectItem}
      />

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
