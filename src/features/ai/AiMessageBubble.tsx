import { Sparkles } from "lucide-react";
import { cn } from "../../utils/cn";

type AiMessageBubbleProps = {
  role: "user" | "assistant";
  children: React.ReactNode;
};

export function AiMessageBubble({ role, children }: AiMessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[84%] rounded-[22px] px-4 py-3 text-[15px] leading-6 shadow-card",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-surface-muted text-espresso-800",
        )}
      >
        {!isUser ? (
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-primary">
            <Sparkles size={13} />
            CafeOn AI
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
