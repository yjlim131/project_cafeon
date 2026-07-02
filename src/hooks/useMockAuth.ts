import { useCallback, useState } from "react";
import { mockUser } from "../data/mockUser";

export type MockAuthProvider = "kakao" | "naver" | "google";

const MOCK_LOGIN_KEY = "cafeon_mock_logged_in";
const MOCK_PROVIDER_KEY = "cafeon_mock_provider";
const MOCK_USER_KEY = "cafeon_mock_user";

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function isMockLoggedIn() {
  return window.localStorage.getItem(MOCK_LOGIN_KEY) === "true";
}

export function useMockAuth() {
  const [loadingProvider, setLoadingProvider] =
    useState<MockAuthProvider | null>(null);

  const login = useCallback(async (provider: MockAuthProvider) => {
    setLoadingProvider(provider);
    const delay = 300 + Math.floor(Math.random() * 301);

    await wait(delay);

    window.localStorage.setItem(MOCK_LOGIN_KEY, "true");
    window.localStorage.setItem(MOCK_PROVIDER_KEY, provider);
    window.localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
    setLoadingProvider(null);

    return mockUser;
  }, []);

  return {
    loadingProvider,
    login,
  };
}
