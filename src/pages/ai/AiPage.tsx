import { Clock, CloudSun, MapPin, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/common/Badge";
import { Chip } from "../../components/common/Chip";
import { mockCafes } from "../../data/mockCafes";
import { AiChatInput } from "../../features/ai/AiChatInput";
import { AiMessageBubble } from "../../features/ai/AiMessageBubble";
import { FollowUpChips } from "../../features/ai/FollowUpChips";
import { RecommendationCard } from "../../features/ai/RecommendationCard";

type ChatMessage =
  | {
      id: string;
      role: "user" | "assistant";
      content: string;
    }
  | {
      id: string;
      role: "recommendation";
      cafeId: string;
      followUps: string[];
    };

const promptOptions = [
  "오늘 집중이 안 되는데 분위기 바꾸고 싶어",
  "조용히 책 읽을 곳 찾아줘",
  "친구랑 갈 만한 감성 카페 추천해줘",
];

const followUpOptions = [
  "더 조용한 곳",
  "창가 자리 있는 곳",
  "다른 동네",
  "작업하기 좋은 곳",
];

function pickRecommendation(message: string) {
  if (message.includes("작업") || message.includes("집중")) {
    return mockCafes.find((cafe) => cafe.id === "cafe-007") ?? mockCafes[0];
  }

  if (message.includes("조용") || message.includes("책")) {
    return mockCafes.find((cafe) => cafe.id === "cafe-006") ?? mockCafes[0];
  }

  if (message.includes("커피") || message.includes("원두")) {
    return mockCafes.find((cafe) => cafe.id === "cafe-004") ?? mockCafes[0];
  }

  return mockCafes[0];
}

export function AiPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const hasMessages = messages.length > 0;

  const cafeById = useMemo(
    () => new Map(mockCafes.map((cafe) => [cafe.id, cafe])),
    [],
  );

  const addMockResponse = (message: string) => {
    const recommendation = pickRecommendation(message);
    const timestamp = Date.now();

    setMessages((current) => [
      ...current,
      {
        id: `user-${timestamp}`,
        role: "user",
        content: message,
      },
      {
        id: `assistant-${timestamp}`,
        role: "assistant",
        content:
          "좋아요. 지금의 상황과 취향을 함께 보고, 너무 과하지 않게 머물기 좋은 공간을 골라봤어요.",
      },
      {
        id: `recommendation-${timestamp}`,
        role: "recommendation",
        cafeId: recommendation.id,
        followUps: followUpOptions,
      },
    ]);
  };

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    addMockResponse(trimmedValue);
    setInputValue("");
  };

  const handlePromptSelect = (option: string) => {
    addMockResponse(option);
  };

  const handleFollowUp = (option: string) => {
    addMockResponse(option);
  };

  return (
    <section className="page-x pb-40 pt-5">
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5">
        <div className="flex min-w-max gap-2">
          <Chip>
            <MapPin size={13} />
            성수동
          </Chip>
          <Chip>
            <Clock size={13} />
            오후
          </Chip>
          <Chip>
            <CloudSun size={13} />
            흐림
          </Chip>
          <Chip selected>
            <Sparkles size={13} />
            취향 반영
          </Chip>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {!hasMessages ? (
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[88%] rounded-[24px] rounded-bl-md bg-surface-muted px-4 py-4 text-espresso-800 shadow-card">
                <Badge tone="ai">
                  <Sparkles size={12} />
                  CafeOn AI
                </Badge>
                <h1 className="mt-3 text-xl font-bold text-espresso-900">
                  지금 기분이나 상황을 말해주세요
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  날씨 · 시간 · 취향을 반영해 추천해드려요
                </p>
              </div>
            </div>

            <div className="ml-3 space-y-2">
              {promptOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="tap-scale block w-full rounded-full border border-border bg-surface px-4 py-3 text-left text-[15px] font-medium text-espresso-700 shadow-card"
                  onClick={() => handlePromptSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            if (message.role === "recommendation") {
              const cafe = cafeById.get(message.cafeId);
              if (!cafe) return null;

              return (
                <div key={message.id} className="space-y-3">
                  <RecommendationCard
                    cafe={cafe}
                    onClick={() => navigate(`/cafe/${cafe.id}`)}
                  />
                  <FollowUpChips
                    options={message.followUps}
                    onSelect={handleFollowUp}
                  />
                </div>
              );
            }

            return (
              <AiMessageBubble key={message.id} role={message.role}>
                {message.content}
              </AiMessageBubble>
            );
          })
        )}
      </div>

      <AiChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
