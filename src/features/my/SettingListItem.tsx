import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type SettingListItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
  to: string;
};

export function SettingListItem({
  icon,
  title,
  description,
  to,
}: SettingListItemProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-[20px] bg-surface p-4 text-left shadow-card"
      onClick={() => navigate(to)}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-espresso-900">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      <ChevronRight className="text-muted-foreground" size={18} />
    </button>
  );
}
