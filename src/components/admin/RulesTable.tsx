import type { AdminAvatarItem, MenuItem, RewardRule } from "@/lib/store";
import { describeTrigger, describeReward, statusLabel } from "@/lib/store";
import { partsRegistry } from "@/components/avatar/parts/partsRegistry";
import StatusBadge from "@/components/admin/StatusBadge";

const statusTone: Record<RewardRule["status"], "positive" | "neutral" | "muted" | "warning"> = {
  active: "positive",
  scheduled: "neutral",
  ended: "muted",
  draft: "warning",
};

export default function RulesTable({
  rules,
  menuItems,
  avatarItems,
  onEdit,
  onDelete,
}: {
  rules: RewardRule[];
  menuItems: MenuItem[];
  avatarItems: AdminAvatarItem[];
  onEdit: (rule: RewardRule) => void;
  onDelete: (rule: RewardRule) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-latte bg-white">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead>
          <tr className="border-b border-latte text-xs text-espresso/50">
            <th className="px-4 py-3 font-medium">ชื่อโปรโมชั่น</th>
            <th className="px-4 py-3 font-medium">เงื่อนไข</th>
            <th className="px-4 py-3 font-medium">รางวัล</th>
            <th className="px-4 py-3 font-medium">ช่วงเวลา</th>
            <th className="px-4 py-3 font-medium">สถานะ</th>
            <th className="px-4 py-3 font-medium text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => {
            const rewardItem =
              rule.reward.type === "avatar_item"
                ? avatarItems.find((i) => i.id === rule.reward.avatarItemId)
                : undefined;
            const RewardPart = rewardItem ? partsRegistry[rewardItem.id] : undefined;

            return (
              <tr key={rule.id} className="border-b border-latte align-top last:border-0">
                <td className="px-4 py-3 font-medium text-espresso">{rule.name}</td>
                <td className="px-4 py-3 text-espresso/70">{describeTrigger(rule, menuItems)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-espresso/70">
                    {RewardPart && (
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-latte">
                        <RewardPart />
                      </div>
                    )}
                    <span>{describeReward(rule, avatarItems)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-espresso/60">
                  {rule.startDate} – {rule.endDate}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge label={statusLabel[rule.status]} tone={statusTone[rule.status]} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => onEdit(rule)}
                      className="rounded-full px-3 py-1.5 font-medium text-espresso/70 active:bg-latte"
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(rule)}
                      className="rounded-full px-3 py-1.5 font-medium text-terracotta active:bg-latte"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {rules.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-espresso/40">
                ยังไม่มีโปรโมชั่น
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
