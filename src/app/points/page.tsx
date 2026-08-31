import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomTabBar from "@/components/layout/BottomTabBar";
import ScreenHeader from "@/components/layout/ScreenHeader";
import PointsBalance from "@/components/points/PointsBalance";
import TierBadge from "@/components/points/TierBadge";
import QrMemberCard from "@/components/points/QrMemberCard";
import ActivityList from "@/components/points/ActivityList";
import CouponCard from "@/components/points/CouponCard";
import { member, coupons } from "@/lib/mock-data";

export default function PointsPage() {
  return (
    <PhoneFrame>
      <ScreenHeader title="แต้มของฉัน" />
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        <div className="space-y-3">
          <PointsBalance points={member.points} />
          <TierBadge tier={member.currentTier} />
        </div>

        <QrMemberCard />

        <ActivityList />

        <section>
          <h2 className="mb-2 text-sm font-semibold text-espresso">คูปองของฉัน</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </section>
      </div>
      <BottomTabBar />
    </PhoneFrame>
  );
}
