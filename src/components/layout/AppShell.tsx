import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { BottomNavigation } from "./BottomNavigation";

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCafeDetail = location.pathname.startsWith("/cafe/");

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <main className={`app-container ${isCafeDetail ? "" : "safe-bottom"}`}>
        <AppHeader detail={isCafeDetail} onBack={handleBack} />
        <Outlet />
      </main>
      {isCafeDetail ? null : <BottomNavigation />}
    </div>
  );
}
