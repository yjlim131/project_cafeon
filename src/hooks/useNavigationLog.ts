import { useCallback, useEffect, useState } from "react";
import type { MapProvider } from "../utils/mapLinks";

export type NavigationLog = {
  id: string;
  cafeId: string;
  cafeName: string;
  address: string;
  provider: MapProvider;
  lat: number;
  lng: number;
  url: string;
  launchedAt: string;
};

const NAVIGATION_LOG_KEY = "cafeon:navigation-log";
const NAVIGATION_LOG_EVENT = "cafeon:navigation-log-change";

function readNavigationLogs(): NavigationLog[] {
  const storedValue = window.localStorage.getItem(NAVIGATION_LOG_KEY);

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function writeNavigationLogs(logs: NavigationLog[]) {
  window.localStorage.setItem(NAVIGATION_LOG_KEY, JSON.stringify(logs));
  window.dispatchEvent(new Event(NAVIGATION_LOG_EVENT));
}

export function useNavigationLog() {
  const [logs, setLogs] = useState<NavigationLog[]>(() =>
    readNavigationLogs(),
  );

  useEffect(() => {
    const syncLogs = () => setLogs(readNavigationLogs());

    window.addEventListener(NAVIGATION_LOG_EVENT, syncLogs);
    window.addEventListener("storage", syncLogs);

    return () => {
      window.removeEventListener(NAVIGATION_LOG_EVENT, syncLogs);
      window.removeEventListener("storage", syncLogs);
    };
  }, []);

  const addNavigationLog = useCallback(
    (log: Omit<NavigationLog, "id" | "launchedAt">) => {
      const nextLog: NavigationLog = {
        ...log,
        id: `navigation-${Date.now()}`,
        launchedAt: new Date().toISOString(),
      };
      const nextLogs = [nextLog, ...readNavigationLogs()].slice(0, 50);

      writeNavigationLogs(nextLogs);
      setLogs(nextLogs);

      return nextLog;
    },
    [],
  );

  return {
    logs,
    addNavigationLog,
  };
}
