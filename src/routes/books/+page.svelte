<script>
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import BookCard from "$lib/components/Books/BookCard.svelte";
  import BookSkeleton from "$lib/components/Skeleton/BookSkeleton.svelte";
  import { navigating } from "$app/stores";

  import { books, authors, filteredBooks } from "../../store.js";
  import Menu from "$lib/components/Books/Menu/Menu.svelte";
  export let data;

  // Reactive update when data changes (e.g. after search/filter navigation)
  $: if (data.books) {
    updateStores(data);
  }

  function updateStores(data) {
    books.set(data.books);
    filteredBooks.set(data.books);
    // Initial sort logic can reside in store or here.
    // Keeping existing behavior for default sort:
    books.update((books) => {
      return books.sort((a, b) => {
        if (!a.read && b.read) return -1;
        if (a.reading && !b.reading) return -1;
        return 0;
      });
    });
    authors.set(data.authors);
  }
</script>

<div
  class="min-h-screen bg-slate-900 text-gray-100 flex flex-col relative overflow-hidden"
>
  <!-- Background Elements -->
  <div
    class="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-green-900/20 to-black pointer-events-none"
  ></div>

  <!-- Header & Controls -->
  <div class="p-6 relative z-10" in:fly={{ y: -20, duration: 600 }}>
    <Menu mode="books" filters={data.filters} />
  </div>

  <!-- Content Grid -->
  <div
    class="flex-1 p-6 z-10 overflow-y-auto"
    in:fade={{ duration: 600, delay: 200 }}
  >
    {#if $navigating}
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {#each Array(10) as _}
          <BookSkeleton />
        {/each}
      </div>
    {:else if $filteredBooks.length > 0}
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {#each $filteredBooks as book}
          <BookCard {book} />
        {/each}
      </div>
    {:else}
      <div
        class="flex flex-col items-center justify-center py-20 text-center text-gray-400"
        in:scale={{ duration: 400 }}
      >
        <span class="material-symbols-outlined text-6xl mb-4">menu_book</span>
        <h1 class="text-2xl text-white font-bold drop-shadow-md">
          Nessun libro trovato!
        </h1>
        <p class="mt-2 text-white/50">Prova a cercare qualcos'altro.</p>
      </div>
    {/if}
  </div>
</div>
