import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnfdlfzvbqrddpqfsibv.supabase.co";
const supabaseAnonKey = "sb_publishable_oFy1DKubibmJYoeFB4HXRA_qIVBbDkl"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);