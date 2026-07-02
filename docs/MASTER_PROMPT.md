# CafeOn MASTER_PROMPT.md

> 목적: VS Code Codex가 CafeOn 포트폴리오용 모바일 MVP 프로토타입을 단계별로 안정적으로 구현하도록 관리하는 마스터 프롬프트입니다.  
> 범위: 상용 출시용 전체 기능이 아니라, 포트폴리오 시연에 필요한 핵심 페이지와 주요 UX 흐름 구현을 목표로 합니다.  
> 기준 문서: `PROJECT.md`, `USER_FLOW.md`, `PRD.md`, `ERD.md`, `CLAUDE.md`, `DESIGN_SYSTEM.md`

---

## 1. Project Mission

CafeOn은 사용자의 감정, 목적, 취향을 기반으로 지금 어울리는 카페를 추천하는 감성 기반 AI 카페 발견 앱입니다.

이 프로젝트의 목표는 실제 상용 출시가 아니라, 포트폴리오에서 다음 역량을 보여줄 수 있는 모바일 MVP 프로토타입을 제작하는 것입니다.

- 문제 정의 기반 서비스 기획
- 감성 기반 온보딩 UX
- AI 추천 서비스 구조 이해
- 모바일 앱 IA 설계
- React 기반 화면 구현 능력
- Tailwind 기반 디자인 시스템 적용 능력
- Supabase 연동 가능성을 고려한 데이터 구조 설계

---

## 2. MVP Prototype Goal

이번 MVP는 모든 기능을 완전하게 구현하지 않습니다.

핵심은 사용자가 아래 흐름을 실제 앱처럼 경험할 수 있게 만드는 것입니다.

```text
Splash
→ Login
→ Onboarding
→ Preference Summary
→ Home Feed
→ Cafe Detail
→ Collection Save
→ AI Chat Recommendation
→ My Page
```

### MVP에서 보여줘야 할 핵심 가치

1. 사용자가 카페를 검색하는 것이 아니라 감성 카드로 발견한다.
2. 온보딩에서 무드 태그가 아니라 공간 분위기 카테고리를 선택한다.
3. AI 추천은 추천 이유와 함께 제시된다.
4. 저장, 상세, MY 페이지까지 기본적인 앱 구조가 완성되어 있다.
5. 전체 UI가 Warm Neutral + Espresso + Cream 톤으로 일관된다.

---

## 3. Non-Goal

아래 기능은 MVP 프로토타입에서 완전 구현하지 않습니다.

- 실제 AI API 연동
- 실제 위치 기반 추천
- 실제 날씨 API 연동
- 실제 카카오/네이버/구글 OAuth
- 실제 결제
- 실제 지도 SDK 연동
- 실제 푸시 알림
- 관리자 페이지
- 입점 신청 기능
- 고도화된 추천 알고리즘
- 실시간 데이터 수집
- 복잡한 RLS 정책 구현
- 완전한 Supabase CRUD 전부 구현

필요한 경우 mock data와 local state로 대체합니다.

---

## 4. Documents Priority

Codex는 아래 우선순위로 문서를 참고합니다.

1. `MASTER_PROMPT.md`  
   - 구현 범위와 단계 관리 기준

2. `DESIGN_SYSTEM.md`  
   - UI 톤, 컬러, 컴포넌트 스타일

3. `CLAUDE.md`  
   - 기술 스택, 폴더 구조, 개발 규칙

4. `USER_FLOW.md`  
   - 화면 이동 흐름

5. `PRD.md`  
   - 화면별 기능 명세

6. `PROJECT.md`  
   - 서비스 개요와 기획 방향

7. `ERD.md`  
   - Supabase 확장 설계 참고

---

## 5. Tech Stack

다음 스택을 기준으로 구현합니다.

```text
React
Vite
TypeScript
Tailwind CSS
React Router
Lucide React
Supabase Client
shadcn/ui
```

### Preferred Libraries

- `react-router-dom`: 페이지 라우팅
- `lucide-react`: 아이콘
- `@supabase/supabase-js`: Supabase 연결 준비
- `class-variance-authority`: 컴포넌트 variant 관리
- `clsx`, `tailwind-merge`: className 정리
- `framer-motion` 또는 CSS transition: 부드러운 전환

단, MVP에서는 복잡한 상태관리 라이브러리를 필수로 사용하지 않습니다.

---

## 6. Implementation Strategy

Codex는 반드시 단계별로 구현합니다.

한 번에 전체 앱을 만들지 않습니다.

각 Phase는 다음 순서로 진행합니다.

```text
Phase 0. Project Setup
Phase 1. Design Foundation
Phase 2. App Shell & Routing
Phase 3. Mock Data
Phase 4. Onboarding
Phase 5. Home Feed
Phase 6. Cafe Detail & Collection Save
Phase 7. AI Chat Prototype
Phase 8. My Page
Phase 9. Polish & QA
```

각 Phase가 끝나면 다음을 확인합니다.

- 앱이 실행되는가?
- TypeScript 에러가 없는가?
- 주요 화면 이동이 되는가?
- 디자인 시스템이 깨지지 않는가?
- 불필요한 중복 컴포넌트가 생기지 않았는가?

---

## 7. Global Rules

### 7.1 Do

- 기존 문서를 먼저 읽고 구현합니다.
- 기존 컴포넌트가 있는지 확인한 뒤 새 컴포넌트를 만듭니다.
- 모바일 우선으로 구현합니다.
- 최대 너비는 `430px` 기준으로 맞춥니다.
- 디자인 시스템 컬러를 우선 사용합니다.
- 모든 화면은 포트폴리오 시연이 가능하도록 자연스럽게 연결합니다.
- 실제 데이터가 없어도 mock data로 화면이 완성되어 보여야 합니다.
- 기능보다 UI 완성도와 UX 흐름을 우선합니다.

### 7.2 Do Not

- 한 번에 전체 기능을 무리하게 구현하지 않습니다.
- 백엔드 구현에 시간을 과도하게 쓰지 않습니다.
- 실제 AI API를 임의로 붙이지 않습니다.
- 실제 OAuth를 완성하려고 하지 않습니다.
- CSS Module, styled-components를 사용하지 않습니다.
- 같은 역할의 컴포넌트를 중복 생성하지 않습니다.
- 문서에 없는 새로운 주요 기능을 임의로 추가하지 않습니다.
- 디자인 시스템과 다른 색상을 임의로 사용하지 않습니다.
- 데스크톱 레이아웃을 먼저 만들지 않습니다.

---

## 8. Folder Structure

아래 구조를 기본으로 합니다.

```text
src/
├── app/
│   ├── App.tsx
│   └── router.tsx
│
├── pages/
│   ├── splash/
│   ├── login/
│   ├── onboarding/
│   ├── home/
│   ├── ai/
│   ├── cafe/
│   ├── collection/
│   └── my/
│
├── features/
│   ├── onboarding/
│   ├── feed/
│   ├── ai/
│   ├── cafe/
│   ├── collection/
│   └── my/
│
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── data/
│   ├── mockCafes.ts
│   ├── mockMoodCategories.ts
│   └── mockUser.ts
│
├── hooks/
├── services/
│   └── supabase/
├── styles/
│   └── globals.css
├── types/
└── utils/
```

---

## 9. Route Structure

MVP 라우트는 아래만 우선 구현합니다.

```text
/                     Splash
/login                Login
/onboarding           Onboarding Mood Category
/onboarding/summary   Preference Summary
/home                 Home Feed
/ai                   AI Chat
/cafe/:id             Cafe Detail
/collections          Collection
/my                   My Page
/my/profile           Profile Edit
/my/notices           Notice List
/my/notices/:id       Notice Detail
/my/terms             Terms
```

### Routing Rule

- 처음 진입은 `/`입니다.
- Splash에서 CTA 또는 자동 이동으로 `/login` 이동.
- Login에서 로그인 버튼 클릭 시 `/onboarding` 이동.
- Onboarding 완료 시 `/onboarding/summary` 이동.
- Summary 완료 시 `/home` 이동.
- 하단 탭은 `/home`, `/ai`, `/collections`, `/my`에서만 보입니다.
- Login, Onboarding, Detail 일부 화면에서는 하단 탭을 숨길 수 있습니다.

---

## 10. UI Foundation

### 10.1 App Container

모바일 앱처럼 보이도록 중앙 정렬된 컨테이너를 사용합니다.

```tsx
<div className="min-h-screen bg-cream-200">
  <main className="mx-auto min-h-screen max-w-[430px] bg-background text-foreground">
    ...
  </main>
</div>
```

### 10.2 Bottom Navigation

하단 탭은 반드시 구현합니다.

```text
발견
AI
컬렉션
MY
```

- 발견: Compass
- AI: Sparkles
- 컬렉션: Bookmark
- MY: User

AI 탭은 약간 강조하되 과하지 않게 처리합니다.

---

## 11. Mock Data Rule

MVP에서는 mock data를 적극 사용합니다.

### 11.1 Mood Categories

8개 고정 데이터로 구현합니다.

```text
vintage
minimal
nature
cozy
local
rooftop
work
specialty
```

각 데이터는 다음 필드를 포함합니다.

```ts
type MoodCategory = {
  id: string;
  title: string;
  keywords: string[];
  description: string;
  images: string[];
  palette: string[];
};
```

### 11.2 Cafe Data

최소 8개 카페 데이터를 만듭니다.

```ts
type Cafe = {
  id: string;
  name: string;
  area: string;
  distance: string;
  isOpen: boolean;
  images: string[];
  moodCategoryIds: string[];
  moodTags: string[];
  reason: string;
  address: string;
  hours: string;
  priceRange: string;
  facilities: string[];
};
```

### 11.3 Image Rule

- MVP에서는 외부 이미지 URL 또는 placeholder 이미지를 사용할 수 있습니다.
- 단, 카페 앱처럼 보이도록 이미지 영역은 반드시 실제 이미지 비율로 구성합니다.
- 이미지가 없을 때는 Warm Neutral gradient placeholder를 사용합니다.

---

## 12. Component Convention

### 12.1 Common Components

먼저 아래 공통 컴포넌트를 만듭니다.

```text
Button
Card
Chip
Badge
BottomSheet
PageHeader
BottomNavigation
AppShell
```

### 12.2 Feature Components

#### Onboarding

```text
MoodCategoryCard
MoodBoardModal
PreferenceSummary
```

#### Home Feed

```text
ContextBanner
HomeLocationSelector
MoodFilterTabs
CafeFeedCard
```

#### AI

```text
AiChatInput
AiMessageBubble
RecommendationCard
FollowUpChips
```

#### Cafe

```text
CafeHero
CafeInfoSection
CafeActionBar
```

#### Collection

```text
SavedCafeCard
CollectionEmptyState
```

#### My

```text
ProfileSummaryCard
MyMoodTags
RecentVisitList
SettingListItem
```

---

## 13. Phase Plan

# Phase 0. Project Setup

## Goal

프로젝트 실행 환경을 준비합니다.

## Tasks

- React + Vite + TypeScript 프로젝트 확인
- Tailwind 설정 확인
- 라우터 설정
- 기본 폴더 구조 생성
- docs 문서 경로 확인

## Done

- `npm install` 완료
- `npm run dev` 실행 가능
- 빈 앱이 브라우저에서 열림

---

# Phase 1. Design Foundation

## Goal

CafeOn 디자인 시스템을 코드에 적용합니다.

## Tasks

- `DESIGN_SYSTEM.md`의 컬러 토큰 적용
- `globals.css` 작성
- app container 스타일 적용
- Button, Card, Chip, Badge 기본 구현
- 공통 shadow, radius, spacing 적용

## Done

- Warm Neutral + Espresso + Cream 톤이 화면에 반영됨
- 공통 컴포넌트가 재사용 가능함

---

# Phase 2. App Shell & Routing

## Goal

기본 앱 구조와 탭 이동을 구현합니다.

## Tasks

- `AppShell` 구현
- `BottomNavigation` 구현
- 라우트 연결
- Splash, Login, Home, AI, Collection, My placeholder 생성

## Done

- 하단 탭으로 4개 메인 화면 이동 가능
- 모바일 앱 프레임처럼 보임
- Placeholder 화면에서도 디자인 톤 유지

---

# Phase 3. Mock Data

## Goal

프로토타입 화면을 채울 데이터 생성.

## Tasks

- `mockMoodCategories.ts`
- `mockCafes.ts`
- `mockUser.ts`
- 데이터 타입 정의

## Done

- 홈 피드에 카페 카드가 표시될 수 있음
- 온보딩에 분위기 카테고리가 표시될 수 있음
- MY 페이지에 사용자 정보가 표시될 수 있음

---

# Phase 4. Onboarding

## Goal

CafeOn의 핵심인 공간 취향 선택 경험 구현.

## Screens

- Login
- Onboarding Mood Category
- MoodBoard Modal
- Neighborhood Setup
- Preference Summary

## Tasks

- Onboarding Mood Category 온보딩 메인 문구 적용
```text
마음에 드는 공간을 골라주세요.
AI가 당신의 공간 취향을 학습하여 지금 가장 어울리는 카페를 추천합니다.
```

- Neighborhood Setup 온보딩 메인 문구 적용
```text
자주 찾는 동네를 알려주세요.

관심 있는 동네를 설정하면
가까운 카페부터 먼저 추천해드려요.
```

- 8개 Mood Category 2열 카드 구현
- 카드 탭 시 MoodBoard Modal 표시
- `이 분위기 선택` 버튼 구현
- 최소 3개 선택 validation
- 선택 완료 시 Neighborhood Setup 이동
- Preference Summary 이동
- Summary에서 `/home` 이동

## Done

- 사용자가 3개 이상 공간 분위기를 선택할 수 있음
- 사용자가 최대 3개의 관심 동네를 선택할 수 있음
- 선택한 분위기 + 동네를 모두 반영한 요약 summary에 표시됨
- 홈으로 이동 가능

---

# Phase 5. Home Feed

## Goal

검색이 아닌 발견 중심 홈 피드 구현.

## Tasks

- ContextBanner 구현
- HomeLocationSelector 구현
- MoodFilterTabs 구현
- CafeFeedCard 구현
- 카페 카드 클릭 시 상세 이동
- 저장 아이콘 UI 표시
- 추천 이유 문구 표시

## Done

- 홈에서 감성 카페 카드 피드를 볼 수 있음
- 카페 상세로 이동 가능
- 추천 이유가 보임

---

# Phase 6. Cafe Detail & Collection Save

## Goal

카페 상세와 저장 흐름 구현.

## Tasks

- Cafe Detail 페이지 구현
- Hero Image
- 기본 정보
- Mood Tags
- AI 추천 이유
- 운영 정보
- 지도 미리보기 placeholder
- 하단 액션바: 저장 / 공유 / 길찾기
- 저장 클릭 시 BottomSheet 표시
- 저장 완료 toast 표시
- Collection 페이지에 저장된 카페 mock 반영

## Done

- 카페 상세 화면이 포트폴리오 시연 가능 수준으로 보임
- 저장 BottomSheet가 동작함
- Collection 화면에서 저장 상태를 확인할 수 있음

---

# Phase 7. AI Chat Prototype

## Goal

실제 AI 없이도 AI 추천 경험을 보여주는 프로토타입 구현.

## Tasks

- AI Chat 화면 구현
- Context Pill Strip 표시
- 예시 사용자 메시지 표시
- AI 응답 메시지 표시
- RecommendationCard 표시
- Follow-up Chips 표시
- 입력창 UI 구현
- 메시지 입력 시 mock 응답 추가

## Done

- AI 추천이 대화 흐름 안에서 보임
- 추천 카드 클릭 시 Cafe Detail 이동
- 후속 조건 칩이 표시됨

---

# Phase 8. My Page

## Goal

사용자 취향 정보와 기본 설정 구조 구현.

## Tasks

- ProfileSummaryCard
- MyMoodTags
- RecentVisitList: 최신순 2개
- SettingList
- 프로필 수정 placeholder
- 공지사항 list/detail placeholder
- 약관 페이지 placeholder

## Done

- MY 페이지가 설정 목록이 아니라 개인 취향 대시보드처럼 보임
- 최근 방문 카페 2개 표시
- 내 무드 태그 표시
- 설정 메뉴 이동 가능

---

# Phase 9. Polish & QA

## Goal

포트폴리오 시연 완성도 확보.

## Tasks

- 전체 라우팅 점검
- 모바일 화면 여백 점검
- 하단 탭 겹침 확인
- 카드 이미지 비율 확인
- CTA 문구 확인
- 빈 상태 / 에러 상태 최소 구현
- TypeScript 에러 제거
- Console error 제거
- README 실행 방법 작성

## Done

- `npm run dev` 실행 가능
- 주요 플로우가 끊기지 않음
- 포트폴리오 발표에서 화면 시연 가능

---

## 14. Portfolio MVP Acceptance Criteria

이 MVP는 아래 조건을 만족하면 완료로 봅니다.

### Flow

- [ ] Splash → Login 이동
- [ ] Login → Onboarding 이동
- [ ] Mood Category 3개 이상 선택 가능
- [ ] MoodBoard Modal 확인 가능
- [ ] Preference Summary 확인 가능
- [ ] Home Feed 진입 가능
- [ ] Cafe Detail 진입 가능
- [ ] 저장 BottomSheet 확인 가능
- [ ] Collection 화면 확인 가능
- [ ] AI Chat 추천 카드 확인 가능
- [ ] MY 페이지 확인 가능

### UI

- [ ] 전체 컬러가 Warm Neutral + Espresso + Cream 톤으로 통일됨
- [ ] 하단 탭이 모바일 앱처럼 동작함
- [ ] 카드, 버튼, 바텀시트 스타일이 일관됨
- [ ] 홈 피드가 이미지 중심으로 보임
- [ ] AI 추천 이유가 명확히 보임
- [ ] MY 페이지에 프로필/무드/최근 방문이 보임

### Code

- [ ] TypeScript 에러 없음
- [ ] 불필요한 중복 컴포넌트 없음
- [ ] mock data가 분리되어 있음
- [ ] route 구조가 명확함
- [ ] 파일명이 역할을 설명함

---

## 15. Supabase Rule for Prototype

MVP 프로토타입에서는 Supabase를 다음 수준까지만 준비합니다.

### Must

- Supabase client 파일 생성
- 환경변수 예시 작성
- 타입 구조가 Supabase 확장에 맞게 설계됨

### Optional

- 실제 Auth 연결
- 실제 cafes select 연결
- 실제 storage image 연결

### Not Required

- 모든 테이블 실제 생성
- RLS 완성
- Edge Function 구현
- 실제 추천 알고리즘 구현

---

## 16. State Rule

### Local UI State

아래는 `useState`로 처리합니다.

- 모달 open/close
- 바텀시트 open/close
- 선택된 mood categories
- 현재 입력 메시지
- toast 표시

### Mock App State

아래는 우선 local state 또는 mock data로 처리합니다.

- 저장된 카페
- 최근 방문
- 선택한 취향
- AI 추천 응답

### Server State

실제 Supabase 연결 전까지 TanStack Query는 필수로 쓰지 않아도 됩니다.

---

## 17. Copy Rule

### Onboarding

```text
마음에 드는 공간을 골라주세요.
AI가 당신의 공간 취향을 학습하여 지금 가장 어울리는 카페를 추천합니다.
```

### Recommendation Reason

```text
회원님이 선택한 빈티지 감성과 일치해요.
```

```text
비 오는 오후라 조용하고 따뜻한 조명의 공간을 골랐어요.
```

### Feedback

```text
다음 추천에 반영할게요.
```

### Empty Collection

```text
아직 저장한 카페가 없어요.
마음에 드는 공간을 발견하면 저장해보세요.
```

---

## 18. Codex Response Rule

Codex는 작업할 때 매번 아래 형식으로 응답합니다.

```text
이번 단계:
완료한 작업:
생성/수정한 파일:
확인 방법:
다음 추천 단계:
```

### Example

```text
이번 단계:
Phase 2. App Shell & Routing

완료한 작업:
- AppShell 구현
- BottomNavigation 구현
- 기본 라우트 연결

생성/수정한 파일:
- src/app/App.tsx
- src/app/router.tsx
- src/components/layout/AppShell.tsx
- src/components/layout/BottomNavigation.tsx

확인 방법:
npm run dev 실행 후 /home, /ai, /collections, /my 이동 확인

다음 추천 단계:
Phase 3. Mock Data 생성
```

---

## 19. First Prompt to Run in Codex

VS Code Codex에 처음 넣을 프롬프트는 아래를 사용합니다.

```text
docs 폴더의 문서를 읽고 CafeOn 포트폴리오용 모바일 MVP 프로토타입을 구현해줘.

반드시 MASTER_PROMPT.md를 최우선 기준으로 따르고,
DESIGN_SYSTEM.md의 Warm Neutral + Espresso + Cream 디자인 시스템을 적용해.

이번에는 Phase 0~2까지만 진행해.

목표:
- 프로젝트 구조 정리
- Tailwind 디자인 토큰 적용 준비
- AppShell 구현
- React Router 라우팅 구현
- BottomNavigation 구현
- Splash, Login, Home, AI, Collection, My placeholder page 생성

주의:
- 아직 온보딩 세부 기능은 구현하지 마.
- 아직 Supabase 실제 연동은 하지 마.
- 아직 AI 기능은 구현하지 마.
- 모바일 max-width 430px 기준으로 구현해.
- 기존 docs 문서와 충돌하지 않게 구현해.

완료 후 생성/수정한 파일과 실행 방법을 알려줘.
```

---

## 20. Second Prompt to Run in Codex

Phase 0~2가 완료된 뒤 아래를 사용합니다.

```text
이전 단계가 정상 동작하는 것을 기준으로 Phase 3~4를 구현해줘.

목표:
- mockMoodCategories.ts 생성
- mockCafes.ts 생성
- mockUser.ts 생성
- Onboarding Mood Category 화면 구현
- MoodCategoryCard 구현
- MoodBoardModal 구현
- 최소 3개 선택 validation 구현
- Preference Summary 화면 구현
- Summary에서 Home으로 이동 구현

주의:
- 디자인은 DESIGN_SYSTEM.md를 따른다.
- 온보딩 메인 문구는 MASTER_PROMPT.md의 문구를 그대로 사용한다.
- 실제 Supabase 저장은 하지 않고 local state 또는 mock으로 처리한다.
- 기능보다 포트폴리오 시연 가능한 완성도를 우선한다.
```

---

## 21. Third Prompt to Run in Codex

```text
Phase 5~6을 구현해줘.

목표:
- Home Feed 화면 구현
- ContextBanner 구현
- HomeLocationSelector 구현
- MoodFilterTabs 구현
- CafeFeedCard 구현
- Cafe Detail 화면 구현
- CafeHero, CafeInfoSection, CafeActionBar 구현
- 저장 버튼 클릭 시 BottomSheet 표시
- 저장 완료 Toast 표시
- Collection 화면에 저장된 카페 표시

주의:
- mockCafes 데이터를 사용한다.
- 카드 이미지는 감성 카페 앱처럼 크게 보여준다.
- 추천 이유 문구를 반드시 표시한다.
- 지도는 실제 SDK가 아니라 placeholder로 구현한다.
```

---

## 22. Fourth Prompt to Run in Codex

```text
Phase 7~8을 구현해줘.

목표:
- AI Chat Prototype 구현
- Context Pill Strip 구현
- AI mock 응답 구현
- RecommendationCard 구현
- FollowUpChips 구현
- 추천 카드 클릭 시 Cafe Detail 이동
- My Page 구현
- ProfileSummaryCard 구현
- MyMoodTags 구현
- RecentVisitList 최신순 2개 표시
- SettingList 구현
- 공지사항/약관 placeholder route 구현

주의:
- 실제 AI API는 연결하지 않는다.
- 실제 푸시/알림 기능은 구현하지 않는다.
- 포트폴리오 시연에서 핵심 UX가 보이는 수준으로 구현한다.
```

---

## 23. Final QA Prompt

```text
전체 MVP 프로토타입을 QA하고 polish 해줘.

확인할 것:
- npm run dev 실행 가능 여부
- TypeScript 에러 제거
- 라우팅 오류 제거
- 모바일 max-width 430px 유지
- 하단 네비게이션 겹침 제거
- 주요 CTA 동작 확인
- Splash → Login → Onboarding → Home 흐름 확인
- Home → Detail → Save → Collection 흐름 확인
- AI → RecommendationCard → Detail 흐름 확인
- My 페이지 정보 표시 확인
- DESIGN_SYSTEM.md와 다른 색상/스타일 사용 여부 점검

완료 후 수정한 파일과 남은 이슈를 정리해줘.
```

---

## 24. Final Note

이 MASTER_PROMPT는 상용화 전체 구현이 아니라 포트폴리오용 MVP 프로토타입 구현을 위한 문서입니다.

따라서 Codex는 기능의 완전성보다 다음을 우선해야 합니다.

1. 화면 완성도
2. 사용자 흐름의 명확성
3. 서비스 기획 의도 전달
4. 일관된 디자인 시스템
5. 코드 구조의 설명 가능성
