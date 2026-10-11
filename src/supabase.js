// One Supabase client for accounts, nearby players and the shared weekend board.
import {createClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL,key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const db=url&&key?createClient(url,key):null;
