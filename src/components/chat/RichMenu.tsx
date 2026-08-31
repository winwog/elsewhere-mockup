import Link from "next/link";

const tiles = [
  { href: "/points", label: "แต้มของฉัน", icon: "★" },
  { href: "/membership", label: "บัตรสมาชิก", icon: "▤" },
  { href: "/game", label: "Avatar", icon: "☺" },
] as const;

export default function RichMenu() {
  return (
    <div className="grid shrink-0 grid-cols-3 gap-px bg-accent-ink/20" style={{ height: "40%" }}>
      {tiles.map((tile) => (
        <Link
          key={tile.href}
          href={tile.href}
          className="flex flex-col items-center justify-center gap-3 bg-accent text-accent-ink active:bg-accent-ink/15"
        >
          <span className="text-3xl">{tile.icon}</span>
          <span className="text-sm font-medium">{tile.label}</span>
        </Link>
      ))}
    </div>
  );
}
