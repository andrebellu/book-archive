export async function load() {
  // Fetch libri dal NAS
  const booksRes = await fetch('http://192.168.1.50:3006/books');
  const books = booksRes.ok ? await booksRes.json() : [];

  // Fetch autori dal NAS
  const authorsRes = await fetch('http://192.168.1.50:3006/authors');
  const authors = authorsRes.ok ? await authorsRes.json() : [];

  return {
    books,
    authors,
  };
}
