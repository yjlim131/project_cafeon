import { Bookmark } from "lucide-react";
import { Card } from "../../components/common/Card";

export function CollectionEmptyState() {
  return (
    <Card className="mt-6 flex min-h-56 flex-col items-center justify-center text-center">
      <Bookmark className="text-primary" size={28} />
      <h2 className="mt-4 text-lg font-semibold">아직 저장한 카페가 없어요.</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        마음에 드는 공간을 발견하면 저장해보세요.
      </p>
    </Card>
  );
}
