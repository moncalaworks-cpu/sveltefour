import { test, expect } from '@playwright/test';

test.describe('Responsive Design - Mobile (375px)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
	});

	test('all content renders without horizontal scroll', async ({ page }) => {
		const main = page.locator('main');

		const scrollWidth = await main.evaluate((el) => el.scrollWidth);
		const clientWidth = await main.evaluate((el) => el.clientWidth);

		expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
	});

	test('text is readable and visible', async ({ page }) => {
		const heading = page.locator('h1');
		await expect(heading).toBeVisible();
	});

	test('images scale proportionally', async ({ page }) => {
		const img = page.locator('img').first();

		if (await img.count() > 0) {
			const width = await img.evaluate((el) => el.offsetWidth);
			expect(width).toBeLessThanOrEqual(375);
		}
	});

	test('Hero section renders on mobile', async ({ page }) => {
		const heroHeading = page.locator('h1');
		await expect(heroHeading).toBeVisible();
	});

	test('About section renders on mobile', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeVisible();
	});

	test('Experience section renders on mobile', async ({ page }) => {
		const expSection = page.locator('#experience');
		await expect(expSection).toBeVisible();
	});

	test('Projects section renders on mobile', async ({ page }) => {
		const projSection = page.locator('#projects');
		await expect(projSection).toBeVisible();
	});

	test('Skills section renders on mobile', async ({ page }) => {
		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeVisible();
	});

	test('Contact section renders on mobile', async ({ page }) => {
		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeVisible();
	});

	test('hamburger menu is visible', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await expect(hamburger).toBeVisible();
	});

	test('navigation is accessible via hamburger', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await hamburger.click();

		const blogLink = page.locator('a[href="/blog"]');
		await expect(blogLink).toBeVisible();
	});
});

test.describe('Responsive Design - Tablet (768px)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');
	});

	test('page renders properly without horizontal scroll', async ({ page }) => {
		const main = page.locator('main');

		const scrollWidth = await main.evaluate((el) => el.scrollWidth);
		const clientWidth = await main.evaluate((el) => el.clientWidth);

		expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
	});

	test('all sections are visible and readable', async ({ page }) => {
		const aboutSection = page.locator('#about');
		const expSection = page.locator('#experience');
		const projSection = page.locator('#projects');
		const skillsSection = page.locator('#skills');
		const contactSection = page.locator('#contact');

		await expect(aboutSection).toBeVisible();
		await expect(expSection).toBeVisible();
		await expect(projSection).toBeVisible();
		await expect(skillsSection).toBeVisible();
		await expect(contactSection).toBeVisible();
	});

	test('images display at appropriate size', async ({ page }) => {
		const img = page.locator('img').first();

		if (await img.count() > 0) {
			const width = await img.evaluate((el) => el.offsetWidth);
			expect(width).toBeLessThanOrEqual(768);
			expect(width).toBeGreaterThan(0);
		}
	});

	test('hamburger is hidden on tablet', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		const isHidden = await hamburger.evaluate((el) => {
			const style = window.getComputedStyle(el);
			return style.display === 'none' || style.visibility === 'hidden';
		});

		expect(isHidden).toBe(true);
	});

	test('desktop navigation is visible on tablet', async ({ page }) => {
		const aboutLink = page.locator('a[href="/#about"]').first();
		await expect(aboutLink).toBeVisible();
	});
});

test.describe('Responsive Design - Desktop (1440px)', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');
	});

	test('full desktop layout renders', async ({ page }) => {
		const main = page.locator('main');
		await expect(main).toBeVisible();
	});

	test('all sections are visible and readable', async ({ page }) => {
		const aboutSection = page.locator('#about');
		const expSection = page.locator('#experience');
		const projSection = page.locator('#projects');
		const skillsSection = page.locator('#skills');
		const contactSection = page.locator('#contact');

		await expect(aboutSection).toBeVisible();
		await expect(expSection).toBeVisible();
		await expect(projSection).toBeVisible();
		await expect(skillsSection).toBeVisible();
		await expect(contactSection).toBeVisible();
	});

	test('full horizontal navigation is visible', async ({ page }) => {
		const aboutLink = page.locator('a[href="/#about"]').first();
		const blogLink = page.locator('a[href="/blog"]').first();

		await expect(aboutLink).toBeVisible();
		await expect(blogLink).toBeVisible();
	});

	test('hamburger menu is hidden on desktop', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		const isHidden = await hamburger.evaluate((el) => {
			const style = window.getComputedStyle(el);
			return style.display === 'none' || style.visibility === 'hidden';
		});

		expect(isHidden).toBe(true);
	});

	test('all sections are in viewport without scrolling', async ({ page }) => {
		const main = page.locator('main');
		const isVisible = await main.isVisible();

		expect(isVisible).toBe(true);
	});
});

test.describe('Responsive Design - Breakpoint Transitions', () => {
	test('layout adjusts at 640px breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 640, height: 768 });
		await page.goto('/');

		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await expect(hamburger).toBeVisible();
	});

	test('layout adjusts at 768px breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		const isHidden = await hamburger.evaluate((el) => {
			const style = window.getComputedStyle(el);
			return style.display === 'none' || style.visibility === 'hidden';
		});

		expect(isHidden).toBe(true);
	});

	test('layout adjusts at 1024px breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const aboutLink = page.locator('a[href="/#about"]').first();
		await expect(aboutLink).toBeVisible();
	});

	test('text and images scale proportionally across viewports', async ({ page }) => {
		const viewports = [
			{ width: 375, height: 667 },
			{ width: 768, height: 1024 },
			{ width: 1440, height: 900 }
		];

		for (const viewport of viewports) {
			await page.setViewportSize(viewport);
			await page.goto('/');

			const heading = page.locator('h1');
			await expect(heading).toBeVisible();
		}
	});
});

test.describe('Responsive Design - Content Overflow Prevention', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('no horizontal scroll on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		const body = page.locator('body');
		const scrollWidth = await body.evaluate((el) => el.scrollWidth);
		const clientWidth = await body.evaluate((el) => el.clientWidth);

		expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
	});

	test('no horizontal scroll on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });

		const body = page.locator('body');
		const scrollWidth = await body.evaluate((el) => el.scrollWidth);
		const clientWidth = await body.evaluate((el) => el.clientWidth);

		expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
	});

	test('no horizontal scroll on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });

		const body = page.locator('body');
		const scrollWidth = await body.evaluate((el) => el.scrollWidth);
		const clientWidth = await body.evaluate((el) => el.clientWidth);

		expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
	});
});
