import TierRow from "@/components/membership/TierRow";
import { tiers, member } from "@/lib/mock-data";

export default function TierList() {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-espresso">ระดับสมาชิก</h2>
      {tiers.map((tier) => (
        <TierRow
          key={tier.name}
          name={tier.name}
          pointsRequired={tier.pointsRequired}
          perks={tier.perks}
          isCurrent={tier.name === member.currentTier}
        />
      ))}
    </section>
  );
}
