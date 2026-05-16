import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Projects Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const projectsPath = path.resolve(__dirname, '../components/Projects.svelte');
    componentContent = fs.readFileSync(projectsPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('defines required interfaces', () => {
    expect(componentContent).toContain('interface ProjectLink');
    expect(componentContent).toContain('interface Project');
    expect(componentContent).toContain('interface Props');
  });

  it('has default projects', () => {
    expect(componentContent).toContain('projects = [');
    expect(componentContent).toContain('id:');
    expect(componentContent).toContain('title:');
    expect(componentContent).toContain('description:');
    expect(componentContent).toContain('technologies:');
  });

  it('renders projects in grid layout', () => {
    expect(componentContent).toContain('grid grid-cols-1');
    expect(componentContent).toContain('md:grid-cols-2');
    expect(componentContent).toContain('lg:grid-cols-3');
  });

  it('renders project cards with title and description', () => {
    expect(componentContent).toContain('{#each projects');
    expect(componentContent).toContain('{project.title}');
    expect(componentContent).toContain('{project.description}');
  });

  it('renders technology tags', () => {
    expect(componentContent).toContain('{#each project.technologies');
    expect(componentContent).toContain('{tech}');
  });

  it('conditionally renders thumbnail images', () => {
    expect(componentContent).toContain('{#if project.thumbnail}');
    expect(componentContent).toContain('<img');
    expect(componentContent).toContain('group-hover:scale-105');
  });

  it('renders project links with icons', () => {
    expect(componentContent).toContain('{#if project.links');
    expect(componentContent).toContain("link.icon === 'github'");
    expect(componentContent).toContain("link.icon === 'link'");
    expect(componentContent).toContain("link.icon === 'blog'");
  });

  it('has hover animations and transitions', () => {
    expect(componentContent).toContain('group');
    expect(componentContent).toContain('hover:shadow-lg');
    expect(componentContent).toContain('transition-all');
  });

  it('has customizable props', () => {
    expect(componentContent).toContain("title = 'Featured Work'");
    expect(componentContent).toContain("subtitle = 'A selection");
  });

  it('uses Svelte 5 runes', () => {
    expect(componentContent).toContain('$props()');
  });

  it('includes line-clamp styles', () => {
    expect(componentContent).toContain('line-clamp-2');
    expect(componentContent).toContain('line-clamp-3');
  });
});
