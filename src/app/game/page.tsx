import PhoneFrame from "@/components/layout/PhoneFrame";
import BottomTabBar from "@/components/layout/BottomTabBar";
import ScreenHeader from "@/components/layout/ScreenHeader";
import AvatarCreator from "@/components/avatar/AvatarCreator";

export default function GamePage() {
  return (
    <PhoneFrame>
      <ScreenHeader title="Avatar" />
      <AvatarCreator />
      <BottomTabBar />
    </PhoneFrame>
  );
}
