# CafeOn MVP

CafeOn은 사용자의 취향, 시간, 날씨, 동네 맥락을 바탕으로 지금 어울리는 카페를 추천하는 모바일 웹 MVP입니다. 실제 백엔드 연동 전 단계의 포트폴리오용 프로토타입이며, 추천/로그인/저장/방문 피드백은 mock data와 localStorage 기반으로 동작합니다.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- lucide-react

## Getting Started

```bash
npm install
npm run dev
```

개발 서버 기본 주소는 `http://localhost:5173`입니다. 해당 포트가 사용 중이면 Vite가 다음 포트로 자동 실행합니다.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Main Routes

- `/` Splash
- `/login` Mock social login
- `/onboarding` Mood category
- `/onboarding/neighborhoods` Neighborhood setup
- `/onboarding/summary` Preference summary
- `/home` Home feed
- `/cafe/:id` Cafe detail
- `/ai` Mock AI recommendation chat
- `/collections` Saved cafe collections
- `/my` Profile and settings

## MVP Features

- Mock social login with Kakao, Naver, Google providers
- Mood category onboarding and preference summary
- Home feed with context banner, location selector, mood filter, recommendation cards
- Cafe detail with save, share, and external map navigation link generation
- Collection save flow with bottom sheet and custom collection creation
- Collection grid, empty state, and saved cafe removal
- Mock AI chat recommendation response
- Collection long-press visit feedback sheet
- Profile, mood tags, recent visits, notices, and terms screens

## Mock Storage

The MVP stores temporary state in `localStorage`.

- `cafeon_mock_logged_in`
- `cafeon_mock_provider`
- `cafeon:selectedMoodCategoryIds`
- `cafeon:selectedNeighborhoods`
- collection and navigation log related mock keys

Clear browser storage if you want to reset the demo state.

## Not Implemented Yet

- Real OAuth
- Supabase CRUD persistence
- Real OpenAI API connection
- Map SDK integration
- GPS arrival detection
- Push notifications
- Search, sorting, and collection folder management

## QA

Verified with:

```bash
npm run build
npm run dev -- --host 127.0.0.1 --clearScreen false
```

The production build passes TypeScript checks and Vite bundling.
