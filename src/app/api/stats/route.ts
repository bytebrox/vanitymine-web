import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// Initialize Redis client (will use environment variables)
// Supports both Vercel KV naming (KV_REST_API_*) and Upstash naming (UPSTASH_REDIS_REST_*)
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Keys for our stats
const KEYS = {
  totalAttempts: 'vanitymine:totalAttempts',
  totalFound: 'vanitymine:totalFound',
};

/**
 * GET /api/stats
 * Returns current community statistics
 */
export async function GET() {
  try {
    // Check if Redis is configured
    const isConfigured = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
                         (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN);
    
    if (!isConfigured) {
      // Return mock data for development
      return NextResponse.json({
        totalAttempts: 0,
        totalFound: 0,
        configured: false,
      });
    }

    const [totalAttempts, totalFound] = await Promise.all([
      redis.get<number>(KEYS.totalAttempts),
      redis.get<number>(KEYS.totalFound),
    ]);

    return NextResponse.json({
      totalAttempts: totalAttempts || 0,
      totalFound: totalFound || 0,
      configured: true,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', totalAttempts: 0, totalFound: 0 },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stats
 * Increment statistics when an address is found
 * Body: { attempts: number }
 */
export async function POST(request: Request) {
  try {
    // Check if Redis is configured
    const isConfigured = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
                         (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN);
    
    if (!isConfigured) {
      return NextResponse.json({ success: false, reason: 'not_configured' });
    }

    const body = await request.json();
    const { attempts } = body;

    if (typeof attempts !== 'number' || attempts < 0) {
      return NextResponse.json(
        { error: 'Invalid attempts value' },
        { status: 400 }
      );
    }

    // Increment both counters atomically
    await Promise.all([
      redis.incrby(KEYS.totalAttempts, attempts),
      redis.incr(KEYS.totalFound),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update stats:', error);
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    );
  }
}
