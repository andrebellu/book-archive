<script>
  import { books, filteredBooks } from "../../../../store.js";
  import { fade, fly } from "svelte/transition";
  let showFilters = false;

  let active = {
    read: false,
    reading: false,
    unread: false,
  };

  let selectedGenre = "";
  let selectedPublisher = "";

  $: genres = Array.from(
    new Set(
      $books
        .map((b) => (b.genre || "").split(","))
        .flat()
        .map((g) => g.trim())
        .filter(Boolean)
    )
  );

  $: publishers = Array.from(
    new Set(
      $books
        .map((b) => (b.publisher || "").split(","))
        .flat()
        .map((p) => p.trim())
        .filter(Boolean)
    )
  );

  function handleStatusFilter(status) {
    active[status] = !active[status];
    Object.keys(active).forEach((k) => {
      if (k !== status) active[k] = false;
    });
    applyFilters();
  }

  function handleGenreFilter(e) {
    selectedGenre = e.target.value;
    applyFilters();
  }

  function handlePublisherFilter(e) {
    selectedPublisher = e.target.value;
    applyFilters();
  }

  function applyFilters() {
    let filtered = $books;
    const status = Object.keys(active).find((k) => active[k]);
    if (status) {
      filtered = filtered.filter((b) => b.reading_status === status);
    }
    if (selectedGenre) {
      filtered = filtered.filter((b) =>
        (b.genre || "")
          .split(",")
          .map((g) => g.trim())
          .includes(selectedGenre)
      );
    }
    if (selectedPublisher) {
      filtered = filtered.filter((b) =>
        (b.publisher || "")
          .split(",")
          .map((p) => p.trim())
          .includes(selectedPublisher)
      );
    }
    if (selectedPublisher) {
      filtered = filtered.filter((b) =>
        (b.publisher || "")
          .split(",")
          .map((p) => p.trim())
          .includes(selectedPublisher)
      );
    }

    filteredBooks.set(filtered);
  }
</script>

<div class="flex items-center relative">
  <button
    type="button"
    class={`btn btn-circle btn-outline ${showFilters ? "btn-active" : ""}`}
    aria-label="Mostra filtri"
    on:click={() => (showFilters = !showFilters)}
  >
    <span class="material-symbols-outlined">filter_alt</span>
  </button>
  <div
    class="overflow-hidden transition-all duration-200"
    style="max-width: {showFilters ? '1100px' : '0'};"
  >
    {#if showFilters}
      <div
        class="flex flex-row gap-x-3 items-center ml-2 px-2"
        transition:fly={{ x: -10, duration: 300 }}
      >
        <button
          type="button"
          class={`btn btn-sm ${active.read ? "btn-success" : "btn-outline"}`}
          on:click={() => handleStatusFilter("read")}
          aria-pressed={active.read}
        >
          <span class="material-symbols-outlined mr-1">done_all</span> Letti
        </button>
        <button
          type="button"
          class={`btn btn-sm ${active.reading ? "btn-info" : "btn-outline"}`}
          on:click={() => handleStatusFilter("reading")}
          aria-pressed={active.reading}
        >
          <span class="material-symbols-outlined mr-1">menu_book</span> In lettura
        </button>
        <button
          type="button"
          class={`btn btn-sm ${active.unread ? "btn-warning" : "btn-outline"}`}
          on:click={() => handleStatusFilter("unread")}
          aria-pressed={active.unread}
        >
          <span class="material-symbols-outlined mr-1">book</span> Da leggere
        </button>
        <select
          class="select select-sm"
          on:change={handleGenreFilter}
          bind:value={selectedGenre}
        >
          <option value="">Tutti i generi</option>
          {#each genres as genre}
            <option value={genre}>{genre}</option>
          {/each}
        </select>
        <select
          class="select select-sm"
          on:change={handlePublisherFilter}
          bind:value={selectedPublisher}
        >
          <option value="">Tutti gli editori</option>
          {#each publishers as publisher}
            <option value={publisher}>{publisher}</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>
</div>
