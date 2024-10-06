import { read } from '$app/server';
import { supabase } from '$lib/server/supabase/supabaseClient.js';

export async function POST({ request }) {
    const data = await request.json();

    if (!data.title) {
        return new Response(JSON.stringify({ error: 'Title is required' }), { status: 400 });
    } else if (!data.author_id) {
        return new Response(JSON.stringify({ error: 'Author is required' }), { status: 400 });
    }

    const { error } = await supabase
        .from('books')
        .insert(data);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 }, { body: data });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}
