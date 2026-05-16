import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
	test('navbar is visible on page load', async ({ page }) => {
		await page.goto('/');
		const header = page.locator('header').first();
		await expect(header).toBeVisible();
	});

	test('logo text is visible', async ({ page }) => {
		await page.goto('/');
		const logo = page.getByRole('link', { name: /Ken Shinzato/ }).first();
		await expect(logo).toBeVisible();
	});

	test('logo links to home', async ({ page }) => {
		await page.goto('/#about');
		const logo = page.getByRole('link', { name: /Ken Shinzato/ }).first();
		await logo.click();
		await expect(page).toHaveURL('/');
	});

	test.describe('Desktop Navigation', () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize({ width: 1024, height: 768 });
			await page.goto('/');
		});

		test('About link is visible on desktop', async ({ page }) => {
			const header = page.locator('header').first();
			const aboutLink = header.locator('a[href="/#about"]');
			await expect(aboutLink).toBeVisible();
		});

		test('Experience link is visible on desktop', async ({ page }) => {
			const header = page.locator('header').first();
			const expLink = header.locator('a[href="/#experience"]');
			await expect(expLink).toBeVisible();
		});

		test('Projects link is visible on desktop', async ({ page }) => {
			const header = page.locator('header').first();
			const projLink = header.locator('a[href="/#projects"]');
			await expect(projLink).toBeVisible();
		});

		test('Skills link is visible on desktop', async ({ page }) => {
			const header = page.locator('header').first();
			const skillsLink = header.locator('a[href="/#skills"]');
			await expect(skillsLink).toBeVisible();
		});

		test('Blog link is visible on desktop', async ({ page }) => {
			const header = page.locator('header').first();
			const blogLink = header.locator('a[href="/blog"]');
			await expect(blogLink).toBeVisible();
		});

		test('Contact link is visible on desktop', async ({ page }) => {
			const header = page.locator('header').first();
			const contactLink = header.locator('a[href="/#contact"]');
			await expect(contactLink).toBeVisible();
		});

		test('clicking About link navigates to #about', async ({ page }) => {
			const header = page.locator('header').first();
			const aboutLink = header.locator('a[href="/#about"]');
			await aboutLink.click();
			await page.waitForURL('/#about');
			expect(page.url()).toContain('#about');
		});

		test('clicking Blog link navigates to /blog', async ({ page }) => {
			const header = page.locator('header').first();
			const blogLink = header.locator('a[href="/blog"]');
			await blogLink.click();
			await page.waitForURL('/blog');
			expect(page.url()).toContain('/blog');
		});
	});

	test.describe('Mobile Navigation', () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');
		});

		test('hamburger button is visible on mobile', async ({ page }) => {
			const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
			await expect(hamburgerButton).toBeVisible();
		});

		test('hamburger button is hidden on large screens', async ({ page }) => {
			await page.setViewportSize({ width: 1024, height: 768 });
			await page.goto('/');

			const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
			const isHidden = await hamburgerButton.evaluate((el) => {
				const style = window.getComputedStyle(el);
				return style.display === 'none';
			});
			expect(isHidden).toBe(true);
		});
	});

	test.describe('Responsiveness', () => {
		test('hamburger is hidden on desktop', async ({ page }) => {
			await page.setViewportSize({ width: 1440, height: 900 });
			await page.goto('/');

			const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
			const isHidden = await hamburgerButton.evaluate((el) => window.getComputedStyle(el).display === 'none');
			expect(isHidden).toBe(true);
		});

		test('hamburger is visible on mobile', async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto('/');

			const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
			await expect(hamburgerButton).toBeVisible();
		});

		test('desktop links are visible on desktop', async ({ page }) => {
			await page.setViewportSize({ width: 1440, height: 900 });
			await page.goto('/');

			const aboutLink = page.locator('a[href="/#about"]').first();
			await expect(aboutLink).toBeVisible();
		});
	});

	test.describe('Section Navigation', () => {
		test('About link navigates to about section', async ({ page }) => {
			await page.setViewportSize({ width: 1024, height: 768 });
			await page.goto('/');

			const aboutLink = page.locator('a[href="/#about"]').first();
			await aboutLink.click();
			await page.waitForURL('/#about');

			const section = page.locator('#about');
			await expect(section).toBeInViewport();
		});

		test('Experience link navigates to experience section', async ({ page }) => {
			await page.setViewportSize({ width: 1024, height: 768 });
			await page.goto('/');

			const link = page.locator('a[href="/#experience"]').first();
			await link.click();
			await page.waitForURL('/#experience');

			const section = page.locator('#experience');
			await expect(section).toBeInViewport();
		});

		test('Projects link navigates to projects section', async ({ page }) => {
			await page.setViewportSize({ width: 1024, height: 768 });
			await page.goto('/');

			const link = page.locator('a[href="/#projects"]').first();
			await link.click();
			await page.waitForURL('/#projects');

			const section = page.locator('#projects');
			await expect(section).toBeInViewport();
		});

		test('Skills link navigates to skills section', async ({ page }) => {
			await page.setViewportSize({ width: 1024, height: 768 });
			await page.goto('/');

			const link = page.locator('a[href="/#skills"]').first();
			await link.click();
			await page.waitForURL('/#skills');

			const section = page.locator('#skills');
			await expect(section).toBeInViewport();
		});
	});
});
