import QrCode from "@/components/common/QrCode";
import { member } from "@/lib/mock-data";

export default function MembershipCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-espresso to-espresso/90 px-5 py-5 text-cream shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-cream/50">Elsewhere Membership</p>
          <p className="mt-1 text-lg font-semibold">{member.name}</p>
          <p className="text-xs text-cream/60">{member.memberNumber}</p>
        </div>
        <QrCode value={member.qrValue} size={72} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-3">
        <span className="text-xs text-cream/60">ระดับสมาชิกปัจจุบัน</span>
        <span className="text-sm font-semibold">{member.currentTier}</span>
      </div>
    </div>
  );
}
