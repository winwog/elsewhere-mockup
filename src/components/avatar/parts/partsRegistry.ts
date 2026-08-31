import type { ComponentType } from "react";
import BackgroundPlainCream from "./BackgroundPlainCream";
import BackgroundPlainTerracotta from "./BackgroundPlainTerracotta";
import BackgroundStripe01 from "./BackgroundStripe01";
import BodyBase from "./BodyBase";
import BottomPants01 from "./BottomPants01";
import BottomShorts01 from "./BottomShorts01";
import BottomSkirt01 from "./BottomSkirt01";
import TopTee01 from "./TopTee01";
import TopShirt01 from "./TopShirt01";
import TopApron01 from "./TopApron01";
import HairNone from "./HairNone";
import HairShort01 from "./HairShort01";
import HairLong01 from "./HairLong01";
import HairBun01 from "./HairBun01";
import AccessoryNone from "./AccessoryNone";
import AccessoryGlasses01 from "./AccessoryGlasses01";
import AccessoryCap01 from "./AccessoryCap01";
import AccessoryCapPink01 from "./AccessoryCapPink01";

// Maps every avatar item id (see src/lib/mock-data.ts) to the SVG layer that
// draws it. Swap any value here for real artwork later without touching
// AvatarCreator's state logic.
export const partsRegistry: Record<string, ComponentType> = {
  "bg-plain-cream": BackgroundPlainCream,
  "bg-plain-terracotta": BackgroundPlainTerracotta,
  "bg-stripe-01": BackgroundStripe01,

  "bottom-pants-01": BottomPants01,
  "bottom-shorts-01": BottomShorts01,
  "bottom-skirt-01": BottomSkirt01,

  "top-tee-01": TopTee01,
  "top-shirt-01": TopShirt01,
  "top-apron-01": TopApron01,

  "hair-none": HairNone,
  "hair-short-01": HairShort01,
  "hair-long-01": HairLong01,
  "hair-bun-01": HairBun01,

  "accessory-none": AccessoryNone,
  "accessory-glasses-01": AccessoryGlasses01,
  "accessory-cap-01": AccessoryCap01,
  "accessory-cap-pink-01": AccessoryCapPink01,
};

export const bodyPart: ComponentType = BodyBase;
