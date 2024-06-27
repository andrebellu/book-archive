<script>
  import { onMount } from "svelte";
  import BookCard from "$lib/components/BookCard.svelte";
  import Add from "../lib/components/Add.svelte";
  import { books, authors } from "../store.js";
  export let data;

  onMount(() => {
    setVariables();
  });

  function setVariables() {
    books.set(data.books);
    authors.set(data.authors);
  }
</script>

<body class="flex flex-col items-center py-4 px-10">
  <h1 class="text-6xl font-bold primary text-center">Archive</h1>

  <Add />
  <div class="flex justify-center items-center flex-wrap gap-10">
    {#each $books as book}
      <BookCard {book} />
    {/each}
  </div>
</body>
