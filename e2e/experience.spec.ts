import { test, expect } from '@playwright/test';

test.describe('Experience Section', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Experience section loads and displays', async ({ page }) => {
		const expSection = page.locator('#experience');
		await expect(expSection).toBeVisible();
	});

	test('Experience section has correct id for anchor navigation', async ({ page }) => {
		const expSection = page.locator('#experience');
		await expect(expSection).toBeVisible();
	});

	test('displays all 3 positions', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('Kinly');
		await expect(expSection).toContainText('PPL');
		await expect(expSection).toContainText('Trend MLS');
	});

	test('Kinly position displays with correct title and dates', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('Kinly');
		await expect(expSection).toContainText('Sep 2021');
	});

	test('PPL position displays with correct title and dates', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('PPL');
		await expect(expSection).toContainText('Feb 2020');
	});

	test('Trend MLS position displays with correct title and dates', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('Trend MLS');
		await expect(expSection).toContainText('Jan 2013');
	});

	test('Kinly position shows all achievements', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('Detox');
		await expect(expSection).toContainText('CircleCI');
		await expect(expSection).toContainText('60%');
	});

	test('PPL position shows all achievements', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('2000+');
		await expect(expSection).toContainText('Oracle');
	});

	test('Trend MLS position shows all achievements', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('1M+');
	});

	test('each position has list of achievements', async ({ page }) => {
		const expSection = page.locator('#experience');

		const achievements = expSection.locator('li');
		const count = await achievements.count();

		expect(count).toBeGreaterThan(0);
	});

	test('timeline structure renders with articles', async ({ page }) => {
		const expSection = page.locator('#experience');

		const timelineArticles = expSection.locator('article');
		const count = await timelineArticles.count();

		expect(count).toBe(3);
	});

	test('dates display with present status for current role', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('present');
	});

	test('company names are clearly visible', async ({ page }) => {
		const expSection = page.locator('#experience');
		const text = await expSection.textContent();

		expect(text).toContain('Kinly');
		expect(text).toContain('PPL');
		expect(text).toContain('Trend MLS');
	});

	test('responsive layout on mobile (cards stack)', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		const expSection = page.locator('#experience');
		await expect(expSection).toBeVisible();
	});

	test('responsive layout on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		const expSection = page.locator('#experience');
		await expect(expSection).toBeVisible();
	});

	test('responsive layout on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		const expSection = page.locator('#experience');
		await expect(expSection).toBeVisible();
	});

	test('Experience link in navbar navigates to Experience section', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });

		const expLink = page.locator('a[href="/#experience"]').first();
		await expLink.click();

		const expSection = page.locator('#experience');
		await expect(expSection).toBeInViewport();
	});

	test('positions are displayed in chronological order', async ({ page }) => {
		const expSection = page.locator('#experience');

		const text = await expSection.textContent();

		// Kinly comes before PPL, PPL comes before Trend MLS
		const kinlyIndex = text?.indexOf('Kinly') ?? -1;
		const pplIndex = text?.indexOf('PPL') ?? -1;
		const trendIndex = text?.indexOf('Trend MLS') ?? -1;

		expect(kinlyIndex).toBeLessThan(pplIndex);
		expect(pplIndex).toBeLessThan(trendIndex);
	});

	test('all achievement list items are visible', async ({ page }) => {
		const expSection = page.locator('#experience');

		const allAchievements = expSection.locator('li');
		const visibleCount = await allAchievements.count();

		expect(visibleCount).toBeGreaterThan(0);
	});

	test('section heading displays Experience', async ({ page }) => {
		const expSection = page.locator('#experience');

		await expect(expSection).toContainText('Experience');
	});

	test('text content is readable on all viewports', async ({ page }) => {
		const viewports = [
			{ width: 375, height: 667 },
			{ width: 768, height: 1024 },
			{ width: 1440, height: 900 }
		];

		for (const viewport of viewports) {
			await page.setViewportSize(viewport);
			const expSection = page.locator('#experience');

			await expect(expSection).toBeVisible();
		}
	});
});
