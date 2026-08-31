"use client";

import { createContext, useContext } from "react";

const PhoneEmbedContext = createContext(false);

// Used only by /demo, so its reused screens fill the phone shape /demo
// already drew, instead of drawing their own full-page wrapper on top of it.
export function PhoneEmbedProvider({ children }: { children: React.ReactNode }) {
  return <PhoneEmbedContext.Provider value={true}>{children}</PhoneEmbedContext.Provider>;
}

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const embedded = useContext(PhoneEmbedContext);

  if (embedded) {
    return <div className="flex h-full w-full flex-col overflow-hidden">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-canvas md:flex md:items-center md:justify-center md:py-10">
      <div className="mx-auto flex h-screen w-full max-w-[375px] flex-col overflow-hidden bg-cream md:h-[780px] md:rounded-[2.5rem] md:border-8 md:border-espresso md:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
