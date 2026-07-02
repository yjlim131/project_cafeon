import { X } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Chip } from "../../components/common/Chip";
import type { MoodCategory } from "../../types/cafe";

type MoodBoardModalProps = {
  category: MoodCategory;
  selected: boolean;
  onClose: () => void;
  onSelect: () => void;
};

export function MoodBoardModal({
  category,
  selected,
  onClose,
  onSelect,
}: MoodBoardModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-espresso-900/30 px-4 py-6">
      <section className="mx-auto flex max-h-full max-w-[430px] flex-col overflow-hidden rounded-[28px] bg-surface shadow-modal">
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">MoodBoard</p>
            <h2 className="mt-1 text-2xl font-bold text-espresso-900">
              {category.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="무드보드 닫기"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-5">
          <div className="grid grid-cols-2 gap-3">
            {category.images.map((image, index) => (
              <figure
                key={image}
                className="rotate-[-1deg] rounded-[18px] bg-surface p-2 shadow-card even:rotate-[1deg]"
              >
                <img
                  src={image}
                  alt={`${category.title} 무드 이미지 ${index + 1}`}
                  className="aspect-[4/5] w-full rounded-[12px] object-cover"
                />
              </figure>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            {category.palette.map((color) => (
              <span
                key={color}
                className="h-8 flex-1 rounded-full border border-border"
                style={{ backgroundColor: color }}
                aria-label={`컬러 ${color}`}
              />
            ))}
          </div>

          <p className="mt-5 text-[15px] leading-6 text-espresso-800">
            {category.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {category.keywords.map((keyword) => (
              <Chip key={keyword}>{keyword}</Chip>
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-surface p-5">
          <Button className="w-full" size="lg" onClick={onSelect}>
            {selected ? "선택 해제" : "이 분위기 선택"}
          </Button>
        </div>
      </section>
    </div>
  );
}
