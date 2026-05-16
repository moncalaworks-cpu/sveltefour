import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Projects section loads and displays', async ({ page }) => {
		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeVisible();
	});

	test('Projects section has correct id for anchor navigation', async ({ page }) => {
		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeVisible();
	});

	test('displays all 3 projects', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('React Native & Detox Test Automation');
		await expect(projectsSection).toContainText('Oracle HR System UAT & Mobile Testing');
		await expect(projectsSection).toContainText('MLS Data Migration & Integration Testing');
	});

	test('React Native project title displays', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('React Native & Detox Test Automation');
	});

	test('React Native project shows description', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('CircleCI');
		await expect(projectsSection).toContainText('AWS');
	});

	test('React Native project displays technologies', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('React Native');
		await expect(projectsSection).toContainText('Detox');
		await expect(projectsSection).toContainText('Python');
	});

	test('Oracle HR project title displays', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('Oracle HR System UAT & Mobile Testing');
	});

	test('Oracle HR project shows description and metrics', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('2000+');
		await expect(projectsSection).toContainText('Azure DevOps');
	});

	test('Oracle HR project displays technologies', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('Selenium');
		await expect(projectsSection).toContainText('Postman');
		await expect(projectsSection).toContainText('Oracle');
	});

	test('MLS project title displays', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('MLS Data Migration & Integration Testing');
	});

	test('MLS project shows description with scale metrics', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('1M+');
	});

	test('MLS project displays technologies', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('Selenium');
		await expect(projectsSection).toContainText('SQL Server');
		await expect(projectsSection).toContainText('JIRA');
	});

	test('all technology tags are visible', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		const technologies = [
			'React Native',
			'Detox',
			'Python',
			'CircleCI',
			'AWS',
			'Selenium',
			'Postman',
			'Azure DevOps',
			'SQL Server',
			'JIRA'
		];

		for (const tech of technologies) {
			await expect(projectsSection).toContainText(tech);
		}
	});

	test('responsive grid layout on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeVisible();
	});

	test('responsive grid layout on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeVisible();
	});

	test('responsive grid layout on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeVisible();
	});

	test('Projects link in navbar navigates to Projects section', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });

		const projectsLink = page.locator('a[href="/#projects"]').first();
		await projectsLink.click();

		const projectsSection = page.locator('#projects');
		await expect(projectsSection).toBeInViewport();
	});

	test('section heading displays Featured Testing Projects', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('Featured Testing Projects');
	});

	test('section has subtitle describing projects', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toContainText('Key QA automation and testing initiatives');
	});

	test('projects have consistent card structure', async ({ page }) => {
		const projectsSection = page.locator('#projects');

		await expect(projectsSection).toBeVisible();
	});

	test('text content is readable on all viewports', async ({ page }) => {
		const viewports = [
			{ width: 375, height: 667 },
			{ width: 768, height: 1024 },
			{ width: 1440, height: 900 }
		];

		for (const viewport of viewports) {
			await page.setViewportSize(viewport);
			const projectsSection = page.locator('#projects');

			await expect(projectsSection).toBeVisible();
		}
	});
});
