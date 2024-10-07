import { supabase } from "$lib/server/supabase/supabaseClient";

export async function load() {
    let { data: authors } = await supabase.from("authors").select("*");


    return {
        authors: authors ?? [],
    };
}
