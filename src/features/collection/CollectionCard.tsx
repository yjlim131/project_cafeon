import { Bookmark } from "lucide-react";
import { useRef } from "react";
import { Chip } from "../../components/common/Chip";
import { cn } from "../../utils/cn";

type CollectionCardProps = {
  image: string;
  name: string;
  district: string;
  moodCategory: string;
  saved: boolean;
  feedbackAvailable?: boolean;
  onClick: () => void;
  onToggleSave: () => void;
  onVisitFeedback?: () => void;
};

export function CollectionCard({
  image,
  name,
  district,
  moodCategory,
  saved,
  feedbackAvailable = false,
  onClick,
  onToggleSave,
  onVisitFeedback,
}: CollectionCardProps) {
  const longPressTimerRef = useRef<number | null>(null);
  const longPressedRef = useRef(false);

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handlePointerDown = () => {
    longPressedRef.current = false;

    if (!feedbackAvailable || !onVisitFeedback) return;

    longPressTimerRef.current = window.setTimeout(() => {
      longPressedRef.current = true;
      onVisitFeedback();
    }, 550);
  };

  const handlePointerEnd = () => {
    clearLongPressTimer();
  };

  const handleCardClick = () => {
    if (longPressedRef.current) {
      longPressedRef.current = false;
      return;
    }

    onClick();
  };

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[24px] bg-surface shadow-card transition-shadow hover:shadow-card-hover",
        feedbackAvailable && "select-none",
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onContextMenu={(event) => {
        if (feedbackAvailable) event.preventDefault();
      }}
    >
      <div
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        onClick={handleCardClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <div className="relative aspect-[4/5] bg-muted">
          <img src={image} alt={name} className="h-full w-full object-cover" />
          <button
            type="button"
            aria-label={`${name} 저장 해제`}
            className={cn(
              "tap-scale absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 shadow-card backdrop-blur",
              saved ? "text-espresso-800" : "text-muted-foreground",
            )}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onToggleSave();
            }}
          >
            <Bookmark size={19} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="space-y-2 p-3">
          <h2 className="line-clamp-1 text-base font-bold text-espresso-900">
            {name}
          </h2>
          <p className="text-xs font-medium text-muted-foreground">
            {district}
          </p>
          <Chip selected>{moodCategory}</Chip>
        </div>
      </div>
    </article>
  );
}
