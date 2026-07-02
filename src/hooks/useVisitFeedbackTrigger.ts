import { useCallback } from "react";
import { useNavigationLog } from "./useNavigationLog";
import {
  canEnterVisitFeedback,
  getLatestNavigationLogForCafe,
} from "../utils/feedbackEligibility";

export function useVisitFeedbackTrigger() {
  const { logs } = useNavigationLog();

  const canEnterFeedback = useCallback(
    (cafeId: string) =>
      canEnterVisitFeedback({
        cafeId,
        logs,
        mockPass: true,
      }),
    [logs],
  );

  const getLatestLog = useCallback(
    (cafeId: string) => getLatestNavigationLogForCafe(logs, cafeId),
    [logs],
  );

  return {
    logs,
    canEnterFeedback,
    getLatestLog,
  };
}
