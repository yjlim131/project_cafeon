import { type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "ai" | "success" | "warning";
};

const toneClasses = {
  default: "bg-surface-muted text-muted-foreground",
  ai: "bg-gold-500/15 text-espresso-700",
  success: "bg-sage-500/15 text-sage-500",
  warning: "bg-terracotta-500/15 text-terracotta-500",
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
