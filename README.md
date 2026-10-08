# Huddling

Next.js App Router, TypeScript 5, Tailwind CSS v4 프로젝트입니다.

## 실행

Node.js 20.9 이상과 npm이 필요합니다.

```bash
npm ci
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인합니다.

## 검증

```bash
npm run lint
npm run typecheck
npm run build
```

프로덕션 서버는 빌드 후 `npm start`로 실행합니다.

## 구조

- `src/app/page.tsx`: 시작 페이지
- `src/app/layout.tsx`: 공통 레이아웃과 메타데이터
- `src/app/globals.css`: 전역 스타일과 Tailwind CSS v4 테마
- `postcss.config.mjs`: Tailwind PostCSS 플러그인

`@/*` 경로 별칭은 `src/*`를 가리킵니다.
