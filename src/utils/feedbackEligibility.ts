import type { NavigationLog } from "../hooks/useNavigationLog";

const MIN_FEEDBACK_DELAY_MS = 30 * 60 * 1000;
const MAX_FEEDBACK_DELAY_MS = 3 * 60 * 60 * 1000;

export function isWithinVisitFeedbackWindow(
  launchedAt: string,
  now = new Date(),
) {
  const launchedTime = new Date(launchedAt).getTime();

  if (Number.isNaN(launchedTime)) return false;

  const elapsed = now.getTime() - launchedTime;

  return elapsed >= MIN_FEEDBACK_DELAY_MS && elapsed <= MAX_FEEDBACK_DELAY_MS;
}

export function getLatestNavigationLogForCafe(
  logs: NavigationLog[],
  cafeId: string,
) {
  return logs.find((log) => log.cafeId === cafeId);
}

export function canEnterVisitFeedback({
  cafeId,
  logs,
  mockPass = true,
}: {
  cafeId: string;
  logs: NavigationLog[];
  mockPass?: boolean;
}) {
  const latestLog = getLatestNavigationLogForCafe(logs, cafeId);

  if (!latestLog) return false;
  if (mockPass) return true;

  return isWithinVisitFeedbackWindow(latestLog.launchedAt);
}
