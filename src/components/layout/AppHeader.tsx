import { Bell, ChevronLeft } from "lucide-react";
import horizontalLogo from "../../assets/cafeon-logo-horizontal.svg";

type AppHeaderProps = {
  detail?: boolean;
  onBack?: () => void;
};

export function AppHeader({ detail = false, onBack }: AppHeaderProps) {
  if (detail) {
    return (
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-5 pb-3 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur">
        <button
          type="button"
          aria-label="뒤로가기"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-espresso-700 shadow-card"
          onClick={onBack}
        >
          <ChevronLeft size={22} />
        </button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-5 pb-3 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur">
      <div className="flex min-h-14 items-center justify-between gap-3">
        <img
          src={horizontalLogo}
          alt="CafeOn"
          className="h-12 w-[196px] shrink-0 object-contain"
        />

        <button
          type="button"
          aria-label="알림"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-espresso-700 shadow-card"
        >
          <Bell size={20} />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-gold-500" />
        </button>
      </div>
    </header>
  );
}
