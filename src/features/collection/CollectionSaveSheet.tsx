import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { BottomSheet } from "../../components/common/BottomSheet";
import { Button } from "../../components/common/Button";
import type { CafeCollection } from "../../hooks/useCollection";

type CollectionSaveSheetProps = {
  open: boolean;
  cafeName: string;
  collections: CafeCollection[];
  onClose: () => void;
  onSelectCollection: (collectionId: string) => void;
  onCreateCollection: (name: string) => void;
};

export function CollectionSaveSheet({
  open,
  cafeName,
  collections,
  onClose,
  onSelectCollection,
  onCreateCollection,
}: CollectionSaveSheetProps) {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [creating, setCreating] = useState(false);
  const hasCollections = collections.length > 0;

  const handleCreate = () => {
    onCreateCollection(newCollectionName || "가보고 싶은 공간");
    setNewCollectionName("");
    setCreating(false);
  };

  return (
    <BottomSheet open={open} title="컬렉션에 저장" onClose={onClose}>
      <div className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">
          {cafeName}을 저장할 컬렉션을 선택해주세요.
        </p>

        {hasCollections ? (
          <div className="space-y-2">
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                className="tap-scale w-full rounded-[20px] border border-border bg-surface p-4 text-left shadow-card hover:shadow-card-hover"
                onClick={() => onSelectCollection(collection.id)}
              >
                <p className="text-base font-bold text-espresso-900">
                  {collection.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {collection.cafeIds.length}개의 카페
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-[20px] bg-surface-muted p-4 text-center">
            <FolderPlus className="mx-auto text-primary" size={28} />
            <p className="mt-3 text-base font-bold text-espresso-900">
              아직 컬렉션이 없어요
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              새 컬렉션을 만들고 이 카페를 바로 저장할 수 있어요.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {!creating ? (
            <Button
              className="w-full"
              size="lg"
              variant={hasCollections ? "outline" : "primary"}
              onClick={() => setCreating(true)}
            >
              <FolderPlus size={18} />새 컬렉션 생성
            </Button>
          ) : (
            <>
              <label className="block text-sm font-semibold text-espresso-800">
                새 컬렉션 이름
              </label>
              <input
                value={newCollectionName}
                onChange={(event) => setNewCollectionName(event.target.value)}
                placeholder="가보고 싶은 공간"
                className="h-12 w-full rounded-2xl border border-border bg-surface px-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-secondary"
              />
              <Button className="w-full" size="lg" onClick={handleCreate}>
                새 컬렉션 생성 후 저장
              </Button>
            </>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
