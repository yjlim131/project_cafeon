import { useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { mockMoodCategories } from "../../data/mockMoodCategories";
import { PreferenceSummary } from "../../features/onboarding/PreferenceSummary";

type SummaryLocationState = {
  selectedMoodCategoryIds?: string[];
  selectedNeighborhoods?: string[];
};

function getStoredArray(key: string) {
  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function PreferenceSummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SummaryLocationState | null;

  const selectedIds = useMemo(
    () =>
      state?.selectedMoodCategoryIds ??
      getStoredArray("cafeon:selectedMoodCategoryIds"),
    [state?.selectedMoodCategoryIds],
  );
  const selectedNeighborhoods = useMemo(
    () =>
      state?.selectedNeighborhoods ??
      getStoredArray("cafeon:selectedNeighborhoods"),
    [state?.selectedNeighborhoods],
  );

  const selectedCategories = mockMoodCategories.filter((category) =>
    selectedIds.includes(category.id),
  );

  if (selectedCategories.length < 3) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <PreferenceSummary
      categories={selectedCategories}
      neighborhoods={selectedNeighborhoods}
      onStart={() => navigate("/home")}
    />
  );
}
