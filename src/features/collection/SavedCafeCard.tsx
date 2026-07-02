import { BookmarkCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Chip } from "../../components/common/Chip";
import type { Cafe } from "../../types/cafe";

type SavedCafeCardProps = {
  cafe: Cafe;
};

export function SavedCafeCard({ cafe }: SavedCafeCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="tap-scale w-full overflow-hidden rounded-[24px] border border-border bg-surface text-left shadow-card"
      onClick={() => navigate(`/cafe/${cafe.id}`)}
    >
      <div className="flex gap-4 p-3">
        <img
          src={cafe.images[0]}
          alt={cafe.name}
          className="h-28 w-28 shrink-0 rounded-[18px] object-cover"
        />
        <div className="min-w-0 flex-1 py-1">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
            <BookmarkCheck size={14} />
            저장됨
          </div>
          <h2 className="truncate text-lg font-bold text-espresso-900">
            {cafe.name}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={14} />
            {cafe.area} · {cafe.distance}
          </p>
          <div className="mt-3 flex gap-2 overflow-hidden">
            {cafe.moodTags.slice(0, 2).map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
