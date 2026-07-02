import { Clock, MapPin, Sparkles, WalletCards, Wifi } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "../../components/common/Badge";
import { Card } from "../../components/common/Card";
import { Chip } from "../../components/common/Chip";
import type { Cafe } from "../../types/cafe";

type CafeInfoSectionProps = {
  cafe: Cafe;
};

export function CafeInfoSection({ cafe }: CafeInfoSectionProps) {
  return (
    <div className="space-y-5">
      <section>
        <h2 className="mb-3 text-lg font-bold text-espresso-900">공간 무드</h2>
        <div className="flex flex-wrap gap-2">
          {cafe.moodTags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </section>

      <Card>
        <div className="mb-3">
          <Badge tone="ai">
            <Sparkles size={12} />
            AI 추천 이유
          </Badge>
        </div>
        <p className="text-[15px] leading-6 text-espresso-800">
          {cafe.reason}
        </p>
      </Card>

      <section>
        <h2 className="mb-3 text-lg font-bold text-espresso-900">운영 정보</h2>
        <Card className="space-y-4">
          <InfoRow icon={<Clock size={18} />} label="영업시간" value={cafe.hours} />
          <InfoRow icon={<MapPin size={18} />} label="주소" value={cafe.address} />
          <InfoRow
            icon={<WalletCards size={18} />}
            label="가격대"
            value={cafe.priceRange}
          />
          <InfoRow
            icon={<Wifi size={18} />}
            label="시설"
            value={cafe.facilities.join(" · ")}
          />
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold text-espresso-900">지도 미리보기</h2>
        <div className="flex aspect-[4/3] items-center justify-center rounded-[24px] border border-border bg-[linear-gradient(135deg,#fffdf9_0%,#f4efe8_52%,#eddfcf_100%)] text-center shadow-card">
          <div>
            <MapPin className="mx-auto text-primary" size={28} />
            <p className="mt-3 text-sm font-semibold text-espresso-800">
              {cafe.area} 지도 영역
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              실제 지도 SDK는 Phase 범위 밖입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm leading-5 text-espresso-900">{value}</p>
      </div>
    </div>
  );
}
