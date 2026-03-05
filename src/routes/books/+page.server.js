import { pool } from '$lib/server/db.js';
const LOCAL_API = import.meta.env.VITE_API_LOCAL;

async function fetchWithFallback(path, customFetch = fetch) {
  try {
    // Determine if we need to prepend LOCAL_API or if we can use relative path
    // If path starts with /api, use it directly (handled by internal SvelteKit router)
    const url = path.startsWith('/api') ? path : `${LOCAL_API}${path}`;

    // Use customFetch if provided (vital for server-side load to hit internal APIs)
    const res = await customFetch(url);
    if (res.ok) return await res.json();
    console.warn(`Fetch failed for ${path}: ${res.status}`);
  } catch (e) {
    console.warn('API unreachable:', e);
  }

  return []; // fallback
}

export async function load({ fetch, url }) {
  const search = url.searchParams.get('search') || '';
  const sort = url.searchParams.get('sort') || '';
  const status = url.searchParams.get('status') || '';
  const genre = url.searchParams.get('genre') || '';
  const publisher = url.searchParams.get('publisher') || '';

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  if (status) params.append('status', status);
  if (genre) params.append('genre', genre);
  if (publisher) params.append('publisher', publisher);

  const [books, authors, genresResult, publishersResult] = await Promise.all([
    fetchWithFallback(`/api/books?${params.toString()}`, fetch),
    fetchWithFallback('/authors', fetch),
    pool.query('SELECT DISTINCT genre FROM books WHERE genre IS NOT NULL AND genre != ""'),
    pool.query('SELECT DISTINCT publisher FROM books WHERE publisher IS NOT NULL AND publisher != ""')
  ]);

  // Process comma-separated genres/publishers
  const allGenres = [...new Set(genresResult[0].map(r => r.genre.split(',')).flat().map(s => s.trim()))].sort();
  const allPublishers = [...new Set(publishersResult[0].map(r => r.publisher.split(',')).flat().map(s => s.trim()))].sort();

  return { books, authors, filters: { genres: allGenres, publishers: allPublishers } };
}