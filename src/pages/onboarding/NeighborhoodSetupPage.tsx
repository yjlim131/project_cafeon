import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Chip } from "../../components/common/Chip";

const MAX_NEIGHBORHOODS = 3;
const neighborhoodOptions = ["성수동", "연남동", "망원동", "한남동", "서촌"];

type NeighborhoodLocationState = {
  selectedMoodCategoryIds?: string[];
};

function getStoredMoodIds() {
  const storedValue = window.localStorage.getItem(
    "cafeon:selectedMoodCategoryIds",
  );

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function NeighborhoodSetupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as NeighborhoodLocationState | null;
  const [searchValue, setSearchValue] = useState("");
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(
    [],
  );

  const selectedMoodCategoryIds = useMemo(
    () => state?.selectedMoodCategoryIds ?? getStoredMoodIds(),
    [state?.selectedMoodCategoryIds],
  );

  const toggleNeighborhood = (neighborhood: string) => {
    setSelectedNeighborhoods((current) => {
      if (current.includes(neighborhood)) {
        return current.filter((item) => item !== neighborhood);
      }

      if (current.length >= MAX_NEIGHBORHOODS) {
        return current;
      }

      return [...current, neighborhood];
    });
  };

  const moveToSummary = (neighborhoods: string[]) => {
    window.localStorage.setItem(
      "cafeon:selectedNeighborhoods",
      JSON.stringify(neighborhoods),
    );

    navigate("/onboarding/summary", {
      state: {
        selectedMoodCategoryIds,
        selectedNeighborhoods: neighborhoods,
      },
    });
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="app-container flex min-h-screen flex-col justify-between px-6 py-8">
        <section>
          <p className="text-xs font-semibold text-muted-foreground">
            동네 설정
          </p>
          <h1 className="mt-3 text-[28px] font-bold leading-9 text-espresso-900">
            자주 찾는 동네를
            <br />
            알려주세요.
          </h1>
          <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
            관심 있는 동네를 설정하면 가까운 카페부터 먼저 추천해드려요.
          </p>

          <Card className="mt-6 bg-[linear-gradient(135deg,#fffdf9_0%,#f4efe8_56%,#eddfcf_100%)]">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <MapPin size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-espresso-900">
                  최대 {MAX_NEIGHBORHOODS}개까지 선택할 수 있어요.
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  아직 정하지 않아도 괜찮아요. 스킵하면 현재 위치 기반 추천으로 이어집니다.
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-6">
            <div className="flex h-[52px] items-center gap-3 rounded-[18px] border border-border bg-surface px-4 shadow-card">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="동네를 검색해주세요."
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {neighborhoodOptions.map((neighborhood) => (
              <button
                key={neighborhood}
                type="button"
                onClick={() => toggleNeighborhood(neighborhood)}
              >
                <Chip selected={selectedNeighborhoods.includes(neighborhood)}>
                  {neighborhood}
                </Chip>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-3">
          <Button
            className="w-full"
            size="lg"
            disabled={selectedNeighborhoods.length === 0}
            onClick={() => moveToSummary(selectedNeighborhoods)}
          >
            동네 선택 완료
          </Button>
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={() => moveToSummary([])}
          >
            스킵하기
          </Button>
        </div>
      </main>
    </div>
  );
}
