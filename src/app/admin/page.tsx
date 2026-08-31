"use client";

import { useState } from "react";
import AdminSidebar, { type AdminPanelId } from "@/components/admin/AdminSidebar";
import ItemsPanel from "@/components/admin/ItemsPanel";
import RulesPanel from "@/components/admin/RulesPanel";
import SimulatePanel from "@/components/admin/SimulatePanel";

export default function AdminPage() {
  const [activePanel, setActivePanel] = useState<AdminPanelId>("items");

  return (
    <>
      <AdminSidebar activePanel={activePanel} onSelectPanel={setActivePanel} />
      <main className="flex-1 overflow-y-auto px-8 py-8">
        {activePanel === "items" && <ItemsPanel />}
        {activePanel === "rules" && <RulesPanel />}
        {activePanel === "simulate" && <SimulatePanel />}
      </main>
    </>
  );
}
