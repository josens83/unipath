# 접근성 가이드 (Accessibility Guide)

UniPath 프로젝트는 모든 사용자가 동등하게 접근할 수 있도록 설계되었습니다.

## 구현된 접근성 기능

### 1. 키보드 네비게이션
- 모든 인터랙티브 요소는 키보드로 접근 가능
- Tab 키로 포커스 이동
- Enter/Space로 버튼 활성화
- Esc로 모달 닫기

### 2. 포커스 표시
- 모든 버튼과 링크에 `focus:ring` 스타일 적용
- 시각적 포커스 표시로 현재 위치 명확화

### 3. 색상 대비
- WCAG 2.1 AA 기준 준수
- 텍스트와 배경 색상 대비율 4.5:1 이상
- 중요 UI 요소는 3:1 이상

### 4. 시맨틱 HTML
- 적절한 HTML 요소 사용 (`button`, `nav`, `main`, `article` 등)
- heading 계층 구조 유지 (`h1` → `h2` → `h3`)

### 5. 에러 메시지
- React Hook Form을 통한 명확한 에러 메시지
- 폼 검증 실패 시 사용자에게 명확한 피드백

## 접근성 개선 권장사항

### ARIA 라벨 추가

아이콘 전용 버튼에 aria-label 추가:

```tsx
<button aria-label="메뉴 열기">
  <Menu />
</button>

<button aria-label="검색">
  <Search />
</button>
```

### 대체 텍스트

이미지에 의미 있는 alt 텍스트:

```tsx
<img src="logo.png" alt="UniPath 로고" />
<img src="chart.png" alt="성적 추이 그래프: 지난 6개월간 점수 상승" />
```

### 랜드마크 역할

주요 섹션에 role 속성:

```tsx
<nav role="navigation" aria-label="주 메뉴">
  {/* 네비게이션 */}
</nav>

<main role="main">
  {/* 메인 콘텐츠 */}
</main>

<aside role="complementary" aria-label="관련 정보">
  {/* 사이드바 */}
</aside>
```

### 폼 접근성

라벨과 입력 필드 연결:

```tsx
<label htmlFor="email">이메일</label>
<input
  id="email"
  type="email"
  aria-describedby="email-hint"
  aria-required="true"
/>
<span id="email-hint">유효한 이메일 주소를 입력하세요</span>
```

### 동적 콘텐츠

로딩 상태 알림:

```tsx
<div aria-live="polite" aria-busy={loading}>
  {loading ? '로딩 중...' : '콘텐츠'}
</div>
```

### 모달 접근성

```tsx
<dialog
  role="dialog"
  aria-labelledby="modal-title"
  aria-modal="true"
>
  <h2 id="modal-title">모달 제목</h2>
  {/* 모달 콘텐츠 */}
</dialog>
```

## 스크린 리더 테스트

### 권장 도구
- **Windows**: NVDA (무료)
- **macOS**: VoiceOver (내장)
- **Chrome**: ChromeVox 확장 프로그램

### 테스트 체크리스트
- [ ] 모든 페이지의 제목이 읽히는가?
- [ ] 내비게이션 순서가 논리적인가?
- [ ] 폼 필드가 명확하게 레이블되어 있는가?
- [ ] 에러 메시지가 읽히는가?
- [ ] 버튼의 목적이 명확한가?
- [ ] 이미지의 대체 텍스트가 의미 있는가?

## 자동화 테스트

### axe DevTools 사용

```bash
npm install -D @axe-core/react
```

```tsx
// main.tsx에 추가 (개발 환경만)
if (import.meta.env.DEV) {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

### Lighthouse 감사

Chrome DevTools > Lighthouse > Accessibility 체크

목표: **90점 이상**

## WCAG 2.1 체크리스트

### Level A (필수)
- [x] 1.1.1 Non-text Content
- [x] 2.1.1 Keyboard
- [x] 2.4.1 Bypass Blocks
- [x] 3.1.1 Language of Page
- [x] 4.1.2 Name, Role, Value

### Level AA (권장)
- [x] 1.4.3 Contrast (Minimum)
- [x] 2.4.7 Focus Visible
- [ ] 3.2.4 Consistent Identification
- [ ] 3.3.3 Error Suggestion
- [ ] 3.3.4 Error Prevention

## 참고 자료

- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [React 접근성](https://react.dev/learn/accessibility)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM 체크리스트](https://webaim.org/standards/wcag/checklist)
