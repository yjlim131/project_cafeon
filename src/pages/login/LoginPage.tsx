import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Toast } from "../../components/common/Toast";
import { useMockAuth, type MockAuthProvider } from "../../hooks/useMockAuth";
import { cn } from "../../utils/cn";

const loginProviders: Array<{
  id: MockAuthProvider;
  label: string;
  icon: string;
  className: string;
}> = [
  {
    id: "kakao",
    label: "카카오로 시작하기",
    icon: "K",
    className: "border-transparent bg-[#FEE500] text-[#2B1E16] shadow-card",
  },
  {
    id: "naver",
    label: "네이버로 시작하기",
    icon: "N",
    className: "border-border bg-surface text-espresso-800",
  },
  {
    id: "google",
    label: "Google 계정으로 시작하기",
    icon: "G",
    className: "border-border bg-surface text-espresso-800",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { loadingProvider, login } = useMockAuth();
  const [toastMessage, setToastMessage] = useState("");
  const navigateTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      if (navigateTimerRef.current) {
        window.clearTimeout(navigateTimerRef.current);
      }
    };
  }, []);

  const handleLogin = async (provider: MockAuthProvider) => {
    try {
      await login(provider);
      setToastMessage("로그인했어요. 취향 설정을 시작할게요.");
      navigateTimerRef.current = window.setTimeout(() => {
        navigate("/onboarding");
      }, 650);
    } catch {
      setToastMessage("로그인을 완료하지 못했어요.");
    }
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-cream-200">
      <main className="mx-auto flex h-[100dvh] max-h-[100dvh] max-w-[430px] flex-col overflow-hidden bg-background text-foreground">
        <section className="relative h-[31dvh] max-h-[248px] min-h-[210px] shrink-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=900&q=80"
            alt="여유로운 카페 공간"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 48%" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,30,22,0.04)_0%,rgba(250,248,245,0.22)_52%,rgba(250,248,245,0.98)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(250,248,245,0)_0%,hsl(var(--background))_92%)]" />
        </section>

        <section className="relative -mt-7 flex min-h-0 flex-1 flex-col rounded-t-[30px] bg-background px-6 pb-[max(18px,env(safe-area-inset-bottom))] pt-10">
          <div className="flex flex-1 flex-col justify-between gap-6">
            <div className="space-y-4 text-center">
              <h1 className="text-[30px] font-extrabold leading-[42px] text-espresso-900">
                당신의 감성을 깨우는 공간,
                <br />
                CafeOn 시작하기
              </h1>
              <p className="text-[15px] font-medium leading-6 text-muted-foreground">
                취향이 묻어나는 조용한 카페부터
                <br />
                영감을 주는 감각적인 공간까지 만나보세요.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {loginProviders.map((provider) => {
                const loading = loadingProvider === provider.id;
                const disabled = Boolean(loadingProvider);

                return (
                  <Button
                    key={provider.id}
                    className={cn(
                      "h-[58px] w-full border text-[16px] font-bold",
                      provider.className,
                    )}
                    size="lg"
                    variant="outline"
                    disabled={disabled}
                    onClick={() => handleLogin(provider.id)}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface/80 text-xs font-extrabold text-espresso-800">
                      {provider.icon}
                    </span>
                    {loading ? "로그인 중..." : provider.label}
                  </Button>
                );
              })}
            </div>

            <p className="text-center text-[11px] font-medium leading-[17px] text-muted-foreground">
              계속하기를 누르면 CafeOn의 이용약관과
              <br />
              개인정보 처리방침에 동의한 것으로 간주됩니다.
            </p>
          </div>
        </section>
      </main>

      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </div>
  );
}
