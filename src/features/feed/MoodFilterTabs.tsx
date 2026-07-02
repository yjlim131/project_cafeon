import { Chip } from "../../components/common/Chip";
import type { MoodCategory } from "../../types/cafe";

type MoodFilterTabsProps = {
  categories: MoodCategory[];
  activeId: string;
  onChange: (id: string) => void;
};

export function MoodFilterTabs({
  categories,
  activeId,
  onChange,
}: MoodFilterTabsProps) {
  return (
    <div className="no-scrollbar -mx-5 snap-x snap-mandatory overflow-x-auto px-5">
      <div className="flex min-w-max gap-2 py-1">
        <button
          type="button"
          className="snap-start"
          onClick={() => onChange("all")}
        >
          <Chip selected={activeId === "all"}>전체</Chip>
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className="snap-start"
            onClick={() => onChange(category.id)}
          >
            <Chip selected={activeId === category.id}>{category.title}</Chip>
          </button>
        ))}
      </div>
    </div>
  );
}
