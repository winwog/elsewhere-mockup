import type { TierName } from "@/lib/mock-data";

const tierColor: Record<TierName, string> = {
  Bronze: "bg-tier-bronze",
  Silver: "bg-tier-silver",
  Gold: "bg-tier-gold",
  Platinum: "bg-tier-platinum",
};

export default function TierRow({
  name,
  pointsRequired,
  perks,
  isCurrent,
}: {
  name: TierName;
  pointsRequired: number;
  perks: string[];
  isCurrent: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        isCurrent ? "border-terracotta bg-white shadow-sm" : "border-latte bg-white/60"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${tierColor[name]}`} />
          <span className="text-sm font-semibold text-espresso">{name}</span>
          {isCurrent && (
            <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[10px] font-medium text-terracotta">
              ระดับปัจจุบัน
            </span>
          )}
        </div>
        <span className="text-xs text-espresso/40">{pointsRequired.toLocaleString("th-TH")}+ แต้ม</span>
      </div>
      <ul className="mt-2 space-y-1">
        {perks.map((perk) => (
          <li key={perk} className="text-xs text-espresso/60">
            • {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
