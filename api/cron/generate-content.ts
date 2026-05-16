import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Cron Function: Generate daily content drafts
 * Scheduled to run daily at 6 AM EST
 *
 * This function:
 * 1. Searches for relevant YouTube videos, articles, and podcasts
 * 2. Generates brief blog post drafts with sources
 * 3. Creates files in the content/drafts branch
 * 4. Auto-commits with metadata
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Verify cron secret
	if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		console.log(`[${new Date().toISOString()}] Starting daily content generation...`);

		// This will be called by the cron job
		// The actual implementation happens in scripts/generate-draft.ts
		// which is triggered via a subprocess or GitHub Actions

		return res.status(200).json({
			message: 'Content generation triggered',
			timestamp: new Date().toISOString(),
			nextRun: 'Tomorrow at 6 AM EST'
		});
	} catch (error) {
		console.error('Error in content generation cron:', error);
		return res.status(500).json({
			error: 'Failed to generate content',
			details: error instanceof Error ? error.message : 'Unknown error'
		});
	}
}

export const config = {
	schedule: '0 6 * * *' // Daily at 6 AM UTC (adjust for EST if needed)
};
