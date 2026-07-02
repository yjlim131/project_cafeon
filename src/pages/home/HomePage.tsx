import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/common/Toast";
import { mockCafes } from "../../data/mockCafes";
import { mockMoodCategories } from "../../data/mockMoodCategories";
import { mockUser } from "../../data/mockUser";
import { CollectionSaveSheet } from "../../features/collection/CollectionSaveSheet";
import { CafeFeedCard } from "../../features/feed/CafeFeedCard";
import { ContextBanner } from "../../features/feed/ContextBanner";
import { HomeLocationSelector } from "../../features/feed/HomeLocationSelector";
import { MoodFilterTabs } from "../../features/feed/MoodFilterTabs";
import { useCollection } from "../../hooks/useCollection";

function getStoredMoodIds() {
  const storedValue = window.localStorage.getItem(
    "cafeon:selectedMoodCategoryIds",
  );

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function getStoredNeighborhoods() {
  const storedValue = window.localStorage.getItem(
    "cafeon:selectedNeighborhoods",
  );

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function HomePage() {
  const navigate = useNavigate();
  const [activeMoodId, setActiveMoodId] = useState("all");
  const [locationMode, setLocationMode] = useState<"neighborhoods" | "current">(
    "neighborhoods",
  );
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const {
    collections,
    isSaved,
    saveToCollection,
    createCollectionAndSave,
    removeCafe,
  } = useCollection();
  const selectedNeighborhoods = useMemo(() => getStoredNeighborhoods(), []);
  const selectedCafe = useMemo(
    () => mockCafes.find((cafe) => cafe.id === selectedCafeId),
    [selectedCafeId],
  );

  const moodTabs = useMemo(() => {
    const selectedIds = getStoredMoodIds();
    const preferredIds =
      selectedIds.length > 0 ? selectedIds : mockUser.selectedMoodCategoryIds;
    const selectedCategories = mockMoodCategories.filter((category) =>
      preferredIds.includes(category.id),
    );

    return selectedCategories;
  }, []);

  const filteredCafes = useMemo(() => {
    if (activeMoodId === "all") return mockCafes;
    return mockCafes.filter((cafe) =>
      cafe.moodCategoryIds.includes(activeMoodId),
    );
  }, [activeMoodId]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 1800);
  };

  const handleToggleSave = (cafeId: string) => {
    if (isSaved(cafeId)) {
      removeCafe(cafeId);
      showToast("컬렉션에서 삭제했어요.");
      return;
    }

    setSelectedCafeId(cafeId);
  };

  const completeSave = (saveAction: () => void) => {
    saveAction();
    setSelectedCafeId(null);
    showToast("컬렉션에 저장했어요.");
  };

  return (
    <section className="page-x">
      
      <div className="mt-3">
        <ContextBanner />
      </div>
      <div className="mt-3">
        <HomeLocationSelector
          neighborhoods={selectedNeighborhoods}
          mode={locationMode}
          onUseCurrentLocation={() => setLocationMode("current")}
        />
      </div>

      <div className="sticky top-0 z-10 -mx-5 mt-5 bg-background/95 px-5 py-3 backdrop-blur">
        <MoodFilterTabs
          categories={moodTabs}
          activeId={activeMoodId}
          onChange={setActiveMoodId}
        />
      </div>

      <div className="mt-3 space-y-5">
        {filteredCafes.map((cafe) => (
          <CafeFeedCard
            key={cafe.id}
            cafe={cafe}
            saved={isSaved(cafe.id)}
            onClick={() => navigate(`/cafe/${cafe.id}`)}
            onToggleSave={() => handleToggleSave(cafe.id)}
          />
        ))}
      </div>

      <CollectionSaveSheet
        open={Boolean(selectedCafe)}
        cafeName={selectedCafe?.name ?? ""}
        collections={collections}
        onClose={() => setSelectedCafeId(null)}
        onSelectCollection={(collectionId) => {
          if (!selectedCafe) return;
          completeSave(() => saveToCollection(collectionId, selectedCafe.id));
        }}
        onCreateCollection={(name) => {
          if (!selectedCafe) return;
          completeSave(() => createCollectionAndSave(name, selectedCafe.id));
        }}
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </section>
  );
}
