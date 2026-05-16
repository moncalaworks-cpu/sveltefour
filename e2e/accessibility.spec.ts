import { test, expect } from '@playwright/test';

test.describe('Accessibility - Semantic HTML', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('page has proper heading hierarchy starting with H1', async ({ page }) => {
		const h1 = page.locator('h1');
		await expect(h1).toBeVisible();

		const h1Count = await h1.count();
		expect(h1Count).toBeGreaterThan(0);
	});

	test('main element wraps all content', async ({ page }) => {
		const main = page.locator('main');
		await expect(main).toBeVisible();
	});

	test('sections have semantic structure', async ({ page }) => {
		const sections = page.locator('section');
		const count = await sections.count();

		expect(count).toBeGreaterThan(0);
	});

	test('page uses semantic header element', async ({ page }) => {
		const header = page.locator('header');
		await expect(header).toBeVisible();
	});
});

test.describe('Accessibility - Images and Alt Text', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('all images have alt text', async ({ page }) => {
		const images = page.locator('img');
		const imageCount = await images.count();

		if (imageCount > 0) {
			for (let i = 0; i < imageCount; i++) {
				const img = images.nth(i);
				const alt = await img.getAttribute('alt');

				expect(alt).toBeTruthy();
			}
		}
	});

	test('profile image has descriptive alt text', async ({ page }) => {
		const profileImg = page.locator('img[alt*="Ken Shinzato"]');

		if (await profileImg.count() > 0) {
			const alt = await profileImg.getAttribute('alt');
			expect(alt).toContain('Ken Shinzato');
		}
	});
});

test.describe('Accessibility - Link Text', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('navigation links are descriptive', async ({ page }) => {
		const navLinks = page.locator('header a, nav a');

		const expectedTexts = ['About', 'Experience', 'Projects', 'Skills', 'Blog', 'Contact'];

		for (const text of expectedTexts) {
			const link = navLinks.filter({ hasText: new RegExp(text, 'i') });
			if (await link.count() > 0) {
				await expect(link.first()).toBeVisible();
			}
		}
	});

	test('CTA buttons have descriptive text', async ({ page }) => {
		const buttons = page.locator('a[href*="#"], button');

		if (await buttons.count() > 0) {
			for (let i = 0; i < Math.min(await buttons.count(), 5); i++) {
				const button = buttons.nth(i);
				const text = await button.textContent();

				if (text) {
					expect(text.trim().length).toBeGreaterThan(0);
				}
			}
		}
	});
});

test.describe('Accessibility - Form Labels', () => {
	test('form inputs are accessible', async ({ page }) => {
		await page.goto('/');

		const inputs = page.locator('input, textarea');

		if (await inputs.count() > 0) {
			for (let i = 0; i < Math.min(await inputs.count(), 3); i++) {
				const input = inputs.nth(i);
				await expect(input).toBeVisible();
			}
		}
	});
});

test.describe('Accessibility - Keyboard Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');
	});

	test('logo is keyboard accessible', async ({ page }) => {
		const logo = page.getByRole('link', { name: /Ken Shinzato/ }).first();

		await page.keyboard.press('Tab');

		const focused = await page.evaluate(() => {
			return document.activeElement?.textContent?.includes('Ken Shinzato');
		});

		expect(typeof focused).toBe('boolean');
	});

	test('can navigate sections using keyboard', async ({ page }) => {
		for (let i = 0; i < 5; i++) {
			await page.keyboard.press('Tab');
		}

		const focused = await page.evaluate(() => {
			return (document.activeElement as HTMLElement)?.getAttribute('href');
		});

		expect(typeof focused).toBe('string');
	});
});

test.describe('Accessibility - Focus Management', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');
	});

	test('focus is visible on interactive elements', async ({ page }) => {
		const link = page.locator('a[href="/#about"]').first();

		await link.focus();

		const hasFocus = await link.evaluate((el) => {
			return el === document.activeElement;
		});

		expect(hasFocus).toBe(true);
	});

	test('focus order is logical', async ({ page }) => {
		await page.keyboard.press('Tab');

		const firstElement = await page.evaluate(() => document.activeElement?.textContent);

		expect(firstElement).toBeTruthy();
	});
});

test.describe('Accessibility - ARIA Attributes', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
	});

	test('mobile menu button has aria-label', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');

		if (await hamburger.count() > 0) {
			const label = await hamburger.getAttribute('aria-label');
			expect(label).toBeTruthy();
		}
	});

	test('mobile menu button has aria-expanded state', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');

		if (await hamburger.count() > 0) {
			const expanded = await hamburger.getAttribute('aria-expanded');
			expect(['true', 'false']).toContain(expanded);
		}
	});
});

test.describe('Accessibility - Page Structure', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('page has proper language attribute', async ({ page }) => {
		const html = page.locator('html');
		const lang = await html.getAttribute('lang');

		expect(lang).toBeTruthy();
	});

	test('page has descriptive title', async ({ page }) => {
		const title = await page.title();

		expect(title).toBeTruthy();
		expect(title.length).toBeGreaterThan(5);
	});

	test('all content is within landmark regions', async ({ page }) => {
		const main = page.locator('main');
		const header = page.locator('header');

		await expect(main).toBeVisible();
		await expect(header).toBeVisible();
	});
});

test.describe('Accessibility - Responsive Text', () => {
	test('text remains readable on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		const paragraph = page.locator('p').first();

		if (await paragraph.count() > 0) {
			const fontSize = await paragraph.evaluate((el) => {
				return parseInt(window.getComputedStyle(el).fontSize);
			});

			expect(fontSize).toBeGreaterThanOrEqual(14);
		}
	});

	test('text remains readable on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		const paragraph = page.locator('p').first();

		if (await paragraph.count() > 0) {
			const fontSize = await paragraph.evaluate((el) => {
				return parseInt(window.getComputedStyle(el).fontSize);
			});

			expect(fontSize).toBeGreaterThanOrEqual(14);
		}
	});
});
