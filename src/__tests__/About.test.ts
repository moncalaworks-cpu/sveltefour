import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('About Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const aboutPath = path.resolve(__dirname, '../components/About.svelte');
    componentContent = fs.readFileSync(aboutPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('defines required interfaces', () => {
    expect(componentContent).toContain('interface Highlight');
    expect(componentContent).toContain('interface Props');
  });

  it('has default prop values', () => {
    expect(componentContent).toContain("name = 'Your Name'");
    expect(componentContent).toContain("title = 'Full-stack Developer & Designer'");
  });

  it('renders name in template', () => {
    expect(componentContent).toContain('{name}');
  });

  it('renders title in template', () => {
    expect(componentContent).toContain('{title}');
  });

  it('renders bio content', () => {
    expect(componentContent).toContain("bio.split('\\n\\n')");
    expect(componentContent).toContain('{paragraph}');
  });

  it('renders highlights grid', () => {
    expect(componentContent).toContain('{#each highlights');
    expect(componentContent).toContain('{highlight.label}');
    expect(componentContent).toContain('{highlight.value}');
  });

  it('conditionally renders image', () => {
    expect(componentContent).toContain('{#if imageUrl}');
    expect(componentContent).toContain('<img');
    expect(componentContent).toContain('{imageUrl}');
  });

  it('has professional styling with accent bar', () => {
    expect(componentContent).toContain('border-l-4');
    expect(componentContent).toContain('border-slate-900');
  });

  it('includes hover effects for highlights', () => {
    expect(componentContent).toContain('hover:translate-y');
    expect(componentContent).toContain('transition-transform');
  });

  it('uses Svelte 5 runes', () => {
    expect(componentContent).toContain('$props()');
  });
});
