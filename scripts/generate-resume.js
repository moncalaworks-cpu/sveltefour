import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '../static/documents/resume.pdf');

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const doc = new PDFDocument({ margin: 40, size: 'Letter' });
const stream = fs.createWriteStream(outputPath);

doc.pipe(stream);

// Helper function to add section title
const sectionTitle = (title) => {
  doc.fontSize(12).font('Helvetica-Bold').text(title, { underline: false });
  doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke('#000');
  doc.moveDown(0.5);
};

// Header with name and contact
doc.fontSize(20).font('Helvetica-Bold').text('KEN SHINZATO', { align: 'center' });
doc.fontSize(10)
  .font('Helvetica')
  .text('QA Engineer & Manager', { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(9).text('(215) 347-4744 | kshinz01@gmail.com | linkedin.com/in/ken-shinzato | Sparta, NJ', {
  align: 'center'
});
doc.moveDown(0.8);

// Professional Summary
sectionTitle('PROFESSIONAL SUMMARY');
doc.fontSize(10).font('Helvetica').text(
  'QA Engineer and Manager with 15+ years of experience in test automation, quality assurance, and team leadership. Expert in Selenium, Playwright, and Appium with proven track record managing large-scale testing initiatives. Strong background in mobile testing, enterprise UAT, and building high-performing QA teams.'
);
doc.moveDown(0.5);

// Experience
sectionTitle('PROFESSIONAL EXPERIENCE');

// Kinly
doc.fontSize(11).font('Helvetica-Bold').text('QA Engineer & Manager');
doc.fontSize(10)
  .font('Helvetica')
  .text('Kinly | September 2021 – Present', { oblique: true });
doc.fontSize(9.5).list([
  'Led test automation framework development using React Native and Detox for mobile applications',
  'Managed team of 5+ QA engineers, implementing best practices and mentoring junior team members',
  'Achieved 85%+ automation coverage across web and mobile platforms',
  'Designed and executed comprehensive UAT strategies for enterprise video conferencing platform'
]);
doc.moveDown(0.4);

// PPL
doc.fontSize(11).font('Helvetica-Bold').text('QA Analyst & Engineer');
doc.fontSize(10)
  .font('Helvetica')
  .text('PPL (Pennsylvania Power & Light) | February 2020 – September 2021', { oblique: true });
doc.fontSize(9.5).list([
  'Led Oracle HR system UAT and testing for 10,000+ employees',
  'Developed Selenium automation suite for critical HR workflows',
  'Managed mobile testing across iOS and Android platforms using Appium',
  'Created comprehensive test documentation and automation scripts used by team'
]);
doc.moveDown(0.4);

// Trend MLS
doc.fontSize(11).font('Helvetica-Bold').text('QA Analyst');
doc.fontSize(10)
  .font('Helvetica')
  .text('Trend MLS / Bright MLS | January 2013 – February 2020', { oblique: true });
doc.fontSize(9.5).list([
  'Executed comprehensive testing for MLS data migration with 1M+ listings',
  'Implemented integration testing framework for real estate data systems',
  'Managed UAT coordination across multiple stakeholder teams',
  'Improved test efficiency by 40% through automation initiatives'
]);
doc.moveDown(0.5);

// Skills
sectionTitle('TECHNICAL SKILLS');
doc.fontSize(10).font('Helvetica-Bold').text('Test Automation: ', { continued: true });
doc.font('Helvetica').text('Selenium (expert), Playwright (expert), Appium (advanced), Robot Framework, Detox, Cucumber');

doc.fontSize(10).font('Helvetica-Bold').text('Languages & Scripting: ', { continued: true });
doc.font('Helvetica').text('Python (expert), Java, SQL, REST APIs, XML/JSON');

doc.fontSize(10).font('Helvetica-Bold').text('Platforms & Tools: ', { continued: true });
doc.font('Helvetica').text('Azure Cloud, AWS CI/CD, JIRA (expert), Postman (expert), Zephyr Scale, Azure DevOps');

doc.fontSize(10).font('Helvetica-Bold').text('Specializations: ', { continued: true });
doc.font('Helvetica').text('Mobile Testing, Web Testing, UAT Leadership, Team Management');
doc.moveDown(0.5);

// Core Competencies
sectionTitle('KEY COMPETENCIES');
doc.fontSize(9.5).list([
  'Test automation framework design and implementation',
  'Mobile testing (iOS, Android, React Native)',
  'Enterprise UAT coordination and execution',
  'Team leadership and QA team management',
  'CI/CD pipeline integration and automation',
  'Performance and load testing',
  'API testing and REST service validation'
]);
doc.moveDown(0.5);

// Footer
doc.fontSize(8)
  .font('Helvetica')
  .text('Generated: ' + new Date().toLocaleDateString(), { align: 'center', color: '#666' });

doc.end();

stream.on('finish', () => {
  console.log(`Resume PDF generated successfully at: ${outputPath}`);
});

stream.on('error', (err) => {
  console.error('Error generating resume PDF:', err);
  process.exit(1);
});
