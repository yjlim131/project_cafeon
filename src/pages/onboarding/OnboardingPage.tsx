import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Chip } from "../../components/common/Chip";
import { mockMoodCategories } from "../../data/mockMoodCategories";
import { MoodBoardModal } from "../../features/onboarding/MoodBoardModal";
import { MoodCategoryCard } from "../../features/onboarding/MoodCategoryCard";
import type { MoodCategory } from "../../types/cafe";

const MIN_SELECTION = 3;

export function OnboardingPage() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<MoodCategory | null>(null);

  const toggleCategory = (category: MoodCategory) => {
    setSelectedIds((current) =>
      current.includes(category.id)
        ? current.filter((id) => id !== category.id)
        : [...current, category.id],
    );
    setActiveCategory(null);
  };

  const canContinue = selectedIds.length >= MIN_SELECTION;

  const handleContinue = () => {
    if (!canContinue) return;

    window.localStorage.setItem(
      "cafeon:selectedMoodCategoryIds",
      JSON.stringify(selectedIds),
    );

    navigate("/onboarding/neighborhoods", {
      state: { selectedMoodCategoryIds: selectedIds },
    });
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="app-container">
        <section className="px-6 pb-32 pt-8">
          <div className="sticky top-0 z-10 -mx-6 bg-background/95 px-6 pb-4 pt-4 backdrop-blur">
            <p className="text-xs font-semibold text-muted-foreground">
              공간 취향 설정
            </p>
            <h1 className="mt-3 text-[28px] font-bold leading-9 text-espresso-900">
              마음에 드는 공간을
              <br />
              골라주세요.
            </h1>
            <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
              AI가 당신의 공간 취향을 학습하여 지금 가장 어울리는 카페를 추천합니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip selected={canContinue}>
                {selectedIds.length}개 선택됨
              </Chip>
              <Chip>{MIN_SELECTION}개 이상 선택해주세요</Chip>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {mockMoodCategories.map((category) => (
              <MoodCategoryCard
                key={category.id}
                category={category}
                selected={selectedIds.includes(category.id)}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </section>

        <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-4 shadow-bottom-nav backdrop-blur">
          <Button
            className="w-full"
            size="lg"
            disabled={!canContinue}
            onClick={handleContinue}
          >
            선택 완료
          </Button>
        </div>

        {activeCategory ? (
          <MoodBoardModal
            category={activeCategory}
            selected={selectedIds.includes(activeCategory.id)}
            onClose={() => setActiveCategory(null)}
            onSelect={() => toggleCategory(activeCategory)}
          />
        ) : null}
      </main>
    </div>
  );
}
