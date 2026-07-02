import { MapPin, Sparkles } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Chip } from "../../components/common/Chip";
import type { Cafe } from "../../types/cafe";

type RecommendationCardProps = {
  cafe: Cafe;
  onClick: () => void;
};

export function RecommendationCard({ cafe, onClick }: RecommendationCardProps) {
  return (
    <button
      type="button"
      className="tap-scale w-full overflow-hidden rounded-[24px] border border-border bg-surface text-left shadow-card"
      onClick={onClick}
    >
      <img
        src={cafe.images[0]}
        alt={cafe.name}
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-espresso-900">{cafe.name}</h3>
          <Badge tone="ai">
            <Sparkles size={12} />
            추천
          </Badge>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          {cafe.area} · {cafe.distance}
        </p>
        <p className="rounded-[18px] bg-surface-muted p-3 text-sm leading-6 text-espresso-800">
          {cafe.reason}
        </p>
        <div className="flex flex-wrap gap-2">
          {cafe.moodTags.slice(0, 3).map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>
    </button>
  );
}
