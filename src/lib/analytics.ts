import { track } from '@vercel/analytics';

/**
 * Track custom events in Vercel Analytics
 * @param name - Event name (automatically prefixed in Vercel dashboard)
 * @param data - Optional event data object
 */
export function trackEvent(name: string, data?: Record<string, any>) {
	track(name, data);
}

/**
 * Analytics event helpers for common user interactions
 * All events are privacy-focused and GDPR compliant
 */
export const analytics = {
	/**
	 * Track navigation clicks within the portfolio
	 * @param section - Section name (e.g., 'about', 'projects', 'blog', 'contact')
	 */
	navigationClick: (section: string) => {
		track('Navigation Click', { section });
	},

	/**
	 * Track when mobile menu is toggled
	 * @param opened - Whether menu was opened (true) or closed (false)
	 */
	mobileMenuToggle: (opened: boolean) => {
		track('Mobile Menu Toggle', { opened });
	},

	/**
	 * Track theme toggle (light/dark mode)
	 * @param theme - New theme ('light' or 'dark')
	 */
	themeToggle: (theme: 'light' | 'dark') => {
		track('Theme Toggle', { theme });
	},

	/**
	 * Track CTA button clicks
	 * @param cta - CTA text or identifier (e.g., 'View My Work', 'Download Resume')
	 */
	ctaClick: (cta: string) => {
		track('CTA Click', { cta });
	},

	/**
	 * Track external link clicks
	 * @param url - External URL
	 * @param label - Optional link label or name
	 */
	externalLinkClick: (url: string, label?: string) => {
		track('External Link Click', { url, label });
	},

	/**
	 * Track project interest/clicks
	 * @param projectName - Project name or identifier
	 * @param action - Action taken (e.g., 'view', 'link-click')
	 */
	projectInterest: (projectName: string, action: string) => {
		track('Project Interest', { projectName, action });
	},

	/**
	 * Track form submissions
	 * @param formName - Name of the form (e.g., 'contact-form')
	 * @param success - Whether submission was successful
	 */
	formSubmission: (formName: string, success: boolean) => {
		track('Form Submission', { formName, success });
	},

	/**
	 * Track scroll depth (percentage of page scrolled)
	 * @param depth - Scroll percentage (0-100)
	 * @param section - Optional section name where scroll occurred
	 */
	scrollDepth: (depth: number, section?: string) => {
		track('Scroll Depth', { depth, section });
	},

	/**
	 * Track time spent on page
	 * @param page - Page URL or identifier
	 * @param secondsSpent - Time spent in seconds
	 */
	timeOnPage: (page: string, secondsSpent: number) => {
		track('Time On Page', { page, secondsSpent });
	},

	/**
	 * Track download or file access
	 * @param fileName - Name of file (e.g., 'resume.pdf')
	 * @param fileType - Type of file (e.g., 'pdf', 'doc')
	 */
	fileDownload: (fileName: string, fileType: string) => {
		track('File Download', { fileName, fileType });
	},
};
