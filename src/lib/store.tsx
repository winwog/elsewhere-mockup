"use client";

// Admin/back-office data store. Seeded from src/lib/mock-data.ts so the
// existing customer screens and the new admin screens agree on the same
// items — this file adds admin-only fields on top, it never changes the
// shape mock-data.ts exports.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  avatarItems as baseAvatarItems,
  member,
  type AvatarCategory,
  type AvatarItem,
  type TierName,
} from "@/lib/mock-data";

export type Rarity = "ธรรมดา" | "หายาก" | "พิเศษ";
export type ObtainMethod = "แจกฟรี" | "แลกด้วยแต้ม" | "ได้จากโปรโมชั่น";
export type ItemStatus = "active" | "inactive";

export type AdminAvatarItem = AvatarItem & {
  rarity: Rarity;
  obtainMethod: ObtainMethod;
  status: ItemStatus;
  artworkUrl?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  category: "เครื่องดื่ม" | "เบเกอรี่";
  price: number;
};

export type TriggerType =
  | "buy_item"
  | "spend_amount"
  | "checkin_streak"
  | "tier_reached"
  | "birthday";

export type RewardType = "avatar_item" | "points" | "coupon";

export type RewardRule = {
  id: string;
  name: string;
  trigger: {
    type: TriggerType;
    menuItemId?: string;
    quantity?: number;
    amount?: number;
  };
  reward: {
    type: RewardType;
    avatarItemId?: string;
    points?: number;
  };
  startDate: string;
  endDate: string;
  limitPerCustomer: number;
  status: "active" | "scheduled" | "ended" | "draft";
};

export type Customer = {
  points: number;
  tier: TierName;
  ownedItemIds: string[];
};

export type LogEntry = {
  id: string;
  message: string;
  time: string;
};

type StoreData = {
  avatarItems: AdminAvatarItem[];
  menuItems: MenuItem[];
  rewardRules: RewardRule[];
  customer: Customer;
  purchaseLog: LogEntry[];
  redemptionCounts: Record<string, number>;
};

function nowLabel() {
  return new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
}

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---------- seed data ----------

const seedAvatarItems: AdminAvatarItem[] = [
  ...baseAvatarItems.map((item): AdminAvatarItem => ({
    ...item,
    rarity: item.id.endsWith("none") ? "ธรรมดา" : "ธรรมดา",
    obtainMethod: "แจกฟรี",
    status: "active",
  })),
  {
    id: "accessory-cap-pink-01",
    category: "accessory",
    label: "หมวกชมพูวิบวับ",
    rarity: "พิเศษ",
    obtainMethod: "ได้จากโปรโมชั่น",
    status: "active",
  },
];

const seedMenuItems: MenuItem[] = [
  { id: "menu-iced-latte", name: "Iced Latte", category: "เครื่องดื่ม", price: 65 },
  { id: "menu-hot-americano", name: "Hot Americano", category: "เครื่องดื่ม", price: 55 },
  { id: "menu-espresso-tonic", name: "Espresso Tonic", category: "เครื่องดื่ม", price: 75 },
  { id: "menu-cappuccino", name: "Cappuccino", category: "เครื่องดื่ม", price: 65 },
  { id: "menu-matcha-latte", name: "Matcha Latte", category: "เครื่องดื่ม", price: 80 },
  { id: "menu-cold-brew", name: "Cold Brew", category: "เครื่องดื่ม", price: 70 },
  { id: "menu-butter-croissant", name: "Butter Croissant", category: "เบเกอรี่", price: 60 },
  { id: "menu-cinnamon-roll", name: "Cinnamon Roll", category: "เบเกอรี่", price: 65 },
];

const seedRewardRules: RewardRule[] = [
  {
    id: "rule-iced-latte-cap",
    name: "ซื้อ Iced Latte ได้หมวกชมพูวิบวับ",
    trigger: { type: "buy_item", menuItemId: "menu-iced-latte", quantity: 1 },
    reward: { type: "avatar_item", avatarItemId: "accessory-cap-pink-01" },
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    limitPerCustomer: 1,
    status: "active",
  },
  {
    id: "rule-checkin-streak",
    name: "เช็คอินต่อเนื่อง 5 วัน รับแต้มพิเศษ",
    trigger: { type: "checkin_streak", quantity: 5 },
    reward: { type: "points", points: 100 },
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    limitPerCustomer: 1,
    status: "scheduled",
  },
  {
    id: "rule-spend-summer",
    name: "โปรโมชั่นซัมเมอร์ ใช้จ่ายครบรับแต้มคูณสอง",
    trigger: { type: "spend_amount", amount: 300 },
    reward: { type: "points", points: 150 },
    startDate: "2026-04-01",
    endDate: "2026-05-31",
    limitPerCustomer: 3,
    status: "ended",
  },
  {
    id: "rule-birthday-draft",
    name: "ของขวัญวันเกิดพิเศษ",
    trigger: { type: "birthday" },
    reward: { type: "avatar_item", avatarItemId: "accessory-glasses-01" },
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    limitPerCustomer: 1,
    status: "draft",
  },
];

const seedData: StoreData = {
  avatarItems: seedAvatarItems,
  menuItems: seedMenuItems,
  rewardRules: seedRewardRules,
  customer: {
    points: member.points,
    tier: member.currentTier,
    ownedItemIds: [],
  },
  purchaseLog: [],
  redemptionCounts: {},
};

const STORAGE_KEY = "elsewhere-admin-store";

function loadFromStorage(): StoreData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoreData;
  } catch {
    return null;
  }
}

// ---------- context ----------

type StoreContextValue = StoreData & {
  addAvatarItem: (item: Omit<AdminAvatarItem, "id">) => void;
  updateAvatarItem: (id: string, patch: Partial<Omit<AdminAvatarItem, "id">>) => void;
  deleteAvatarItem: (id: string) => void;
  isAvatarItemUsedByActiveRule: (id: string) => boolean;

  addRewardRule: (rule: Omit<RewardRule, "id">) => void;
  updateRewardRule: (id: string, patch: Partial<Omit<RewardRule, "id">>) => void;
  deleteRewardRule: (id: string) => void;

  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, patch: Partial<Omit<MenuItem, "id">>) => void;
  deleteMenuItem: (id: string) => void;

  simulatePurchase: (menuItemId: string) => void;
  customerNotification: LogEntry | null;

  resetToDemoData: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StoreData>(seedData);
  const [customerNotification, setCustomerNotification] = useState<LogEntry | null>(null);
  const hydrated = useRef(false);

  // hydrate from localStorage once, on the client only
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) setData(stored);
    hydrated.current = true;
  }, []);

  // persist every change (skip the very first render, before hydration runs)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full or unavailable — demo still works in-memory
    }
  }, [data]);

  const resetToDemoData = useCallback(() => {
    setData(seedData);
    setCustomerNotification(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Shift+R resets the demo data from anywhere in the app
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.shiftKey && event.key.toLowerCase() === "r") {
        resetToDemoData();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetToDemoData]);

  const addAvatarItem = useCallback((item: Omit<AdminAvatarItem, "id">) => {
    setData((prev) => ({
      ...prev,
      avatarItems: [...prev.avatarItems, { ...item, id: makeId(item.category) }],
    }));
  }, []);

  const updateAvatarItem = useCallback(
    (id: string, patch: Partial<Omit<AdminAvatarItem, "id">>) => {
      setData((prev) => ({
        ...prev,
        avatarItems: prev.avatarItems.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }));
    },
    [],
  );

  const deleteAvatarItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      avatarItems: prev.avatarItems.filter((item) => item.id !== id),
    }));
  }, []);

  const isAvatarItemUsedByActiveRule = useCallback(
    (id: string) =>
      data.rewardRules.some(
        (rule) => rule.status === "active" && rule.reward.avatarItemId === id,
      ),
    [data.rewardRules],
  );

  const addRewardRule = useCallback((rule: Omit<RewardRule, "id">) => {
    setData((prev) => ({
      ...prev,
      rewardRules: [...prev.rewardRules, { ...rule, id: makeId("rule") }],
    }));
  }, []);

  const updateRewardRule = useCallback(
    (id: string, patch: Partial<Omit<RewardRule, "id">>) => {
      setData((prev) => ({
        ...prev,
        rewardRules: prev.rewardRules.map((rule) =>
          rule.id === id ? { ...rule, ...patch } : rule,
        ),
      }));
    },
    [],
  );

  const deleteRewardRule = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      rewardRules: prev.rewardRules.filter((rule) => rule.id !== id),
    }));
  }, []);

  const addMenuItem = useCallback((item: Omit<MenuItem, "id">) => {
    setData((prev) => ({
      ...prev,
      menuItems: [...prev.menuItems, { ...item, id: makeId("menu") }],
    }));
  }, []);

  const updateMenuItem = useCallback((id: string, patch: Partial<Omit<MenuItem, "id">>) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.filter((item) => item.id !== id),
    }));
  }, []);

  const simulatePurchase = useCallback(
    (menuItemId: string) => {
      setData((prev) => {
        const menuItem = prev.menuItems.find((item) => item.id === menuItemId);
        if (!menuItem) return prev;

        const today = new Date().toISOString().slice(0, 10);
        const matchedRule = prev.rewardRules.find((rule) => {
          if (rule.status !== "active") return false;
          if (rule.trigger.type !== "buy_item") return false;
          if (rule.trigger.menuItemId !== menuItemId) return false;
          if (today < rule.startDate || today > rule.endDate) return false;
          const used = prev.redemptionCounts[rule.id] ?? 0;
          return used < rule.limitPerCustomer;
        });

        const basePoints = Math.round(menuItem.price / 2);
        const log: LogEntry[] = [
          ...prev.purchaseLog,
          {
            id: makeId("log"),
            message: `ลูกค้าซื้อ ${menuItem.name} (+${basePoints} แต้ม)`,
            time: nowLabel(),
          },
        ];

        let nextCustomer: Customer = {
          ...prev.customer,
          points: prev.customer.points + basePoints,
        };
        let nextRedemptions = prev.redemptionCounts;
        let notification: LogEntry = {
          id: makeId("notif"),
          message: `ซื้อ ${menuItem.name} สำเร็จ ได้รับ ${basePoints} แต้ม`,
          time: nowLabel(),
        };

        if (matchedRule) {
          nextRedemptions = {
            ...prev.redemptionCounts,
            [matchedRule.id]: (prev.redemptionCounts[matchedRule.id] ?? 0) + 1,
          };

          if (matchedRule.reward.type === "avatar_item" && matchedRule.reward.avatarItemId) {
            const rewardItem = prev.avatarItems.find(
              (item) => item.id === matchedRule.reward.avatarItemId,
            );
            if (rewardItem && !nextCustomer.ownedItemIds.includes(rewardItem.id)) {
              nextCustomer = {
                ...nextCustomer,
                ownedItemIds: [...nextCustomer.ownedItemIds, rewardItem.id],
              };
            }
            log.push({
              id: makeId("log"),
              message: `🎁 ตรงเงื่อนไข "${matchedRule.name}" → มอบไอเทม "${rewardItem?.label ?? matchedRule.reward.avatarItemId}"`,
              time: nowLabel(),
            });
            notification = {
              id: makeId("notif"),
              message: `🎉 คุณได้รับ "${rewardItem?.label ?? "ไอเทมพิเศษ"}" จากโปรโมชั่น!`,
              time: nowLabel(),
            };
          } else if (matchedRule.reward.type === "points" && matchedRule.reward.points) {
            nextCustomer = {
              ...nextCustomer,
              points: nextCustomer.points + matchedRule.reward.points,
            };
            log.push({
              id: makeId("log"),
              message: `🎁 ตรงเงื่อนไข "${matchedRule.name}" → มอบ ${matchedRule.reward.points} แต้มพิเศษ`,
              time: nowLabel(),
            });
            notification = {
              id: makeId("notif"),
              message: `🎉 คุณได้รับแต้มพิเศษ ${matchedRule.reward.points} แต้มจากโปรโมชั่น!`,
              time: nowLabel(),
            };
          } else {
            log.push({
              id: makeId("log"),
              message: `🎁 ตรงเงื่อนไข "${matchedRule.name}" → มอบคูปอง`,
              time: nowLabel(),
            });
            notification = {
              id: makeId("notif"),
              message: `🎉 คุณได้รับคูปองจากโปรโมชั่น "${matchedRule.name}"!`,
              time: nowLabel(),
            };
          }
        }

        setCustomerNotification(notification);

        return {
          ...prev,
          customer: nextCustomer,
          purchaseLog: log,
          redemptionCounts: nextRedemptions,
        };
      });
    },
    [],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      ...data,
      addAvatarItem,
      updateAvatarItem,
      deleteAvatarItem,
      isAvatarItemUsedByActiveRule,
      addRewardRule,
      updateRewardRule,
      deleteRewardRule,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      simulatePurchase,
      customerNotification,
      resetToDemoData,
    }),
    [
      data,
      addAvatarItem,
      updateAvatarItem,
      deleteAvatarItem,
      isAvatarItemUsedByActiveRule,
      addRewardRule,
      updateRewardRule,
      deleteRewardRule,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      simulatePurchase,
      customerNotification,
      resetToDemoData,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

// ---------- shared display helpers ----------

export const avatarCategoryOptions: { id: AvatarCategory; label: string }[] = [
  { id: "hair", label: "ทรงผม" },
  { id: "top", label: "เสื้อ" },
  { id: "bottom", label: "กางเกง" },
  { id: "accessory", label: "ของประดับ" },
  { id: "background", label: "พื้นหลัง" },
];

export function describeTrigger(rule: RewardRule, menuItems: MenuItem[]): string {
  const t = rule.trigger;
  switch (t.type) {
    case "buy_item": {
      const menuItem = menuItems.find((m) => m.id === t.menuItemId);
      return `เมื่อลูกค้าซื้อ ${menuItem?.name ?? "-"} จำนวน ${t.quantity ?? 1} แก้ว`;
    }
    case "spend_amount":
      return `เมื่อลูกค้าใช้จ่ายครบ ${t.amount ?? 0} บาท`;
    case "checkin_streak":
      return `เมื่อลูกค้าเช็คอินต่อเนื่อง ${t.quantity ?? 0} วัน`;
    case "tier_reached":
      return `เมื่อลูกค้าขึ้นระดับสมาชิกใหม่`;
    case "birthday":
      return `เมื่อถึงวันเกิดของลูกค้า`;
    default:
      return "-";
  }
}

export function describeReward(
  rule: RewardRule,
  avatarItems: AdminAvatarItem[],
): string {
  const r = rule.reward;
  switch (r.type) {
    case "avatar_item": {
      const item = avatarItems.find((i) => i.id === r.avatarItemId);
      return `ไอเทมอวตาร "${item?.label ?? "-"}"`;
    }
    case "points":
      return `${r.points ?? 0} แต้ม`;
    case "coupon":
      return "คูปองส่วนลด";
    default:
      return "-";
  }
}

export const statusLabel: Record<RewardRule["status"], string> = {
  active: "กำลังใช้งาน",
  scheduled: "รอเริ่ม",
  ended: "สิ้นสุดแล้ว",
  draft: "ฉบับร่าง",
};
