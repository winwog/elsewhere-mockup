import type { AvatarCategory } from "@/lib/mock-data";
import { partsRegistry, bodyPart as BodyPart } from "@/components/avatar/parts/partsRegistry";

// Layers rendered back-to-front, "body" sitting fixed between background and bottom.
const LAYER_ORDER_ABOVE_BODY: AvatarCategory[] = ["bottom", "top", "hair", "accessory"];

export default function CharacterPreview({
  avatarState,
}: {
  avatarState: Record<AvatarCategory, string>;
}) {
  const Background = partsRegistry[avatarState.background];

  return (
    <div className="relative mx-auto aspect-[5/6] w-48 overflow-hidden rounded-2xl shadow-sm">
      {Background && <Background />}
      <BodyPart />
      {LAYER_ORDER_ABOVE_BODY.map((category) => {
        const Part = partsRegistry[avatarState[category]];
        return Part ? <Part key={category} /> : null;
      })}
    </div>
  );
}
