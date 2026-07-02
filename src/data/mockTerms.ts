export type TermDocument = {
  id: string;
  title: string;
  content: string;
};

export const mockTerms: TermDocument[] = [
  {
    id: "terms",
    title: "이용약관",
    content:
      "본 약관은 CafeOn MVP 프로토타입 이용 흐름을 설명하기 위한 예시 문서입니다. 실제 서비스 약관은 정식 출시 전 별도로 고지됩니다.",
  },
  {
    id: "privacy",
    title: "개인정보 처리방침",
    content:
      "현재 MVP는 실제 개인정보를 서버에 저장하지 않으며, 화면 시연을 위한 mock data와 localStorage 기반 상태만 사용합니다.",
  },
  {
    id: "location",
    title: "위치정보 이용약관",
    content:
      "현재 위치 기반 추천은 실제 GPS 연동 없이 placeholder로 제공됩니다. 정식 위치정보 이용은 사용자 동의 후 제공됩니다.",
  },
  {
    id: "partner",
    title: "입점정책",
    content:
      "카페 입점 및 운영자 기능은 MVP 범위에서 제외되어 있으며, 추후 서비스 확장 단계에서 검토됩니다.",
  },
];
