import { type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  selected?: boolean;
};

export function Chip({ className, selected = false, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-2 text-xs font-medium",
        selected
          ? "border border-secondary bg-cream-200 text-primary"
          : "bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
