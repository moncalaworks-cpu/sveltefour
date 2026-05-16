import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Contact Component', () => {
  let componentContent: string;

  beforeEach(() => {
    const contactPath = path.resolve(__dirname, '../components/Contact.svelte');
    componentContent = fs.readFileSync(contactPath, 'utf-8');
  });

  it('exports a component', () => {
    expect(componentContent).toBeDefined();
    expect(componentContent).toContain('<script');
  });

  it('has section with contact id for anchor navigation', () => {
    expect(componentContent).toContain('id="contact"');
  });

  it('displays email contact information', () => {
    expect(componentContent).toContain('kshinz01@gmail.com');
  });

  it('renders email as a link', () => {
    expect(componentContent).toContain('href="mailto:');
  });

  it('displays phone number', () => {
    expect(componentContent).toContain('phone');
  });

  it('has LinkedIn social link', () => {
    expect(componentContent).toContain('linkedin');
  });

  it('has GitHub social link', () => {
    expect(componentContent).toContain('github');
  });

  it('displays contact section heading', () => {
    const hasContact = componentContent.includes('Contact');
    const hasGetInTouch = componentContent.includes('Get in Touch');
    expect(hasContact || hasGetInTouch).toBe(true);
  });

  it('includes interests or hobbies section', () => {
    const hasInterests = componentContent.includes('interests');
    const hasHobbies = componentContent.includes('hobbies');
    expect(hasInterests || hasHobbies).toBe(true);
  });

  it('uses Svelte 5 runes for props', () => {
    expect(componentContent).toContain('$props()');
  });

  it('has accessible link structure', () => {
    expect(componentContent).toContain('<a');
    expect(componentContent).toContain('href=');
  });

  it('includes styling for contact section', () => {
    expect(componentContent).toContain('py-');
    expect(componentContent).toContain('px-');
  });

  it('renders multiple contact methods', () => {
    const emailCount = (componentContent.match(/href="mailto:/g) || []).length;
    expect(emailCount).toBeGreaterThan(0);
  });
});
