import { createClient } from "@supabase/supabase-js";

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_PROJECT_URL) {
	throw new Error("NEXT_PUBLIC_SUPABASE_PROJECT_URL environment variable is missing");
}

if (!SUPABASE_ANON_KEY) {
	throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is missing");
}

const supabaseClient = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabaseClient;
