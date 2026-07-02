import type { MoodCategory } from "../types/cafe";

const cafeImage = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=80`;

export const mockMoodCategories: MoodCategory[] = [
  {
    id: "vintage",
    code: "vintage",
    title: "빈티지 감성",
    keywords: ["레트로", "따뜻한 조명", "아날로그"],
    description:
      "시간이 천천히 흐르는 듯한 조명과 오래된 가구의 질감이 편안하게 남는 공간이에요.",
    images: [
      cafeImage("photo-1511081692775-05d0f180a065"),
      cafeImage("photo-1501339847302-ac426a4a7cbb"),
      cafeImage("photo-1442512595331-e89e73853f31"),
      cafeImage("photo-1495474472287-4d71bcdd2085"),
    ],
    palette: ["#2B1E16", "#8B6B52", "#C7A17A", "#F4EFE8"],
  },
  {
    id: "minimal",
    code: "minimal",
    title: "미니멀 모던",
    keywords: ["화이트 톤", "여백의 미", "자연광"],
    description:
      "선이 단정하고 여백이 살아 있어 머릿속을 가볍게 비우기 좋은 공간이에요.",
    images: [
      cafeImage("photo-1554118811-1e0d58224f24"),
      cafeImage("photo-1559925393-8be0ec4767c8"),
      cafeImage("photo-1555396273-367ea4eb4db5"),
      cafeImage("photo-1559305616-3f99cd43e353"),
    ],
    palette: ["#FFFDF9", "#F4EFE8", "#B08968", "#2B1E16"],
  },
  {
    id: "nature",
    code: "nature",
    title: "감성 자연",
    keywords: ["초록 식물", "자연 채광", "테라스"],
    description:
      "식물과 빛이 공간의 리듬을 만들어 기분 전환이 자연스럽게 되는 분위기예요.",
    images: [
      cafeImage("photo-1521017432531-fbd92d768814"),
      cafeImage("photo-1493857671505-72967e2e2760"),
      cafeImage("photo-1525480122447-64809d765ec4"),
      cafeImage("photo-1517248135467-4c7edcad34c4"),
    ],
    palette: ["#6F8F72", "#DDB892", "#F4EFE8", "#3A281D"],
  },
  {
    id: "cozy",
    code: "cozy",
    title: "아늑한 공간",
    keywords: ["낮은 조명", "소파 좌석", "포근한 패브릭"],
    description:
      "낮은 조도와 폭신한 좌석이 오래 머물러도 부담 없는 포근함을 만들어요.",
    images: [
      cafeImage("photo-1481833761820-0509d3217039"),
      cafeImage("photo-1463797221720-6b07e6426c24"),
      cafeImage("photo-1509042239860-f550ce710b93"),
      cafeImage("photo-1510972527921-ce03766a1cf1"),
    ],
    palette: ["#3A281D", "#6F4E37", "#B08968", "#FFFDF9"],
  },
  {
    id: "local",
    code: "local",
    title: "힙한 로컬",
    keywords: ["골목 안 작은 카페", "독립적인 개성", "사장님 감성"],
    description:
      "동네의 결이 묻어나는 작은 개성과 취향이 선명한 로컬 무드의 공간이에요.",
    images: [
      cafeImage("photo-1514933651103-005eec06c04b"),
      cafeImage("photo-1507133750040-4a8f57021571"),
      cafeImage("photo-1525610553991-2bede1a236e2"),
      cafeImage("photo-1552566626-52f8b828add9"),
    ],
    palette: ["#2B1E16", "#C86B4A", "#D9A441", "#F8F3EC"],
  },
  {
    id: "rooftop",
    code: "rooftop",
    title: "루프탑·뷰",
    keywords: ["탁 트인 전망", "하늘과 맞닿은 공간", "시티뷰"],
    description:
      "시야가 열리고 하늘이 가까워져 답답한 기분을 환기하기 좋은 공간이에요.",
    images: [
      cafeImage("photo-1518005020951-eccb494ad742"),
      cafeImage("photo-1500530855697-b586d89ba3ee"),
      cafeImage("photo-1508057198894-247b23fe5ade"),
      cafeImage("photo-1519608487953-e999c86e7455"),
    ],
    palette: ["#2B1E16", "#6F8F72", "#DDB892", "#FAF8F5"],
  },
  {
    id: "work",
    code: "work",
    title: "작업하기 좋은",
    keywords: ["넓은 책상", "조용한 분위기", "콘센트와 와이파이"],
    description:
      "집중하기 좋은 좌석과 안정적인 분위기로 노트북을 펼치기 좋은 공간이에요.",
    images: [
      cafeImage("photo-1497366754035-f200968a6e72"),
      cafeImage("photo-1524758631624-e2822e304c36"),
      cafeImage("photo-1497366811353-6870744d04b2"),
      cafeImage("photo-1497366412874-3415097a27e7"),
    ],
    palette: ["#2B1E16", "#6F4E37", "#EDE3D8", "#FFFDF9"],
  },
  {
    id: "specialty",
    code: "specialty",
    title: "스페셜티 커피",
    keywords: ["바리스타가 직접 내리는", "원두 향 가득", "커피 본연의 맛"],
    description:
      "커피의 향과 맛을 더 또렷하게 느끼고 싶을 때 어울리는 전문적인 공간이에요.",
    images: [
      cafeImage("photo-1497935586351-b67a49e012bf"),
      cafeImage("photo-1514432324607-a09d9b4aefdd"),
      cafeImage("photo-1517701604599-bb29b565090c"),
      cafeImage("photo-1518057111178-44a106bad636"),
    ],
    palette: ["#2B1E16", "#4B3325", "#B08968", "#F4EFE8"],
  },
];

export function getMoodCategoryById(id: string) {
  return mockMoodCategories.find((category) => category.id === id);
}
