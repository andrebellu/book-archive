// src/routes/book/[id]/+page.server.js

export async function load({ params }) {
  const bookRes = await fetch(`http://192.168.1.50:3006/books/${params.id}`);

  if (!bookRes.ok) {
    return { book: null, author: null };
  }

  const book = await bookRes.json();

  let author = null;

  console.log("Fetching author for book:", book.author_id);
  if (book?.author_id) {
    const authorRes = await fetch(`http://192.168.1.50:3006/authors/${book.author_id}`);
    if (authorRes.ok) {
      author = await authorRes.json();
    }
  }

  console.log("Book:", book);
  console.log("Author:", author);

  return {
    book,
    author,
  };
}
