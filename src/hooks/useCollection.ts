import { useCallback, useEffect, useMemo, useState } from "react";

export type CafeCollection = {
  id: string;
  name: string;
  cafeIds: string[];
};

const COLLECTIONS_KEY = "cafeon:collections";
const COLLECTIONS_EVENT = "cafeon:collections-change";

function readCollections(): CafeCollection[] {
  const storedValue = window.localStorage.getItem(COLLECTIONS_KEY);

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function writeCollections(collections: CafeCollection[]) {
  window.localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  window.dispatchEvent(new Event(COLLECTIONS_EVENT));
}

function createCollectionId() {
  return `collection-${Date.now()}`;
}

export function useCollection() {
  const [collections, setCollections] = useState<CafeCollection[]>(() =>
    readCollections(),
  );

  useEffect(() => {
    const syncCollections = () => setCollections(readCollections());

    window.addEventListener(COLLECTIONS_EVENT, syncCollections);
    window.addEventListener("storage", syncCollections);

    return () => {
      window.removeEventListener(COLLECTIONS_EVENT, syncCollections);
      window.removeEventListener("storage", syncCollections);
    };
  }, []);

  const savedCafeIds = useMemo(
    () =>
      Array.from(
        new Set(collections.flatMap((collection) => collection.cafeIds)),
      ),
    [collections],
  );

  const isSaved = useCallback(
    (cafeId: string) => savedCafeIds.includes(cafeId),
    [savedCafeIds],
  );

  const saveToCollection = useCallback(
    (collectionId: string, cafeId: string) => {
      const nextCollections = readCollections().map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              cafeIds: collection.cafeIds.includes(cafeId)
                ? collection.cafeIds
                : [cafeId, ...collection.cafeIds],
            }
          : collection,
      );

      writeCollections(nextCollections);
      setCollections(nextCollections);
    },
    [],
  );

  const createCollectionAndSave = useCallback(
    (name: string, cafeId: string) => {
      const trimmedName = name.trim() || "새 컬렉션";
      const nextCollection: CafeCollection = {
        id: createCollectionId(),
        name: trimmedName,
        cafeIds: [cafeId],
      };
      const nextCollections = [nextCollection, ...readCollections()];

      writeCollections(nextCollections);
      setCollections(nextCollections);
    },
    [],
  );

  const createCollection = useCallback((name: string) => {
    const trimmedName = name.trim() || "새 컬렉션";
    const nextCollection: CafeCollection = {
      id: createCollectionId(),
      name: trimmedName,
      cafeIds: [],
    };
    const nextCollections = [nextCollection, ...readCollections()];

    writeCollections(nextCollections);
    setCollections(nextCollections);
  }, []);

  const removeCafe = useCallback((cafeId: string) => {
    const nextCollections = readCollections().map((collection) => ({
      ...collection,
      cafeIds: collection.cafeIds.filter((id) => id !== cafeId),
    }));

    writeCollections(nextCollections);
    setCollections(nextCollections);
  }, []);

  return {
    collections,
    savedCafeIds,
    isSaved,
    saveToCollection,
    createCollection,
    createCollectionAndSave,
    removeCafe,
  };
}
