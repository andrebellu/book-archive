import { supabase } from './supabaseClient'

const { data, error } = await supabase.from('books')
    .insert([
        
    ])
    .select()

    