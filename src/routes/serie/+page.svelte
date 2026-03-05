<script>
  export let data;
  import { onMount } from "svelte";
  import { series, filteredSeries } from "../../store";
  import { invalidateAll } from "$app/navigation";
  import SerieCard from "$lib/components/Serie/SerieCard.svelte";
  import Menu from "$lib/components/Books/Menu/Menu.svelte";
  import { slide, fade, fly, scale } from "svelte/transition";

  // Sync data with store
  $: {
    if (data.series) {
      series.set(data.series);
      filteredSeries.set(data.series);
    }
  }

  // Bulk action state
  let selectionMode = false;
  let selectedIds = new Set();

  // Tabs for Anime vs TV Series
  let activeTab = "anime"; // 'anime' | 'tv'

  function handleToggle(event) {
    if (!selectionMode) return; // Only toggle if in selection mode
    const id = event.detail.id;
    if (selectedIds.has(id)) {
      selectedIds.delete(id);
    } else {
      selectedIds.add(id);
    }
    selectedIds = selectedIds; // Trigger reactivity
  }

  function toggleSelectionMode() {
    selectionMode = !selectionMode;
    selectedIds = new Set();
    if (!selectionMode) invalidateAll(); // Invalidate on exit if not in selection mode
  }

  async function bulkUpdate(newStatus) {
    if (selectedIds.size === 0) return;
    try {
      // NOTE: We'd need an endpoint for this, implementing client-side loop for now
      // Ideally create /api/serie/bulk-edit
      const updates = Array.from(selectedIds).map((id) =>
        fetch("/api/serie/edit", {
          method: "POST",
          body: JSON.stringify({ id, stato: newStatus }),
          headers: { "content-type": "application/json" },
        }),
      );
      await Promise.all(updates);
      toggleSelectionMode();
      invalidateAll();
    } catch (err) {
      console.error("Bulk update failed", err);
    }
  }

  async function bulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Sei sicuro di voler eliminare ${selectedIds.size} elementi?`))
      return;

    try {
      const res = await fetch("/api/serie/delete", {
        method: "POST",
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        toggleSelectionMode();
        invalidateAll();
      }
    } catch (err) {
      console.error("Bulk delete failed", err);
    }
  }

  // Filtering by Type logic (Anime vs TV)
  $: animeSeries = $filteredSeries.filter((s) => s.tipo === 1);
  $: tvSeries = $filteredSeries.filter((s) => s.tipo === 0 || s.tipo === null);
</script>

<div
  class="min-h-screen bg-slate-900 text-gray-100 flex flex-col relative overflow-hidden"
>
  <!-- Background Elements -->
  <div
    class="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-black pointer-events-none"
  ></div>

  <!-- Header & Controls -->
  <div class="p-6 relative z-10 space-y-6" in:fly={{ y: -20, duration: 600 }}>
    <Menu mode="series" />

    <!-- Type Tabs -->
    <div class="flex justify-center">
      <div class="tabs tabs-boxed bg-slate-800 p-1">
        <button
          class="tab tab-lg {activeTab === 'anime'
            ? 'tab-active !bg-green-500 !text-white'
            : ''}"
          on:click={() => (activeTab = "anime")}
        >
          Anime ⛩️
        </button>
        <button
          class="tab tab-lg {activeTab === 'tv'
            ? 'tab-active !bg-purple-500 !text-white'
            : ''}"
          on:click={() => (activeTab = "tv")}
        >
          Serie TV 📺
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <button
        class="btn btn-sm {selectionMode
          ? 'btn-warning'
          : 'btn-ghost text-white/50'}"
        on:click={toggleSelectionMode}
      >
        <span class="material-symbols-outlined">checklist</span>
        {selectionMode ? "Annulla Selezione" : "Seleziona Multipli"}
      </button>
    </div>
  </div>

  <!-- Content Grid -->
  <div
    class="flex-1 p-6 z-10 overflow-y-auto"
    in:fade={{ duration: 600, delay: 200 }}
  >
    {#if activeTab === "anime"}
      {#if animeSeries.length > 0}
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {#each animeSeries as s (s.id)}
            <SerieCard
              serie={s}
              {selectionMode}
              selected={selectedIds.has(s.id)}
              on:toggle={handleToggle}
            />
          {/each}
        </div>
      {:else}
        <div
          class="text-center py-20 text-gray-500"
          in:scale={{ duration: 400 }}
        >
          <span class="material-symbols-outlined text-6xl mb-4"
            >sentiment_dissatisfied</span
          >
          <p>Nessun anime trovato</p>
        </div>
      {/if}
    {:else if tvSeries.length > 0}
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {#each tvSeries as s (s.id)}
          <SerieCard
            serie={s}
            {selectionMode}
            selected={selectedIds.has(s.id)}
            on:toggle={handleToggle}
          />
        {/each}
      </div>
    {:else}
      <div class="text-center py-20 text-gray-500" in:scale={{ duration: 400 }}>
        <span class="material-symbols-outlined text-6xl mb-4">tv_off</span>
        <p>Nessuna serie TV trovata</p>
      </div>
    {/if}
  </div>

  <!-- Bulk Action Bar -->
  {#if selectionMode && selectedIds.size > 0}
    <div
      class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      transition:slide={{ axis: "y", duration: 300 }}
    >
      <div
        class="bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-white/10 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <span
            class="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
          >
            {selectedIds.size}
          </span>
          <span class="text-white font-medium">Selezionati</span>
        </div>

        <div class="flex gap-2">
          <button
            class="btn btn-sm btn-outline btn-success"
            on:click={() => bulkUpdate("completa")}>Completa ✅</button
          >
          <button
            class="btn btn-sm btn-outline btn-info"
            on:click={() => bulkUpdate("in_corso")}>In Corso 🏃</button
          >
          <button
            title="Marca come Da Iniziare"
            class="btn btn-sm btn-outline"
            on:click={() => bulkUpdate("da_iniziare")}>Da Iniziare 🕒</button
          >
          <button
            title="Elimina Selezionati"
            class="btn btn-sm btn-outline btn-error"
            on:click={bulkDelete}>Elimina 🗑️</button
          >
        </div>
      </div>
    </div>
  {/if}
</div>
