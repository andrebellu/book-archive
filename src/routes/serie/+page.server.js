const LOCAL_API = import.meta.env.VITE_API_LOCAL;

async function fetchWithFallback(path) {
  try {
    const res = await fetch(`http://${process.env.DB_HOST_LOCAL}:3006${path}`);
    if (res.ok) return await res.json();
    throw new Error('Local fetch failed');
  } catch {
    console.log(`${LOCAL_API}${path}`);
    console.error('Fetch error for', path);
    console.warn('Local API unreachable');
  }

  return []; // fallback
}    

export async function load() {
  const [series] = await Promise.all([
    fetchWithFallback('/serie')
  ]);

  return { series };
}
