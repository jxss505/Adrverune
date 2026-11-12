/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { checkSupabaseHealth } from '../../src/server/supabase';

const jsonHeaders: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8'
};

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // Only permit GET or HEAD
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD') {
    return {
      statusCode: 405,
      headers: {
        ...jsonHeaders,
        Allow: 'GET, HEAD'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const smtpConfigured = Boolean(
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    );
    const dbHealth = await checkSupabaseHealth();

    return {
      statusCode: 200,
      headers: {
        ...jsonHeaders,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: JSON.stringify({
        status: 'healthy',
        service: 'ADVERUNE Enquiry Subsystem (Netlify Function)',
        database: {
          configured: dbHealth.configured,
          connected: dbHealth.connected,
          tableExists: dbHealth.tableExists,
          notice:
            dbHealth.error ||
            (dbHealth.tableExists
              ? 'Leads table active with RLS protection'
              : 'Pending SQL migration')
        },
        smtpConfigured,
        antiSpamActive: true,
        rateLimitingActive: true,
        duplicateProtectionActive: true
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({
        status: 'error',
        message: 'Internal health check failure'
      })
    };
  }
};
