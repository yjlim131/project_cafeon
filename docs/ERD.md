# CafeOn ERD.md

## 1. 설계 기준

- Database: Supabase PostgreSQL
- Auth: Supabase Auth `auth.users`
- Storage: cafe-images, mood-category-images, avatars
- 보안: Row Level Security 적용
- MVP 기준이지만 이후 AI 추천 고도화와 카페 입점 확장을 고려한다.

## 2. 핵심 관계 요약

```txt
auth.users 1:1 profiles
profiles 1:N user_preferences
profiles 1:N user_neighborhoods
profiles 1:N collections
profiles 1:N user_actions
profiles 1:N navigation_logs
profiles 1:N visit_feedbacks

mood_categories 1:N mood_category_images
mood_categories 1:N user_preferences
mood_categories 1:N cafe_mood_categories

cafes 1:N cafe_images
cafes 1:N cafe_mood_categories
cafes 1:N collection_items
cafes 1:N user_actions
cafes 1:N navigation_logs
cafes 1:N visit_feedbacks

collections 1:N collection_items
visit_feedbacks 1:N feedback_mood_categories
```

## 3. Tables

### profiles

사용자 서비스 프로필입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK, FK auth.users.id | 사용자 ID |
| name | text | nullable | 이름 |
| phone | text | nullable | 휴대폰번호 |
| avatar_url | text | nullable | 프로필 이미지 |
| onboarding_completed | boolean | default false | 온보딩 완료 여부 |
| created_at | timestamptz | default now() | 생성일 |
| updated_at | timestamptz | default now() | 수정일 |

### mood_categories

온보딩과 추천에 사용하는 8개 분위기 카테고리입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 카테고리 ID |
| code | text | unique, not null | vintage, minimal 등 |
| title | text | not null | 노출명 |
| description | text | nullable | 분위기 설명 |
| keywords | text[] | not null | 키워드 3개 이상 |
| color_palette | jsonb | nullable | 무드보드 컬러 |
| thumbnail_url | text | nullable | 대표 이미지 |
| sort_order | int | default 0 | 노출 순서 |
| is_active | boolean | default true | 사용 여부 |
| created_at | timestamptz | default now() | 생성일 |

초기 데이터:

| code | title | keywords |
|---|---|---|
| vintage | 빈티지 감성 | 레트로, 따뜻한 조명, 아날로그 |
| minimal | 미니멀 모던 | 화이트 톤, 여백의 미, 자연광 |
| nature | 감성 자연 | 초록 식물, 자연 채광, 테라스 |
| cozy | 아늑한 공간 | 낮은 조명, 소파 좌석, 포근한 패브릭 |
| local | 힙한 로컬 | 골목 안 작은 카페, 독립적인 개성, 사장님 감성 |
| rooftop | 루프탑·뷰 | 탁 트인 전망, 하늘과 맞닿은 공간, 시티뷰 |
| work | 작업하기 좋은 | 넓은 책상, 조용한 분위기, 콘센트와 와이파이 |
| specialty | 스페셜티 커피 | 바리스타가 직접 내리는, 원두 향 가득, 커피 본연의 맛 |

### mood_category_images

무드보드 이미지입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 이미지 ID |
| mood_category_id | uuid | FK mood_categories.id | 카테고리 |
| image_url | text | not null | 이미지 URL |
| alt_text | text | nullable | 접근성 텍스트 |
| sort_order | int | default 0 | 노출 순서 |
| created_at | timestamptz | default now() | 생성일 |

### user_preferences

사용자별 분위기 카테고리 선호 가중치입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 선호 ID |
| user_id | uuid | FK profiles.id | 사용자 |
| mood_category_id | uuid | FK mood_categories.id | 카테고리 |
| weight | numeric | default 1 | 선호 가중치 |
| source | text | default onboarding | onboarding, feedback, behavior |
| created_at | timestamptz | default now() | 생성일 |
| updated_at | timestamptz | default now() | 수정일 |

Unique: `(user_id, mood_category_id)`

### user_neighborhoods

사용자가 설정한 주요 동네입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| user_id | uuid | FK profiles.id | 사용자 |
| neighborhood | text | not null | 동네명 |
| sort_order | int | default 0 | 노출 순서 |
| created_at | timestamptz | default now() | 생성일 |

### cafes

카페 기본 정보입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 카페 ID |
| name | text | not null | 카페명 |
| description | text | nullable | 소개 |
| address | text | not null | 주소 |
| neighborhood | text | not null | 동네 |
| latitude | numeric | nullable | 위도 |
| longitude | numeric | nullable | 경도 |
| opening_hours | jsonb | nullable | 영업시간 |
| phone | text | nullable | 전화번호 |
| price_range | text | nullable | 가격대 |
| facilities | jsonb | nullable | 콘센트, 와이파이 등 |
| is_good_for_solo | boolean | default false | 혼카페 적합 |
| created_at | timestamptz | default now() | 생성일 |
| updated_at | timestamptz | default now() | 수정일 |

### cafe_images

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 이미지 ID |
| cafe_id | uuid | FK cafes.id | 카페 |
| image_url | text | not null | 이미지 URL |
| is_hero | boolean | default false | 대표 이미지 여부 |
| sort_order | int | default 0 | 노출 순서 |
| created_at | timestamptz | default now() | 생성일 |

### cafe_mood_categories

카페와 분위기 카테고리의 매핑입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| cafe_id | uuid | FK cafes.id | 카페 |
| mood_category_id | uuid | FK mood_categories.id | 카테고리 |
| score | numeric | default 1 | 태그 신뢰도/강도 |
| source | text | default curated | curated, feedback, owner |
| created_at | timestamptz | default now() | 생성일 |

Unique: `(cafe_id, mood_category_id)`

### collections

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 컬렉션 ID |
| user_id | uuid | FK profiles.id | 사용자 |
| name | text | not null | 컬렉션명 |
| created_at | timestamptz | default now() | 생성일 |
| updated_at | timestamptz | default now() | 수정일 |

### collection_items

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| collection_id | uuid | FK collections.id | 컬렉션 |
| cafe_id | uuid | FK cafes.id | 카페 |
| created_at | timestamptz | default now() | 저장일 |

Unique: `(collection_id, cafe_id)`

### user_actions

상세 진입, 저장, 공유, 길찾기, 패스 등 행동 신호입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| user_id | uuid | FK profiles.id | 사용자 |
| cafe_id | uuid | FK cafes.id | 카페 |
| action_type | text | not null | detail_view, save, share, navigation, unsave, quick_pass |
| weight | numeric | not null | 가중치 |
| context | jsonb | nullable | 시간/날씨/위치 등 |
| created_at | timestamptz | default now() | 생성일 |

### navigation_logs

길찾기 실행과 앱 재진입 감지 기록입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| user_id | uuid | FK profiles.id | 사용자 |
| cafe_id | uuid | FK cafes.id | 카페 |
| map_provider | text | nullable | kakao, naver, google |
| launched_at | timestamptz | default now() | 길찾기 실행 시각 |
| reentered_at | timestamptz | nullable | 앱 재진입 시각 |
| feedback_triggered | boolean | default false | 피드백 표시 여부 |

### visit_feedbacks

방문 후 추천 평가입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 피드백 ID |
| user_id | uuid | FK profiles.id | 사용자 |
| cafe_id | uuid | FK cafes.id | 카페 |
| source | text | not null | reentry, collection_long_press |
| visit_confirmed | boolean | not null | 방문 여부 |
| rating | text | nullable | good, neutral, bad |
| mismatch_reason | text | nullable | 시끄러움 등 |
| created_at | timestamptz | default now() | 생성일 |

### feedback_mood_categories

방문 후 실제 분위기 확인값입니다.

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| feedback_id | uuid | FK visit_feedbacks.id | 피드백 |
| mood_category_id | uuid | FK mood_categories.id | 카테고리 |
| created_at | timestamptz | default now() | 생성일 |

### notification_settings

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | ID |
| user_id | uuid | FK profiles.id, unique | 사용자 |
| service_enabled | boolean | default true | 서비스 알림 |
| marketing_enabled | boolean | default false | 마케팅 알림 |
| feedback_reminder_enabled | boolean | default false | 피드백 리마인더 |
| updated_at | timestamptz | default now() | 수정일 |

### inquiries

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 문의 ID |
| user_id | uuid | FK profiles.id | 사용자 |
| category | text | not null | 문의 유형 |
| title | text | not null | 제목 |
| content | text | not null | 내용 |
| status | text | default submitted | 처리 상태 |
| created_at | timestamptz | default now() | 생성일 |

### notices

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 공지 ID |
| title | text | not null | 제목 |
| content | text | not null | 내용 |
| is_published | boolean | default false | 게시 여부 |
| created_at | timestamptz | default now() | 생성일 |

### policy_documents

| column | type | constraint | desc |
|---|---|---|---|
| id | uuid | PK | 문서 ID |
| policy_type | text | not null | terms, privacy, location, partner |
| title | text | not null | 제목 |
| content | text | not null | 내용 |
| version | text | not null | 버전 |
| effective_date | date | nullable | 시행일 |
| created_at | timestamptz | default now() | 생성일 |

## 4. RLS 정책 요약

| table | select | insert/update/delete |
|---|---|---|
| profiles | 본인만 | 본인만 |
| user_preferences | 본인만 | 본인만 |
| user_neighborhoods | 본인만 | 본인만 |
| collections | 본인만 | 본인만 |
| collection_items | 본인 컬렉션만 | 본인 컬렉션만 |
| user_actions | 본인만 | 본인만 insert |
| navigation_logs | 본인만 | 본인만 |
| visit_feedbacks | 본인만 | 본인만 |
| cafes | 전체 공개 | 관리자만 |
| cafe_images | 전체 공개 | 관리자만 |
| mood_categories | 전체 공개 | 관리자만 |
| notices | 게시된 공지만 공개 | 관리자만 |
| policy_documents | 전체 공개 | 관리자만 |

## 5. Storage Buckets

| bucket | 용도 | 접근 |
|---|---|---|
| cafe-images | 카페 이미지 | public read, admin write |
| mood-category-images | 온보딩/무드보드 이미지 | public read, admin write |
| avatars | 사용자 프로필 이미지 | owner read/write |

## 6. 추천 가중치 기준

| signal | weight |
|---|---:|
| 방문 후 평가 good | +0.4 |
| 방문 후 평가 neutral | +0.05 |
| 방문 후 평가 bad | -0.35 |
| 실제 분위기 일치 | +0.2 |
| 실제 분위기 불일치 | -0.1 |
| 저장 | +0.25 |
| 공유 | +0.2 |
| 길찾기 | +0.15 |
| 상세 진입 | +0.1 |
| 저장 취소 | -0.2 |
| 빠른 패스 | -0.05 |
