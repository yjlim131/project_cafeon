import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/common/Badge";
import { Card } from "../../components/common/Card";
import { mockNotices } from "../../data/mockNotices";

export function NoticeListPage() {
  const navigate = useNavigate();

  return (
    <section className="page-x py-6">
      <Badge>공지사항</Badge>
      <h1 className="mt-4 text-2xl font-bold text-espresso-900">Notice</h1>
      <div className="mt-6 space-y-3">
        {mockNotices.map((notice) => (
          <button
            key={notice.id}
            type="button"
            className="w-full text-left"
            onClick={() => navigate(`/my/notices/${notice.id}`)}
          >
            <Card>
              <p className="text-xs font-semibold text-muted-foreground">
                {notice.createdAt}
              </p>
              <h2 className="mt-2 text-lg font-bold text-espresso-900">
                {notice.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {notice.content}
              </p>
            </Card>
          </button>
        ))}
      </div>
    </section>
  );
}
