import { useEffect, useMemo, useState } from "react";
import { BottomSheet } from "../../components/common/BottomSheet";
import { Button } from "../../components/common/Button";
import type { Cafe } from "../../types/cafe";
import {
  useVisitFeedback,
  type VisitFeedbackRating,
} from "../../hooks/useVisitFeedback";
import { FeedbackRatingStep } from "./FeedbackRatingStep";
import { MoodConfirmStep } from "./MoodConfirmStep";

type VisitFeedbackSheetProps = {
  open: boolean;
  cafe: Cafe;
  onClose: () => void;
  onComplete: () => void;
};

export function VisitFeedbackSheet({
  open,
  cafe,
  onClose,
  onComplete,
}: VisitFeedbackSheetProps) {
  const { submitFeedback } = useVisitFeedback();
  const [step, setStep] = useState(1);
  const [visited, setVisited] = useState<boolean | null>(null);
  const [rating, setRating] = useState<VisitFeedbackRating>();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const moodOptions = useMemo(() => cafe.moodTags.slice(0, 6), [cafe.moodTags]);

  useEffect(() => {
    if (!open) return;

    setStep(1);
    setVisited(null);
    setRating(undefined);
    setSelectedMoods([]);
  }, [open, cafe.id]);

  const handleVisitedSelect = (nextVisited: boolean) => {
    setVisited(nextVisited);

    if (nextVisited) {
      setStep(2);
      return;
    }

    onClose();
  };

  const handleRatingSelect = (nextRating: VisitFeedbackRating) => {
    setRating(nextRating);
    setStep(3);
  };

  const handleMoodToggle = (mood: string) => {
    setSelectedMoods((currentMoods) => {
      if (currentMoods.includes(mood)) {
        return currentMoods.filter((item) => item !== mood);
      }

      if (currentMoods.length >= 2) return currentMoods;

      return [...currentMoods, mood];
    });
  };

  const handleSubmit = () => {
    submitFeedback({
      cafeId: cafe.id,
      cafeName: cafe.name,
      visited: true,
      rating,
      confirmedMoods: selectedMoods,
    });
    onClose();
    onComplete();
  };

  const title = step === 1 ? "방문 확인" : step === 2 ? "추천 평가" : "분위기 확인";

  return (
    <BottomSheet open={open} title={title} onClose={onClose}>
      <div className="space-y-5">
        <div>
          <p className="text-base font-bold text-espresso-900">{cafe.name}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            다음 추천에 반영할 간단한 피드백을 남겨주세요.
          </p>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map((item) => (
            <span
              key={item}
              className={`h-1.5 flex-1 rounded-full ${
                item <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => handleVisitedSelect(true)}>
              네, 다녀왔어요
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => handleVisitedSelect(false)}
            >
              아직 안 갔어요
            </Button>
          </div>
        ) : null}

        {step === 2 ? (
          <FeedbackRatingStep
            selectedRating={rating}
            onSelect={handleRatingSelect}
          />
        ) : null}

        {step === 3 ? (
          <>
            <MoodConfirmStep
              moods={moodOptions}
              selectedMoods={selectedMoods}
              onToggleMood={handleMoodToggle}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button size="lg" variant="outline" onClick={handleSubmit}>
                건너뛰기
              </Button>
              <Button size="lg" onClick={handleSubmit}>
                완료
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </BottomSheet>
  );
}
