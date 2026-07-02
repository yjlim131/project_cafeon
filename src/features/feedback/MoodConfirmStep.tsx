import { Chip } from "../../components/common/Chip";

type MoodConfirmStepProps = {
  moods: string[];
  selectedMoods: string[];
  onToggleMood: (mood: string) => void;
};

export function MoodConfirmStep({
  moods,
  selectedMoods,
  onToggleMood,
}: MoodConfirmStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">
        실제 공간에서 느껴진 분위기를 최대 2개까지 선택해주세요.
      </p>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            className="tap-scale"
            onClick={() => onToggleMood(mood)}
          >
            <Chip selected={selectedMoods.includes(mood)}>{mood}</Chip>
          </button>
        ))}
      </div>
    </div>
  );
}
