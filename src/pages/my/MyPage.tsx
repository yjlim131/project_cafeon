import { Bell, FileText, Megaphone } from "lucide-react";
import { mockCafes } from "../../data/mockCafes";
import { mockUser } from "../../data/mockUser";
import { MyMoodTags } from "../../features/my/MyMoodTags";
import { ProfileSummaryCard } from "../../features/my/ProfileSummaryCard";
import { RecentVisitList } from "../../features/my/RecentVisitList";
import { SettingListItem } from "../../features/my/SettingListItem";
import type { Cafe } from "../../types/cafe";

export function MyPage() {
  const recentVisitCafes = mockUser.recentVisitCafeIds
    .map((id) => mockCafes.find((cafe) => cafe.id === id))
    .filter((cafe): cafe is Cafe => Boolean(cafe))
    .slice(0, 2);

  return (
    <section className="page-x py-6">
      <div className="space-y-7">
        <ProfileSummaryCard user={mockUser} />
        <MyMoodTags moodCategoryIds={mockUser.selectedMoodCategoryIds} />
        <RecentVisitList cafes={recentVisitCafes} />

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-espresso-900">안내와 약관</h2>
          <SettingListItem
            icon={<Megaphone size={18} />}
            title="공지사항"
            description="CafeOn MVP 업데이트와 안내를 확인합니다."
            to="/my/notices"
          />
          <SettingListItem
            icon={<FileText size={18} />}
            title="이용약관"
            description="서비스 이용, 개인정보, 위치정보 관련 문서를 확인합니다."
            to="/my/terms"
          />
          <SettingListItem
            icon={<Bell size={18} />}
            title="알림 설정"
            description="푸시 알림은 MVP 범위에서 실제 발송하지 않습니다."
            to="/my"
          />
        </section>
      </div>
    </section>
  );
}
