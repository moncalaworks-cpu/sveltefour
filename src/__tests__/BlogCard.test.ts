import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('BlogCard Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const blogCardPath = path.resolve(__dirname, '../components/BlogCard.svelte');
    componentContent = fs.readFileSync(blogCardPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('imports PostMetadata type from blog library', () => {
    expect(componentContent).toContain('import type { PostMetadata }');
    expect(componentContent).toContain('$lib/blog');
  });

  it('defines Props interface with required post prop', () => {
    expect(componentContent).toContain('interface Props');
    expect(componentContent).toContain('post: PostMetadata');
  });

  it('has optional headingLevel prop with default h2', () => {
    expect(componentContent).toContain("headingLevel = 'h2'");
    expect(componentContent).toContain("'h2' | 'h3'");
  });

  it('wraps article in anchor link', () => {
    expect(componentContent).toContain('<a href="/blog/{post.slug}"');
    expect(componentContent).toContain('<article');
  });

  it('renders post title', () => {
    expect(componentContent).toContain('{post.title}');
  });

  it('conditionally renders h2 or h3 heading based on prop', () => {
    expect(componentContent).toContain('{#if headingLevel === \'h2\'}');
    expect(componentContent).toContain('<h2');
    expect(componentContent).toContain('<h3');
    expect(componentContent).toContain('{:else}');
  });

  it('displays formatted publish date', () => {
    expect(componentContent).toContain('{formatDate(post.date)}');
    expect(componentContent).toContain('function formatDate');
  });

  it('uses Intl.DateTimeFormat for date formatting', () => {
    expect(componentContent).toContain('Intl.DateTimeFormat');
    expect(componentContent).toContain('year');
    expect(componentContent).toContain('month');
    expect(componentContent).toContain('day');
  });

  it('displays author information', () => {
    expect(componentContent).toContain('{post.author}');
  });

  it('renders post description', () => {
    expect(componentContent).toContain('{post.description}');
  });

  it('conditionally renders tags when present', () => {
    expect(componentContent).toContain('{#if post.tags');
    expect(componentContent).toContain('{#each post.tags');
  });

  it('limits displayed tags to 3 with overflow indicator', () => {
    expect(componentContent).toContain('post.tags.slice(0, 3)');
    expect(componentContent).toContain('post.tags.length > 3');
    expect(componentContent).toContain('+{post.tags.length - 3}');
  });

  it('renders tags with styling', () => {
    expect(componentContent).toContain('px-2');
    expect(componentContent).toContain('py-1');
    expect(componentContent).toContain('text-xs');
  });

  it('has card layout with flexbox', () => {
    expect(componentContent).toContain('flex flex-col h-full');
  });

  it('includes hover states and transitions', () => {
    expect(componentContent).toContain('hover:border-slate-300');
    expect(componentContent).toContain('hover:shadow-sm');
    expect(componentContent).toContain('transition-all');
  });

  it('has proper styling for metadata section', () => {
    expect(componentContent).toContain('text-xs');
    expect(componentContent).toContain('text-slate-500');
    expect(componentContent).toContain('gap-4');
  });

  it('uses CSS to remove default link styling', () => {
    expect(componentContent).toContain('a {');
    expect(componentContent).toContain('text-decoration: none;');
  });

  it('uses Svelte 5 runes for props', () => {
    expect(componentContent).toContain('$props()');
  });
});
