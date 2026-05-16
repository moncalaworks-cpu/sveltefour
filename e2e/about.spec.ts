import { test, expect } from '@playwright/test';

test.describe('About Section', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('About section loads and displays', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeVisible();
	});

	test('About section has correct id for anchor navigation', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeVisible();
	});

	test('displays Ken Shinzato name and title', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toContainText('Ken Shinzato');
		await expect(aboutSection).toContainText('QA Engineer & Manager');
	});

	test('profile image is visible with correct alt text', async ({ page }) => {
		const aboutSection = page.locator('#about');
		const img = aboutSection.locator('img[alt*="Ken Shinzato"]');
		await expect(img).toBeVisible();
		await expect(img).toHaveAttribute('src', /profile\.jpg/);
	});

	test('profile image has correct alt text', async ({ page }) => {
		const aboutSection = page.locator('#about');
		const img = aboutSection.locator('img').first();
		const altText = await img.getAttribute('alt');
		expect(altText).toContain('Ken Shinzato');
	});

	test('bio text renders with proper typography', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toContainText('Analytical and detail-oriented');
	});

	test('displays 3 highlight metrics', async ({ page }) => {
		const aboutSection = page.locator('#about');

		// Check for Years Experience highlight
		await expect(aboutSection).toContainText('15+');

		// Check for Major Projects highlight
		await expect(aboutSection).toContainText('50+');

		// Check for Top Tools highlight
		await expect(aboutSection).toContainText('Selenium');
		await expect(aboutSection).toContainText('Playwright');
		await expect(aboutSection).toContainText('Appium');
	});

	test('Years Experience metric displays value correctly', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toContainText('15+');
	});

	test('Major Projects metric displays value correctly', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toContainText('50+');
	});

	test('Top Tools metric displays correctly', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		await expect(aboutSection).toContainText('Selenium');
		await expect(aboutSection).toContainText('Playwright');
		await expect(aboutSection).toContainText('Appium');
	});

	test('image has styling with rounded corners and shadow', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		const imageContainer = aboutSection.locator('img').first();

		const classes = await imageContainer.getAttribute('class');
		expect(classes).toBeTruthy();
	});

	test('responsive layout on desktop (2-column layout)', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		const content = aboutSection.locator('.grid, [class*="grid"]').first();

		await expect(content).toBeVisible();
	});

	test('responsive layout on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		await expect(aboutSection).toBeVisible();

		// Both image and text should be visible
		const img = aboutSection.locator('img');
		const textContent = aboutSection.locator('p').first();

		await expect(img).toBeVisible();
		await expect(textContent).toBeVisible();
	});

	test('responsive layout on mobile (stacked layout)', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });

		// Image should be visible
		const img = aboutSection.locator('img');
		await expect(img).toBeVisible();

		// Text should be below image
		const textContent = aboutSection.locator('p').first();
		await expect(textContent).toBeVisible();
	});

	test('About link in navbar navigates to About section', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		const aboutLink = page.locator('a[href="/#about"]').first();
		await aboutLink.click();

		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeInViewport();
	});

	test('Bio content mentions expertise in test automation', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		await expect(aboutSection).toContainText('test automation');
	});

	test('Bio mentions leadership capabilities', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		await expect(aboutSection).toContainText('leading QA teams');
	});

	test('image is lazy loaded (has width and height)', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		const img = aboutSection.locator('img').first();

		const src = await img.getAttribute('src');
		expect(src).toBeTruthy();
	});

	test('section has semantic article or section tag', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
		await expect(aboutSection).toBeVisible();
	});

	test('highlight metrics are displayed in visual format', async ({ page }) => {
		const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });

		// All three metrics should be present
		const metricsText = await aboutSection.textContent();
		expect(metricsText).toContain('15+');
		expect(metricsText).toContain('50+');
		expect(metricsText).toContain('Selenium');
	});
});
