// src/utils/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Replace with your actual values from Supabase dashboard
const SUPABASE_URL = "https://gksjphiaxctgkabratjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrc2pwaGlheGN0Z2thYnJhdGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzk4MTUsImV4cCI6MjA2OTU1NTgxNX0.Df0IiMYTAkwhRLe96Dv3KweggZqR4vh6Yzo_B7u_trU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
