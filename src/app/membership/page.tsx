import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomTabBar from "@/components/layout/BottomTabBar";
import ScreenHeader from "@/components/layout/ScreenHeader";
import MembershipCard from "@/components/membership/MembershipCard";
import TierList from "@/components/membership/TierList";
import BirthdayPerk from "@/components/membership/BirthdayPerk";

export default function MembershipPage() {
  return (
    <PhoneFrame>
      <ScreenHeader title="บัตรสมาชิก" />
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        <MembershipCard />
        <TierList />
        <BirthdayPerk />
      </div>
      <BottomTabBar />
    </PhoneFrame>
  );
}
