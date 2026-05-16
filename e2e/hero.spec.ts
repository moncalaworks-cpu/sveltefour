import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads hero section with Ken Shinzato heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Ken Shinzato');
  });

  test('primary CTA button is visible and clickable', async ({ page }) => {
    const primaryCta = page.locator('a:has-text("View Projects")');
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveAttribute('href', '#projects');
  });

  test('secondary CTA button is visible and clickable', async ({ page }) => {
    const secondaryCta = page.locator('a:has-text("Get in Touch")');
    await expect(secondaryCta).toBeVisible();
    await expect(secondaryCta).toHaveAttribute('href', '#contact');
  });

  test('scroll indicator text is visible', async ({ page }) => {
    const scrollText = page.locator('text=Scroll to explore');
    await expect(scrollText).toBeVisible();
  });

  test('hero section displays QA Engineer tagline', async ({ page }) => {
    const tagline = page.locator('section >> text=QA Engineer & Manager').first();
    await expect(tagline).toBeVisible();
  });
});
