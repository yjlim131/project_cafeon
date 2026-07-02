import { ExternalLink, MapPin } from "lucide-react";
import { BottomSheet } from "../../components/common/BottomSheet";
import { Button } from "../../components/common/Button";
import type { Cafe } from "../../types/cafe";
import { buildMapLinks, type MapLinkTarget } from "../../utils/mapLinks";

type MapProviderSheetProps = {
  open: boolean;
  cafe: Cafe;
  onClose: () => void;
  onSelect: (target: MapLinkTarget) => void;
};

export function MapProviderSheet({
  open,
  cafe,
  onClose,
  onSelect,
}: MapProviderSheetProps) {
  const mapLinks = buildMapLinks(cafe);

  return (
    <BottomSheet open={open} title="길찾기" onClose={onClose}>
      <div className="space-y-5">
        <div className="rounded-[20px] bg-surface-muted p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-primary shadow-card">
              <MapPin size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-base font-bold text-espresso-900">
                {cafe.name}
              </p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {cafe.address}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {mapLinks.map((target) => (
            <Button
              key={target.provider}
              className="w-full justify-between"
              size="lg"
              variant="outline"
              onClick={() => onSelect(target)}
            >
              <span className="inline-flex items-center gap-2">
                <MapPin size={18} />
                {target.label}
              </span>
              <ExternalLink size={17} />
            </Button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
