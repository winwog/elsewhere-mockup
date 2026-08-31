import type { TierName } from "@/lib/mock-data";

const tierColor: Record<TierName, string> = {
  Bronze: "bg-tier-bronze",
  Silver: "bg-tier-silver",
  Gold: "bg-tier-gold",
  Platinum: "bg-tier-platinum",
};

export default function TierBadge({ tier }: { tier: TierName }) {
  return (
    <div className="flex justify-center">
      <span
        className={`${tierColor[tier]} inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white`}
      >
        สมาชิกระดับ {tier}
      </span>
    </div>
  );
}
