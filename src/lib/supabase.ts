import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/supabase';

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: Error) => {
  console.error('Supabase error:', error.message);
  throw new Error(error.message);
};