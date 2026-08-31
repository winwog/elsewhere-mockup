import type { AdminAvatarItem } from "@/lib/store";
import { avatarCategoryOptions } from "@/lib/store";
import { partsRegistry } from "@/components/avatar/parts/partsRegistry";
import StatusBadge from "@/components/admin/StatusBadge";

export default function ItemsTable({
  items,
  onEdit,
  onDelete,
}: {
  items: AdminAvatarItem[];
  onEdit: (item: AdminAvatarItem) => void;
  onDelete: (item: AdminAvatarItem) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-latte bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-latte text-xs text-espresso/50">
            <th className="px-4 py-3 font-medium">ไอเทม</th>
            <th className="px-4 py-3 font-medium">หมวดหมู่</th>
            <th className="px-4 py-3 font-medium">ความหายาก</th>
            <th className="px-4 py-3 font-medium">วิธีได้รับ</th>
            <th className="px-4 py-3 font-medium">สถานะ</th>
            <th className="px-4 py-3 font-medium text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const Part = partsRegistry[item.id];
            const categoryLabel =
              avatarCategoryOptions.find((c) => c.id === item.category)?.label ?? item.category;

            return (
              <tr key={item.id} className="border-b border-latte last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-latte">
                      {Part && <Part />}
                    </div>
                    <span className="font-medium text-espresso">{item.label}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-espresso/70">{categoryLabel}</td>
                <td className="px-4 py-3 text-espresso/70">{item.rarity}</td>
                <td className="px-4 py-3 text-espresso/70">{item.obtainMethod}</td>
                <td className="px-4 py-3">
                  <StatusBadge
                    label={item.status === "active" ? "ใช้งาน" : "ปิดใช้งาน"}
                    tone={item.status === "active" ? "positive" : "muted"}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded-full px-3 py-1.5 font-medium text-espresso/70 active:bg-latte"
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="rounded-full px-3 py-1.5 font-medium text-terracotta active:bg-latte"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-espresso/40">
                ไม่พบไอเทมที่ตรงกับเงื่อนไข
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
