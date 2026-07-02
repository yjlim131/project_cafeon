import { FileText } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Card } from "../../components/common/Card";
import { mockTerms } from "../../data/mockTerms";

export function TermsPage() {
  return (
    <section className="page-x py-6">
      <Badge>약관</Badge>
      <h1 className="mt-4 text-2xl font-bold text-espresso-900">Terms</h1>
      <div className="mt-6 space-y-4">
        {mockTerms.map((term) => (
          <Card key={term.id}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
                <FileText size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-espresso-900">
                  {term.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {term.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
