const LOCAL_API = import.meta.env.VITE_API_LOCAL;

async function fetchWithFallback(path) {
  try {
    const res = await fetch(`${LOCAL_API}${path}`);
    if (res.ok) return await res.json();
    throw new Error('Local fetch failed');
  } catch {
    console.warn('Local API unreachable');
  }

  return []; // fallback
}

export async function load() {
  const [books, authors] = await Promise.all([
    fetchWithFallback('/books'),
    fetchWithFallback('/authors')
  ]);

  return { books, authors };
}