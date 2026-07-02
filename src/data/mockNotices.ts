export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export const mockNotices: Notice[] = [
  {
    id: "notice-001",
    title: "CafeOn MVP 이용 안내",
    content:
      "CafeOn은 현재 포트폴리오용 MVP 프로토타입으로 제공됩니다. 실제 위치 기반 추천, 소셜 로그인, 푸시 알림은 추후 단계에서 연결될 예정입니다.",
    createdAt: "2026.07.01",
  },
  {
    id: "notice-002",
    title: "공간 취향 선택 기능 업데이트",
    content:
      "온보딩에서 선택한 무드 카테고리와 관심 동네를 바탕으로 홈 피드의 추천 이유가 더 명확하게 표시됩니다.",
    createdAt: "2026.06.28",
  },
];
