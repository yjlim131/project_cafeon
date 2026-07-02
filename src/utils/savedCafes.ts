const SAVED_CAFE_IDS_KEY = "cafeon:savedCafeIds";

export function getSavedCafeIds() {
  const storedValue = window.localStorage.getItem(SAVED_CAFE_IDS_KEY);

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function saveCafeId(cafeId: string) {
  const savedCafeIds = getSavedCafeIds();

  if (savedCafeIds.includes(cafeId)) {
    return savedCafeIds;
  }

  const nextSavedCafeIds = [cafeId, ...savedCafeIds];
  window.localStorage.setItem(
    SAVED_CAFE_IDS_KEY,
    JSON.stringify(nextSavedCafeIds),
  );

  return nextSavedCafeIds;
}

export function removeSavedCafeId(cafeId: string) {
  const nextSavedCafeIds = getSavedCafeIds().filter((id) => id !== cafeId);
  window.localStorage.setItem(
    SAVED_CAFE_IDS_KEY,
    JSON.stringify(nextSavedCafeIds),
  );

  return nextSavedCafeIds;
}

export function isCafeSaved(cafeId: string) {
  return getSavedCafeIds().includes(cafeId);
}
