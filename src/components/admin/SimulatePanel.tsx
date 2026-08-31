"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export default function SimulatePanel() {
  const { menuItems, purchaseLog, simulatePurchase, customer } = useStore();
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(menuItems[0]?.id ?? "");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-espresso">จำลองการซื้อ</h2>
        <p className="text-sm text-espresso/50">
          ทดสอบว่าโปรโมชั่นทำงานถูกต้องหรือไม่ โดยไม่ต้องรอลูกค้าซื้อจริง
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-latte bg-white p-4">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-espresso/60">เมนู</span>
          <select
            value={selectedMenuItemId}
            onChange={(e) => setSelectedMenuItemId(e.target.value)}
            className="rounded-xl border border-latte px-3 py-2 text-sm text-espresso outline-none focus:border-terracotta"
          >
            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.price} บาท
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={!selectedMenuItemId}
          onClick={() => simulatePurchase(selectedMenuItemId)}
          className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          จำลองการซื้อ
        </button>

        <div className="ml-auto text-right text-sm text-espresso/60">
          <p>แต้มลูกค้าปัจจุบัน</p>
          <p className="text-lg font-semibold text-espresso">
            {customer.points.toLocaleString("th-TH")}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-latte bg-white p-4">
        <h3 className="mb-2 text-sm font-semibold text-espresso">บันทึกการทดสอบ</h3>
        {purchaseLog.length === 0 ? (
          <p className="text-sm text-espresso/40">ยังไม่มีการจำลองการซื้อ</p>
        ) : (
          <ul className="space-y-1.5">
            {[...purchaseLog].reverse().map((entry) => (
              <li key={entry.id} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 text-xs text-espresso/40">{entry.time}</span>
                <span className="text-espresso/80">{entry.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
