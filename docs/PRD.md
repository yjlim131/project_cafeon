# CafeOn PRD.md

## 1. 문서 목적

이 문서는 CafeOn MVP 구현을 위한 제품 요구사항 문서입니다. React, Tailwind CSS, Supabase 기반 개발을 전제로 하며, 화면별 목적, 주요 기능, 상태, 예외 처리, Acceptance Criteria를 정의합니다.

## 2. MVP 목표

- 사용자가 검색/필터 없이 이미지 기반 온보딩으로 자신의 공간 취향을 설정한다.
- 홈 피드에서 감성 카드 중심으로 카페를 발견한다.
- AI 탭에서 자연어 한 줄로 지금 상황에 맞는 카페를 추천받는다.
- 저장, 길찾기, 방문 피드백을 통해 개인화 루프를 만든다.
- MY 탭에서 취향, 동네, 최근 방문, 설정/고객지원 정보를 관리한다.

## 3. 핵심 용어

| 용어 | 정의 |
|---|---|
| Mood Category | 서비스가 정의한 8개 공간 분위기 카테고리 |
| MoodBoard | 카테고리를 이미지/컬러/설명으로 확대한 선택 확인 화면 |
| User Preference Vector | 사용자의 카테고리별 선호 가중치 |
| Behavior Signal | 저장, 공유, 상세 진입, 길찾기, 패스 등 행동 신호 |
| Visit Feedback | 방문 후 추천 적합도와 실제 분위기를 확인하는 피드백 |

## 4. 화면 목록

| ID | 화면 | Route | MVP 여부 |
|---|---|---|---|
| S01 | Splash | `/` | 필수 |
| S02 | Login | `/login` | 필수 |
| S03 | Onboarding Mood | `/onboarding` | 필수 |
| S04 | MoodBoard | modal/sheet | 필수 |
| S05 | Neighborhood Setup | `/onboarding/neighborhoods` | 필수 |
| S06 | Preference Summary | `/onboarding/summary` | 필수 |
| S07 | Home Feed | `/home` | 필수 |
| S08 | AI Chat | `/ai` | 필수 |
| S09 | Cafe Detail | `/cafe/:id` | 필수 |
| S10 | Collections | `/collections` | 필수 |
| S11 | Visit Feedback | bottom sheet | 필수 |
| S12 | My Page | `/my` | 필수 |
| S13 | Profile Edit | `/my/profile` | 필수 |
| S14 | My Info Edit | `/my/account` | 필수 |
| S15 | Recent Visits | `/my/visits` | 필수 |
| S16 | Notification Settings | `/my/notifications` | 필수 UI |
| S17 | Inquiry | `/my/inquiry` | 필수 |
| S18 | Notices | `/my/notices` | 필수 |
| S19 | Terms | `/my/terms` | 필수 |

## 5. 기능 요구사항

### S03. Onboarding Mood

목적: 사용자가 마음에 드는 공간 이미지를 선택하고, 이를 Mood Category 선호값으로 저장한다.

메인 문구:

```txt
마음에 드는 공간을 골라주세요.
AI가 당신의 공간 취향을 학습하여 지금 가장 어울리는 카페를 추천합니다.
```

주요 컴포넌트:

- `MoodCategoryCard`
- `MoodBoardModal`
- `SelectedMoodCounter`
- `FixedBottomButton`

정책:

- 8개 카테고리를 2열 그리드로 표시
- 최소 3개 선택 전까지 다음 버튼 비활성화
- 선택 카드 재탭 시 선택 해제 가능
- 카드 탭 시 바로 선택하지 않고 무드보드 확대 화면을 먼저 보여준다
- 무드보드에서 `이 분위기 선택`을 눌러야 선택 완료

Acceptance Criteria:

- 사용자는 8개 분위기 카드를 볼 수 있다.
- 사용자는 카드를 탭해 무드보드를 확인할 수 있다.
- 사용자는 최소 3개 선택 후 다음 단계로 이동할 수 있다.
- 선택값은 `user_preferences`에 저장 가능한 형태로 관리된다.

### S06. Preference Summary

목적: AI가 사용자의 선택을 이해했다는 확신을 준다.

UI:

- 분위기 + 동네를 모두 반영한 요약
- "회원님의 취향을 분석했어요"
- `시작하기` 버튼

Acceptance Criteria:

- 선택한 카테고리와 동네가 표시된다.
- 시작하기 선택 시 홈으로 이동한다.

### S07. Home Feed

목적: 지도/검색보다 먼저 감성 카드 피드로 카페를 발견하게 한다.

주요 컴포넌트:

- ContextBanner
- MoodCategoryTabList
- CafeCard
- BottomNavigation

정책:

- 온보딩 선택 카테고리를 기반으로 탭을 우선 노출
- 카드에는 이미지, 카페명, 동네, 영업 여부, 추천 이유를 표시
- 추천 이유는 온보딩 선택과 연결된 문장으로 표시

예: `회원님이 선택하신 빈티지 감성과 일치해요.`

### S08. AI Chat

목적: 자연어 입력 한 줄로 상황 기반 추천을 제공한다.

주요 기능:

- 채팅 진입 시 시간/날씨/위치/방문 이력 컨텍스트 스트립 표시
- 자연어 입력
- 추천 카드 인라인 삽입
- 후속 조건 칩 제공

Acceptance Criteria:

- 사용자가 문장을 입력하면 추천 카드가 표시된다.
- 추천 카드에는 추천 이유, 거리, 분위기 카테고리가 표시된다.
- 후속 조건 칩 선택 시 추천 조건이 갱신된다.

### S09. Cafe Detail

목적: 발견한 카페의 감성 정보와 실용 정보를 확인하고 저장/공유/길찾기를 수행한다.

표시 순서:

1. 히어로 이미지
2. 카페명, 영업 여부, 거리
3. 분위기 카테고리
4. AI 추천 이유
5. 운영 정보
6. 지도 미리보기
7. 하단 액션: 저장, 공유, 길찾기

### S10. Collections

목적: 저장한 카페를 컬렉션 단위로 관리한다.

기능:

- 컬렉션 목록
- 저장 카페 목록
- 신규 컬렉션 생성
- 저장 취소
- 롱프레스 메뉴: 다녀왔어요, 상세 보기, 이동, 저장 취소

### S11. Visit Feedback

목적: 실제 방문 여부와 추천 적합도를 확인해 개인화 정확도를 높인다.

진입 조건:

- 길찾기 실행 후 30분~3시간 내 앱 재진입
- 컬렉션 카드 롱프레스 후 `다녀왔어요` 선택

단계:

1. 방문 여부 확인
2. 추천 평가: 잘 맞았어요 / 그냥 그랬어요 / 별로였어요
3. 실제 분위기 확인: 최대 2개 선택, 선택 사항

### S12. My Page

목적: 사용자의 개인화 정보와 설정을 관리한다.

정보 노출형 카드 3개:

1. 프로필 영역
2. 내 분위기 카테고리
3. 최근 방문한 카페 최신순 2개

메뉴:

- 알림 설정
- 1:1 문의
- 공지사항 및 이용약관
- 버전 정보

Acceptance Criteria:

- 사용자는 프로필과 공간 취향을 확인하고 수정할 수 있다.
- 사용자는 최근 방문 카페 2개를 확인하고 상세로 이동할 수 있다.
- 사용자는 공지사항, 약관, 앱 버전 정보를 확인할 수 있다.

## 6. 비기능 요구사항

- 모바일 우선 UI
- 첫 온보딩 완료 목표 90초 이내
- 피드 카드는 이미지 로딩 실패 시 기본 플레이스홀더 표시
- Supabase RLS 적용
- 사용자 개인정보는 본인만 조회/수정 가능
- 사전 동의 없는 푸시 알림 미발송

## 7. MVP 제외 범위

- GPS 도착 감지 기반 자동 방문 판정
- 사진 리뷰
- 별점 리뷰
- 복잡한 카페 점주 어드민
- 결제/예약
- 푸시 알림 실발송
