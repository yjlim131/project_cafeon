import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Toast } from "../../components/common/Toast";
import { mockCafes } from "../../data/mockCafes";
import { CafeActionBar } from "../../features/cafe/CafeActionBar";
import { CafeHero } from "../../features/cafe/CafeHero";
import { CafeInfoSection } from "../../features/cafe/CafeInfoSection";
import { MapProviderSheet } from "../../features/cafe/MapProviderSheet";
import { CollectionSaveSheet } from "../../features/collection/CollectionSaveSheet";
import { useCollection } from "../../hooks/useCollection";
import { useNavigationLog } from "../../hooks/useNavigationLog";
import type { MapLinkTarget } from "../../utils/mapLinks";
import { recordMockShareAction, shareCafeDetail } from "../../utils/share";

export function CafeDetailPage() {
  const { id } = useParams();
  const cafe = mockCafes.find((item) => item.id === id);
  const [saveSheetOpen, setSaveSheetOpen] = useState(false);
  const [mapSheetOpen, setMapSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const {
    collections,
    isSaved,
    saveToCollection,
    createCollectionAndSave,
    removeCafe,
  } = useCollection();
  const { addNavigationLog } = useNavigationLog();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  if (!cafe) {
    return (
      <section className="page-x py-6">
        <Card>
          <h1 className="text-xl font-bold">카페를 찾을 수 없어요.</h1>
        </Card>
      </section>
    );
  }

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 1800);
  };

  const saved = isSaved(cafe.id);

  const completeSave = (saveAction: () => void) => {
    saveAction();
    setSaveSheetOpen(false);
    showToast("컬렉션에 저장했어요.");
  };

  const handleSaveClick = () => {
    if (saved) {
      removeCafe(cafe.id);
      showToast("컬렉션에서 삭제했어요.");
      return;
    }

    setSaveSheetOpen(true);
  };

  const handleShareClick = async () => {
    try {
      const shareUrl = await shareCafeDetail(cafe);

      recordMockShareAction(cafe, shareUrl);
      showToast("공유 링크를 준비했어요.");
    } catch {
      showToast("공유를 완료하지 못했어요.");
    }
  };

  const handleMapProviderSelect = (target: MapLinkTarget) => {
    addNavigationLog({
      cafeId: cafe.id,
      cafeName: cafe.name,
      address: cafe.address,
      provider: target.provider,
      lat: target.lat,
      lng: target.lng,
      url: target.url,
    });
    window.open(target.url, "_blank", "noopener,noreferrer");
    setMapSheetOpen(false);
    showToast("길찾기를 실행했어요.");
  };

  return (
    <>
      <section className="page-x pb-28 pt-6">
        <CafeHero cafe={cafe} />

        <div className="mt-6">
          <CafeInfoSection cafe={cafe} />
        </div>
      </section>

      <CafeActionBar
        saved={saved}
        onSave={handleSaveClick}
        onShare={handleShareClick}
        onNavigate={() => setMapSheetOpen(true)}
      />

      <MapProviderSheet
        open={mapSheetOpen}
        cafe={cafe}
        onClose={() => setMapSheetOpen(false)}
        onSelect={handleMapProviderSelect}
      />

      <CollectionSaveSheet
        open={saveSheetOpen}
        cafeName={cafe.name}
        collections={collections}
        onClose={() => setSaveSheetOpen(false)}
        onSelectCollection={(collectionId) =>
          completeSave(() => saveToCollection(collectionId, cafe.id))
        }
        onCreateCollection={(name) =>
          completeSave(() => createCollectionAndSave(name, cafe.id))
        }
      />

      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </>
  );
}
