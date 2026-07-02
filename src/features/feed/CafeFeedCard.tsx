import { Bookmark, MapPin, Sparkles } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Chip } from "../../components/common/Chip";
import type { Cafe } from "../../types/cafe";

type CafeFeedCardProps = {
  cafe: Cafe;
  saved: boolean;
  onClick: () => void;
  onToggleSave: () => void;
};

export function CafeFeedCard({
  cafe,
  saved,
  onClick,
  onToggleSave,
}: CafeFeedCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] bg-surface shadow-card">
      <div
        role="button"
        tabIndex={0}
        className="block w-full cursor-pointer text-left"
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <div className="relative aspect-[4/5] bg-muted">
          <img
            src={cafe.images[0]}
            alt={cafe.name}
            className="h-full w-full object-cover"
          />
          <div className="image-overlay-bottom absolute inset-0" />
          <button
            type="button"
            aria-label={`${cafe.name} 저장`}
            className="tap-scale absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface/90 text-espresso-700 shadow-card backdrop-blur"
            onClick={(event) => {
              event.stopPropagation();
              onToggleSave();
            }}
          >
            <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
            <div className="mb-3 flex flex-wrap gap-2">
              {cafe.moodTags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface/20 px-2.5 py-1 text-xs font-semibold backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold leading-8">{cafe.name}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm font-medium text-cream-100/90">
              <MapPin size={15} />
              <span>{cafe.area}</span>
              <span>·</span>
              <span>{cafe.distance}</span>
              <span>·</span>
              <span>{cafe.isOpen ? "영업중" : "영업 전"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-[18px] bg-surface-muted p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge tone="ai">
              <Sparkles size={12} />
              AI 추천 이유
            </Badge>
          </div>
          <p className="text-[15px] leading-6 text-espresso-800">
            {cafe.reason}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {cafe.moodTags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>
    </article>
  );
}
