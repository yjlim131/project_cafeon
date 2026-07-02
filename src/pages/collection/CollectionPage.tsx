import { useMemo } from "react";
import { Badge } from "../../components/common/Badge";
import { mockCafes } from "../../data/mockCafes";
import { CollectionEmptyState } from "../../features/collection/CollectionEmptyState";
import { SavedCafeCard } from "../../features/collection/SavedCafeCard";
import { getSavedCafeIds } from "../../utils/savedCafes";

export function CollectionPage() {
  const savedCafes = useMemo(() => {
    const savedCafeIds = getSavedCafeIds();
    return savedCafeIds
      .map((id) => mockCafes.find((cafe) => cafe.id === id))
      .filter((cafe) => Boolean(cafe));
  }, []);

  return (
    <section className="page-x py-6">
      <Badge>컬렉션</Badge>
      <h1 className="mt-4 text-2xl font-bold text-espresso-900">Collection</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        저장한 카페를 다시 꺼내보고 방문 계획을 이어갈 수 있어요.
      </p>

      {savedCafes.length > 0 ? (
        <div className="mt-6 space-y-4">
          {savedCafes.map((cafe) =>
            cafe ? <SavedCafeCard key={cafe.id} cafe={cafe} /> : null,
          )}
        </div>
      ) : (
        <CollectionEmptyState />
      )}
    </section>
  );
}
