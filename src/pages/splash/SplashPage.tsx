import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import squareLogo from "../../assets/cafeon-logo-square.svg";

export function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="app-container flex flex-col justify-between px-6 py-8">
        <div />
        <section className="flex flex-col items-center text-center">
          <img
            src={squareLogo}
            alt="CafeOn"
            className="w-full max-w-[320px] object-contain"
          />
          <p className="mt-7 text-[15px] leading-6 text-muted-foreground">
            검색이 아닌 발견으로,
            <br />
            지금 나에게 맞는 공간을 이어줘요.
          </p>
        </section>
        <Button className="w-full" size="lg" onClick={() => navigate("/login")}>
          시작하기
        </Button>
      </main>
    </div>
  );
}
