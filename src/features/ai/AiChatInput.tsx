import { Send } from "lucide-react";
import { Button } from "../../components/common/Button";

type AiChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function AiChatInput({ value, onChange, onSubmit }: AiChatInputProps) {
  return (
    <form
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+80px)] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-background/95 px-5 py-3 backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-center gap-2 rounded-full border border-border bg-surface p-2 shadow-card">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="오늘 어떤 카페가 필요하세요?"
          className="min-w-0 flex-1 bg-transparent px-3 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          size="icon"
          variant="ai"
          disabled={value.trim().length === 0}
          aria-label="메시지 보내기"
        >
          <Send size={18} />
        </Button>
      </div>
    </form>
  );
}
