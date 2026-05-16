import { test, expect } from '@playwright/test';

test.describe('Skills Section', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('Skills section loads and displays', async ({ page }) => {
		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeVisible();
	});

	test('Skills section has correct id for anchor navigation', async ({ page }) => {
		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeVisible();
	});

	test('displays all 4 skill categories', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('Test Automation Tools');
		await expect(skillsSection).toContainText('Programming & Scripting');
		await expect(skillsSection).toContainText('Platforms & Tools');
		await expect(skillsSection).toContainText('Specializations');
	});

	test('Test Automation Tools category displays', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('Test Automation Tools');
		await expect(skillsSection).toContainText('Selenium WebDriver');
		await expect(skillsSection).toContainText('Playwright');
		await expect(skillsSection).toContainText('Appium');
	});

	test('Programming & Scripting category displays', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('Programming & Scripting');
		await expect(skillsSection).toContainText('Python');
		await expect(skillsSection).toContainText('JAVA');
		await expect(skillsSection).toContainText('SQL');
	});

	test('Platforms & Tools category displays', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('Platforms & Tools');
		await expect(skillsSection).toContainText('Azure Cloud');
		await expect(skillsSection).toContainText('AWS CI/CD');
		await expect(skillsSection).toContainText('JIRA');
	});

	test('Specializations category displays', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('Specializations');
		await expect(skillsSection).toContainText('Mobile Testing');
		await expect(skillsSection).toContainText('UAT Leadership');
	});

	test('Test Automation Tools has multiple skills', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const automationSkills = [
			'Selenium WebDriver',
			'Playwright',
			'Appium',
			'Robot Framework',
			'Detox',
			'Cucumber/BDD'
		];

		for (const skill of automationSkills) {
			await expect(skillsSection).toContainText(skill);
		}
	});

	test('Programming & Scripting has multiple skills', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const programmingSkills = [
			'Python',
			'JAVA',
			'SQL',
			'REST API Testing',
			'XML/JSON'
		];

		for (const skill of programmingSkills) {
			await expect(skillsSection).toContainText(skill);
		}
	});

	test('Platforms & Tools has multiple skills', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const platformSkills = [
			'Azure Cloud',
			'AWS CI/CD',
			'JIRA',
			'Zephyr Scale',
			'Azure DevOps',
			'Postman'
		];

		for (const skill of platformSkills) {
			await expect(skillsSection).toContainText(skill);
		}
	});

	test('Specializations has multiple skills', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const specializationSkills = [
			'Mobile Testing',
			'Web Testing',
			'UAT Leadership',
			'Test Planning & Strategy',
			'Team Management',
			'Requirements Analysis'
		];

		for (const skill of specializationSkills) {
			await expect(skillsSection).toContainText(skill);
		}
	});

	test('proficiency levels display correctly', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('expert');
		await expect(skillsSection).toContainText('advanced');
		await expect(skillsSection).toContainText('intermediate');
	});

	test('expert proficiency level skills are present', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const text = await skillsSection.textContent();

		expect(text).toContain('expert');
		expect(text).toContain('Selenium');
		expect(text).toContain('Python');
	});

	test('advanced proficiency level skills are present', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('advanced');
		await expect(skillsSection).toContainText('Appium');
	});

	test('intermediate proficiency level skills are present', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('intermediate');
	});

	test('responsive layout on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeVisible();
	});

	test('responsive layout on tablet', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeVisible();
	});

	test('responsive layout on desktop', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/');

		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeVisible();
	});

	test('Skills link in navbar navigates to Skills section', async ({ page }) => {
		await page.setViewportSize({ width: 1024, height: 768 });

		const skillsLink = page.locator('a[href="/#skills"]').first();
		await skillsLink.click();

		const skillsSection = page.locator('#skills');
		await expect(skillsSection).toBeInViewport();
	});

	test('section heading displays Skills & Expertise', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		await expect(skillsSection).toContainText('Skills & Expertise');
	});

	test('all category names are present', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const categoryHeadings = skillsSection.locator('h3, h4');
		const count = await categoryHeadings.count();

		expect(count).toBeGreaterThanOrEqual(4);
	});

	test('text content is readable on all viewports', async ({ page }) => {
		const viewports = [
			{ width: 375, height: 667 },
			{ width: 768, height: 1024 },
			{ width: 1440, height: 900 }
		];

		for (const viewport of viewports) {
			await page.setViewportSize(viewport);
			const skillsSection = page.locator('#skills');

			await expect(skillsSection).toBeVisible();
		}
	});

	test('proficiency information is scannable', async ({ page }) => {
		const skillsSection = page.locator('#skills');

		const textContent = await skillsSection.textContent();

		expect(textContent).toContain('expert');
		expect(textContent).toContain('advanced');
		expect(textContent).toContain('intermediate');
	});
});
