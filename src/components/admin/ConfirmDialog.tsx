export default function ConfirmDialog({
  title,
  description,
  warning,
  confirmLabel = "ยืนยันลบ",
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  warning?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <h3 className="text-sm font-semibold text-espresso">{title}</h3>
        <p className="mt-2 text-sm text-espresso/70">{description}</p>
        {warning && (
          <p className="mt-3 rounded-lg bg-tier-bronze/15 px-3 py-2 text-xs text-tier-bronze">
            ⚠ {warning}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-sm font-medium text-espresso/60 active:bg-latte"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-white active:bg-terracotta-dark"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
