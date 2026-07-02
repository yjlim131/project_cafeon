import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const followUpOptions = ["더 조용한 곳", "창가 자리 있는 곳", "다른 동네", "작업하기 좋은 곳"];

function pickRecommendation(message: string) {
  if (message.includes("작업") || message.includes("집중")) {
    return mockCafes.find((cafe) => cafe.id === "cafe-007") ?? mockCafes[0];
  }

  if (message.includes("조용") || message.includes("따뜻")) {
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "assistant-welcome",
      role: "assistant",
      content:
        "오늘의 시간, 날씨, 취향을 바탕으로 어울리는 카페를 골라드릴게요. 지금 필요한 분위기를 한 줄로 말해주세요.",
    },
  ]);

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
          "말씀하신 분위기와 선택한 무드 태그를 같이 봤어요. 지금은 이 공간이 가장 잘 맞아 보여요.",
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

  const handleFollowUp = (option: string) => {
    addMockResponse(option);
  };

  return (
    <section className="page-x pb-40 pt-6">
      <div className="mt-6 space-y-5">
        {messages.map((message) => {
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
        })}
      </div>

      <AiChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
