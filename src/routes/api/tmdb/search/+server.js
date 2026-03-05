import { json } from '@sveltejs/kit';
import { TMDB_API_KEY } from '$env/static/private';


/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const query = url.searchParams.get('q');

    if (!query) {
        return json({ results: [] });
    }

    if (!TMDB_API_KEY) {
        console.warn('TMDB_API_KEY is missing in .env');
        // Return dummy data or empty if key is missing, to avoid breaking the UI completely
        return json({ error: 'TMDB API Key missing' }, { status: 500 });
    }

    try {
        const tmdbUrl = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=it-IT&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
        const res = await fetch(tmdbUrl);

        if (!res.ok) {
            throw new Error(`TMDB responded with ${res.status}`);
        }

        const data = await res.json();
        const results = data.results
            .filter(item => item.media_type === 'tv' || item.media_type === 'movie') // Filter only TV and Movies (which we treat as potential Anime movies)
            .map(item => ({
                id: item.id,
                title: item.title || item.name,
                original_title: item.original_title || item.original_name,
                overview: item.overview,
                poster_path: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
                release_date: item.release_date || item.first_air_date,
                vote_average: item.vote_average,
                media_type: item.media_type // 'tv' or 'movie'
            }));

        return json({ results });

    } catch (err) {
        console.error('[API] TMDB Search Error:', err);
        return json({ error: 'Failed to fetch from TMDB' }, { status: 500 });
    }
}
