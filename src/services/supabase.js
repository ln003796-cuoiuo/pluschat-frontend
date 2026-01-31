import { createClient } from '@supabase/supabase-js';

// Замените эти значения на ваши из Supabase
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);