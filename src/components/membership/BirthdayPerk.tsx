import { birthdayPerk } from "@/lib/mock-data";

export default function BirthdayPerk() {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-latte px-4 py-3">
      <span className="text-xl">🎂</span>
      <div>
        <p className="text-sm font-semibold text-espresso">{birthdayPerk.title}</p>
        <p className="text-xs text-espresso/60">{birthdayPerk.description}</p>
      </div>
    </div>
  );
}
