<script>
  import Search from "./Search.svelte";
  import Add from "./Add.svelte";
  import Filters from "./Filters.svelte";
  import Help from "./Help.svelte";
  import { list, filteredBooks } from "../../../../store";

  let sortAsc = true;
  function toggleSort() {
    sortAsc = !sortAsc;
    filteredBooks.update((arr) =>
      [...arr].sort((a, b) =>
        sortAsc
          ? (a.title || "").localeCompare(b.title || "")
          : (b.title || "").localeCompare(a.title || "")
      )
    );
  }

  async function handleList() {
    list.update((value) => !value);
  }
</script>

<div
  class="flex flex-row justify-between items-center gap-4 flex-wrap p-4 rounded-lg shadow-md bg-white relative z-10 w-full"
>
  <div class="flex flex-row gap-3 items-center">
    <Search />
    <Help />
    <Filters />
    <button
      class="btn btn-circle btn-outline"
      aria-label={sortAsc ? "Ordina A-Z" : "Ordina Z-A"}
      on:click={toggleSort}
      title={sortAsc ? "Ordina A-Z" : "Ordina Z-A"}
    >
      <span class="material-symbols-outlined"> sort_by_alpha </span>
    </button>
    <!--
    <button class="btn btn-outline" on:click={handleList}>
      <span class="material-symbols-outlined">
        {list ? "grid_view" : "list"}
      </span>
    </button>
    -->
  </div>
  <div class="flex flex-row items-center">
    <Add />
  </div>
</div>
