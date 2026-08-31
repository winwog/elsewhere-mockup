import { oaProfile } from "@/lib/mock-data";

export default function ChatHeader() {
  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-black/5 bg-white px-4 py-3 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-white">
        E
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-espresso">{oaProfile.name}</p>
        <p className="truncate text-xs text-espresso/50">{oaProfile.subtitle}</p>
      </div>
    </header>
  );
}
