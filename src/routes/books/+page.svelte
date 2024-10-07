<script>
  import { onMount } from "svelte";
  import BookCard from "$lib/components/Books/BookCard.svelte";
  import Add from "$lib/components/Books/Add.svelte";
  import { books, authors, filteredBooks } from "../../store.js";
  import Search from "../../lib/components/Search.svelte";
  import BookCardList from "$lib/components/Books/BookCardList.svelte";
  import AddMore from "../../lib/components/Books/AddMore.svelte";
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

<body class="flex flex-col items-center no-scroll">
  <div class="flex flex-row-reverse items-center gap-4 p-10">
    <Search />
    <button class="btn btn-gray hover:bg w-32" on:click={handleList}>
      {list ? "Grid" : "List"}
    </button>
    <AddMore />
    <Add />
  </div>

  {#if list}
    <div class="grid grid-cols-4 px-10 gap-8">
      {#each $books as book}
        <BookCardList {book} />
      {/each}
    </div>
  {:else}
    <div class="flex justify-center items-center flex-wrap gap-10 px-10">
      {#each $filteredBooks as book}
        <BookCard {book} />
      {/each}
    </div>
  {/if}
</body>
