"use client";

import { useState } from "react";
import { useStore, type RewardRule, type RewardType, type TriggerType } from "@/lib/store";
import { partsRegistry } from "@/components/avatar/parts/partsRegistry";

const triggerLabels: Record<TriggerType, string> = {
  buy_item: "ซื้อ",
  spend_amount: "ใช้จ่ายครบ",
  checkin_streak: "เช็คอินต่อเนื่อง",
  tier_reached: "ขึ้นระดับสมาชิก",
  birthday: "วันเกิดลูกค้า",
};

const rewardLabels: Record<RewardType, string> = {
  avatar_item: "ไอเทมอวตาร",
  points: "แต้มสะสม",
  coupon: "คูปองส่วนลด",
};

const statusOptions: RewardRule["status"][] = ["draft", "scheduled", "active", "ended"];
const statusText: Record<RewardRule["status"], string> = {
  draft: "ฉบับร่าง",
  scheduled: "รอเริ่ม",
  active: "กำลังใช้งาน",
  ended: "สิ้นสุดแล้ว",
};

export type RuleDraft = Omit<RewardRule, "id">;

const selectClass =
  "rounded-lg border border-latte bg-white px-2 py-1 text-sm text-espresso outline-none focus:border-terracotta";
const inputClass =
  "w-16 rounded-lg border border-latte bg-white px-2 py-1 text-sm text-espresso outline-none focus:border-terracotta";

export default function RuleDrawer({
  initial,
  onSave,
  onClose,
}: {
  initial?: RewardRule;
  onSave: (draft: RuleDraft) => void;
  onClose: () => void;
}) {
  const { menuItems, avatarItems } = useStore();

  const [draft, setDraft] = useState<RuleDraft>(
    initial ?? {
      name: "",
      trigger: { type: "buy_item", menuItemId: menuItems[0]?.id, quantity: 1 },
      reward: { type: "avatar_item", avatarItemId: avatarItems[0]?.id },
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      limitPerCustomer: 1,
      status: "draft",
    },
  );

  function setTriggerType(type: TriggerType) {
    setDraft((d) => ({
      ...d,
      trigger:
        type === "buy_item"
          ? { type, menuItemId: menuItems[0]?.id, quantity: 1 }
          : type === "spend_amount"
            ? { type, amount: 100 }
            : type === "checkin_streak"
              ? { type, quantity: 5 }
              : { type },
    }));
  }

  function setRewardType(type: RewardType) {
    setDraft((d) => ({
      ...d,
      reward:
        type === "avatar_item"
          ? { type, avatarItemId: avatarItems[0]?.id }
          : type === "points"
            ? { type, points: 50 }
            : { type },
    }));
  }

  const rewardItem =
    draft.reward.type === "avatar_item"
      ? avatarItems.find((i) => i.id === draft.reward.avatarItemId)
      : undefined;
  const RewardPart = rewardItem ? partsRegistry[rewardItem.id] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-latte px-5 py-4">
          <h3 className="text-sm font-semibold text-espresso">
            {initial ? "แก้ไขโปรโมชั่น" : "สร้างโปรโมชั่นใหม่"}
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

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">ชื่อโปรโมชั่น</span>
            <input
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="เช่น ซื้อ Iced Latte ได้หมวกชมพูวิบวับ"
              className="w-full rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
            />
          </label>

          {/* sentence-style builder */}
          <div className="rounded-2xl bg-latte/50 p-4 text-sm leading-loose text-espresso">
            <span>เมื่อลูกค้า </span>
            <select
              value={draft.trigger.type}
              onChange={(e) => setTriggerType(e.target.value as TriggerType)}
              className={selectClass}
            >
              {(Object.keys(triggerLabels) as TriggerType[]).map((t) => (
                <option key={t} value={t}>
                  {triggerLabels[t]}
                </option>
              ))}
            </select>

            {draft.trigger.type === "buy_item" && (
              <>
                <span> </span>
                <select
                  value={draft.trigger.menuItemId}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      trigger: { ...d.trigger, menuItemId: e.target.value },
                    }))
                  }
                  className={selectClass}
                >
                  {menuItems.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <span> จำนวน </span>
                <input
                  type="number"
                  min={1}
                  value={draft.trigger.quantity ?? 1}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      trigger: { ...d.trigger, quantity: Number(e.target.value) },
                    }))
                  }
                  className={inputClass}
                />
                <span> แก้ว</span>
              </>
            )}

            {draft.trigger.type === "spend_amount" && (
              <>
                <span> </span>
                <input
                  type="number"
                  min={0}
                  value={draft.trigger.amount ?? 0}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      trigger: { ...d.trigger, amount: Number(e.target.value) },
                    }))
                  }
                  className={inputClass}
                />
                <span> บาท</span>
              </>
            )}

            {draft.trigger.type === "checkin_streak" && (
              <>
                <span> </span>
                <input
                  type="number"
                  min={1}
                  value={draft.trigger.quantity ?? 1}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      trigger: { ...d.trigger, quantity: Number(e.target.value) },
                    }))
                  }
                  className={inputClass}
                />
                <span> วัน</span>
              </>
            )}

            <div className="mt-2">
              <span>ระหว่าง </span>
              <input
                type="date"
                value={draft.startDate}
                onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))}
                className={selectClass}
              />
              <span> ถึง </span>
              <input
                type="date"
                value={draft.endDate}
                onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))}
                className={selectClass}
              />
            </div>

            <div className="mt-2">
              <span>จะได้รับ </span>
              <select
                value={draft.reward.type}
                onChange={(e) => setRewardType(e.target.value as RewardType)}
                className={selectClass}
              >
                {(Object.keys(rewardLabels) as RewardType[]).map((r) => (
                  <option key={r} value={r}>
                    {rewardLabels[r]}
                  </option>
                ))}
              </select>

              {draft.reward.type === "avatar_item" && (
                <>
                  <span> </span>
                  <select
                    value={draft.reward.avatarItemId}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        reward: { ...d.reward, avatarItemId: e.target.value },
                      }))
                    }
                    className={selectClass}
                  >
                    {avatarItems.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </>
              )}

              {draft.reward.type === "points" && (
                <>
                  <span> </span>
                  <input
                    type="number"
                    min={0}
                    value={draft.reward.points ?? 0}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        reward: { ...d.reward, points: Number(e.target.value) },
                      }))
                    }
                    className={inputClass}
                  />
                  <span> แต้ม</span>
                </>
              )}
            </div>

            <div className="mt-2">
              <span>จำกัด </span>
              <input
                type="number"
                min={1}
                value={draft.limitPerCustomer}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, limitPerCustomer: Number(e.target.value) }))
                }
                className={inputClass}
              />
              <span> ครั้งต่อคน</span>
            </div>
          </div>

          {/* live reward preview */}
          <div className="flex items-center gap-3 rounded-2xl border border-latte px-4 py-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-latte">
              {RewardPart && <RewardPart />}
            </div>
            <div className="text-sm text-espresso/70">
              <p className="text-xs text-espresso/40">ตัวอย่างรางวัลที่ลูกค้าจะได้รับ</p>
              <p className="font-medium text-espresso">
                {draft.reward.type === "avatar_item"
                  ? (rewardItem?.label ?? "เลือกไอเทม")
                  : draft.reward.type === "points"
                    ? `${draft.reward.points ?? 0} แต้ม`
                    : "คูปองส่วนลด"}
              </p>
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-espresso/60">สถานะ</span>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, status: s }))}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    draft.status === s
                      ? "border-terracotta bg-accent/40 text-espresso"
                      : "border-latte text-espresso/50"
                  }`}
                >
                  {statusText[s]}
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="border-t border-latte px-5 py-4">
          <button
            type="button"
            disabled={!draft.name.trim()}
            onClick={() => onSave(draft)}
            className="w-full rounded-full bg-terracotta py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            บันทึกโปรโมชั่น
          </button>
        </div>
      </div>
    </div>
  );
}
