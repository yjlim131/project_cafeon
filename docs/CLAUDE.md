# CafeOn CLAUDE.md

## 1. 프로젝트 역할

너는 CafeOn MVP를 구현하는 시니어 프론트엔드 개발자이자 제품 이해도가 높은 풀스택 개발 보조자다.

CafeOn은 감성 사진 카드 피드와 자연어 기반 AI 추천을 통해 사용자가 지금의 목적, 감정, 취향에 맞는 카페를 발견하도록 돕는 모바일 앱이다.

개발 시 단순한 카페 리스트 앱이 아니라, **검색 피로를 줄이고 감성 기반 발견 경험을 제공하는 추천 서비스**라는 점을 우선 고려한다.

## 2. 기술 스택

- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Supabase Edge Functions
- 모바일 웹 우선 반응형 UI

## 3. 개발 원칙

### UX 원칙

- 지도나 검색창보다 감성 카드 피드를 먼저 보여준다.
- 사용자가 조건을 정리하지 않아도 AI가 맥락을 해석하는 경험을 제공한다.
- 복잡한 필터 UI보다 자연어 입력, 추천 카드, 후속 조건 칩을 우선한다.
- 저장과 공유는 간단하게 처리한다.
- 피드백은 방문 가능성이 높은 경우에만 요청한다.
- 푸시 알림, GPS 도착 감지, 별점 리뷰, 사진 리뷰는 MVP에서 제외한다.

### UI 원칙

- 모바일 앱처럼 보이는 웹 UI로 구현한다.
- Tailwind CSS를 사용한다.
- 감성 카페 이미지가 돋보이도록 여백을 충분히 둔다.
- 과한 색상 사용을 피하고 뉴트럴한 배경과 부드러운 포인트 컬러를 사용한다.
- 주요 인터랙션은 카드, 칩, 바텀시트, 토스트 중심으로 구성한다.
- AI 탭은 하단 네비게이션에서 시각적으로 강조한다.

### 코드 원칙

- TypeScript 타입을 명확히 정의한다.
- 화면, 컴포넌트, 훅, API 로직을 분리한다.
- Supabase 호출은 `lib/supabase` 또는 service 계층으로 분리한다.
- 추천 점수 계산 로직은 UI 컴포넌트 안에 직접 작성하지 않는다.
- 하드코딩 데이터는 MVP용 mock 파일로 분리하고, 이후 Supabase 연동이 쉽도록 만든다.

## 4. 권장 폴더 구조

```txt
src/
  components/
    common/
      BottomNavigation.tsx
      Button.tsx
      Chip.tsx
      BottomSheet.tsx
      Toast.tsx
    cafe/
      CafeCard.tsx
      CafeHero.tsx
      CafeMoodCategories.tsx
      CafeInfoSection.tsx
      MapPreview.tsx
    feed/
      ContextBanner.tsx
      MoodCategoryTabList.tsx
      FeedList.tsx
    onboarding/
      MoodCategoryCard.tsx
      MoodBoardModal.tsx
      PreferenceSummary.tsx
    ai/
      AiContextStrip.tsx
      ChatInput.tsx
      ChatMessage.tsx
      RecommendationCard.tsx
      FollowUpChips.tsx
    collection/
      CollectionList.tsx
      CollectionPickerSheet.tsx
      CollectionCafeCard.tsx
    feedback/
      VisitConfirmSheet.tsx
      RecommendationRating.tsx
      MoodConfirmStep.tsx
    my/
      ProfileSummary.tsx
      EditableMoodCategories.tsx
      RecentVisitedCafes.tsx
      MyMenuList.tsx
      NotificationSettingsForm.tsx
      InquiryForm.tsx
      NoticeList.tsx
      PolicyDocument.tsx
  pages/
    OnboardingPage.tsx
    HomePage.tsx
    AiChatPage.tsx
    CafeDetailPage.tsx
    CollectionsPage.tsx
    MyPage.tsx
    ProfileEditPage.tsx
    MyInfoEditPage.tsx
    MoodPreferenceEditPage.tsx
    NeighborhoodEditPage.tsx
    RecentVisitedCafesPage.tsx
    NotificationSettingsPage.tsx
    InquiryPage.tsx
    NoticesPage.tsx
    NoticeDetailPage.tsx
    PoliciesPage.tsx
    PolicyDetailPage.tsx
  hooks/
    useAuth.ts
    useCafeFeed.ts
    useCollections.ts
    useRecommendation.ts
    useVisitFeedback.ts
    useMyPage.ts
    useProfile.ts
    useNotices.ts
    useInquiry.ts
  lib/
    supabase.ts
    recommendation.ts
    weights.ts
    date.ts
  types/
    cafe.ts
    user.ts
    recommendation.ts
    feedback.ts
  mocks/
    cafes.ts
    moodCategories.ts
```

## 5. 핵심 화면 요구사항

### 5.1 OnboardingPage

신규 사용자가 로그인 후 마음에 드는 공간 이미지를 선택하고, 서비스가 이를 분위기 카테고리와 취향 벡터로 변환하는 화면이다.

온보딩 메인 문구:

```txt
마음에 드는 공간을 골라주세요.
AI가 당신의 공간 취향을 학습하여 지금 가장 어울리는 카페를 추천합니다.
```

필수 구현:

- 소셜 로그인 버튼 영역
- 8개 분위기 카테고리 카드 2열 그리드
- 각 카드에는 이미지 3분할 콜라주, 카테고리명, 키워드 3개 표시
- 카드 탭 시 `MoodBoardModal` 또는 확대 화면 표시
- 무드보드에는 폴라로이드 콜라주 4장, 컬러 스와치, 분위기 설명 표시
- `이 분위기 선택` 버튼 선택 시 선택 완료 후 카드 그리드로 복귀
- 최소 3개 이상 선택 시 다음 버튼 활성화
- 선택 완료 후 `PreferenceSummary` 화면 표시
- 동네 최대 3개 선택
- 동네 설정 스킵 가능
- 선택 결과를 `user_preferences`에 저장할 수 있는 구조

분위기 카테고리는 사용자가 직접 수정하는 자유 태그가 아니라 서비스가 정의한 8개 카테고리 마스터 데이터다. 키워드는 UI 설명과 추천 이유에 사용하는 메타데이터다.

### 5.2 HomePage / 발견 탭

기본 진입 화면이다.

필수 구현:

- 현재 시간, 동네, 날씨를 보여주는 컨텍스트 배너
- 분위기 탭 필터
- 감성 이미지 중심 카페 카드 피드
- 카드 선택 시 CafeDetailPage 이동
- 카드 상세 진입 행동 기록
- 2초 미만 빠른 스크롤 패스는 추후 기록 가능하도록 확장성 확보

### 5.3 AiChatPage

자연어 기반 추천 화면이다.

필수 구현:

- 채팅 진입 시 컨텍스트 필 스트립 표시
- 자연어 입력창
- 사용자 메시지 표시
- AI 응답 메시지 표시
- 추천 결과 카드를 대화 안에 인라인 삽입
- 후속 조건 칩 표시
- 칩 선택 시 추천 조건 갱신
- 추천 카드 선택 시 CafeDetailPage 이동

### 5.4 CafeDetailPage

카페 상세 화면이다.

필수 구현 순서:

1. 히어로 이미지
2. 카페명, 영업 여부, 거리
3. 분위기 카테고리
4. AI 추천 이유
5. 운영 정보
6. 지도 미리보기
7. 하단 고정 액션 버튼: 저장, 공유, 길찾기

액션 처리:

- 저장: 컬렉션 선택 바텀시트 표시
- 공유: OS 기본 공유 시트 사용
- 길찾기: 지도 앱 선택 후 외부 앱 실행, 실행 시각 저장

### 5.5 CollectionsPage

저장된 카페를 컬렉션 단위로 관리한다.

필수 구현:

- 컬렉션 목록
- 컬렉션별 저장 카페 목록
- 신규 컬렉션 생성
- 저장 취소
- 카페 카드 롱프레스 메뉴
- 롱프레스 메뉴 항목: 다녀왔어요, 카페 상세 보기, 다른 컬렉션으로 이동, 저장 취소

### 5.6 VisitFeedback Flow

방문 후 추천 적합도를 평가하는 플로우다.

필수 구현:

- 바텀시트 기반 방문 여부 확인
- 추천 평가 3단계: 잘 맞았어요, 그냥 그랬어요, 별로였어요
- 별로였어요 선택 시 기대와 달랐던 이유 선택 가능
- 실제 분위기 카테고리 최대 2개 선택
- 건너뛰기 지원
- 완료 시 토스트 메시지 표시
- 취향 벡터 업데이트 함수 호출


### 5.7 MyPage / MY 탭

사용자의 개인화 정보와 설정을 관리하는 화면이다. 하단 네비게이션의 MY 탭으로 진입한다.

필수 구현:

- 프로필 영역
  - 프로필 이미지, 이름, 휴대폰번호 요약 노출
  - 프로필 수정 버튼
  - 내 정보 수정 버튼
- 프로필 수정 플로우
  - 공간 취향 설정 수정
  - 동네 설정 수정
- 내 정보 수정 플로우
  - 이름 수정
  - 휴대폰번호 수정
  - 로그아웃
- 내 분위기 카테고리
  - 사용자의 대표 분위기 카테고리를 칩 UI로 노출
  - 편집 시 공간 취향 설정 수정 화면으로 이동
- 최근 방문한 카페
  - 최신순 2개 카드 노출
  - 전체 리스트 보기
  - 리스트와 카드 모두 CafeDetailPage로 이동 가능
- 알림 설정
- 1:1 문의
- 공지사항 및 이용약관
  - 공지사항 리스트 > 상세
  - 약관 및 정책: 이용약관, 개인정보 처리방침, 위치정보 이용약관, 입점정책
  - 버전 정보

구현 원칙:

- 프로필 영역, 내 분위기 카테고리, 최근 방문한 카페는 단순 메뉴형이 아니라 정보가 먼저 보이는 카드형 UI로 구성한다.
- 편집 가능한 항목은 우측 `수정` 또는 `관리` 액션을 둔다.
- 최근 방문한 카페는 방문 피드백 완료 데이터 기준 최신순으로 표시한다.
- 로그아웃은 내 정보 수정 화면 하단에 배치한다.

## 6. Supabase 스키마 가이드

다음 테이블을 기준으로 구현한다.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text,
  avatar_url text,
  created_at timestamptz default now()
);


create table user_neighborhoods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  neighborhood text not null,
  created_at timestamptz default now()
);

create table notification_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade unique,
  service_enabled boolean default true,
  feedback_reminder_enabled boolean default false,
  marketing_enabled boolean default false,
  updated_at timestamptz default now()
);

create table notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  category text not null,
  title text not null,
  content text not null,
  status text default 'submitted',
  created_at timestamptz default now()
);

create table policy_documents (
  id uuid primary key default gen_random_uuid(),
  policy_type text not null,
  title text not null,
  content text not null,
  version text not null,
  effective_date date,
  created_at timestamptz default now()
);

create table mood_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  created_at timestamptz default now()
);

create table cafes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  address text,
  neighborhood text,
  latitude numeric,
  longitude numeric,
  opening_hours jsonb,
  price_range text,
  is_good_for_solo boolean default false,
  created_at timestamptz default now()
);

create table cafe_images (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid references cafes(id) on delete cascade,
  image_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table cafe_mood_categories (
  id uuid primary key default gen_random_uuid(),
  cafe_id uuid references cafes(id) on delete cascade,
  mood_category_id uuid references mood_categories(id) on delete cascade,
  score numeric default 1,
  created_at timestamptz default now()
);

create table user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  mood_category_id uuid references mood_categories(id) on delete cascade,
  weight numeric default 1,
  source text default 'onboarding',
  created_at timestamptz default now()
);

create table user_neighborhoods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  neighborhood text not null,
  created_at timestamptz default now()
);

create table collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table collection_items (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid references collections(id) on delete cascade,
  cafe_id uuid references cafes(id) on delete cascade,
  created_at timestamptz default now(),
  unique(collection_id, cafe_id)
);

create table user_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  cafe_id uuid references cafes(id) on delete cascade,
  action_type text not null,
  weight numeric not null,
  context jsonb,
  created_at timestamptz default now()
);

create table navigation_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  cafe_id uuid references cafes(id) on delete cascade,
  launched_at timestamptz not null default now(),
  reentered_at timestamptz,
  feedback_triggered boolean default false
);

create table visit_feedbacks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  cafe_id uuid references cafes(id) on delete cascade,
  source text not null,
  visit_confirmed boolean not null,
  rating text,
  mismatch_reason text,
  created_at timestamptz default now()
);

create table feedback_mood_categories (
  id uuid primary key default gen_random_uuid(),
  feedback_id uuid references visit_feedbacks(id) on delete cascade,
  mood_category_id uuid references mood_categories(id) on delete cascade
);
```

## 7. 추천 가중치 정책

`lib/weights.ts`에 상수로 분리한다.

```ts
export const ACTION_WEIGHTS = {
  SAVE: 0.25,
  SHARE: 0.2,
  NAVIGATION: 0.15,
  DETAIL_VIEW: 0.1,
  UNSAVE: -0.2,
  QUICK_PASS: -0.05,
} as const;

export const FEEDBACK_WEIGHTS = {
  GOOD: 0.4,
  NEUTRAL: 0.05,
  BAD: -0.35,
  MOOD_MATCH: 0.2,
  MOOD_MISMATCH: -0.1,
  LONG_PRESS_WITHOUT_NAVIGATION_MULTIPLIER: 0.7,
} as const;
```

## 8. 추천 로직 가이드

`lib/recommendation.ts`에 추천 점수 계산 함수를 작성한다.

추천 점수는 다음 요소를 합산한다.

- 사용자 취향 태그와 카페 분위기 카테고리 일치도
- 저장, 공유, 상세 진입, 길찾기 등 행동 신호
- 추천 평가 피드백
- 현재 시간대
- 날씨
- 주요 동네 또는 현재 위치
- 최근 방문 간격에 따른 다양성 가중치

MVP에서는 AI API 없이도 아래 방식으로 구현한다.

```txt
자연어 입력
  → 키워드 추출
  → 분위기 카테고리 매핑
  → 사용자 취향 벡터와 컨텍스트 신호 반영
  → 추천 점수 계산
  → 상위 카페 카드 반환
```

추후 Supabase Edge Function 또는 LLM API 호출로 확장 가능하게 설계한다.

## 9. 주요 인터랙션 상세

### 저장

- 저장 버튼 클릭 시 컬렉션 선택 바텀시트 표시
- 기존 컬렉션 선택 또는 새 컬렉션 생성 가능
- 저장 후 `user_actions`에 `SAVE` 기록
- 자동 피드백 요청 없음

### 공유

- Web Share API 사용
- 지원하지 않는 환경에서는 링크 복사 fallback 제공
- 공유 후 `user_actions`에 `SHARE` 기록
- 자동 피드백 요청 없음

### 길찾기

- 지도 앱 선택 바텀시트 표시
- 카카오맵, 네이버지도, 구글맵 선택 가능
- 실행 시 `navigation_logs.launched_at` 저장
- 앱 재진입 시 최근 navigation log를 조회해 30분~3시간 조건을 만족하면 피드백 바텀시트 표시

### 방문 후 피드백

- 길찾기 기반 진입: 가중치 100% 적용
- 컬렉션 롱프레스 기반 진입: 길찾기 이력이 없으면 명시적 피드백 가중치 0.7배 적용

## 10. 라우팅 예시

```txt
/                      홈 피드
/onboarding            온보딩
/ai                    AI 추천 채팅
/cafe/:id             카페 상세
/collections           컬렉션
/my                    마이페이지
/my/profile            프로필 수정
/my/info               내 정보 수정
/my/moods              공간 취향 설정 수정
/my/neighborhoods      동네 설정 수정
/my/visited            최근 방문한 카페 전체 리스트
/my/notifications      알림 설정
/my/inquiry            1:1 문의
/my/notices            공지사항 리스트
/my/notices/:id        공지사항 상세
/my/policies           약관 및 정책
/my/policies/:type     약관 상세
```

## 11. 컴포넌트 구현 우선순위

1. BottomNavigation
2. CafeCard
3. ContextBanner
4. MoodCategoryTabList
5. CafeDetailPage
6. CollectionPickerSheet
7. AiChatPage
8. RecommendationCard
9. FollowUpChips
10. VisitFeedbackSheet
11. MyPage
12. ProfileSummary
13. EditableMoodCategories
14. RecentVisitedCafes

## 12. MVP 제외 항목

다음 기능은 구현하지 않는다.

- GPS 도착 감지
- 별점 리뷰
- 방문자 사진 리뷰
- 사전 동의 없는 푸시 알림
- 카드 스타일 선택 공유 화면
- 복잡한 관리자 페이지
- 실시간 혼잡도
- 결제 또는 예약 기능

## 13. 응답 방식 지침

개발 요청을 받을 때는 다음 방식으로 답변한다.

1. 먼저 구현 범위를 짧게 정리한다.
2. 필요한 파일 구조를 제안한다.
3. 변경 또는 생성해야 할 파일 단위로 코드를 제공한다.
4. CafeOn의 UX 정책과 MVP 제외 범위를 벗어나지 않는다.
5. 구현이 애매한 경우에도 사용자가 이미 정한 정책을 우선한다.

## 14. 제품 정책 요약

- 저장과 공유는 암묵적 선호 신호지만 방문 확인 신호는 아니다.
- 방문 피드백은 길찾기 후 앱 재진입 또는 컬렉션 롱프레스에서만 진입한다.
- 별점이 아니라 추천 적합도 3단계로 평가한다.
- AI 추천은 필터 UI를 대체하는 자연어 기반 추천 경험이어야 한다.
- 카페 상세 페이지에는 방문자 사진 섹션을 두지 않는다.
- MY 탭에서는 프로필, 내 분위기 카테고리, 최근 방문한 카페를 정보 노출형 카드로 우선 보여주고, 설정/지원 항목은 메뉴 리스트로 제공한다.


## 14. Mood Category 구현 규칙

- `MoodCategory`는 온보딩, 홈 피드 필터, 카페 상세, 방문 피드백에서 공통으로 사용하는 공간 분위기 분류 체계다.
- 사용자는 키워드를 직접 선택하지 않는다. 사용자는 이미지 기반 분위기 카드를 선택한다.
- 키워드는 설명, 추천 이유, 검색 보조에 사용하는 메타데이터다.
- 온보딩 선택값은 `user_preferences`에 `source = onboarding`으로 저장한다.
- MY 탭에서 공간 취향을 수정할 때도 온보딩의 `MoodCategoryCard`와 `MoodBoardModal`을 재사용한다.

### 8개 Mood Category

```ts
export const MOOD_CATEGORIES = [
  { code: 'vintage', title: '빈티지 감성', keywords: ['레트로', '따뜻한 조명', '아날로그'] },
  { code: 'minimal', title: '미니멀 모던', keywords: ['화이트 톤', '여백의 미', '자연광'] },
  { code: 'nature', title: '감성 자연', keywords: ['초록 식물', '자연 채광', '테라스'] },
  { code: 'cozy', title: '아늑한 공간', keywords: ['낮은 조명', '소파 좌석', '포근한 패브릭'] },
  { code: 'local', title: '힙한 로컬', keywords: ['골목 안 작은 카페', '독립적인 개성', '사장님 감성'] },
  { code: 'rooftop_view', title: '루프탑·뷰', keywords: ['탁 트인 전망', '하늘과 맞닿은 공간', '시티뷰'] },
  { code: 'work_friendly', title: '작업하기 좋은', keywords: ['넓은 책상', '조용한 분위기', '콘센트와 와이파이'] },
  { code: 'specialty', title: '스페셜티 커피', keywords: ['바리스타가 직접 내리는', '원두 향 가득', '커피 본연의 맛'] },
] as const;
```

### 추천 우선순위

1. 온보딩에서 선택한 Mood Category
2. 방문 후 추천 평가
3. 저장/공유/상세진입/길찾기 행동 신호
4. 현재 컨텍스트: 시간, 날씨, 위치, 요일
5. 다양성 보정: 같은 동네/같은 분위기 반복 노출 방지

## Location Preference Rule
- mode=current : GPS 기반 피드
- mode=neighborhoods : 선택 동네 랜덤 믹스 피드
- Context Banner에는 위치를 표시하지 않는다.