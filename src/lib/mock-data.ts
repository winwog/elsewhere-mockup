// All fake data for the Elsewhere mockup lives here.
// Edit copy/numbers freely — nothing else in the app needs to change.

export type TierName = "Bronze" | "Silver" | "Gold" | "Platinum";

export const member = {
  name: "คุณพิม สายชล",
  memberNumber: "EW-0248-1193",
  qrValue: "ELSEWHERE-MEMBER-EW02481193",
  points: 1280,
  currentTier: "Silver" as TierName,
};

export const tiers: {
  name: TierName;
  pointsRequired: number;
  perks: string[];
}[] = [
  {
    name: "Bronze",
    pointsRequired: 0,
    perks: ["สะสมแต้มทุกการซื้อ", "รับสิทธิ์วันเกิดพิเศษ"],
  },
  {
    name: "Silver",
    pointsRequired: 1000,
    perks: ["ส่วนลด 5% ทุกเมนู", "เครื่องดื่มฟรี 1 แก้ว/เดือน"],
  },
  {
    name: "Gold",
    pointsRequired: 3000,
    perks: ["ส่วนลด 10% ทุกเมนู", "เข้าร่วมงาน Tasting Session"],
  },
  {
    name: "Platinum",
    pointsRequired: 6000,
    perks: ["ส่วนลด 15% ทุกเมนู", "ที่จอดรถพิเศษ", "ของขวัญประจำปี"],
  },
];

export const birthdayPerk = {
  title: "สิทธิพิเศษวันเกิด",
  description: "รับเครื่องดื่มฟรี 1 แก้ว และส่วนลด 20% ตลอดเดือนเกิดของคุณ",
};

export type ActivityRow = {
  id: string;
  label: string;
  date: string;
  points: number; // positive = earned, negative = redeemed
};

export const recentActivity: ActivityRow[] = [
  { id: "a1", label: "ซื้อเครื่องดื่ม - Iced Latte", date: "28 ส.ค. 2569", points: 45 },
  { id: "a2", label: "แลกคูปองส่วนลด 10%", date: "25 ส.ค. 2569", points: -200 },
  { id: "a3", label: "ซื้อเบเกอรี่ - Butter Croissant", date: "22 ส.ค. 2569", points: 30 },
  { id: "a4", label: "โบนัสวันเกิด", date: "18 ส.ค. 2569", points: 150 },
  { id: "a5", label: "ซื้อเครื่องดื่ม - Hot Americano", date: "15 ส.ค. 2569", points: 35 },
];

export type Coupon = {
  id: string;
  title: string;
  description: string;
  expiresAt: string;
};

export const coupons: Coupon[] = [
  {
    id: "c1",
    title: "ส่วนลด 20 บาท",
    description: "เมื่อซื้อเครื่องดื่มเมนูใดก็ได้ 1 แก้ว",
    expiresAt: "หมดอายุ 30 ก.ย. 2569",
  },
  {
    id: "c2",
    title: "เบเกอรี่ฟรี 1 ชิ้น",
    description: "เมื่อซื้อเครื่องดื่มขนาดใหญ่",
    expiresAt: "หมดอายุ 15 ก.ย. 2569",
  },
];

export const oaProfile = {
  name: "Elsewhere Cafe",
  subtitle: "ร้านกาแฟ",
};

export type ChatMessage = {
  id: string;
  text: string;
  time: string;
};

export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    text: "ยินดีต้อนรับสู่ Elsewhere Cafe ☕️ เพิ่มเราเป็นเพื่อนแล้ว อย่าลืมเช็คแต้มสะสมของคุณนะคะ",
    time: "10:02",
  },
  {
    id: "m2",
    text: "สัปดาห์นี้มีเมนูใหม่ Espresso Tonic ลองชิมได้ที่ร้านแล้ววันนี้!",
    time: "10:03",
  },
  {
    id: "m3",
    text: "แตะเมนูด้านล่างเพื่อดูแต้มสะสมและบัตรสมาชิกของคุณได้เลยค่ะ",
    time: "10:03",
  },
];

// ---------- Avatar creator ----------

export type AvatarCategory = "background" | "body" | "bottom" | "top" | "hair" | "accessory";

export type AvatarItem = {
  id: string;
  category: AvatarCategory;
  label: string;
};

export const avatarCategories: { id: AvatarCategory; label: string }[] = [
  { id: "hair", label: "ทรงผม" },
  { id: "top", label: "เสื้อ" },
  { id: "bottom", label: "กางเกง" },
  { id: "accessory", label: "ของประดับ" },
  { id: "background", label: "พื้นหลัง" },
];

export const avatarItems: AvatarItem[] = [
  // hair
  { id: "hair-none", category: "hair", label: "ไม่มี" },
  { id: "hair-short-01", category: "hair", label: "ผมสั้น" },
  { id: "hair-long-01", category: "hair", label: "ผมยาว" },
  { id: "hair-bun-01", category: "hair", label: "มวยผม" },
  // top
  { id: "top-tee-01", category: "top", label: "เสื้อยืด" },
  { id: "top-shirt-01", category: "top", label: "เสื้อเชิ้ต" },
  { id: "top-apron-01", category: "top", label: "เอี๊ยม" },
  // bottom
  { id: "bottom-pants-01", category: "bottom", label: "กางเกงขายาว" },
  { id: "bottom-shorts-01", category: "bottom", label: "กางเกงขาสั้น" },
  { id: "bottom-skirt-01", category: "bottom", label: "กระโปรง" },
  // accessory
  { id: "accessory-none", category: "accessory", label: "ไม่มี" },
  { id: "accessory-glasses-01", category: "accessory", label: "แว่นตา" },
  { id: "accessory-cap-01", category: "accessory", label: "หมวก" },
  // background
  { id: "bg-plain-cream", category: "background", label: "ครีมล้วน" },
  { id: "bg-plain-terracotta", category: "background", label: "ส้มอิฐ" },
  { id: "bg-stripe-01", category: "background", label: "ลายทาง" },
];

export const defaultAvatarState: Record<AvatarCategory, string> = {
  background: "bg-plain-cream",
  body: "body-base",
  bottom: "bottom-pants-01",
  top: "top-tee-01",
  hair: "hair-short-01",
  accessory: "accessory-none",
};
