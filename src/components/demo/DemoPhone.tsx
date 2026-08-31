"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { PhoneEmbedProvider } from "@/components/layout/PhoneFrame";
import { useStore } from "@/lib/store";
import ChatPage from "@/app/page";
import PointsPage from "@/app/points/page";
import MembershipPage from "@/app/membership/page";
import GamePage from "@/app/game/page";

type Screen = "chat" | "points" | "membership" | "game";

const routeToScreen: Record<string, Screen> = {
  "/": "chat",
  "/points": "points",
  "/membership": "membership",
  "/game": "game",
};

const screens: Record<Screen, () => React.JSX.Element> = {
  chat: ChatPage,
  points: PointsPage,
  membership: MembershipPage,
  game: GamePage,
};

// Your existing screens navigate with real next/link <a> tags. Inside this
// demo we don't want the browser URL to ever leave /demo, so we intercept
// the click in the capture phase — before Link's own handler runs — and
// swap our local screen state instead. None of the screen components are
// modified to make this work.
export default function DemoPhone() {
  const [screen, setScreen] = useState<Screen>("chat");
  const { customerNotification } = useStore();
  const ActiveScreen = screens[screen];

  const [visibleNotification, setVisibleNotification] = useState(customerNotification);
  useEffect(() => {
    if (!customerNotification) return;
    setVisibleNotification(customerNotification);
    const timer = setTimeout(() => setVisibleNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [customerNotification]);

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !(href in routeToScreen)) return;
    event.preventDefault();
    event.stopPropagation();
    setScreen(routeToScreen[href]);
  }

  return (
    <div className="relative mx-auto h-[780px] w-[375px] overflow-hidden rounded-[2.5rem] border-8 border-espresso bg-cream shadow-2xl">
      <div className="h-full w-full" onClickCapture={handleClickCapture}>
        <PhoneEmbedProvider>
          <ActiveScreen />
        </PhoneEmbedProvider>
      </div>

      {visibleNotification && (
        <div
          key={visibleNotification.id}
          className="pointer-events-none absolute inset-x-3 top-3 z-50 rounded-2xl bg-white px-3 py-2.5 shadow-lg ring-1 ring-black/5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-line-green/20 text-sm">
              🔔
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-espresso">Elsewhere Cafe</p>
              <p className="truncate text-xs text-espresso/70">{visibleNotification.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
