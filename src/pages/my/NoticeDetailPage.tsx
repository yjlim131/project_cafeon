import { Navigate, useParams } from "react-router-dom";
import { Badge } from "../../components/common/Badge";
import { Card } from "../../components/common/Card";
import { mockNotices } from "../../data/mockNotices";

export function NoticeDetailPage() {
  const { id } = useParams();
  const notice = mockNotices.find((item) => item.id === id);

  if (!notice) return <Navigate to="/my/notices" replace />;

  return (
    <section className="page-x py-6">
      <Badge>공지사항</Badge>
      <Card className="mt-4">
        <p className="text-xs font-semibold text-muted-foreground">
          {notice.createdAt}
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-8 text-espresso-900">
          {notice.title}
        </h1>
        <p className="mt-5 text-[15px] leading-7 text-espresso-800">
          {notice.content}
        </p>
      </Card>
    </section>
  );
}
