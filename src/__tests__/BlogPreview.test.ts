import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('BlogPreview Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const blogPreviewPath = path.resolve(__dirname, '../components/BlogPreview.svelte');
    componentContent = fs.readFileSync(blogPreviewPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('imports PostMetadata type from blog library', () => {
    expect(componentContent).toContain('import type { PostMetadata }');
    expect(componentContent).toContain('$lib/blog');
  });

  it('imports BlogCard component', () => {
    expect(componentContent).toContain('import BlogCard');
    expect(componentContent).toContain('./BlogCard.svelte');
  });

  it('defines Props interface with required posts array', () => {
    expect(componentContent).toContain('interface Props');
    expect(componentContent).toContain('posts: PostMetadata[]');
  });

  it('has section with blog id for anchor navigation', () => {
    expect(componentContent).toContain('id="blog"');
  });

  it('displays "From the Blog" or similar heading', () => {
    expect(componentContent).toContain('From the Blog');
  });

  it('displays section label "Writing"', () => {
    expect(componentContent).toContain('Writing');
  });

  it('renders blog posts grid with responsive columns', () => {
    expect(componentContent).toContain('grid grid-cols-1');
    expect(componentContent).toContain('md:grid-cols-2');
    expect(componentContent).toContain('lg:grid-cols-3');
  });

  it('renders BlogCard for each post', () => {
    expect(componentContent).toContain('{#each posts');
    expect(componentContent).toContain('<BlogCard');
    expect(componentContent).toContain('{post}');
  });

  it('sets heading level to h3 for blog cards', () => {
    expect(componentContent).toContain('headingLevel="h3"');
  });

  it('has View All Posts CTA button', () => {
    expect(componentContent).toContain('View All Posts');
  });

  it('View All Posts button links to blog page', () => {
    expect(componentContent).toContain('href="/blog"');
  });

  it('CTA button has styling and hover effects', () => {
    expect(componentContent).toContain('bg-slate-900');
    expect(componentContent).toContain('text-white');
    expect(componentContent).toContain('hover:bg-slate-800');
    expect(componentContent).toContain('transition-colors');
  });

  it('has proper spacing around sections', () => {
    expect(componentContent).toContain('py-');
    expect(componentContent).toContain('px-');
    expect(componentContent).toContain('mb-');
  });

  it('centers CTA button in container', () => {
    expect(componentContent).toContain('text-center');
  });

  it('uses max-width container', () => {
    expect(componentContent).toContain('max-w-');
    expect(componentContent).toContain('mx-auto');
  });

  it('includes gap styling for grid items', () => {
    expect(componentContent).toContain('gap-6');
  });

  it('has proper header spacing', () => {
    expect(componentContent).toContain('mt-4');
    expect(componentContent).toContain('mb-12');
  });

  it('uses Svelte 5 runes for props', () => {
    expect(componentContent).toContain('$props()');
  });

  it('applies background color to section', () => {
    const hasBgSlate50 = componentContent.includes('bg-slate-50');
    const hasBgWhite = componentContent.includes('bg-white');
    expect(hasBgSlate50 || hasBgWhite).toBe(true);
  });

  it('CTA button has proper padding', () => {
    expect(componentContent).toContain('px-8');
    expect(componentContent).toContain('py-3');
  });

  it('includes shadow styling for button', () => {
    expect(componentContent).toContain('shadow-sm');
    expect(componentContent).toContain('hover:shadow-md');
  });
});
