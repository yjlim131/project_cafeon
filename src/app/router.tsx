import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./App";
import { AppShell } from "../components/layout/AppShell";
import { AiPage } from "../pages/ai/AiPage";
import { CollectionPage } from "../pages/collections/CollectionPage";
import { CafeDetailPage } from "../pages/cafe/CafeDetailPage";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage } from "../pages/login/LoginPage";
import { MyPage } from "../pages/my/MyPage";
import { NoticeDetailPage } from "../pages/my/NoticeDetailPage";
import { NoticeListPage } from "../pages/my/NoticeListPage";
import { TermsPage } from "../pages/my/TermsPage";
import { NeighborhoodSetupPage } from "../pages/onboarding/NeighborhoodSetupPage";
import { OnboardingPage } from "../pages/onboarding/OnboardingPage";
import { PreferenceSummaryPage } from "../pages/onboarding/PreferenceSummaryPage";
import { SplashPage } from "../pages/splash/SplashPage";
import { isMockLoggedIn } from "../hooks/useMockAuth";

function requireMockLogin() {
  if (!isMockLoggedIn()) {
    return redirect("/login");
  }

  return null;
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/onboarding",
        loader: requireMockLogin,
        element: <OnboardingPage />,
      },
      {
        path: "/onboarding/neighborhoods",
        loader: requireMockLogin,
        element: <NeighborhoodSetupPage />,
      },
      {
        path: "/onboarding/summary",
        loader: requireMockLogin,
        element: <PreferenceSummaryPage />,
      },
      {
        element: <AppShell />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/cafe/:id",
            element: <CafeDetailPage />,
          },
          {
            path: "/ai",
            element: <AiPage />,
          },
          {
            path: "/collections",
            element: <CollectionPage />,
          },
          {
            path: "/my",
            element: <MyPage />,
          },
          {
            path: "/my/notices",
            element: <NoticeListPage />,
          },
          {
            path: "/my/notices/:id",
            element: <NoticeDetailPage />,
          },
          {
            path: "/my/terms",
            element: <TermsPage />,
          },
        ],
      },
    ],
  },
]);
