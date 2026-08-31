import QrCode from "@/components/common/QrCode";
import { member } from "@/lib/mock-data";

export default function QrMemberCard() {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-espresso px-4 py-4 text-cream">
      <QrCode value={member.qrValue} size={88} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{member.name}</p>
        <p className="text-xs text-cream/60">{member.memberNumber}</p>
        <p className="mt-1 text-[11px] text-cream/50">แสดงบาร์โค้ดนี้ที่แคชเชียร์</p>
      </div>
    </div>
  );
}
