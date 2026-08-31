"use client";

import { useState } from "react";
import DemoPhone from "@/components/demo/DemoPhone";
import AdminSidebar, { type AdminPanelId } from "@/components/admin/AdminSidebar";
import ItemsPanel from "@/components/admin/ItemsPanel";
import RulesPanel from "@/components/admin/RulesPanel";
import SimulatePanel from "@/components/admin/SimulatePanel";

export default function DemoPage() {
  const [activePanel, setActivePanel] = useState<AdminPanelId>("simulate");

  return (
    <div className="flex min-h-screen bg-canvas">
      <div className="flex w-[40%] shrink-0 items-center justify-center border-r border-latte bg-latte/30 py-10">
        <DemoPhone />
      </div>

      <div className="flex w-[60%]">
        <AdminSidebar activePanel={activePanel} onSelectPanel={setActivePanel} />
        <main className="flex-1 overflow-y-auto px-8 py-8">
          {activePanel === "items" && <ItemsPanel />}
          {activePanel === "rules" && <RulesPanel />}
          {activePanel === "simulate" && <SimulatePanel />}
        </main>
      </div>
    </div>
  );
}
