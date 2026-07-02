import type { Cafe } from "../../types/cafe";
import { CollectionCard } from "./CollectionCard";

type CollectionGridProps = {
  cafes: Cafe[];
  onCardClick: (cafeId: string) => void;
  onToggleSave: (cafeId: string) => void;
  canEnterFeedback?: (cafeId: string) => boolean;
  onVisitFeedback?: (cafeId: string) => void;
};

export function CollectionGrid({
  cafes,
  onCardClick,
  onToggleSave,
  canEnterFeedback,
  onVisitFeedback,
}: CollectionGridProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {cafes.map((cafe) => (
        <CollectionCard
          key={cafe.id}
          image={cafe.images[0]}
          name={cafe.name}
          district={cafe.area}
          moodCategory={cafe.moodTags[0]}
          saved
          feedbackAvailable={canEnterFeedback?.(cafe.id) ?? false}
          onClick={() => onCardClick(cafe.id)}
          onToggleSave={() => onToggleSave(cafe.id)}
          onVisitFeedback={() => onVisitFeedback?.(cafe.id)}
        />
      ))}
    </div>
  );
}
