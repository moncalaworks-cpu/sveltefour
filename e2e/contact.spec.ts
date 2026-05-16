import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Contact section loads and displays', async ({ page }) => {
		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeVisible();
	});

	test('Contact section has correct id for anchor navigation', async ({ page }) => {
		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeVisible();
	});

	test('displays section heading Get in Touch', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('Get in Touch');
	});

	test('displays email address', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('kshinz01@gmail.com');
	});

	test('email link has correct href', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const emailLink = contactSection.locator('a[href="mailto:kshinz01@gmail.com"]');
		await expect(emailLink).toBeVisible();
	});

	test('displays phone number', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('(215) 347-4744');
	});

	test('phone link has correct href format', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const phoneLink = contactSection.locator('a[href="tel:+12153474744"]');
		await expect(phoneLink).toBeVisible();
	});

	test('displays location information', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('Sparta, NJ');
	});

	test('displays LinkedIn profile link', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const linkedinLink = contactSection.locator('a[href="https://www.linkedin.com/in/ken-shinzato/"]');
		await expect(linkedinLink).toBeVisible();
	});

	test('LinkedIn link opens in new tab', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const linkedinLink = contactSection.locator('a[href="https://www.linkedin.com/in/ken-shinzato/"]');
		await expect(linkedinLink).toHaveAttribute('target', '_blank');
	});

	test('LinkedIn link has rel="noopener noreferrer" for security', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const linkedinLink = contactSection.locator('a[href="https://www.linkedin.com/in/ken-shinzato/"]');
		await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
	});

	test('displays Star Wars Enthusiast interest', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('Star Wars Enthusiast');
	});

	test('displays Coffee Enthusiast interest', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('Coffee Enthusiast');
	});

	test('displays Dog Dad interest', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('Dog Dad');
	});

	test('displays Mixologist In-Training interest', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('Mixologist In-Training');
	});

	test('interests have emoji icons', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const emojiElements = contactSection.locator('span[class*="text-2xl"]');
		await expect(emojiElements).toHaveCount(4);
	});

	test('each interest has description text', async ({ page }) => {
		const contactSection = page.locator('#contact');

		await expect(contactSection).toContainText('lifelong fan');
		await expect(contactSection).toContainText('perfect brew');
	});

	test('Contact link in navbar navigates to Contact section', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });

		const contactLink = page.locator('a[href="/#contact"]').first();
		await contactLink.click();

		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeInViewport();
	});

	test('responsive layout on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeVisible();

		await expect(contactSection).toContainText('kshinz01@gmail.com');
	});

	test('responsive layout on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeVisible();

		const email = contactSection.locator('text=kshinz01@gmail.com');
		const interests = contactSection.locator('text=Interests & Hobbies');

		await expect(email).toBeVisible();
		await expect(interests).toBeVisible();
	});

	test('responsive layout on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		const contactSection = page.locator('#contact');
		await expect(contactSection).toBeVisible();
	});

	test('contact information is organized in sections', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const headings = contactSection.locator('h3');
		const count = await headings.count();

		expect(count).toBeGreaterThanOrEqual(4);
	});

	test('all contact links are clickable', async ({ page }) => {
		const contactSection = page.locator('#contact');

		const emailLink = contactSection.locator('a[href="mailto:kshinz01@gmail.com"]');
		const phoneLink = contactSection.locator('a[href="tel:+12153474744"]');
		const linkedinLink = contactSection.locator('a[href="https://www.linkedin.com/in/ken-shinzato/"]');

		await expect(emailLink).toBeVisible();
		await expect(phoneLink).toBeVisible();
		await expect(linkedinLink).toBeVisible();
	});

	test('text content is readable on all viewports', async ({ page }) => {
		const viewports = [
			{ width: 375, height: 667 },
			{ width: 768, height: 1024 },
			{ width: 1440, height: 900 }
		];

		for (const viewport of viewports) {
			await page.setViewportSize(viewport);
			const contactSection = page.locator('#contact');

			await expect(contactSection).toBeVisible();
		}
	});
});
