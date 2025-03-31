# CHIT (치지직 중심의 시청자 방송참여 플랫폼)

이 프로젝트는 치지직 스트리머가 시청자 참여 이벤트 등을 열 때, 시청자 참여를 관리 할 수 있도록 해주는 플랫폼입니다.

### 주 기능

1. 실시간 시참 대기순서 표시
2. 원하는 시청자 고정 (FIXED PICK)
3. 시청자 강퇴

---

## 🚀 시작하기

### 1. 레포지토리 클론

```bash
git clone https://github.com/bananana0118/chit_frontend.git
cd chit_frontend
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 📁 폴더 구조

```
/src
  ├── app            # 페이지 컴포넌트 (Next.js app 라우팅)
  ├── components       # 공통 UI 컴포넌트
  ├── hooks            # 커스텀 훅
  ├── utils            # 유틸리티 함수
  ├── styles           # 전역 스타일 정의
  └── store            # 전역 상태 관리

```

## 🛠 사용 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- ESLint / Prettier

## 📌 커밋 컨벤션

- feat: 새로운 기능 추가

- fix: 버그 수정

- docs: 문서 변경

- style: 코드 스타일 변경 (포맷팅 등)

- refactor: 코드 리팩터링

- test: 테스트 코드 추가/수정

- chore: 기타 변경사항

- setting : 라이브러리 추가 및 설정 추가

```bash
# 예시 커밋 메시지
[feat]: 로그인 버튼 UI 구현

- 로그인 버튼 UI를 세부구현 했습니다. (옵션)
```

## 🔍 브랜치 전략

- main: 배포 브랜치

- dev: 개발 브랜치 (기능 병합 전용)

- feature/이름: 개별 기능 개발 브랜치

## PR 규칙

- PR 제목: [Feat] 기능 이름, [Fix] 버그 설명 등

- PR 생성 시 템플릿을 활용해 작업 내용 명확히 작성

- 리뷰어 지정 필수

- 본인 PR은 최소 1명 이상 리뷰 후 병합

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.
