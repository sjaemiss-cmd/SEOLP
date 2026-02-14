# 고수의 운전면허 도봉점 랜딩페이지 제작 문서 (AI 에이전트용)

이 문서는 본 저장소의 구현을 근거로, 다른 업종의 웹사이트를 제작할 때 동일한 개발 방향과 구조를 재현할 수 있도록 정리한 기술 문서입니다. 코드에 존재하는 근거만 기록하며 추정은 포함하지 않습니다.

## 1) 목표와 제작 방향
- 단일 랜딩 허브 + 의도(Intent)별 서브 랜딩 + 지역(Locations) SEO 확장 구조
- 전환 중심: 반복 CTA, 참여형 위젯, 신뢰 섹션(후기/FAQ/위치) 결합
- 콘텐츠는 데이터 중심으로 분리하여 비개발자가 텍스트만 수정 가능하게 설계

## 2) 기술 스택
- 프레임워크: Next.js App Router (`next`)
- 언어: TypeScript
- UI: React
- 스타일: Tailwind CSS v4 (`@tailwindcss/postcss`)
- 애니메이션: framer-motion
- 아이콘: lucide-react
- 분석/성능: `@vercel/analytics`, `@vercel/speed-insights`
- 배포: Vercel (`vercel.json`)

참고 파일
- `package.json`
- `next.config.mjs`
- `vercel.json`

## 3) 정보 구조(IA) 및 라우팅
- 메인 허브: `/` (`src/app/page.tsx`)
- 의도별 랜딩: `/speed`, `/phobia`, `/skill`, `/practice` (`src/app/*/page.tsx`)
- 지역 랜딩: `/locations/[slug]` (`src/app/locations/[slug]/page.tsx`)
- 지역 + 의도 랜딩: `/locations/[slug]/[intent]` (`src/app/locations/[slug]/[intent]/page.tsx`)
- 공통 섹션: `src/components/*`에 재사용 섹션 구성

## 4) 콘텐츠 아키텍처 (데이터 드리븐)
- 모든 텍스트/콘텐츠는 `src/data/siteConfig.ts`, `src/data/landingData.ts`에 집중
- 컴포넌트는 데이터만 받는 구조로 유지 (콘텐츠/뷰 분리)
- 의도별 레이아웃 전략:
  - 기본(비용/허브): 데이터 드리븐 컴포넌트 세트
  - 전용(속성/공포/공식/연습): 전용 컴포넌트 세트
- 의도별 컴포넌트 레지스트리: `src/config/intentConfig.ts`
  - 새 intent 추가 시 페이지 수정 없이 레지스트리만 확장

## 5) SEO 최적화 전략 (증거 기반)
### 5.1 메타데이터
- App Router의 `metadata` 및 `generateMetadata` 활용
- 타이틀/디스크립션: 의도, 지역, 키워드 조합으로 동적 구성
- OpenGraph/Twitter 카드 지정
- canonical URL 설정

참고 파일
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/speed/page.tsx`
- `src/app/phobia/page.tsx`
- `src/app/locations/[slug]/page.tsx`
- `src/app/locations/[slug]/[intent]/page.tsx`

### 5.2 구조화 데이터(JSON-LD)
- Organization, LocalBusiness, FAQPage 스키마 제공
- 메인/지역/의도 페이지에 필요 스키마 주입

참고 파일
- `src/lib/structuredData.tsx`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/locations/[slug]/page.tsx`
- `src/app/locations/[slug]/[intent]/page.tsx`

### 5.3 사이트맵/로봇
- `src/app/sitemap.ts`: 정적 + 지역 + 의도 페이지 생성
  - 대규모 페이지 빌드 타임아웃 방지용 상한 적용
- `src/app/robots.ts`: 크롤링 규칙과 사이트맵 경로 제공
- `public/robots.txt`: 별도 robots 파일 존재

참고 파일
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `public/robots.txt`

### 5.4 키워드/지역 확장
- 지역 × 키워드 조합으로 SEO용 위치 데이터 생성
- intent별 키워드 매핑으로 유효한 조합만 페이지 생성

참고 파일
- `src/data/seoData.ts`
- `src/app/locations/[slug]/[intent]/page.tsx`

### 5.5 성능/접근성 기반 SEO 보조
- 로컬 폰트 로딩(`next/font/local`)과 `display: swap`
- 애니메이션은 CSS 키프레임으로 단순화
- 공통 배경/색상 변수화로 일관성 유지

참고 파일
- `src/app/layout.tsx`
- `src/app/globals.css`

## 6) 렌더링 전략 및 아키텍처
- App Router + 서버 컴포넌트 기반
- 대규모 SEO 페이지는 ISR처럼 동작하도록 `dynamicParams = true`
- `generateStaticParams`에서 상한을 둬 빌드 타임 폭증 방지

참고 파일
- `src/app/locations/[slug]/page.tsx`
- `src/app/locations/[slug]/[intent]/page.tsx`

## 7) 디자인/콘텐츠 모듈 구조
- 섹션 단위 컴포넌트 조합
  - Hero → 참여형 위젯 → USP/Problem → Curriculum → CTA → SocialProof → Location → FAQ → Footer → Floating CTA
- 의도별 색상 테마를 데이터에서 주입
- CTA 링크는 데이터에 직접 저장하여 전환 경로 일원화

참고 파일
- `src/data/siteConfig.ts`
- `src/data/landingData.ts`
- `src/components/*`

## 8) 운영/분석/배포
- Vercel Analytics/Speed Insights 주입 (`layout.tsx`)
- Vercel 배포 설정은 `vercel.json`에 명시
- 빌드/개발 스크립트는 `package.json` 기준

참고 파일
- `src/app/layout.tsx`
- `vercel.json`
- `package.json`

## 9) 다른 업종으로 재사용하는 방법 (실행 가이드)
1. **도메인/브랜드 교체**
   - `metadataBase`, OG 이미지 URL, 전화번호/주소/상호명 교체
2. **콘텐츠 교체**
   - `src/data/siteConfig.ts`, `src/data/landingData.ts`만 수정
3. **SEO 확장 구조 재구성**
   - `src/data/seoData.ts`의 키워드/지역 데이터 교체
   - 필요 시 `generateStaticParams` 상한 조정
4. **의도(Intent) 구조 유지**
   - 업종에 맞는 intent 정의 후 `src/config/intentConfig.ts` 확장
   - 전용 페이지 추가 시 `/src/app/[intent]/page.tsx` 작성
5. **미디어 교체**
   - `public/*` 이미지 및 비디오 교체
6. **배포 설정 갱신**
   - `vercel.json` 도메인 및 환경 설정 확인

## 10) 주의사항 (현재 구현에서 확인된 포인트)
- `public/robots.txt`의 sitemap 경로와 `src/app/robots.ts`의 sitemap 경로가 다를 수 있음
  - 실제 배포 도메인 기준으로 하나로 통일 필요
- 대규모 SEO 페이지 생성은 빌드 제한을 넘기지 않도록 상한 유지 필요

## 11) 핵심 파일 맵 (요약)
- 레이아웃/SEO: `src/app/layout.tsx`
- 메인 허브: `src/app/page.tsx`
- 의도별 페이지: `src/app/speed/page.tsx`, `src/app/phobia/page.tsx`, `src/app/skill/page.tsx`, `src/app/practice/page.tsx`
- 지역 페이지: `src/app/locations/[slug]/page.tsx`
- 지역+의도 페이지: `src/app/locations/[slug]/[intent]/page.tsx`
- 데이터/문구: `src/data/siteConfig.ts`, `src/data/landingData.ts`
- SEO 데이터: `src/data/seoData.ts`
- 의도 레지스트리: `src/config/intentConfig.ts`
- 구조화 데이터: `src/lib/structuredData.tsx`
- 사이트맵/로봇: `src/app/sitemap.ts`, `src/app/robots.ts`, `public/robots.txt`
- 글로벌 스타일: `src/app/globals.css`
