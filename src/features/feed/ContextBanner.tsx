import { CloudSun, Clock } from "lucide-react";
import { Card } from "../../components/common/Card";

export function ContextBanner() {
  return (
    <Card className="bg-[linear-gradient(135deg,#fffdf9_0%,#f4efe8_56%,#eddfcf_100%)] p-4">
      <div className="flex items-center gap-3 text-sm font-semibold text-espresso-800">
        <span className="inline-flex items-center gap-1">
          <Clock size={16} />
          오늘 오후
        </span>
        <span className="h-1 w-1 rounded-full bg-latte-500" />
        <span className="inline-flex items-center gap-1">
          <CloudSun size={16} />
          흐림
        </span>
      </div>
    </Card>
  );
}
