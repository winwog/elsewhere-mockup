"use client";

import { useState } from "react";
import { useStore, type RewardRule } from "@/lib/store";
import RulesTable from "@/components/admin/RulesTable";
import RuleDrawer, { type RuleDraft } from "@/components/admin/RuleDrawer";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function RulesPanel() {
  const { rewardRules, menuItems, avatarItems, addRewardRule, updateRewardRule, deleteRewardRule } =
    useStore();

  const [drawerRule, setDrawerRule] = useState<RewardRule | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<RewardRule | null>(null);

  function handleSave(draft: RuleDraft) {
    if (drawerRule && drawerRule !== "new") {
      updateRewardRule(drawerRule.id, draft);
    } else {
      addRewardRule(draft);
    }
    setDrawerRule(null);
  }

  function handleConfirmDelete() {
    if (pendingDelete) deleteRewardRule(pendingDelete.id);
    setPendingDelete(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-espresso">โปรโมชั่น</h2>
          <p className="text-sm text-espresso/50">กำหนดเงื่อนไขและรางวัลให้ลูกค้า</p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerRule("new")}
          className="rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-white active:bg-terracotta-dark"
        >
          + สร้างโปรโมชั่น
        </button>
      </div>

      <RulesTable
        rules={rewardRules}
        menuItems={menuItems}
        avatarItems={avatarItems}
        onEdit={setDrawerRule}
        onDelete={setPendingDelete}
      />

      {drawerRule && (
        <RuleDrawer
          initial={drawerRule === "new" ? undefined : drawerRule}
          onSave={handleSave}
          onClose={() => setDrawerRule(null)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={`ลบ "${pendingDelete.name}"?`}
          description="โปรโมชั่นนี้จะหยุดทำงานทันทีและไม่สามารถกู้คืนได้"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
