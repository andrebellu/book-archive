<script>
  import Search from "./Search.svelte";
  import Add from "./Add.svelte";
  import Filters from "./Filters.svelte";
  import Help from "./Help.svelte";
  import { list, filteredBooks, filteredSeries } from "../../../../store";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let mode = "books"; // 'books' | 'series'
  export let filters = {};

  let sortAsc = true;
  function toggleSort() {
    sortAsc = !sortAsc;
    const url = new URL($page.url);
    if (mode === "books") {
      url.searchParams.set("sort", sortAsc ? "title_asc" : "title_desc");
      goto(url, { keepFocus: true, noScroll: true, replaceState: false });
    } else {
      // Legacy client-side sort for series
      filteredSeries.update((arr) =>
        [...arr].sort((a, b) =>
          sortAsc
            ? (a.titolo || "").localeCompare(b.titolo || "")
            : (b.titolo || "").localeCompare(a.titolo || ""),
        ),
      );
    }
  }

  async function handleList() {
    list.update((value) => !value);
  }
</script>

<div
  class="flex flex-row justify-between items-center gap-4 flex-wrap p-4 rounded-2xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10 relative z-10 w-full"
>
  <div class="flex flex-row gap-3 items-center">
    <!-- Navigation Switch -->
    <div class="flex bg-black/20 rounded-lg p-1 mr-2 border border-white/5">
      <a
        href="/books"
        class="px-3 py-1 rounded-md text-sm font-semibold transition-colors {mode ===
        'books'
          ? 'bg-white/20 text-white shadow-sm'
          : 'text-white/50 hover:text-white hover:bg-white/5'}"
      >
        Libri
      </a>
      <a
        href="/serie"
        class="px-3 py-1 rounded-md text-sm font-semibold transition-colors {mode ===
        'series'
          ? 'bg-white/20 text-white shadow-sm'
          : 'text-white/50 hover:text-white hover:bg-white/5'}"
      >
        Serie
      </a>
    </div>

    <Search {mode} />
    <Filters {mode} {filters} />
    <button
      class="btn btn-circle btn-ghost text-white hover:bg-white/20"
      aria-label={sortAsc ? "Ordina A-Z" : "Ordina Z-A"}
      on:click={toggleSort}
      title={sortAsc ? "Ordina A-Z" : "Ordina Z-A"}
    >
      <span class="material-symbols-outlined"> sort_by_alpha </span>
    </button>
  </div>
  <div class="flex flex-row items-center">
    {#if mode === "books"}
      <Add />
    {:else}
      <!-- Series Add Button -->
      <a
        href="/serie/add"
        class="btn btn-circle btn-success flex items-center justify-center"
      >
        <span class="material-symbols-outlined">add</span>
      </a>
    {/if}
  </div>
</div>
