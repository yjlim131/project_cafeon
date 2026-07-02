import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import type { Cafe } from "../../types/cafe";

type RecentVisitListProps = {
  cafes: Cafe[];
};

export function RecentVisitList({ cafes }: RecentVisitListProps) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-espresso-900">최근 방문</h2>
        <button type="button" className="text-sm font-semibold text-primary">
          전체 보기
        </button>
      </div>
      <div className="space-y-3">
        {cafes.map((cafe) => (
          <Card key={cafe.id} className="p-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 text-left"
              onClick={() => navigate(`/cafe/${cafe.id}`)}
            >
              <img
                src={cafe.images[0]}
                alt={cafe.name}
                className="h-20 w-20 shrink-0 rounded-[18px] object-cover"
              />
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-espresso-900">
                  {cafe.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cafe.area} · {cafe.distance}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {cafe.reason}
                </p>
              </div>
            </button>
          </Card>
        ))}
      </div>
    </section>
  );
}
