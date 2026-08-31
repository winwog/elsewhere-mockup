import type { ChatMessage } from "@/lib/mock-data";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex items-end gap-2">
      <div className="h-7 w-7 shrink-0 rounded-full bg-terracotta/80" />
      <div className="flex max-w-[75%] flex-col gap-1">
        <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm leading-relaxed text-espresso shadow-sm">
          {message.text}
        </div>
        <span className="pl-1 text-[10px] text-espresso/40">{message.time}</span>
      </div>
    </div>
  );
}
