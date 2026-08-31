import type { AvatarItem } from "@/lib/mock-data";
import { partsRegistry } from "@/components/avatar/parts/partsRegistry";

export default function ItemThumb({
  item,
  selected,
  onSelect,
}: {
  item: AvatarItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const Part = partsRegistry[item.id];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center gap-1 rounded-xl border p-2 ${
        selected ? "border-terracotta bg-white" : "border-latte bg-white/60"
      }`}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-latte">
        {Part && <Part />}
      </div>
      <span className="text-[11px] text-espresso/70">{item.label}</span>
    </button>
  );
}
