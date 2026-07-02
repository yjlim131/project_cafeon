import { LocateFixed, MapPin } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";

type HomeLocationSelectorProps = {
  neighborhoods: string[];
  mode: "neighborhoods" | "current";
  onUseCurrentLocation: () => void;
};

export function HomeLocationSelector({
  neighborhoods,
  mode,
  onUseCurrentLocation,
}: HomeLocationSelectorProps) {
  const label =
    mode === "current" || neighborhoods.length === 0
      ? "현재 위치"
      : neighborhoods.length === 1
        ? neighborhoods[0]
        : `${neighborhoods[0]} 외 ${neighborhoods.length - 1}`;

  return (
    <Card className="flex items-center justify-between gap-3 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
          <MapPin size={19} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground">
            추천 위치
          </p>
          <p className="truncate text-base font-bold text-espresso-900">
            {label}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="shrink-0"
        onClick={onUseCurrentLocation}
      >
        <LocateFixed size={15} />
        현재 위치
      </Button>
    </Card>
  );
}
