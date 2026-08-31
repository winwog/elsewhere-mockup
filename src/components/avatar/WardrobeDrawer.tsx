"use client";

import type { AvatarCategory, AvatarItem } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import CategoryTabs from "@/components/avatar/CategoryTabs";
import ItemGrid from "@/components/avatar/ItemGrid";

export default function WardrobeDrawer({
  activeCategory,
  onSelectCategory,
  avatarState,
  onSelectItem,
}: {
  activeCategory: AvatarCategory;
  onSelectCategory: (category: AvatarCategory) => void;
  avatarState: Record<AvatarCategory, string>;
  onSelectItem: (item: AvatarItem) => void;
}) {
  const { avatarItems } = useStore();
  const itemsForCategory = avatarItems.filter(
    (item) => item.category === activeCategory && item.status === "active",
  );

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-latte/40">
      <CategoryTabs activeCategory={activeCategory} onSelect={onSelectCategory} />
      <ItemGrid
        items={itemsForCategory}
        selectedId={avatarState[activeCategory]}
        onSelect={onSelectItem}
      />
    </div>
  );
}
