import { Bookmark, Navigation, Share2 } from "lucide-react";
import { Button } from "../../components/common/Button";

type CafeActionBarProps = {
  saved: boolean;
  onSave: () => void;
  onShare: () => void;
  onNavigate: () => void;
};

export function CafeActionBar({
  saved,
  onSave,
  onShare,
  onNavigate,
}: CafeActionBarProps) {
  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3 shadow-bottom-nav backdrop-blur">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
        <Button
          variant={saved ? "secondary" : "outline"}
          size="md"
          onClick={onSave}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          {saved ? "저장됨" : "저장"}
        </Button>
        <Button variant="outline" size="md" onClick={onShare}>
          <Share2 size={18} />
          공유
        </Button>
        <Button size="md" onClick={onNavigate}>
          <Navigation size={18} />
          길찾기
        </Button>
      </div>
    </div>
  );
}
