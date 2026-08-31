import PhoneFrame from "@/components/layout/PhoneFrame";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatBubble from "@/components/chat/ChatBubble";
import RichMenu from "@/components/chat/RichMenu";
import { chatMessages } from "@/lib/mock-data";

export default function ChatPage() {
  return (
    <PhoneFrame>
      <ChatHeader />
      <div className="flex-1 space-y-3 overflow-y-auto bg-line-bg px-3 py-4">
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>
      <RichMenu />
    </PhoneFrame>
  );
}
