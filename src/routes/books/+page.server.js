import { supabase } from "$lib/server/supabase/supabaseClient";

export async function load() {
    let { data: books, error } = await supabase.from("books").select("*");
    let { data: authors } = await supabase.from("authors").select("*");


    return {
        books: books ?? [],
        authors: authors ?? [],
    };
}
