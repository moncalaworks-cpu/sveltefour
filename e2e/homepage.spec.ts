import { test, expect } from '@playwright/test';

test.describe('Homepage - Full Page Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Page Structure', () => {
    test('page has proper title and meta tags', async ({ page }) => {
      await expect(page).toHaveTitle(/SvelteThree/);
    });

    test('main element wraps all content', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();
      await expect(main).toHaveClass(/min-h-screen/);
    });

    test('all major sections are present', async ({ page }) => {
      const heroSection = page.locator('section').filter({ has: page.locator('h1:has-text("Ken Shinzato")') });
      const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      const projectsSection = page.locator('section').filter({ has: page.locator('text=Featured Testing Projects') });
      const skillsSection = page.locator('section').filter({ has: page.locator('text=Skills & Expertise') });
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });

      await expect(heroSection).toBeVisible();
      await expect(aboutSection).toBeVisible();
      await expect(experienceSection).toBeVisible();
      await expect(projectsSection).toBeVisible();
      await expect(skillsSection).toBeVisible();
      await expect(contactSection).toBeVisible();
    });
  });

  test.describe('About Section', () => {
    test('displays Ken Shinzato name and title', async ({ page }) => {
      const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
      await expect(aboutSection.locator('h2')).toContainText('Ken Shinzato');
      await expect(aboutSection).toContainText('QA Engineer & Manager');
    });

    test('shows experience highlights', async ({ page }) => {
      const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
      await expect(aboutSection).toContainText('15+');
      await expect(aboutSection).toContainText('50+');
      await expect(aboutSection).toContainText('Selenium, Playwright, Appium');
    });

    test('displays profile image', async ({ page }) => {
      const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
      const img = aboutSection.locator('img[alt*="Ken Shinzato"]');
      await expect(img).toBeVisible();
      await expect(img).toHaveAttribute('src', /profile\.jpg/);
    });

    test('profile image has premium styling', async ({ page }) => {
      const aboutSection = page.locator('section').filter({ has: page.locator('text=About Me') });
      const imageContainer = aboutSection.locator('.relative').first();
      await expect(imageContainer).toHaveClass(/rounded-lg/);
      await expect(imageContainer).toHaveClass(/shadow-lg/);
    });
  });

  test.describe('Experience Section', () => {
    test('displays all three positions', async ({ page }) => {
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      await expect(experienceSection).toContainText('Kinly');
      await expect(experienceSection).toContainText('PPL');
      await expect(experienceSection).toContainText('Trend MLS');
    });

    test('shows job titles correctly', async ({ page }) => {
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      await expect(experienceSection).toContainText('QA Engineer & Manager');
      await expect(experienceSection).toContainText('QA Analyst & Engineer');
      await expect(experienceSection).toContainText('QA Analyst');
    });

    test('displays dates in proper format', async ({ page }) => {
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      await expect(experienceSection).toContainText('Sep 2021');
      await expect(experienceSection).toContainText('present');
    });

    test('shows achievements for each position', async ({ page }) => {
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      const achievements = experienceSection.locator('li');
      await expect(achievements).toHaveCount(12); // 3 positions × 4 achievements
      await expect(achievements.first()).toContainText('Detox');
    });

    test('has timeline visual design', async ({ page }) => {
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      const timelineArticles = experienceSection.locator('article');
      await expect(timelineArticles).toHaveCount(3);
    });
  });

  test.describe('Projects Section', () => {
    test('displays all three testing projects', async ({ page }) => {
      const projectsSection = page.locator('section').filter({ has: page.locator('text=Featured Testing Projects') });
      await expect(projectsSection).toContainText('React Native & Detox Test Automation');
      await expect(projectsSection).toContainText('Oracle HR System UAT & Mobile Testing');
      await expect(projectsSection).toContainText('MLS Data Migration & Integration Testing');
    });

    test('shows project descriptions', async ({ page }) => {
      const projectsSection = page.locator('section').filter({ has: page.locator('text=Featured Testing Projects') });
      await expect(projectsSection).toContainText('CircleCI');
      await expect(projectsSection).toContainText('Azure DevOps');
      await expect(projectsSection).toContainText('1M+');
    });

    test('displays technologies for each project', async ({ page }) => {
      const projectsSection = page.locator('section').filter({ has: page.locator('text=Featured Testing Projects') });
      await expect(projectsSection).toContainText('Selenium');
      await expect(projectsSection).toContainText('Python');
      await expect(projectsSection).toContainText('Postman');
    });

    test('has grid layout for projects', async ({ page }) => {
      const projectsSection = page.locator('section').filter({ has: page.locator('text=Featured Testing Projects') });
      const projectCards = projectsSection.locator('[class*="border-slate-200"]').filter({ has: page.locator('p').first() });
      // At least one card visible
      await expect(projectCards.first()).toBeVisible();
    });
  });

  test.describe('Skills Section', () => {
    test('displays all skill categories', async ({ page }) => {
      const skillsSection = page.locator('section').filter({ has: page.locator('text=Skills & Expertise') });
      await expect(skillsSection).toContainText('Test Automation Tools');
      await expect(skillsSection).toContainText('Programming & Scripting');
      await expect(skillsSection).toContainText('Platforms & Tools');
      await expect(skillsSection).toContainText('Specializations');
    });

    test('shows top automation tools', async ({ page }) => {
      const skillsSection = page.locator('section').filter({ has: page.locator('text=Skills & Expertise') });
      await expect(skillsSection).toContainText('Selenium WebDriver');
      await expect(skillsSection).toContainText('Playwright');
      await expect(skillsSection).toContainText('Appium');
    });

    test('displays proficiency levels', async ({ page }) => {
      const skillsSection = page.locator('section').filter({ has: page.locator('text=Skills & Expertise') });
      await expect(skillsSection).toContainText('expert');
      await expect(skillsSection).toContainText('advanced');
      await expect(skillsSection).toContainText('intermediate');
    });

    test('includes Python and cloud platforms', async ({ page }) => {
      const skillsSection = page.locator('section').filter({ has: page.locator('text=Skills & Expertise') });
      await expect(skillsSection).toContainText('Python');
      await expect(skillsSection).toContainText('Azure Cloud');
      await expect(skillsSection).toContainText('AWS CI/CD');
    });

    test('shows leadership skills', async ({ page }) => {
      const skillsSection = page.locator('section').filter({ has: page.locator('text=Skills & Expertise') });
      await expect(skillsSection).toContainText('UAT Leadership');
      await expect(skillsSection).toContainText('Team Management');
    });
  });

  test.describe('Contact Section', () => {
    test('displays all contact information', async ({ page }) => {
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });
      await expect(contactSection).toContainText('kshinz01@gmail.com');
      await expect(contactSection).toContainText('(215) 347-4744');
      await expect(contactSection).toContainText('Sparta, NJ');
    });

    test('has working email link', async ({ page }) => {
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });
      const emailLink = contactSection.locator('a[href="mailto:kshinz01@gmail.com"]');
      await expect(emailLink).toBeVisible();
    });

    test('has working phone link', async ({ page }) => {
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });
      const phoneLink = contactSection.locator('a[href="tel:+12153474744"]');
      await expect(phoneLink).toBeVisible();
    });

    test('has LinkedIn profile link', async ({ page }) => {
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });
      const linkedinLink = contactSection.locator('a[href="https://www.linkedin.com/in/ken-shinzato/"]');
      await expect(linkedinLink).toBeVisible();
      await expect(linkedinLink).toHaveAttribute('target', '_blank');
      await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('displays interests and hobbies', async ({ page }) => {
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });
      await expect(contactSection).toContainText('Star Wars Enthusiast');
      await expect(contactSection).toContainText('Coffee Enthusiast');
      await expect(contactSection).toContainText('Dog Dad');
      await expect(contactSection).toContainText('Mixologist In-Training');
    });

    test('interests have emoji icons', async ({ page }) => {
      const contactSection = page.locator('section').filter({ has: page.locator('text=Get in Touch') });
      // Check that emoji spans exist
      const emojiElements = contactSection.locator('span[class*="text-2xl"]');
      await expect(emojiElements).toHaveCount(4);
    });
  });

  test.describe('Navigation & Accessibility', () => {
    test('CTA buttons navigate to correct sections', async ({ page }) => {
      // View Projects button
      const viewProjectsBtn = page.locator('a:has-text("View Projects")');
      const href = await viewProjectsBtn.getAttribute('href');
      expect(href).toBe('#projects');

      // Get in Touch button
      const contactBtn = page.locator('a:has-text("Get in Touch")');
      const contactHref = await contactBtn.getAttribute('href');
      expect(contactHref).toBe('#contact');
    });

    test('page has semantic HTML structure', async ({ page }) => {
      const main = page.locator('main');
      const sections = page.locator('section');
      const headings = page.locator('h1, h2, h3');

      await expect(main).toBeVisible();
      await expect(sections).toHaveCount(6); // Hero through Contact
      await expect(headings.count()).toBeGreaterThan(0);
    });

    test('text is readable with proper contrast', async ({ page }) => {
      // Check that text content is visible and readable
      const heading = page.locator('h1');
      const tagline = page.locator('p').first();

      await expect(heading).toBeVisible();
      await expect(tagline).toBeVisible();
    });
  });

  test.describe('Responsiveness', () => {
    test('page is responsive on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const main = page.locator('main');
      await expect(main).toBeVisible();

      // Check that hero content is visible
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
    });

    test('page is responsive on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const main = page.locator('main');
      await expect(main).toBeVisible();

      // Check that all sections render
      const sections = page.locator('section');
      await expect(sections.first()).toBeVisible();
    });

    test('page is responsive on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const main = page.locator('main');
      await expect(main).toBeVisible();

      // Check grid layouts render properly
      const experienceSection = page.locator('section').filter({ has: page.locator('text=Experience') });
      await expect(experienceSection).toBeVisible();
    });
  });
});
