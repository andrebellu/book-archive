<script>
  export let data;
  let book = data.book;
  let author = data.author;
</script>

{#if book && author}
  <div class="p-4 w-full">
    <div class="flex flex-row justify-start gap-x-4">
      <figure class="cover rounded-md w-max aspect-square">
        <img
          src={book.cover}
          alt="Book Cover"
          class="object-cover rounded-xl h-96"
        />
      </figure>
      <div class="w-full">
        <div class="title font-bold text-3xl">{book.title}</div>
        <div class="author">
          <span class="font-bold">Autore:</span>
          {author.name}
          {author.surname}
        </div>
        <div class="genre">
          <span class="font-bold">Genere:</span>
          {book.genre}
        </div>
        <div class="description">{book.short_description}</div>
      </div>
    </div>
  </div>
{:else}
  <div class="p-8 text-center text-error font-bold text-xl">
    Libro o autore non trovato.
  </div>
{/if}
