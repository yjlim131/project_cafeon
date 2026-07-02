import { Bookmark } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";

type CollectionEmptyProps = {
  onExplore: () => void;
};

export function CollectionEmpty({ onExplore }: CollectionEmptyProps) {
  return (
    <Card className="mt-6 flex min-h-72 flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-muted text-primary">
        <Bookmark size={30} />
      </div>
      <h2 className="mt-5 text-lg font-bold text-espresso-900">
        아직 저장한 카페가 없어요.
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        마음에 드는 공간을 발견하면 저장해보세요.
      </p>
      <Button className="mt-6" size="lg" onClick={onExplore}>
        카페 둘러보기
      </Button>
    </Card>
  );
}
