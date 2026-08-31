const toneClasses: Record<"neutral" | "positive" | "warning" | "muted", string> = {
  neutral: "bg-latte text-espresso",
  positive: "bg-accent text-accent-ink",
  warning: "bg-tier-bronze/20 text-tier-bronze",
  muted: "bg-latte text-espresso/50",
};

export default function StatusBadge({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "positive" | "warning" | "muted";
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}
