import ActivityRow from "@/components/points/ActivityRow";
import { recentActivity } from "@/lib/mock-data";

export default function ActivityList() {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold text-espresso">ความเคลื่อนไหวล่าสุด</h2>
      <div className="rounded-2xl bg-white px-4 py-1 shadow-sm">
        {recentActivity.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
}
