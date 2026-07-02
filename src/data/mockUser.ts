import type { MockUser } from "../types/user";

export const mockUser: MockUser = {
  id: "user-demo",
  name: "CafeOn 사용자",
  phone: "010-****-1234",
  neighborhoods: ["성수동", "연남동", "망원동"],
  selectedMoodCategoryIds: ["vintage", "cozy", "work"],
  recentVisitCafeIds: ["cafe-001", "cafe-007"],
};
