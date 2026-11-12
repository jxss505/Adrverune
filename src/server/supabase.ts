/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export interface LeadInsertPayload {
  full_name: string;
  business_name: string;
  email: string;
  phone?: string | null;
  service: string;
  business_goal?: string | null;
  message?: string | null;
  status?: string;
}

export interface LeadInsertResult {
  success: boolean;
  leadId?: string;
  createdAt?: string;
  error?: string;
  reason?: 'unconfigured' | 'table_not_found' | 'permission_denied' | 'network_error' | 'ok';
}

let supabaseInstance: SupabaseClient | null = null;

/**
 * Initializes and returns the server-side Supabase client singleton.
 * Uses environment variables; never hardcodes credentials.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  // Use service_role key if available for server-side operations, otherwise use publishable/anon key
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    return supabaseInstance;
  } catch (initErr) {
    console.error('[SUPABASE INIT ERROR]', (initErr as Error).message);
    return null;
  }
}

/**
 * Inserts a validated, sanitized commercial enquiry into the Supabase `leads` table.
 */
export async function insertLeadRecord(payload: LeadInsertPayload): Promise<LeadInsertResult> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    console.warn('[SUPABASE DATABASE] Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY in environment.');
    return {
      success: false,
      reason: 'unconfigured',
      error: 'Supabase credentials are not configured in environment variables.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        full_name: payload.full_name,
        business_name: payload.business_name,
        email: payload.email,
        phone: payload.phone || null,
        service: payload.service,
        business_goal: payload.business_goal || null,
        message: payload.message || null,
        status: payload.status || 'new'
      })
      .select('id, created_at')
      .single();

    if (error) {
      // Check if table has not been created yet in user's Supabase project
      if (error.code === 'PGRST205' || error.message?.includes('not find the table')) {
        console.warn(
          `[SUPABASE NOTICE] Table 'public.leads' does not exist yet in Supabase project '${process.env.SUPABASE_PROJECT_ID || 'vdtleymxbvgiuwzwxyvk'}'. Please run the provided SQL script in the Supabase SQL Editor.`
        );
        return {
          success: false,
          reason: 'table_not_found',
          error: "Table 'public.leads' not yet created in Supabase project. Please execute the SQL migration script."
        };
      }

      console.error('[SUPABASE INSERT ERROR]', error.code, error.message);
      return {
        success: false,
        reason: error.code === '42501' ? 'permission_denied' : 'network_error',
        error: error.message
      };
    }

    return {
      success: true,
      reason: 'ok',
      leadId: data?.id,
      createdAt: data?.created_at
    };
  } catch (err) {
    console.error('[SUPABASE EXCEPTION]', (err as Error).message);
    return {
      success: false,
      reason: 'network_error',
      error: (err as Error).message
    };
  }
}

/**
 * Health check helper: verifies connectivity to the Supabase endpoint.
 */
export async function checkSupabaseHealth(): Promise<{
  configured: boolean;
  connected: boolean;
  tableExists: boolean;
  projectUrl: string;
  error?: string;
}> {
  const supabase = getSupabaseServerClient();
  const projectUrl = process.env.SUPABASE_URL || '[NOT_CONFIGURED]';

  if (!supabase) {
    return {
      configured: false,
      connected: false,
      tableExists: false,
      projectUrl
    };
  }

  try {
    // Attempt to query the leads table with limit 1
    const { error } = await supabase.from('leads').select('id').limit(1);

    if (!error) {
      return {
        configured: true,
        connected: true,
        tableExists: true,
        projectUrl
      };
    }

    if (error.code === 'PGRST205') {
      return {
        configured: true,
        connected: true,
        tableExists: false,
        projectUrl,
        error: "Table 'leads' not found in schema cache. Run the provided SQL migration in Supabase SQL Editor."
      };
    }

    // If RLS blocked read (code 42501), the connection and table exist, but anonymous read is denied as expected!
    if (error.code === '42501' || error.message?.includes('violates row-level security')) {
      return {
        configured: true,
        connected: true,
        tableExists: true,
        projectUrl,
        error: 'RLS active: Anonymous read access correctly blocked.'
      };
    }

    return {
      configured: true,
      connected: false,
      tableExists: false,
      projectUrl,
      error: error.message
    };
  } catch (err) {
    return {
      configured: true,
      connected: false,
      tableExists: false,
      projectUrl,
      error: (err as Error).message
    };
  }
}
