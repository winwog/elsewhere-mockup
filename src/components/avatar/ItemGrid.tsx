import type { AvatarItem } from "@/lib/mock-data";
import ItemThumb from "@/components/avatar/ItemThumb";

export default function ItemGrid({
  items,
  selectedId,
  onSelect,
}: {
  items: AvatarItem[];
  selectedId: string;
  onSelect: (item: AvatarItem) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 overflow-y-auto px-3 py-3">
      {items.map((item) => (
        <ItemThumb
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={() => onSelect(item)}
        />
      ))}
    </div>
  );
}
