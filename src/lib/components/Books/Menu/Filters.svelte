<script>
  import {
    books,
    filteredBooks,
    series,
    filteredSeries,
  } from "../../../../store.js";
  import { fade, fly } from "svelte/transition";
  export let mode = "books";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let filters = {}; // { genres: [], publishers: [] }

  let showFilters = false;

  // Read URL params for active state in Books mode
  $: active =
    mode === "books"
      ? {
          read: $page.url.searchParams.get("status") === "read",
          reading: $page.url.searchParams.get("status") === "reading",
          unread: $page.url.searchParams.get("status") === "unread",
        }
      : {
          read: false,
          reading: false,
          unread: false,
        };

  // Series active filters (local state)
  let activeSeries = {
    completa: false,
    "in corso": false,
    "da iniziare": false,
    droppata: false,
  };

  $: selectedGenre =
    mode === "books" ? $page.url.searchParams.get("genre") || "" : "";
  $: selectedPublisher =
    mode === "books" ? $page.url.searchParams.get("publisher") || "" : "";

  // Dynamic Genres based on mode
  $: genres =
    mode === "books"
      ? filters?.genres || []
      : Array.from(
          new Set(
            $series
              .map((s) => (s.genere || "").split(","))
              .flat()
              .map((g) => g.trim())
              .filter(Boolean),
          ),
        );

  $: publishers = mode === "books" ? filters?.publishers || [] : [];

  function handleStatusFilter(status) {
    if (mode === "books") {
      const url = new URL($page.url);
      // Toggle logic: if already active, remove it
      if (url.searchParams.get("status") === status) {
        url.searchParams.delete("status");
      } else {
        url.searchParams.set("status", status);
      }
      goto(url, { keepFocus: true, noScroll: true, replaceState: false });
    } else {
      active[status] = !active[status];
      Object.keys(active).forEach((k) => {
        if (k !== status) active[k] = false;
      });
      applyFilters();
    }
  }

  function handleSeriesStatusFilter(status) {
    activeSeries[status] = !activeSeries[status];
    Object.keys(activeSeries).forEach((k) => {
      if (k !== status) activeSeries[k] = false;
    });
    applyFilters();
  }

  function handleGenreFilter(e) {
    const val = e.target.value;
    if (mode === "books") {
      const url = new URL($page.url);
      if (val) url.searchParams.set("genre", val);
      else url.searchParams.delete("genre");
      goto(url, { keepFocus: true, noScroll: true, replaceState: false });
    } else {
      selectedGenre = val;
      applyFilters();
    }
  }

  function handlePublisherFilter(e) {
    const val = e.target.value;
    if (mode === "books") {
      const url = new URL($page.url);
      if (val) url.searchParams.set("publisher", val);
      else url.searchParams.delete("publisher");
      goto(url, { keepFocus: true, noScroll: true, replaceState: false });
    } else {
      selectedPublisher = val;
      applyFilters();
    }
  }

  function applyFilters() {
    // Series filtering only (Legacy)
    let filtered = $series;
    const status = Object.keys(activeSeries).find((k) => activeSeries[k]);
    if (status) {
      filtered = filtered.filter((s) => s.stato === status);
    }
    if (selectedGenre) {
      filtered = filtered.filter((s) =>
        (s.genere || "")
          .split(",")
          .map((g) => g.trim())
          .includes(selectedGenre),
      );
    }
    filteredSeries.set(filtered);
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
        {#if mode === "books"}
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
        {:else}
          <!-- Series Filters -->
          <button
            type="button"
            class={`btn btn-sm ${activeSeries.completa ? "btn-success" : "btn-outline"}`}
            on:click={() => handleSeriesStatusFilter("completa")}
            aria-pressed={activeSeries.completa}
          >
            <span class="material-symbols-outlined mr-1">check_circle</span> Completa
          </button>
          <button
            type="button"
            class={`btn btn-sm ${activeSeries["in corso"] ? "btn-info" : "btn-outline"}`}
            on:click={() => handleSeriesStatusFilter("in corso")}
            aria-pressed={activeSeries["in corso"]}
          >
            <span class="material-symbols-outlined mr-1">directions_run</span> In
            Corso
          </button>
          <button
            type="button"
            class={`btn btn-sm ${activeSeries["da iniziare"] ? "btn-warning" : "btn-outline"}`}
            on:click={() => handleSeriesStatusFilter("da iniziare")}
            aria-pressed={activeSeries["da iniziare"]}
          >
            <span class="material-symbols-outlined mr-1">schedule</span> Da Iniziare
          </button>
        {/if}

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

        {#if mode === "books"}
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
        {/if}
      </div>
    {/if}
  </div>
</div>
