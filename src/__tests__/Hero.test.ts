import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Hero Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const heroPath = path.resolve(__dirname, '../components/Hero.svelte');
    componentContent = fs.readFileSync(heroPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('defines default prop values', () => {
    expect(componentContent).toContain("heading = 'Your Name'");
    expect(componentContent).toContain("tagline = 'Full-stack developer & designer'");
    expect(componentContent).toContain("primaryCta = 'View Projects'");
    expect(componentContent).toContain("secondaryCta = 'Get in Touch'");
  });

  it('renders heading in template', () => {
    expect(componentContent).toContain('{heading}');
  });

  it('renders tagline in template', () => {
    expect(componentContent).toContain('{tagline}');
  });

  it('has primary CTA button', () => {
    expect(componentContent).toContain('{primaryCta}');
    expect(componentContent).toContain("href={primaryCtaHref}");
  });

  it('has secondary CTA button', () => {
    expect(componentContent).toContain('{secondaryCta}');
    expect(componentContent).toContain("href={secondaryCtaHref}");
  });

  it('includes scroll indicator', () => {
    expect(componentContent).toContain('Scroll to explore');
    expect(componentContent).toContain('animate-bounce');
  });

  it('uses Svelte 5 runes for props', () => {
    expect(componentContent).toContain('$props()');
  });
});
