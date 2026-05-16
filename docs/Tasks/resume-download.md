---
id: task-phase4-resume-pdf
title: Add Resume Download Feature
description: Create downloadable resume PDF and add download button
status: pending
priority: low
assigned_agent: general-purpose
dependencies: []
---

# Task: Add Resume Download Feature

## Overview
Create a downloadable resume PDF and add a download button/link to the site. Visitors can download Ken's resume as PDF for easy sharing and offline access.

## Requirements

### Resume PDF
- Create professional resume PDF (A4 or Letter size)
- Include: Contact info, summary, experience, skills, education
- Match site design aesthetic (clean, minimalist)
- Font sizes readable (11-12pt body, 14-16pt headings)
- One or two page format (recommended: one page)

### Download Implementation
- Add download button/link in multiple locations:
  - Hero section CTA (alternative to "Contact")
  - About section (below bio)
  - Contact section (as primary action)
  - Navbar (optional, as menu item)
- Button styling: Match site design, clear "Download Resume" label
- Icon: Document/PDF icon (optional visual indicator)

### File Management
- Store PDF in static/ directory (public assets)
- Filename: `resume.pdf` or `ken-shinzato-resume.pdf`
- Update if changes needed (version control via git)

### Technical Implementation
- Use <a> tag with download attribute
- href="/resume.pdf" (or appropriate path)
- Add tracking for download clicks (analytics event)
- Mobile-friendly (works on all devices)
- No backend needed (static file)

### PDF Creation Options
1. **Convert existing resume**
   - Use LibreOffice, Word, or Google Docs
   - Export as PDF
   - Optimize file size
   
2. **Design from scratch**
   - Use Figma, Illustrator, or design tool
   - Create professional layout
   - Export as PDF
   
3. **Generate programmatically** (optional)
   - Use pdfkit or similar library
   - Generate PDF from data
   - More complex, optional

## Acceptance Criteria
- [ ] Resume PDF created and polished
- [ ] Download button implemented (at least 2 locations)
- [ ] Download link functional
- [ ] PDF opens in browser / downloads properly
- [ ] File size optimized (< 500KB)
- [ ] Works on mobile and desktop
- [ ] Analytics tracking on download (event)
- [ ] UI/UX polished and professional
- [ ] All tests passing
- [ ] Feature branch created and merged
- [ ] Documentation updated

## Design Considerations
- Button text: "Download Resume" or "Download My Resume" or "View Resume"
- Icon optional but recommended (document or arrow down icon)
- Color: Blend with site design (slate/white theme)
- Placement: Visible but not dominant (unless resume is priority)
- Hover state: Visual feedback (scale, shadow)

## Resume Content
Include:
- Contact Information (email, phone, LinkedIn, GitHub)
- Professional Summary (3-4 lines)
- Work Experience (3 positions: Kinly, PPL, Trend MLS)
  - Dates, titles, achievements
- Technical Skills (organized by category)
- Education (if relevant)
- Certifications/Awards (optional)

## Testing
- Test download on Chrome, Firefox, Safari
- Test on mobile (iOS Safari, Chrome Mobile)
- Verify PDF opens correctly
- Check file size and load time
- Test analytics event tracking
- Verify link in HTML (anchor tag syntax)

## Analytics Integration
- Track "Resume Download" event
- Log event when button clicked
- Helps identify interested visitors

## Related
- [[PROGRESS]] — Development progress
- [[ROADMAP]] — Feature roadmap
- [[PROJECT]] — Project overview

## Notes
Phase 4 optional enhancement. Resume download is a nice-to-have feature that helps visitors easily access offline version. Can be simple (just a static PDF link) or enhanced with tracking. File should be kept up-to-date as experience/skills change.
