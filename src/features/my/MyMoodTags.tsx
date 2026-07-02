import { Chip } from "../../components/common/Chip";
import { mockMoodCategories } from "../../data/mockMoodCategories";

type MyMoodTagsProps = {
  moodCategoryIds: string[];
};

export function MyMoodTags({ moodCategoryIds }: MyMoodTagsProps) {
  const categories = mockMoodCategories.filter((category) =>
    moodCategoryIds.includes(category.id),
  );

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-espresso-900">내 취향 무드</h2>
        <button type="button" className="text-sm font-semibold text-primary">
          관리
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Chip key={category.id} selected>
            {category.title}
          </Chip>
        ))}
      </div>
    </section>
  );
}
