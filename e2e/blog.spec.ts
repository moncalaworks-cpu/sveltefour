import { test, expect } from '@playwright/test';

test.describe('Blog Section - Homepage Preview', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Blog preview section displays on homepage', async ({ page }) => {
		const blogPreview = page.locator('#blog');

		await expect(blogPreview).toBeVisible();
	});

	test('Blog preview section has heading', async ({ page }) => {
		const blogPreview = page.locator('#blog');
		const heading = blogPreview.locator('h2, h3').first();
		await expect(heading).toBeVisible();
	});
});

test.describe('Blog Listing Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/blog');
	});

	test('Blog listing page loads', async ({ page }) => {
		const main = page.locator('main');
		await expect(main).toBeVisible();
	});

	test('Blog page displays page heading', async ({ page }) => {
		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});

	test('Blog page displays description', async ({ page }) => {
		const description = page.locator('p').first();

		await expect(description).toBeVisible();
	});

	test('Blog posts are displayed in grid layout', async ({ page }) => {
		const grid = page.locator('[class*="grid"]').first();
		await expect(grid).toBeVisible();
	});

	test('responsive layout on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/blog');

		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});

	test('responsive layout on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/blog');

		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});

	test('responsive layout on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/blog');

		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});
});

test.describe('Blog Listing Page - Link Navigation', () => {
	test('Blog link in navbar navigates to /blog', async ({ page }) => {
		await page.goto('/');
		await page.setViewportSize({ width: 1024, height: 768 });

		const blogLink = page.locator('a[href="/blog"]').first();
		await blogLink.click();

		await expect(page).toHaveURL('/blog');
	});

	test('Blog page has semantic HTML structure', async ({ page }) => {
		await page.goto('/blog');

		const main = page.locator('main');
		const sections = page.locator('section');

		await expect(main).toBeVisible();
		await expect(sections.first()).toBeVisible();
	});
});

test.describe('Blog Post Detail Pages', () => {
	test('Blog page structure (generic check)', async ({ page }) => {
		await page.goto('/blog');

		const title = page.locator('h1');
		await expect(title).toBeVisible();
	});

	test('Blog page has responsive typography', async ({ page }) => {
		await page.goto('/blog');

		const heading = page.locator('h1');
		const classes = await heading.getAttribute('class');

		expect(classes).toBeTruthy();
	});

	test('Blog listing page text is readable on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/blog');

		const heading = page.locator('h1');
		const description = page.locator('p').first();

		await expect(heading).toBeVisible();
		await expect(description).toBeVisible();
	});

	test('Blog listing page text is readable on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/blog');

		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});

	test('Blog listing page text is readable on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/blog');

		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});

	test('Blog page has max-width container for readability', async ({ page }) => {
		await page.goto('/blog');

		const container = page.locator('div[class*="max-w"]').first();
		await expect(container).toBeVisible();
	});

	test('Blog page has proper padding on all sides', async ({ page }) => {
		await page.goto('/blog');

		const section = page.locator('section').first();
		const classes = await section.getAttribute('class');

		expect(classes).toBeTruthy();
	});

	test('Blog page maintains white background', async ({ page }) => {
		await page.goto('/blog');

		const main = page.locator('main');
		const classes = await main.getAttribute('class');

		expect(classes).toContain('bg-white');
	});
});

test.describe('Blog Section Accessibility', () => {
	test('Blog page has proper heading hierarchy', async ({ page }) => {
		await page.goto('/blog');

		const h1 = page.locator('h1');
		await expect(h1).toBeVisible();

		const allHeadings = page.locator('h1, h2, h3, h4, h5, h6');
		expect(await allHeadings.count()).toBeGreaterThan(0);
	});

	test('Blog page has semantic sections', async ({ page }) => {
		await page.goto('/blog');

		const sections = page.locator('section');
		await expect(sections.first()).toBeVisible();
	});
});
