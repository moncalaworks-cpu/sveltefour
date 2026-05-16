import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Skills Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const skillsPath = path.resolve(__dirname, '../components/Skills.svelte');
    componentContent = fs.readFileSync(skillsPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('defines required interfaces', () => {
    expect(componentContent).toContain('interface Skill');
    expect(componentContent).toContain('interface SkillCategory');
    expect(componentContent).toContain('interface Props');
  });

  it('has default skill categories', () => {
    expect(componentContent).toContain('defaultCategories');
    expect(componentContent).toContain('name:');
    expect(componentContent).toContain('skills:');
  });

  it('renders categories conditionally based on layout prop', () => {
    expect(componentContent).toContain("layout = 'categories'");
    expect(componentContent).toContain('{#if layout === \'categories\'}');
    expect(componentContent).toContain('{:else if layout === \'grid\'}');
  });

  it('renders category headers with icons', () => {
    expect(componentContent).toContain('{#each categories');
    expect(componentContent).toContain('{category.icon}');
    expect(componentContent).toContain('{category.name}');
  });

  it('renders skill items with proficiency levels', () => {
    expect(componentContent).toContain('{#each category.skills');
    expect(componentContent).toContain('{skill.name}');
    expect(componentContent).toContain('{skill.proficiency}');
  });

  it('has proficiency color mapping', () => {
    expect(componentContent).toContain('proficiencyColors');
    expect(componentContent).toContain("'beginner'");
    expect(componentContent).toContain("'intermediate'");
    expect(componentContent).toContain("'advanced'");
    expect(componentContent).toContain("'expert'");
  });

  it('conditionally shows proficiency based on prop', () => {
    expect(componentContent).toContain('showProficiency = true');
    expect(componentContent).toContain('{#if showProficiency');
  });

  it('has categories layout with proper grid structure', () => {
    expect(componentContent).toContain('grid grid-cols-1');
    expect(componentContent).toContain('sm:grid-cols-2');
    expect(componentContent).toContain('lg:grid-cols-3');
  });

  it('includes hover and transition effects', () => {
    expect(componentContent).toContain('hover:shadow-md');
    expect(componentContent).toContain('hover:scale-105');
    expect(componentContent).toContain('transition-all');
  });

  it('has gradient dividers in categories layout', () => {
    expect(componentContent).toContain('bg-gradient-to-r');
    expect(componentContent).toContain('from-slate-200');
    expect(componentContent).toContain('to-transparent');
  });

  it('uses Svelte 5 runes', () => {
    expect(componentContent).toContain('$props()');
  });
});
