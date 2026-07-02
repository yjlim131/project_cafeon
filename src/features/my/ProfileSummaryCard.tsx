import { MapPin, User } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import type { MockUser } from "../../types/user";

type ProfileSummaryCardProps = {
  user: MockUser;
};

export function ProfileSummaryCard({ user }: ProfileSummaryCardProps) {
  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
          <User size={28} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-espresso-900">
            {user.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{user.phone}</p>
        </div>
      </div>

      <div className="rounded-[18px] bg-surface-muted p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-espresso-800">
          <MapPin size={16} />
          주요 동네
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {user.neighborhoods.join(" · ")}
        </p>
      </div>

      <Button className="w-full" variant="outline">
        프로필 수정
      </Button>
    </Card>
  );
}
