import { createClient } from "@supabase/supabase-js";

// Replace these with your Supabase project URL and API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "NEXT_PUBLIC_SUPABASE_URL";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "NEXT_PUBLIC_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
