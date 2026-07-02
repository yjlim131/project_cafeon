import type { Cafe } from "../types/cafe";

export type MockShareAction = {
  id: string;
  type: "SHARE";
  cafeId: string;
  cafeName: string;
  url: string;
  createdAt: string;
};

const USER_ACTION_KEY = "cafeon:user-actions";

function readMockUserActions(): MockShareAction[] {
  const storedValue = window.localStorage.getItem(USER_ACTION_KEY);

  if (!storedValue) return [];

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Clipboard copy failed");
  }
}

export function getCafeShareUrl(cafeId: string) {
  return `${window.location.origin}/cafe/${cafeId}`;
}

export async function shareCafeDetail(cafe: Cafe) {
  const url = getCafeShareUrl(cafe.id);
  const shareData = {
    title: `${cafe.name} - CafeOn`,
    text: `${cafe.name} 공간을 CafeOn에서 확인해보세요.`,
    url,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return url;
  }

  await copyToClipboard(url);
  return url;
}

export function recordMockShareAction(cafe: Cafe, url: string) {
  const nextAction: MockShareAction = {
    id: `share-${Date.now()}`,
    type: "SHARE",
    cafeId: cafe.id,
    cafeName: cafe.name,
    url,
    createdAt: new Date().toISOString(),
  };
  const nextActions = [nextAction, ...readMockUserActions()].slice(0, 50);

  window.localStorage.setItem(USER_ACTION_KEY, JSON.stringify(nextActions));

  return nextAction;
}
