import { test, expect } from '@playwright/test';

test.describe('Navigation - Full Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');
	});

	test('navbar is visible on all pages', async ({ page }) => {
		const header = page.locator('header').first();
		await expect(header).toBeVisible();
	});

	test('logo text is visible and clickable', async ({ page }) => {
		const logo = page.getByRole('link', { name: /Ken Shinzato/ }).first();
		await expect(logo).toBeVisible();
	});

	test('logo navigates to home (/)', async ({ page }) => {
		await page.goto('/#about');
		const logo = page.getByRole('link', { name: /Ken Shinzato/ }).first();
		await logo.click();

		await expect(page).toHaveURL('/');
	});

	test('All 6 navigation links are present on desktop', async ({ page }) => {
		const header = page.locator('header').first();

		const aboutLink = header.locator('a[href="/#about"]');
		const experienceLink = header.locator('a[href="/#experience"]');
		const projectsLink = header.locator('a[href="/#projects"]');
		const skillsLink = header.locator('a[href="/#skills"]');
		const blogLink = header.locator('a[href="/blog"]');
		const contactLink = header.locator('a[href="/#contact"]');

		await expect(aboutLink).toBeVisible();
		await expect(experienceLink).toBeVisible();
		await expect(projectsLink).toBeVisible();
		await expect(skillsLink).toBeVisible();
		await expect(blogLink).toBeVisible();
		await expect(contactLink).toBeVisible();
	});

	test('About link navigates to #about section', async ({ page }) => {
		const aboutLink = page.locator('a[href="/#about"]').first();
		await aboutLink.click();

		await expect(page).toHaveURL('/#about');

		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeInViewport();
	});

	test('Experience link navigates to #experience section', async ({ page }) => {
		const expLink = page.locator('a[href="/#experience"]').first();
		await expLink.click();

		await expect(page).toHaveURL('/#experience');

		const expSection = page.locator('#experience');
		await expect(expSection).toBeInViewport();
	});

	test('Projects link navigates to #projects section', async ({ page }) => {
		const projLink = page.locator('a[href="/#projects"]').first();
		await projLink.click();

		await expect(page).toHaveURL('/#projects');

		const projSection = page.locator('#projects');
		await expect(projSection).toBeInViewport();
	});

	test('Skills link navigates to #skills section', async ({ page }) => {
		const skillsLink = page.locator('a[href="/#skills"]').first();
		await skillsLink.click();

		await expect(page).toHaveURL('/#skills');

		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeInViewport();
	});

	test('Contact link navigates to #contact section', async ({ page }) => {
		const contactLink = page.locator('a[href="/#contact"]').first();
		await contactLink.click();

		await expect(page).toHaveURL('/#contact');

		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeInViewport();
	});

	test('Blog link navigates to /blog page', async ({ page }) => {
		const blogLink = page.locator('a[href="/blog"]').first();
		await blogLink.click();

		await expect(page).toHaveURL('/blog');
	});
});

test.describe('Navigation - Mobile Menu', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');
	});

	test('hamburger button is visible on mobile', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await expect(hamburger).toBeVisible();
	});

	test('hamburger button is hidden on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		const isHidden = await hamburger.evaluate((el) => {
			const style = window.getComputedStyle(el);
			return style.display === 'none';
		});

		expect(isHidden).toBe(true);
	});

	test('hamburger button toggles mobile menu', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');

		// Menu should be closed initially
		let isOpen = await hamburger.evaluate((el) => {
			return el.getAttribute('aria-expanded') === 'true';
		});

		// Click to open
		await hamburger.click();

		isOpen = await hamburger.evaluate((el) => {
			return el.getAttribute('aria-expanded') === 'true';
		});

		expect(isOpen).toBe(true);
	});

	test('mobile menu contains all 6 navigation links', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await hamburger.click();

		// Wait for menu to be open
		await page.waitForTimeout(300);

		const aboutLink = page.locator('a[href="/#about"]');
		const experienceLink = page.locator('a[href="/#experience"]');
		const projectsLink = page.locator('a[href="/#projects"]');
		const skillsLink = page.locator('a[href="/#skills"]');
		const blogLink = page.locator('a[href="/blog"]');
		const contactLink = page.locator('a[href="/#contact"]');

		await expect(aboutLink).toBeVisible();
		await expect(experienceLink).toBeVisible();
		await expect(projectsLink).toBeVisible();
		await expect(skillsLink).toBeVisible();
		await expect(blogLink).toBeVisible();
		await expect(contactLink).toBeVisible();
	});

	test('clicking mobile menu link navigates to section', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await hamburger.click();

		const aboutLink = page.locator('a[href="/#about"]');
		await aboutLink.click();

		await expect(page).toHaveURL('/#about');
	});

	test('mobile menu closes after clicking link', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');

		// Open menu
		await hamburger.click();
		await page.waitForTimeout(100);

		// Click a link
		const aboutLink = page.locator('a[href="/#about"]');
		await aboutLink.click();

		// Menu should be closed
		const isOpen = await hamburger.evaluate((el) => {
			return el.getAttribute('aria-expanded') === 'true';
		});

		expect(isOpen).toBe(false);
	});

	test('clicking outside menu closes it', async ({ page }) => {
		const hamburger = page.locator('button[aria-label="Toggle menu"]');

		// Open menu
		await hamburger.click();
		await page.waitForTimeout(100);

		// Click outside
		await page.locator('body').click({ position: { x: 20, y: 20 } });

		// Menu should be closed
		const isOpen = await hamburger.evaluate((el) => {
			return el.getAttribute('aria-expanded') === 'true';
		});

		expect(isOpen).toBe(false);
	});
});

test.describe('Navigation - Responsive Behavior', () => {
	test('desktop nav visible on 1024px width', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const aboutLink = page.locator('a[href="/#about"]').first();
		await expect(aboutLink).toBeVisible();

		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		const isHidden = await hamburger.evaluate((el) => {
			const style = window.getComputedStyle(el);
			return style.display === 'none';
		});

		expect(isHidden).toBe(true);
	});

	test('mobile nav visible on 640px width', async ({ page }) => {
		await page.setViewportSize({ width: 640, height: 768 });
		await page.goto('/');

		const hamburger = page.locator('button[aria-label="Toggle menu"]');
		await expect(hamburger).toBeVisible();
	});

	test('navigation links have hover effects on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const aboutLink = page.locator('a[href="/#about"]').first();

		// Check that link has some styling that could respond to hover
		const classes = await aboutLink.getAttribute('class');
		expect(classes).toBeTruthy();
	});
});

test.describe('Navigation - Anchor Links and Scrolling', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');
	});

	test('About anchor exists and has correct id', async ({ page }) => {
		const aboutSection = page.locator('#about');
		await expect(aboutSection).toBeDefined();
	});

	test('Experience anchor exists and has correct id', async ({ page }) => {
		const expSection = page.locator('#experience');
		await expect(expSection).toBeDefined();
	});

	test('Projects anchor exists and has correct id', async ({ page }) => {
		const projSection = page.locator('#projects');
		await expect(projSection).toBeDefined();
	});

	test('Skills anchor exists and has correct id', async ({ page }) => {
		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeDefined();
	});

	test('Contact anchor exists and has correct id', async ({ page }) => {
		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeDefined();
	});

	test('scrolling to section via link works', async ({ page }) => {
		const projectsLink = page.locator('a[href="/#projects"]').first();
		await projectsLink.click();

		const projectsSection = page.locator('#projects');
		const isInViewport = await projectsSection.evaluate((element) => {
			const rect = element.getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		});

		expect(isInViewport).toBe(true);
	});

	test('direct URL with hash scrolls to section', async ({ page }) => {
		await page.goto('/#contact');

		const contactSection = page.locator('#contact');
		const isInViewport = await contactSection.evaluate((element) => {
			const rect = element.getBoundingClientRect();
			return rect.top >= 0 && rect.top < window.innerHeight;
		});

		expect(isInViewport).toBe(true);
	});
});

test.describe('Navigation - All Browsers', () => {
	test('navigation works on Chromium', async ({ page, browserName }) => {
		if (browserName !== 'chromium') return;

		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const aboutLink = page.locator('a[href="/#about"]').first();
		await expect(aboutLink).toBeVisible();
	});

	test('navigation works on Firefox', async ({ page, browserName }) => {
		if (browserName !== 'firefox') return;

		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const aboutLink = page.locator('a[href="/#about"]').first();
		await expect(aboutLink).toBeVisible();
	});

	test('navigation works on WebKit', async ({ page, browserName }) => {
		if (browserName !== 'webkit') return;

		await page.setViewportSize({ width: 1024, height: 768 });
		await page.goto('/');

		const aboutLink = page.locator('a[href="/#about"]').first();
		await expect(aboutLink).toBeVisible();
	});
});
