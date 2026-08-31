import type { Coupon } from "@/lib/mock-data";

export default function CouponCard({ coupon }: { coupon: Coupon }) {
  return (
    <div className="flex shrink-0 w-56 flex-col gap-1 rounded-2xl border border-dashed border-terracotta/40 bg-white px-4 py-3 shadow-sm">
      <p className="text-sm font-semibold text-terracotta">{coupon.title}</p>
      <p className="text-xs text-espresso/60">{coupon.description}</p>
      <p className="mt-1 text-[11px] text-espresso/40">{coupon.expiresAt}</p>
    </div>
  );
}
