import type { ActivityRow as ActivityRowType } from "@/lib/mock-data";

export default function ActivityRow({ activity }: { activity: ActivityRowType }) {
  const earned = activity.points >= 0;

  return (
    <div className="flex items-center justify-between border-b border-latte py-2.5 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-sm text-espresso">{activity.label}</p>
        <p className="text-xs text-espresso/40">{activity.date}</p>
      </div>
      <span className={`shrink-0 text-sm font-medium ${earned ? "text-terracotta" : "text-espresso/50"}`}>
        {earned ? "+" : ""}
        {activity.points}
      </span>
    </div>
  );
}
