import { test, expect } from '@playwright/test';

test.describe('인증 플로우', () => {
  test('랜딩 페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('UniPath');
  });

  test('로그인 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/');
    await page.click('text=로그인');
    await expect(page).toHaveURL('/auth/login');
  });

  test('회원가입 페이지로 이동할 수 있다', async ({ page }) => {
    await page.goto('/');
    await page.click('text=무료로 시작하기');
    await expect(page).toHaveURL('/auth/register');
  });

  test('회원가입 폼이 올바르게 동작한다', async ({ page }) => {
    await page.goto('/auth/register');

    // 폼 필드 확인
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();

    // 역할 선택 버튼 확인
    await expect(page.locator('text=학생')).toBeVisible();
    await expect(page.locator('text=튜터')).toBeVisible();
    await expect(page.locator('text=학부모')).toBeVisible();
  });
});

test.describe('대시보드', () => {
  test('학생 대시보드 페이지가 로드된다', async ({ page }) => {
    // Mock 로그인 (실제로는 Supabase Auth 필요)
    await page.goto('/dashboard/student');
    // Mock 데이터가 있으므로 기본 UI는 표시됨
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });
});
