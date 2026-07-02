import { useCallback, useEffect, useState } from "react";

export type VisitFeedbackRating = "good" | "neutral" | "bad";

export type VisitFeedback = {
  id: string;
  cafeId: string;
  cafeName: string;
  visited: boolean;
  rating?: VisitFeedbackRating;
  confirmedMoods: string[];
  submittedAt: string;
};

export type VisitFeedbackInput = Omit<VisitFeedback, "id" | "submittedAt">;

const VISIT_FEEDBACK_KEY = "cafeon:visit-feedback";
const VISIT_FEEDBACK_EVENT = "cafeon:visit-feedback-change";

function readVisitFeedbacks(): VisitFeedback[] {
  const storedValue = window.localStorage.getItem(VISIT_FEEDBACK_KEY);

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

function writeVisitFeedbacks(feedbacks: VisitFeedback[]) {
  window.localStorage.setItem(VISIT_FEEDBACK_KEY, JSON.stringify(feedbacks));
  window.dispatchEvent(new Event(VISIT_FEEDBACK_EVENT));
}

export function useVisitFeedback() {
  const [feedbacks, setFeedbacks] = useState<VisitFeedback[]>(() =>
    readVisitFeedbacks(),
  );

  useEffect(() => {
    const syncFeedbacks = () => setFeedbacks(readVisitFeedbacks());

    window.addEventListener(VISIT_FEEDBACK_EVENT, syncFeedbacks);
    window.addEventListener("storage", syncFeedbacks);

    return () => {
      window.removeEventListener(VISIT_FEEDBACK_EVENT, syncFeedbacks);
      window.removeEventListener("storage", syncFeedbacks);
    };
  }, []);

  const submitFeedback = useCallback((input: VisitFeedbackInput) => {
    const nextFeedback: VisitFeedback = {
      ...input,
      id: `visit-feedback-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    const nextFeedbacks = [nextFeedback, ...readVisitFeedbacks()].slice(0, 50);

    writeVisitFeedbacks(nextFeedbacks);
    setFeedbacks(nextFeedbacks);

    return nextFeedback;
  }, []);

  return {
    feedbacks,
    submitFeedback,
  };
}
