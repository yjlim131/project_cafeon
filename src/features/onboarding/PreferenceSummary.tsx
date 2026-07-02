import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import type { MoodCategory } from "../../types/cafe";

type PreferenceSummaryProps = {
  categories: MoodCategory[];
  neighborhoods: string[];
  onStart: () => void;
};

export function PreferenceSummary({
  categories,
  neighborhoods,
  onStart,
}: PreferenceSummaryProps) {
  const visibleCategories = categories.slice(0, 3);
  const neighborhoodLabel =
    neighborhoods.length > 0 ? neighborhoods.join(" · ") : "현재 위치 기반";

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="app-container flex min-h-screen flex-col justify-between px-6 py-8">
      <section className="pt-8">
        <div className="flex -space-x-4">
          {visibleCategories.map((category) => (
            <img
              key={category.id}
              src={category.images[0]}
              alt={category.title}
              className="h-24 w-24 rounded-[24px] border-4 border-background object-cover shadow-card"
            />
          ))}
        </div>

        <h1 className="mt-8 text-[28px] font-bold leading-9 text-espresso-900">
          회원님의 취향을
          <br />
          분석했어요.
        </h1>

        <p className="mt-4 text-lg font-semibold leading-7 text-primary">
          {categories.map((category) => category.title).join(" · ")}
        </p>

        <Card className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              관심 동네
            </p>
            <p className="mt-1 text-base font-bold text-espresso-900">
              {neighborhoodLabel}
            </p>
          </div>
          <p className="text-[15px] leading-6 text-espresso-800">
            선택한 분위기와 동네를 바탕으로 지금 어울리는 카페를 먼저 보여드릴게요.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            홈 피드의 추천 이유는 방금 선택한 공간 분위기와 연결되어 표시됩니다.
          </p>
        </Card>
      </section>

      <Button className="w-full" size="lg" onClick={onStart}>
        시작하기
      </Button>
      </main>
    </div>
  );
}
