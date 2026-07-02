import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type BottomSheetProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function BottomSheet({
  open,
  title,
  children,
  onClose,
}: BottomSheetProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-espresso-900/30">
      <button
        type="button"
        aria-label="바텀시트 닫기"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
      />
      <section className="absolute inset-x-0 bottom-0 mx-auto max-h-[85vh] max-w-[430px] overflow-hidden rounded-t-[28px] bg-surface shadow-bottom-sheet">
        <div className="max-h-[85vh] overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom)+28px)] pt-4">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-espresso-900">{title}</h2>
            <button
              type="button"
              aria-label="닫기"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
}
