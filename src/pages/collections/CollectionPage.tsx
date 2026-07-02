import { FolderPlus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../components/common/BottomSheet";
import { Button } from "../../components/common/Button";
import { Toast } from "../../components/common/Toast";
import { mockCafes } from "../../data/mockCafes";
import { CollectionEmpty } from "../../features/collection/CollectionEmpty";
import { CollectionGrid } from "../../features/collection/CollectionGrid";
import { VisitFeedbackSheet } from "../../features/feedback/VisitFeedbackSheet";
import { useCollection } from "../../hooks/useCollection";
import { useVisitFeedbackTrigger } from "../../hooks/useVisitFeedbackTrigger";
import type { Cafe } from "../../types/cafe";

export function CollectionPage() {
  const navigate = useNavigate();
  const { collections, savedCafeIds, createCollection, removeCafe } =
    useCollection();
  const { canEnterFeedback } = useVisitFeedbackTrigger();
  const [toastMessage, setToastMessage] = useState("");
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [feedbackCafe, setFeedbackCafe] = useState<Cafe | null>(null);
  const [newCollectionName, setNewCollectionName] = useState("");

  const savedCafes = useMemo(
    () =>
      savedCafeIds
        .map((id) => mockCafes.find((cafe) => cafe.id === id))
        .filter((cafe): cafe is Cafe => Boolean(cafe)),
    [savedCafeIds],
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 1800);
  };

  const handleToggleSave = (cafeId: string) => {
    removeCafe(cafeId);
    showToast("컬렉션에서 삭제했어요.");
  };

  const handleCreateCollection = () => {
    createCollection(newCollectionName);
    setNewCollectionName("");
    setCreateSheetOpen(false);
    showToast("새 컬렉션을 만들었어요.");
  };

  const handleVisitFeedback = (cafeId: string) => {
    const cafe = savedCafes.find((item) => item.id === cafeId);

    if (!cafe) return;

    setFeedbackCafe(cafe);
  };

  const handleFeedbackComplete = () => {
    setFeedbackCafe(null);
    showToast("다음 추천에 반영했어요.");
  };

  return (
    <section className="page-x py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold leading-9 text-espresso-900">
            컬렉션
          </h1>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            {savedCafes.length}개의 카페 · {collections.length}개의 컬렉션
          </p>
        </div>
        <Button
          className="shrink-0 px-4"
          size="sm"
          onClick={() => setCreateSheetOpen(true)}
        >
          <Plus size={16} />새 컬렉션
        </Button>
      </div>

      {savedCafes.length > 0 ? (
        <CollectionGrid
          cafes={savedCafes}
          onCardClick={(cafeId) => navigate(`/cafe/${cafeId}`)}
          onToggleSave={handleToggleSave}
          canEnterFeedback={canEnterFeedback}
          onVisitFeedback={handleVisitFeedback}
        />
      ) : (
        <CollectionEmpty onExplore={() => navigate("/home")} />
      )}

      <BottomSheet
        open={createSheetOpen}
        title="새 컬렉션 생성"
        onClose={() => setCreateSheetOpen(false)}
      >
        <div className="space-y-5">
          <div className="rounded-[20px] bg-surface-muted p-4 text-center">
            <FolderPlus className="mx-auto text-primary" size={28} />
            <p className="mt-3 text-base font-bold text-espresso-900">
              나만의 카페 묶음을 만들어보세요
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              저장 버튼을 누를 때 원하는 컬렉션을 선택할 수 있어요.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-espresso-800">
              컬렉션 이름
            </label>
            <input
              value={newCollectionName}
              onChange={(event) => setNewCollectionName(event.target.value)}
              placeholder="예: 조용히 작업하기 좋은 곳"
              className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-secondary"
            />
            <Button className="w-full" size="lg" onClick={handleCreateCollection}>
              생성하기
            </Button>
          </div>
        </div>
      </BottomSheet>

      {feedbackCafe ? (
        <VisitFeedbackSheet
          open={Boolean(feedbackCafe)}
          cafe={feedbackCafe}
          onClose={() => setFeedbackCafe(null)}
          onComplete={handleFeedbackComplete}
        />
      ) : null}

      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </section>
  );
}
