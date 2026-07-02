import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Chip } from "../../components/common/Chip";
import { mockCafes } from "../../data/mockCafes";

export function CafeDetailPlaceholderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const cafe = mockCafes.find((item) => item.id === id);

  if (!cafe) {
    return (
      <section className="page-x py-6">
        <Button variant="ghost" onClick={() => navigate("/home")}>
          <ChevronLeft size={18} />
          홈으로
        </Button>
        <Card className="mt-6">
          <h1 className="text-xl font-bold">카페를 찾을 수 없어요.</h1>
        </Card>
      </section>
    );
  }

  return (
    <section className="page-x py-6">
      <Button variant="ghost" onClick={() => navigate("/home")}>
        <ChevronLeft size={18} />
        홈으로
      </Button>
      <Card className="mt-4 overflow-hidden p-0">
        <img
          src={cafe.images[0]}
          alt={cafe.name}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-4 p-5">
          <Badge tone="ai">Cafe Detail placeholder</Badge>
          <div>
            <h1 className="text-2xl font-bold text-espresso-900">
              {cafe.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {cafe.area} · {cafe.distance} · {cafe.isOpen ? "영업중" : "영업 전"}
            </p>
          </div>
          <p className="rounded-[18px] bg-surface-muted p-4 text-[15px] leading-6 text-espresso-800">
            {cafe.reason}
          </p>
          <div className="flex flex-wrap gap-2">
            {cafe.moodTags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            상세 화면의 정식 Hero, 운영 정보, 저장 바텀시트는 Phase 6에서 구현합니다.
          </p>
        </div>
      </Card>
    </section>
  );
}
