<script>
  import { onMount } from "svelte";
  import { books, authors, filteredBooks } from "./path/to/store";
  import Search from "./Search.svelte";
  import CarouselAdd from "./CarouselAdd.svelte";
  import BookCard from "./BookCard.svelte";
  import BookCardList from "./BookCardList.svelte";

  export let data;

  let list = false;
  let isLoading = true;
  let errorMessage = "";

  onMount(() => {
    setVariables();
  });

  function setVariables() {
    try {
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
      isLoading = false;
    } catch (error) {
      errorMessage = "Failed to load data";
      console.error(error);
    }
  }

  async function handleList() {
    list = !list;
  }

  $: $books;
</script>

<body class="flex flex-col items-center no-scroll" aria-busy={isLoading}>
  <div class="flex flex-row-reverse items-center gap-4 p-10">
    <Search />
    <button
      class="btn btn-gray hover:bg w-32"
      on:click={handleList}
      aria-pressed={list}
    >
      {list ? "Grid" : "List"}
    </button>
    <CarouselAdd />
  </div>

  {#if isLoading}
    <div class="loading">Loading...</div>
  {:else if errorMessage}
    <div class="error">{errorMessage}</div>
  {:else if list}
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-10 gap-8"
    >
      {#each $books as book}
        <BookCardList {book} />
      {/each}
    </div>
  {:else}
    <div class="flex justify-center items-center flex-wrap gap-10 px-10">
      {#each $books as book}
        <BookCard {book} />
      {/each}
    </div>
  {/if}
</body>

<style>
  .loading {
    font-size: 1.5em;
    color: #888;
  }
</style>
