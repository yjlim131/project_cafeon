import { Check } from "lucide-react";
import type { MoodCategory } from "../../types/cafe";
import { cn } from "../../utils/cn";

type MoodCategoryCardProps = {
  category: MoodCategory;
  selected: boolean;
  onClick: () => void;
};

export function MoodCategoryCard({
  category,
  selected,
  onClick,
}: MoodCategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "tap-scale relative w-full rounded-[24px] border bg-surface p-3 text-left shadow-card transition-colors",
        selected ? "border-secondary bg-cream-200" : "border-border",
      )}
    >
      {selected ? (
        <span className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card">
          <Check size={16} />
        </span>
      ) : null}
      <div className="grid aspect-[4/3] grid-cols-2 gap-1 overflow-hidden rounded-[18px] bg-muted">
        <img
          src={category.images[0]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="grid gap-1">
          <img
            src={category.images[1]}
            alt=""
            className="h-full min-h-0 w-full object-cover"
          />
          <img
            src={category.images[2]}
            alt=""
            className="h-full min-h-0 w-full object-cover"
          />
        </div>
      </div>
      <h3 className="mt-3 text-[15px] font-bold leading-5 text-espresso-900">
        {category.title}
      </h3>
      <p className="mt-1 text-xs leading-4 text-muted-foreground">
        {category.keywords.join(" · ")}
      </p>
    </button>
  );
}
