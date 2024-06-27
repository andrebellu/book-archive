import { supabase } from "$lib/server/supabase/supabaseClient";

export async function load({ params }) {
    let { data: book } = await supabase.from("books").select("*").eq("id", params.id);
    let { data: author } = await supabase.from("authors").select("*").eq("id", book[0].author_id);
    return {
        book: book ?? [],
        author: author ?? []
    };
}