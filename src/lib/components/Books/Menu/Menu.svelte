<script>
  import Search from "./Search.svelte";
  import Add from "./Add.svelte";
  import Help from "./Help.svelte";
  import Filters from "./Filters.svelte";
  import { list } from "../../../../store";

  async function handleList() {
    list.update((value) => !value);
  }
</script>

<div
  class="flex justify-between items-center gap-3 flex-wrap p-4 rounded-lg shadow-md bg-white"
>
  <div class="flex gap-3 items-center">
    <Search />
    <Filters />
  </div>
  <!-- <div class="flex gap-2">
    <button class="btn btn-outline" on:click={handleList}>
      <span class="material-symbols-outlined"
        >{list ? "grid_view" : "list"}</span
      >
    </button> -->
  <Add />
  <!-- </div> -->
</div>
