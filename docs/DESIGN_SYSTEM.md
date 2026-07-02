# CafeOn DESIGN_SYSTEM.md

> CafeOn MVP 모바일 프로토타입을 위한 실제 구현형 디자인 시스템입니다.  
> 적용 스택: React + TypeScript + Tailwind CSS + shadcn/ui + Lucide + Supabase  
> 브랜드 톤: Warm Neutral + Espresso + Cream / 감성적 발견형 모바일 앱 / 상용 서비스 수준의 프리미엄 미니멀 UI

---

## 1. Brand Identity

### 1.1 Brand Sentence

> 카페가 켜지는 순간, 나만의 무드로.

CafeOn은 사용자가 카페를 검색하는 서비스가 아니라, 현재의 기분·목적·취향에 맞는 공간을 발견하도록 돕는 감성 기반 AI 카페 추천 서비스입니다.

### 1.2 Visual Keywords

| Keyword | Meaning | UI Direction |
|---|---|---|
| Warm | 따뜻함, 편안함 | 크림 배경, 라떼 계열 Surface |
| Calm | 차분함, 과하지 않음 | 낮은 대비, 여백 중심 |
| Editorial | 큐레이션, 감성 콘텐츠 | 큰 이미지, 카드형 피드 |
| Personal | 나만의 취향 | 추천 이유, 취향 요약, 무드보드 |
| Premium | 상용 앱 완성도 | 절제된 색상, 부드러운 라운드, 고품질 모션 |

### 1.3 Design Principle

1. **이미지가 먼저 말한다**  
   카페 탐색의 핵심은 텍스트 검색이 아니라 사진 기반 발견입니다.

2. **AI는 설명해야 신뢰된다**  
   추천 카드에는 반드시 "왜 지금 이 카페인지"를 짧게 설명합니다.

3. **감성은 모호하지 않게 구조화한다**  
   사용자는 키워드가 아닌 분위기 카테고리와 무드보드를 선택합니다.

4. **선택지는 적고 명확하게 제공한다**  
   MVP에서는 필터를 최소화하고, 후속 조건 칩으로 대화형 탐색을 유도합니다.

5. **상용 모바일 앱처럼 보여야 한다**  
   문서형 UI가 아니라 실제 출시 가능한 앱처럼 카드, 바텀시트, 탭바, 모션을 일관되게 사용합니다.

---

## 2. Color System

CafeOn의 컬러 시스템은 Warm Neutral + Espresso + Cream 계열을 기본으로 합니다.  
보라색, 강한 블루, 과도한 그라데이션은 사용하지 않습니다.

### 2.1 Core Palette

| Token | Hex | Usage |
|---|---:|---|
| `espresso-900` | `#2B1E16` | 최상위 텍스트, 로고 텍스트 |
| `espresso-800` | `#3A281D` | Primary 버튼, 강조 텍스트 |
| `espresso-700` | `#4B3325` | Active icon, selected state |
| `espresso-600` | `#6F4E37` | Brand primary |
| `espresso-500` | `#8B6B52` | Secondary text on cream |
| `latte-500` | `#B08968` | Secondary, selected border |
| `latte-400` | `#C7A17A` | Tag, chip highlight |
| `latte-300` | `#DDB892` | Warm accent |
| `cream-100` | `#FAF8F5` | App background |
| `cream-200` | `#F4EFE8` | Section background |
| `cream-300` | `#EDE3D8` | Divider, subtle border |
| `sand-100` | `#FFFDF9` | Card surface |
| `sand-200` | `#F8F3EC` | Elevated surface |
| `sage-500` | `#6F8F72` | Success, nature mood |
| `terracotta-500` | `#C86B4A` | Error/warning accent |
| `gold-500` | `#D9A441` | Highlight, premium badge |

### 2.2 Semantic Tokens

| Role | Token | Hex |
|---|---|---:|
| Background | `background` | `#FAF8F5` |
| Foreground | `foreground` | `#2B1E16` |
| Surface | `surface` | `#FFFDF9` |
| Surface Muted | `surface-muted` | `#F8F3EC` |
| Border | `border` | `#EDE3D8` |
| Primary | `primary` | `#6F4E37` |
| Primary Foreground | `primary-foreground` | `#FFFDF9` |
| Secondary | `secondary` | `#B08968` |
| Accent | `accent` | `#DDB892` |
| Muted | `muted` | `#F4EFE8` |
| Muted Foreground | `muted-foreground` | `#8B6B52` |
| Success | `success` | `#6F8F72` |
| Warning | `warning` | `#D9A441` |
| Error | `error` | `#C86B4A` |

### 2.3 Usage Rules

- 앱 전체 배경은 `cream-100`.
- 카드와 바텀시트는 `sand-100`.
- Primary CTA는 `espresso-600` 또는 `espresso-800`.
- 선택된 Mood Category는 `latte-500` border + `cream-200` overlay.
- AI 추천 강조 요소는 과한 색상 대신 `gold-500`을 작은 배지로 사용.
- 텍스트는 순수 블랙(`#000000`)을 사용하지 않습니다.
- Divider는 `cream-300` 또는 `border`를 사용합니다.

### 2.4 Gradient

그라데이션은 히어로 이미지 오버레이, 온보딩 무드보드, 상세 페이지 이미지 하단 텍스트 가독성 보정에만 제한적으로 사용합니다.

```css
--gradient-image-bottom: linear-gradient(
  180deg,
  rgba(43, 30, 22, 0) 0%,
  rgba(43, 30, 22, 0.58) 100%
);

--gradient-warm-card: linear-gradient(
  135deg,
  #fffdf9 0%,
  #f4efe8 52%,
  #eddfcf 100%
);
```

---

## 3. Typography

### 3.1 Font Family

국문 중심 서비스이므로 기본 폰트는 시스템 폰트 기반으로 설정합니다.

```css
font-family:
  Pretendard,
  -apple-system,
  BlinkMacSystemFont,
  system-ui,
  "Segoe UI",
  sans-serif;
```

### 3.2 Type Scale

| Name | Size | Line Height | Weight | Usage |
|---|---:|---:|---:|---|
| Display | 32px | 40px | 700 | 온보딩 메인, 빈 상태 |
| Heading 1 | 28px | 36px | 700 | 주요 화면 타이틀 |
| Heading 2 | 24px | 32px | 700 | 상세 페이지 섹션 |
| Heading 3 | 20px | 28px | 700 | 카드 제목 |
| Title | 18px | 26px | 600 | 리스트/바텀시트 제목 |
| Body Large | 16px | 24px | 500 | 본문, 설명 |
| Body | 15px | 22px | 400 | 일반 텍스트 |
| Body Small | 14px | 20px | 400 | 보조 설명 |
| Caption | 12px | 16px | 500 | 태그, 메타 정보 |
| Micro | 11px | 14px | 500 | 배지, 작은 라벨 |

### 3.3 Typography Rules

- 화면 타이틀은 24~28px를 사용합니다.
- 모바일 카드 제목은 18~20px를 넘지 않습니다.
- 추천 이유 문구는 `Body Small` 또는 `Body`를 사용합니다.
- Mood Category 키워드는 `Caption`으로 표시합니다.
- 버튼 텍스트는 15~16px, 600 weight.
- 줄 간격은 넉넉하게 유지해 감성 콘텐츠의 여백감을 살립니다.

---

## 4. Layout System

### 4.1 Mobile First

CafeOn MVP는 모바일 앱 프로토타입 기준입니다.

| Breakpoint | Width | Usage |
|---|---:|---|
| `mobile` | 360~430px | 기본 타겟 |
| `tablet` | 768px+ | 추후 확장 |
| `desktop` | 1024px+ | 관리자/웹 프리뷰 확장 |

### 4.2 App Container

```tsx
<div className="min-h-screen bg-background text-foreground">
  <main className="mx-auto min-h-screen max-w-[430px] bg-background">
    ...
  </main>
</div>
```

### 4.3 Safe Area

하단 네비게이션과 iOS safe-area를 고려합니다.

```css
.safe-bottom {
  padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
}
```

### 4.4 Spacing Scale

8pt Grid를 기본으로 하되 모바일 카드 UI에서는 4px 단위 보정 허용.

| Token | px | Tailwind |
|---|---:|---|
| `space-1` | 4 | `p-1` |
| `space-2` | 8 | `p-2` |
| `space-3` | 12 | `p-3` |
| `space-4` | 16 | `p-4` |
| `space-5` | 20 | `p-5` |
| `space-6` | 24 | `p-6` |
| `space-8` | 32 | `p-8` |
| `space-10` | 40 | `p-10` |
| `space-12` | 48 | `p-12` |

### 4.5 Page Padding

| Context | Padding |
|---|---:|
| 기본 페이지 좌우 | 20px |
| 카드 내부 | 16px |
| 바텀시트 내부 | 20px |
| 리스트 셀 좌우 | 20px |
| 온보딩 화면 | 24px |

---

## 5. Radius

CafeOn은 부드러운 감성을 위해 큰 라운드를 사용하지만, 지나치게 장난스럽지 않게 유지합니다.

| Token | px | Usage |
|---|---:|---|
| `radius-xs` | 6 | 작은 배지 |
| `radius-sm` | 10 | Chip, Tag |
| `radius-md` | 14 | Input, Button |
| `radius-lg` | 18 | Small Card |
| `radius-xl` | 24 | Feed Card |
| `radius-2xl` | 28 | BottomSheet, Modal |
| `radius-full` | 999 | Pill Button |

### Rule

- Feed Card: 24px
- Mood Category Card: 22~24px
- Button: 14~999px
- BottomSheet: top-left/top-right 28px
- Modal: 28px

---

## 6. Elevation & Shadow

강한 그림자 대신 부드러운 음영과 border를 함께 사용합니다.

```css
--shadow-card: 0 8px 24px rgba(43, 30, 22, 0.08);
--shadow-card-hover: 0 12px 32px rgba(43, 30, 22, 0.12);
--shadow-bottom-nav: 0 -8px 24px rgba(43, 30, 22, 0.08);
--shadow-bottom-sheet: 0 -12px 40px rgba(43, 30, 22, 0.14);
--shadow-modal: 0 18px 60px rgba(43, 30, 22, 0.18);
```

### Usage

- 일반 카드: `shadow-card` + `border`
- 피드 대형 이미지 카드: 이미지 자체가 주인공이므로 shadow는 약하게
- Bottom Navigation: 상단 shadow만 사용
- BottomSheet: 강한 dim보다 부드러운 elevation

---

## 7. Iconography

### 7.1 Icon Library

- 기본: `lucide-react`
- Stroke width: `2`
- Size: 20px / 22px / 24px

### 7.2 Main Icons

| Feature | Icon |
|---|---|
| 발견 | Compass |
| AI | Sparkles |
| 컬렉션 | Bookmark |
| MY | User |
| 저장 | Bookmark |
| 공유 | Share2 |
| 길찾기 | Navigation |
| 검색 | Search |
| 알림 | Bell |
| 설정 | Settings |
| 위치 | MapPin |
| 날씨 | CloudSun |
| 시간 | Clock |
| 뒤로가기 | ChevronLeft |

### 7.3 Rule

- Active Tab Icon: `espresso-700`
- Inactive Tab Icon: `espresso-500 / 60%`
- AI Tab은 `Sparkles`와 `gold-500` 점 강조를 허용합니다.
- 아이콘 단독 버튼은 최소 터치 영역 44px.

---

## 8. Motion

### 8.1 Motion Principle

- 빠르고 부드럽게.
- 사용자의 선택이 즉시 반응해야 합니다.
- 감성 서비스이므로 전환은 딱딱하지 않게 easing 사용.

### 8.2 Timing

| Motion | Duration | Easing |
|---|---:|---|
| Tap feedback | 120ms | ease-out |
| Page transition | 220ms | cubic-bezier(0.22, 1, 0.36, 1) |
| BottomSheet open | 280ms | cubic-bezier(0.22, 1, 0.36, 1) |
| Card appear | 240ms | ease-out |
| Toast | 180ms | ease-out |
| Skeleton shimmer | 1200ms | linear |

### 8.3 Interaction

- 카드 탭: scale 0.98 → 1
- 버튼 탭: opacity 0.92 or scale 0.98
- 선택된 Mood Category: border + check badge + subtle scale
- BottomSheet: 아래에서 위로 slide-in
- AI 추천 카드: chat bubble 아래에서 fade-up

---

## 9. Component System

## 9.1 Button

### Variants

| Variant | Usage |
|---|---|
| `primary` | 주요 CTA, 시작하기, 선택 완료 |
| `secondary` | 보조 액션 |
| `outline` | 수정, 취소 |
| `ghost` | 아이콘/텍스트 보조 |
| `destructive` | 삭제, 로그아웃 |
| `ai` | AI 추천 실행, AI 탭 CTA |

### Size

| Size | Height | Radius |
|---|---:|---:|
| `sm` | 36px | 12px |
| `md` | 44px | 14px |
| `lg` | 52px | 16px |
| `pill` | 48px | 999px |

### Tailwind Example

```tsx
<Button className="h-13 rounded-2xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground shadow-card active:scale-[0.98]">
  시작하기
</Button>
```

### Rule

- Primary CTA는 화면 하단 고정 영역에 배치 가능.
- 한 화면에 Primary CTA는 1개만 둡니다.
- Disabled는 opacity 40%, cursor disabled.

---

## 9.2 Input

### Usage

- AI 채팅 입력
- 동네 검색
- 프로필 정보 수정
- 1:1 문의

### Style

```tsx
<input className="h-12 rounded-2xl border border-border bg-surface px-4 text-body outline-none placeholder:text-muted-foreground focus:border-secondary" />
```

### Rule

- Search Input에는 왼쪽 Search icon.
- AI Chat Input은 pill 형태, 우측 send button.
- 입력 영역의 배경은 `sand-100`.

---

## 9.3 Chip

### Types

| Type | Usage |
|---|---|
| Mood Chip | 분위기 카테고리 |
| Context Chip | 날씨, 시간, 위치 |
| Follow-up Chip | AI 후속 조건 |
| Filter Chip | 홈 피드 무드 필터 |

### Style

```tsx
<span className="rounded-full bg-muted px-3 py-2 text-caption font-medium text-muted-foreground">
  작업하기 좋은
</span>
```

### Selected

```tsx
<span className="rounded-full border border-secondary bg-cream-200 px-3 py-2 text-caption font-semibold text-primary">
  빈티지 감성
</span>
```

---

## 9.4 Tag / Badge

### Tag

카페 상세의 무드 태그, 시설 태그에 사용.

```tsx
<span className="rounded-lg bg-surface-muted px-2.5 py-1 text-[12px] font-medium text-muted-foreground">
  조용한 오후
</span>
```

### Badge

AI 추천 이유, 새 공지, 영업중 등 작은 상태 표시.

```tsx
<span className="rounded-full bg-gold-500/15 px-2 py-1 text-[11px] font-semibold text-espresso-700">
  AI 추천
</span>
```

---

## 9.5 Card

### Base Card

```tsx
<div className="rounded-[24px] border border-border bg-surface p-4 shadow-card">
  ...
</div>
```

### Feed Card

- 이미지 비율: 4:5 또는 3:4
- 카드 폭: 화면 좌우 20px margin
- 이미지 위에 카페명/거리/무드 태그 overlay 가능
- 저장 버튼은 우상단 floating

```tsx
<article className="overflow-hidden rounded-[28px] bg-surface shadow-card">
  <div className="relative aspect-[4/5]">
    <img className="h-full w-full object-cover" />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-900/70 to-transparent p-5 text-white">
      ...
    </div>
  </div>
</article>
```

### Mood Category Card

- 2열 그리드
- 스톡 이미지 3분할 콜라주
- 카테고리명 + 키워드 3개
- 선택 시 check badge

```tsx
<div className="rounded-[24px] border border-border bg-surface p-3">
  <div className="grid aspect-[4/3] grid-cols-2 gap-1 overflow-hidden rounded-[18px]">
    ...
  </div>
  <h3 className="mt-3 text-title font-semibold">빈티지 감성</h3>
  <p className="mt-1 text-caption text-muted-foreground">레트로 · 따뜻한 조명 · 아날로그</p>
</div>
```

---

## 9.6 Bottom Navigation

### Tabs

| Tab | Label | Icon | Route |
|---|---|---|---|
| 발견 | Compass | `/home` |
| AI | Sparkles | `/ai` |
| 컬렉션 | Bookmark | `/collections` |
| MY | User | `/my` |

### Style

```tsx
<nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-bottom-nav backdrop-blur">
  ...
</nav>
```

### Rule

- AI 탭은 시각적 강조 가능: Sparkles icon + 작은 gold dot.
- 탭 텍스트는 11~12px.
- 터치 영역은 최소 56px height.

---

## 9.7 BottomSheet

### Usage

- 컬렉션 저장
- 길찾기 앱 선택
- 방문 후 피드백
- 프로필 편집 선택
- 알림 설정

### Style

```tsx
<div className="fixed inset-0 z-50 bg-espresso-900/30">
  <section className="absolute inset-x-0 bottom-0 mx-auto max-w-[430px] rounded-t-[28px] bg-surface p-5 shadow-bottom-sheet">
    <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
    ...
  </section>
</div>
```

### Rule

- Sheet 상단 drag handle 필수.
- 최대 높이 85vh.
- 주요 CTA는 하단 고정.
- Dim은 너무 어둡지 않게 `espresso-900/30`.

---

## 9.8 Modal

### Usage

- MoodBoard 확대
- 약관 상세
- 중요 안내
- 삭제 확인

### MoodBoard Modal

- 폴라로이드 콜라주 4장
- 컬러 스와치
- 분위기 설명
- 키워드 3개
- CTA: 이 분위기 선택

---

## 9.9 Toast

### Usage

- 저장 완료
- 취향 반영
- 피드백 완료
- 오류

### Style

```tsx
<div className="rounded-2xl bg-espresso-800 px-4 py-3 text-sm font-medium text-cream-100 shadow-modal">
  다음 추천에 반영할게요.
</div>
```

---

## 9.10 Skeleton

### Usage

- 피드 로딩
- 상세 이미지 로딩
- AI 추천 결과 로딩

### Style

```tsx
<div className="animate-pulse rounded-[24px] bg-cream-300/70" />
```

---

## 10. Screen Design Guide

## 10.1 Splash

### Purpose
브랜드 인지와 앱 진입.

### UI
- Cream background
- CafeOn 로고 또는 텍스트
- 작은 tagline

### Copy
`카페가 켜지는 순간, 나만의 무드로`

---

## 10.2 Login

### Purpose
간편 소셜 로그인.

### UI
- 상단 감성 이미지 또는 일러스트
- 브랜드 카피
- 카카오 / 네이버 / 구글 로그인 버튼
- 하단 약관 안내

### Rule
- 이메일/비밀번호 입력은 MVP에서 제외.
- 소셜 버튼은 각 브랜드 색상을 과하게 쓰지 않고 Warm Neutral 스타일에 맞춰 정리 가능.

---

## 10.3 Onboarding: Mood Category

### Main Copy

> 마음에 드는 공간을 골라주세요.  
> AI가 당신의 공간 취향을 학습하여 지금 가장 어울리는 카페를 추천합니다.

### Mood Categories

| ID | Title | Keywords |
|---|---|---|
| `vintage` | 빈티지 감성 | 레트로 · 따뜻한 조명 · 아날로그 |
| `minimal` | 미니멀 모던 | 화이트 톤 · 여백의 미 · 자연광 |
| `nature` | 감성 자연 | 초록 식물 · 자연 채광 · 테라스 |
| `cozy` | 아늑한 공간 | 낮은 조명 · 소파 좌석 · 포근한 패브릭 |
| `local` | 힙한 로컬 | 골목 안 작은 카페 · 독립적인 개성 · 사장님 감성 |
| `rooftop` | 루프탑·뷰 | 탁 트인 전망 · 하늘과 맞닿은 공간 · 시티뷰 |
| `work` | 작업하기 좋은 | 넓은 책상 · 조용한 분위기 · 콘센트와 와이파이 |
| `specialty` | 스페셜티 커피 | 바리스타가 직접 내리는 · 원두 향 가득 · 커피 본연의 맛 |

### Layout

- 2열 grid
- 최소 3개 선택
- 하단 sticky CTA
- 선택 수 표시: `3개 이상 선택해주세요`

### Interaction

1. 카드 탭
2. MoodBoard Modal 표시
3. `이 분위기 선택` 탭
4. 카드 선택 상태 반영
5. 3개 이상 선택 시 CTA 활성화

---

## 10.4 Onboarding: Preference Summary

### Purpose
사용자가 선택한 분위기를 AI가 이해했다는 확신 제공.

### Copy

```text
이런 공간을 좋아하시는군요.

빈티지 감성 · 아늑한 공간 · 작업하기 좋은

회원님의 취향을 바탕으로
지금 어울리는 카페를 먼저 보여드릴게요.
```

### UI
- 선택한 카드 썸네일 3장
- 선택 카테고리 텍스트
- 추천 기준 안내
- CTA: `시작하기`

---

## 10.5 Home Feed

### Purpose
검색이 아닌 발견.

### UI
- Context Banner
- HomeLocationSelector
- Mood Filter Tabs
- Feed Cards
- AI 추천 유도 CTA

### Context Banner

```text
오늘 오후 · 흐림
차분히 머물기 좋은 카페를 추천해요.
```

### Feed Card Recommendation Reason

```text
회원님이 선택한 빈티지 감성과 일치해요.
```

또는

```text
비 오는 오후라 조용하고 따뜻한 조명의 공간을 골랐어요.
```

---

## 10.6 AI Chat

### Purpose
필터 없이 자연어로 카페 추천.

### UI
- 상단 Context Pill Strip
- Chat Message
- Inline Recommendation Card
- Follow-up Chips
- Bottom Chat Input

### Context Pill Strip

```text
[성수동] [오후] [흐림] [혼자]
```

### AI Bubble Style

- AI message: `surface-muted`
- User message: `espresso-600`
- Recommendation Card: `surface`

### Follow-up Chips

- 더 조용한 곳
- 창가 자리 있는 곳
- 다른 동네
- 작업하기 좋은 곳

---

## 10.7 Cafe Detail

### Purpose
감성 → 맥락 → 실용 정보 순서로 방문 결정을 돕습니다.

### Layout

1. Hero Image
2. Cafe Basic Info
3. Mood Tags
4. AI Recommendation Reason
5. Operating Info
6. Map Preview
7. Bottom Action Bar

### Bottom Action Bar

- 저장
- 공유
- 길찾기

Primary action은 `길찾기`.

---

## 10.8 Collection

### Purpose
저장한 카페를 다시 찾고 관리.

### UI
- Collection List
- Saved Cafe Cards
- Long Press Context Menu
- Empty State

### Empty Copy

```text
아직 저장한 카페가 없어요.
마음에 드는 공간을 발견하면 저장해보세요.
```

---

## 10.9 Visit Feedback

### Purpose
AI 추천 정확도 향상.

### UI
- BottomSheet
- 방문 여부 확인
- 추천 평가 3단계
- 무드 확인 선택

### Rating Buttons

| Emotion | Label |
|---|---|
| 😊 | 잘 맞았어요 |
| 😐 | 그냥 그랬어요 |
| 😞 | 별로였어요 |

### Completion Toast

`다음 추천에 반영할게요.`

---

## 10.10 My Page

### Purpose
내 취향 정보와 앱 설정 관리.

### Structure

```text
MY
├ 프로필 영역
│ ├ 프로필 수정
│ │ ├ 취향 설정
│ │ └ 동네 설정
│ └ 내 정보 수정
│   ├ 이름/휴대폰번호 수정
│   └ 로그아웃
├ 내 무드 태그
├ 최근 방문한 카페
│ └ 리스트 > 상세
├ 알림 설정
├ 1:1문의
├ 공지사항 및 이용약관
│ ├ 공지사항
│ │ └ 리스트 > 상세
│ ├ 약관 및 정책
│ │ ├ 이용약관
│ │ ├ 개인정보 처리방침
│ │ ├ 위치정보 이용약관
│ │ └ 입점정책
│ └ 버전 정보
```

### My Main UI

- Profile Summary Card
- My Mood Category Chips
- Recent Visit Preview: 최신순 2개
- Setting List

### Editable Information Cards

아래 3개는 정보 노출 + 편집 가능한 UI로 제공합니다.

1. 프로필
2. 내 무드 태그
3. 최근 방문한 카페

---

## 11. Component Naming for Codex

Codex가 구현할 때 사용할 컴포넌트 이름을 아래 기준으로 통일합니다.

```text
components/common/Button.tsx
components/common/Chip.tsx
components/common/Badge.tsx
components/common/Card.tsx
components/common/BottomSheet.tsx
components/common/Toast.tsx
components/common/Skeleton.tsx

components/layout/AppShell.tsx
components/layout/BottomNavigation.tsx
components/layout/PageHeader.tsx

features/onboarding/MoodCategoryCard.tsx
features/onboarding/MoodBoardModal.tsx
features/onboarding/PreferenceSummary.tsx

features/feed/ContextBanner.tsx
features/feed/CafeFeedCard.tsx
features/feed/MoodFilterTabs.tsx

features/ai/AiChatInput.tsx
features/ai/AiMessageBubble.tsx
features/ai/RecommendationCard.tsx
features/ai/FollowUpChips.tsx

features/cafe/CafeHero.tsx
features/cafe/CafeInfoSection.tsx
features/cafe/CafeActionBar.tsx

features/collection/CollectionCard.tsx
features/collection/SavedCafeCard.tsx

features/my/ProfileSummaryCard.tsx
features/my/MyMoodTags.tsx
features/my/RecentVisitList.tsx
features/my/SettingListItem.tsx
```

---

## 12. Tailwind Theme Tokens

아래 토큰을 `tailwind.config.ts` 또는 Tailwind v4 CSS theme에 반영합니다.

```ts
export const cafeOnTheme = {
  colors: {
    background: "#FAF8F5",
    foreground: "#2B1E16",
    surface: "#FFFDF9",
    "surface-muted": "#F8F3EC",
    border: "#EDE3D8",

    primary: "#6F4E37",
    "primary-foreground": "#FFFDF9",
    secondary: "#B08968",
    accent: "#DDB892",
    muted: "#F4EFE8",
    "muted-foreground": "#8B6B52",

    espresso: {
      900: "#2B1E16",
      800: "#3A281D",
      700: "#4B3325",
      600: "#6F4E37",
      500: "#8B6B52",
    },
    latte: {
      500: "#B08968",
      400: "#C7A17A",
      300: "#DDB892",
    },
    cream: {
      100: "#FAF8F5",
      200: "#F4EFE8",
      300: "#EDE3D8",
    },
    sand: {
      100: "#FFFDF9",
      200: "#F8F3EC",
    },
    sage: {
      500: "#6F8F72",
    },
    terracotta: {
      500: "#C86B4A",
    },
    gold: {
      500: "#D9A441",
    },
  },
  borderRadius: {
    xs: "6px",
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "24px",
    "2xl": "28px",
  },
  boxShadow: {
    card: "0 8px 24px rgba(43, 30, 22, 0.08)",
    "card-hover": "0 12px 32px rgba(43, 30, 22, 0.12)",
    "bottom-nav": "0 -8px 24px rgba(43, 30, 22, 0.08)",
    "bottom-sheet": "0 -12px 40px rgba(43, 30, 22, 0.14)",
    modal: "0 18px 60px rgba(43, 30, 22, 0.18)",
  },
};
```

---

## 13. shadcn/ui Theme CSS Variables

`src/styles/globals.css` 또는 `app.css`에 반영합니다.

```css
:root {
  --background: 36 38% 97%;
  --foreground: 24 32% 13%;

  --card: 40 100% 99%;
  --card-foreground: 24 32% 13%;

  --popover: 40 100% 99%;
  --popover-foreground: 24 32% 13%;

  --primary: 27 34% 33%;
  --primary-foreground: 40 100% 99%;

  --secondary: 30 30% 55%;
  --secondary-foreground: 24 32% 13%;

  --muted: 34 35% 93%;
  --muted-foreground: 27 27% 43%;

  --accent: 32 52% 72%;
  --accent-foreground: 24 32% 13%;

  --destructive: 14 52% 54%;
  --destructive-foreground: 40 100% 99%;

  --border: 32 36% 89%;
  --input: 32 36% 89%;
  --ring: 27 34% 33%;

  --radius: 1rem;
}
```

---

## 14. CSS Utility Classes

```css
@layer utilities {
  .app-container {
    @apply mx-auto min-h-screen max-w-[430px] bg-background text-foreground;
  }

  .page-x {
    @apply px-5;
  }

  .safe-bottom {
    padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
  }

  .card-surface {
    @apply rounded-[24px] border border-border bg-surface shadow-card;
  }

  .image-overlay-bottom {
    background: linear-gradient(
      180deg,
      rgba(43, 30, 22, 0) 0%,
      rgba(43, 30, 22, 0.58) 100%
    );
  }

  .tap-scale {
    @apply active:scale-[0.98] transition-transform duration-150;
  }
}
```

---

## 15. Accessibility

### Color Contrast

- 기본 텍스트와 배경은 WCAG AA 수준 이상을 목표로 합니다.
- `latte-300`은 본문 텍스트 색상으로 사용하지 않습니다.
- 이미지 위 텍스트는 반드시 gradient overlay 또는 scrim을 적용합니다.

### Touch Target

- 모든 버튼/아이콘 터치 영역 최소 44px.
- Bottom Navigation tab은 최소 높이 56px.

### Text

- 아이콘 단독 버튼에는 `aria-label` 필수.
- AI 추천 이유는 이미지나 색상만으로 전달하지 않고 텍스트로 명확히 제공합니다.

### Motion

- 과도한 자동 재생 모션은 사용하지 않습니다.
- Skeleton shimmer는 저자극으로 구현합니다.

---

## 16. Empty / Error State

### Empty Collection

```text
아직 저장한 카페가 없어요.
마음에 드는 공간을 발견하면 저장해보세요.
```

### Empty Visit

```text
아직 다녀온 카페가 없어요.
CafeOn 추천으로 첫 공간을 발견해보세요.
```

### AI Error

```text
추천을 불러오지 못했어요.
잠시 후 다시 시도해주세요.
```

### Location Permission

```text
현재 위치를 사용하면 더 가까운 카페를 추천할 수 있어요.
```

### Network Error

```text
연결이 불안정해요.
네트워크 상태를 확인해주세요.
```

---

## 17. Copywriting Tone

### Tone

- 다정하지만 과하지 않게.
- AI가 사용자를 판단하는 표현은 피합니다.
- "추천해드릴게요"보다 "추천해요"처럼 간결하게.
- 감성적이되 명확하게.

### Good

```text
회원님이 선택한 빈티지 감성과 일치해요.
비 오는 오후라 조용한 공간을 골랐어요.
다음 추천에 반영할게요.
```

### Avoid

```text
당신은 빈티지한 사람입니다.
AI가 완벽하게 분석했습니다.
무조건 여기가 좋아요.
```

---

## 18. Implementation Checklist for Codex

Codex는 아래 순서로 MVP UI를 구현합니다.

### Step 1. Foundation

- [ ] Tailwind theme token 적용
- [ ] shadcn/ui CSS variable 적용
- [ ] AppShell 생성
- [ ] BottomNavigation 생성
- [ ] 공통 Button / Chip / Card / BottomSheet 생성

### Step 2. Onboarding

- [ ] MoodCategoryCard
- [ ] MoodBoardModal
- [ ] 최소 3개 선택 validation
- [ ] Neighborhood Setup
- [ ] PreferenceSummary
- [ ] 선택값 Supabase 저장 mock 또는 실제 저장

### Step 3. Home Feed

- [ ] ContextBanner
- [ ] HomeLocationSelector
- [ ] MoodFilterTabs
- [ ] CafeFeedCard
- [ ] 추천 이유 문구

### Step 4. AI Chat

- [ ] Context Pill Strip
- [ ] ChatInput
- [ ] RecommendationCard
- [ ] FollowUpChips

### Step 5. Cafe Detail

- [ ] Hero Image
- [ ] Info Section
- [ ] Mood Tags
- [ ] AI Reason
- [ ] Bottom Action Bar

### Step 6. Collection

- [ ] Collection List
- [ ] Save BottomSheet
- [ ] Long Press Feedback Entry

### Step 7. My

- [ ] ProfileSummaryCard
- [ ] MyMoodTags
- [ ] RecentVisitList
- [ ] SettingList
- [ ] Notice / Terms screens

---

## 19. Final UI Quality Bar

CafeOn MVP는 다음 기준을 만족해야 합니다.

- 앱을 처음 열었을 때 상용 모바일 앱처럼 보입니다.
- 색상이 과하지 않고 Warm Neutral 톤이 유지됩니다.
- 온보딩에서 "태그 선택"이 아니라 "공간 취향 선택"처럼 느껴집니다.
- 홈 피드는 이미지 중심의 발견 경험을 제공합니다.
- AI 추천은 추천 이유가 함께 보여 신뢰감을 줍니다.
- 하단 탭, 바텀시트, 카드, 버튼 스타일이 전 화면에서 일관됩니다.
- MY 페이지는 설정 화면이 아니라 개인 취향 대시보드처럼 보입니다.
