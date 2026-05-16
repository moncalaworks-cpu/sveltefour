import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Experience Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const experiencePath = path.resolve(__dirname, '../components/Experience.svelte');
    componentContent = fs.readFileSync(experiencePath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('defines required interfaces', () => {
    expect(componentContent).toContain('interface Achievement');
    expect(componentContent).toContain('interface ExperienceEntry');
    expect(componentContent).toContain('interface Props');
  });

  it('has default experiences', () => {
    expect(componentContent).toContain('defaultExperiences');
    expect(componentContent).toContain('company:');
    expect(componentContent).toContain('title:');
    expect(componentContent).toContain('startDate:');
    expect(componentContent).toContain('endDate:');
  });

  it('renders experience entries in timeline', () => {
    expect(componentContent).toContain('{#each experiences');
    expect(componentContent).toContain('{entry.title}');
    expect(componentContent).toContain('{entry.company}');
  });

  it('renders date range for each entry', () => {
    expect(componentContent).toContain('formatDateRange(entry.startDate, entry.endDate)');
    expect(componentContent).toContain('function formatDateRange');
  });

  it('renders description when available', () => {
    expect(componentContent).toContain('{#if entry.description}');
    expect(componentContent).toContain('{entry.description}');
  });

  it('renders achievements list', () => {
    expect(componentContent).toContain('{#if entry.achievements');
    expect(componentContent).toContain('{#each entry.achievements');
    expect(componentContent).toContain('{achievement.text}');
  });

  it('has timeline visual with desktop and mobile layouts', () => {
    expect(componentContent).toContain('border-l-2');
    expect(componentContent).toContain('hidden sm:block');
    expect(componentContent).toContain('block sm:hidden');
  });

  it('includes hover states and transitions', () => {
    expect(componentContent).toContain('hover:border-slate-400');
    expect(componentContent).toContain('transition-colors');
    expect(componentContent).toContain('transition-all');
  });

  it('uses Svelte 5 runes', () => {
    expect(componentContent).toContain('$props()');
  });

  it('has proper grid styling for mobile and desktop', () => {
    expect(componentContent).toContain('pl-0');
    expect(componentContent).toContain('sm:pl-12');
  });
});
