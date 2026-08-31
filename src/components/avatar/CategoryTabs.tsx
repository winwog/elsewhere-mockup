import type { AvatarCategory } from "@/lib/mock-data";
import { avatarCategories } from "@/lib/mock-data";

export default function CategoryTabs({
  activeCategory,
  onSelect,
}: {
  activeCategory: AvatarCategory;
  onSelect: (category: AvatarCategory) => void;
}) {
  return (
    <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-latte px-3 pt-3">
      {avatarCategories.map((category) => {
        const active = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`shrink-0 rounded-t-lg border-b-2 px-3 py-2 text-xs font-medium ${
              active
                ? "border-terracotta bg-white text-terracotta"
                : "border-transparent text-espresso/50"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
