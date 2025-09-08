<script>
  import { onMount } from "svelte";
  import BookCard from "$lib/components/Books/BookCard.svelte";
  import { books, authors, filteredBooks } from "../../store.js";
  import BookCardList from "$lib/components/Books/BookCardList.svelte";
  import Menu from "$lib/components/Books/Menu/Menu.svelte";
  export let data;

  let list = false;

  onMount(() => {
    setVariables();
  });

  function setVariables() {
    books.set(data.books);

    filteredBooks.set(data.books);

    books.update((books) => {
      return books.sort((a, b) => {
        if (!a.read && b.read) return -1;
        if (a.reading && !b.reading) return -1;
        return 0;
      });
    });

    authors.set(data.authors);
  }

  async function handleList() {
    list = !list;
  }

  $: $books = $books;
</script>

<body class="flex flex-col items-center min-h-screen">
  <div class="w-full max-w-screen-xl p-6 flex flex-col gap-4">
    <Menu />

    {#if list}
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {#each $filteredBooks as book}
          <BookCardList {book} />
        {/each}
      </div>
    {:else}
      <div class="flex flex-wrap justify-center gap-6">
        {#each $filteredBooks as book}
          <BookCard {book} />
        {/each}
      </div>
    {/if}

    {#if $filteredBooks.length === 0}
      <h1 class="text-xl text-gray-600 text-center mt-10">
        📚 Nessun libro trovato!
      </h1>
    {/if}
  </div>
</body>
