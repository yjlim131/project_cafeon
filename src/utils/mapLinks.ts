import type { Cafe } from "../types/cafe";

export type MapProvider = "kakao" | "naver" | "google";

export type MapLinkTarget = {
  provider: MapProvider;
  label: string;
  url: string;
  lat: number;
  lng: number;
};

const mockCoordinates: Record<string, { lat: number; lng: number }> = {
  "cafe-001": { lat: 37.5447, lng: 127.0557 },
  "cafe-002": { lat: 37.5558, lng: 126.9236 },
  "cafe-003": { lat: 37.5569, lng: 126.9086 },
  "cafe-004": { lat: 37.5496, lng: 126.9181 },
  "cafe-005": { lat: 37.5615, lng: 126.9942 },
  "cafe-006": { lat: 37.5347, lng: 126.9944 },
  "cafe-007": { lat: 37.5454, lng: 127.0539 },
  "cafe-008": { lat: 37.5342, lng: 126.9882 },
};

const fallbackCoordinates = { lat: 37.5665, lng: 126.978 };

export function getCafeCoordinates(cafe: Cafe) {
  return mockCoordinates[cafe.id] ?? fallbackCoordinates;
}

export function buildMapLink(cafe: Cafe, provider: MapProvider): MapLinkTarget {
  const { lat, lng } = getCafeCoordinates(cafe);
  const name = encodeURIComponent(cafe.name);
  const address = encodeURIComponent(cafe.address);
  const destination = encodeURIComponent(`${cafe.name} ${cafe.address}`);

  const urls: Record<MapProvider, string> = {
    kakao: `https://map.kakao.com/link/to/${name},${lat},${lng}`,
    naver: `https://map.naver.com/v5/search/${destination}?c=${lng},${lat},15,0,0,0,dh`,
    google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&query=${address}`,
  };

  const labels: Record<MapProvider, string> = {
    kakao: "카카오맵",
    naver: "네이버지도",
    google: "구글맵",
  };

  return {
    provider,
    label: labels[provider],
    url: urls[provider],
    lat,
    lng,
  };
}

export function buildMapLinks(cafe: Cafe): MapLinkTarget[] {
  return [
    buildMapLink(cafe, "kakao"),
    buildMapLink(cafe, "naver"),
    buildMapLink(cafe, "google"),
  ];
}
