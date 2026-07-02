import type { VisitFeedbackRating } from "../../hooks/useVisitFeedback";
import { cn } from "../../utils/cn";

type RatingOption = {
  value: VisitFeedbackRating;
  label: string;
  description: string;
};

const ratingOptions: RatingOption[] = [
  {
    value: "good",
    label: "😊 잘 맞았어요",
    description: "추천한 분위기와 실제 경험이 잘 이어졌어요.",
  },
  {
    value: "neutral",
    label: "😐 그냥 그랬어요",
    description: "크게 나쁘진 않았지만 기대와는 조금 달랐어요.",
  },
  {
    value: "bad",
    label: "😞 별로였어요",
    description: "지금의 취향이나 상황에는 잘 맞지 않았어요.",
  },
];

type FeedbackRatingStepProps = {
  selectedRating?: VisitFeedbackRating;
  onSelect: (rating: VisitFeedbackRating) => void;
};

export function FeedbackRatingStep({
  selectedRating,
  onSelect,
}: FeedbackRatingStepProps) {
  return (
    <div className="space-y-3">
      {ratingOptions.map((option) => {
        const selected = selectedRating === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              "tap-scale w-full rounded-[20px] border bg-surface p-4 text-left shadow-card transition-colors",
              selected
                ? "border-secondary bg-cream-200 text-primary"
                : "border-border text-espresso-900",
            )}
            onClick={() => onSelect(option.value)}
          >
            <span className="text-base font-bold">{option.label}</span>
            <span className="mt-1 block text-sm leading-5 text-muted-foreground">
              {option.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
