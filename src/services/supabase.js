import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pfwevfihobzbecgrayqr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Hvs4wm7b46wg2KTc5S9vQg_9Do_TpbV';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Экспортируем дополнительные утилиты
export const ADMIN_EMAIL = 'lysakov.kolyan@yandex.ru';
export const isUserAdmin = (user) => {
  return user?.email === ADMIN_EMAIL;
};

export const getUserName = (user) => {
  return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
};

export const getUserInitial = (user) => {
  const name = getUserName(user);
  return name.charAt(0).toUpperCase();
};