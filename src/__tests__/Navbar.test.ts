import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Navbar Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const navbarPath = path.resolve(__dirname, '../components/Navbar.svelte');
    componentContent = fs.readFileSync(navbarPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('imports page store from SvelteKit', () => {
    expect(componentContent).toContain('import { page }');
    expect(componentContent).toContain('$app/stores');
  });

  it('uses Svelte 5 $state rune for scrolled state', () => {
    expect(componentContent).toContain('$state(false)');
    expect(componentContent).toContain('scrolled = ');
  });

  it('uses Svelte 5 $state rune for menuOpen state', () => {
    expect(componentContent).toContain('menuOpen = $state(false)');
  });

  it('uses Svelte 5 $effect rune for scroll listener', () => {
    expect(componentContent).toContain('$effect');
    expect(componentContent).toContain('window.addEventListener(\'scroll\'');
  });

  it('uses $effect for click outside handler on mobile menu', () => {
    expect(componentContent).toContain('$effect(() => {');
    expect(componentContent).toContain('menuOpen');
    expect(componentContent).toContain('handleClickOutside');
  });

  it('defines navigation links with correct structure', () => {
    expect(componentContent).toContain('links = [');
    expect(componentContent).toContain('label:');
    expect(componentContent).toContain('href:');
  });

  it('has About link pointing to home with about hash', () => {
    expect(componentContent).toContain("'About'");
    expect(componentContent).toContain("'/#about'");
  });

  it('has Experience link with experience hash', () => {
    expect(componentContent).toContain("'Experience'");
    expect(componentContent).toContain("'/#experience'");
  });

  it('has Projects link with projects hash', () => {
    expect(componentContent).toContain("'Projects'");
    expect(componentContent).toContain("'/#projects'");
  });

  it('has Skills link with skills hash', () => {
    expect(componentContent).toContain("'Skills'");
    expect(componentContent).toContain("'/#skills'");
  });

  it('has Blog link pointing to /blog page', () => {
    expect(componentContent).toContain("'Blog'");
    expect(componentContent).toContain("'/blog'");
  });

  it('has Contact link with contact hash', () => {
    expect(componentContent).toContain("'Contact'");
    expect(componentContent).toContain("'/#contact'");
  });

  it('defines isActive function for active link detection', () => {
    expect(componentContent).toContain('function isActive(href: string)');
    expect(componentContent).toContain('$page.url');
  });

  it('checks hash for anchor links', () => {
    expect(componentContent).toContain('startsWith(\'/#\')');
    expect(componentContent).toContain('$page.url.hash');
  });

  it('checks pathname for page links', () => {
    expect(componentContent).toContain('$page.url.pathname');
  });

  it('has closeMobileMenu function', () => {
    expect(componentContent).toContain('function closeMobileMenu');
    expect(componentContent).toContain('menuOpen = false');
  });

  it('uses $derived for scrolled styling', () => {
    expect(componentContent).toContain('$derived');
    expect(componentContent).toContain('scrolledClass');
  });

  it('header is fixed and sticky', () => {
    expect(componentContent).toContain('fixed');
    expect(componentContent).toContain('top-0');
    expect(componentContent).toContain('z-50');
  });

  it('logo "Ken Shinzato" links to home', () => {
    expect(componentContent).toContain('Ken Shinzato');
    expect(componentContent).toContain('href="/"');
  });

  it('desktop navigation is hidden on mobile', () => {
    expect(componentContent).toContain('hidden sm:flex');
  });

  it('mobile hamburger button visible only on mobile', () => {
    expect(componentContent).toContain('sm:hidden');
    expect(componentContent).toContain('aria-label="Toggle menu"');
  });

  it('renders hamburger icon when menu closed', () => {
    expect(componentContent).toContain('M4 6h16M4 12h16M4 18h16');
  });

  it('renders X icon when menu open', () => {
    expect(componentContent).toContain('M6 18L18 6M6 6l12 12');
  });

  it('mobile menu only visible when menuOpen is true', () => {
    expect(componentContent).toContain('{#if menuOpen}');
    expect(componentContent).toContain('sm:hidden');
  });

  it('mobile menu has proper positioning and styling', () => {
    expect(componentContent).toContain('absolute top-full');
    expect(componentContent).toContain('left-0 right-0');
    expect(componentContent).toContain('bg-white');
  });

  it('active links show bottom border and darker text', () => {
    expect(componentContent).toContain('border-b-2');
    expect(componentContent).toContain('border-slate-900');
    expect(componentContent).toContain('class:border-b-2={isActive');
    expect(componentContent).toContain('class:text-slate-900={isActive');
  });

  it('navigation links have proper spacing', () => {
    expect(componentContent).toContain('gap-8');
    expect(componentContent).toContain('py-2');
  });

  it('navigation items have hover effects', () => {
    expect(componentContent).toContain('hover:text-slate-900');
    expect(componentContent).toContain('transition-colors');
  });

  it('scrolled navbar has background and blur effect', () => {
    expect(componentContent).toContain('bg-white/95');
    expect(componentContent).toContain('backdrop-blur-sm');
    expect(componentContent).toContain('shadow-sm');
  });

  it('has navigation container with proper max-width', () => {
    expect(componentContent).toContain('max-w-5xl');
    expect(componentContent).toContain('mx-auto');
  });

  it('mobile menu links call handleNavClick on click', () => {
    expect(componentContent).toContain('handleNavClick');
  });

  it('imports analytics utilities for event tracking', () => {
    expect(componentContent).toContain("import { analytics } from '$lib/analytics'");
  });

  it('header transitions are smooth', () => {
    expect(componentContent).toContain('transition-all');
    expect(componentContent).toContain('duration-300');
  });

  it('uses Svelte 5 runes pattern', () => {
    expect(componentContent).toContain('$state');
    expect(componentContent).toContain('$effect');
    expect(componentContent).toContain('$derived');
  });

  it('scroll listener cleans up on unmount', () => {
    expect(componentContent).toContain('removeEventListener');
  });

  it('has proper accessibility for mobile button', () => {
    expect(componentContent).toContain('aria-label');
  });

  it('mobile menu has proper padding and spacing', () => {
    expect(componentContent).toContain('px-6');
    expect(componentContent).toContain('py-4');
    expect(componentContent).toContain('space-y-3');
  });

  it('mobile menu items have hover backgrounds', () => {
    expect(componentContent).toContain('hover:bg-slate-50');
  });

  it('mobile menu shows active state with background', () => {
    expect(componentContent).toContain('bg-slate-100');
  });

  it('logo has hover effect', () => {
    expect(componentContent).toContain('hover:text-slate-700');
  });

  it('has passive scroll listener for performance', () => {
    expect(componentContent).toContain('passive: true');
  });
});
