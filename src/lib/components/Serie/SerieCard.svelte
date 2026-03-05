<script>
  export let serie;
  export let selectionMode = false;
  export let selected = false;

  import { createEventDispatcher } from "svelte";
  import { invalidateAll } from "$app/navigation";

  const dispatch = createEventDispatcher();

  let modalId = `modal_serie_${serie.id}`;

  let localStagione = serie.stagione_corrente || 1;
  let localEpisodio = serie.episodio_corrente || 1;
  let localStato = serie.stato || "in corso";
  let localVoto = serie.voto_personale;
  let localCover = serie.cover;
  let localTotaleStagioni = serie.stagioni || serie.totale_stagioni || 1;
  let localTipo = serie.tipo; // 0: TV, 1: Anime

  // Search state
  let showSearch = false;
  let searchQuery = serie.titolo || "";
  let searchResults = [];
  let isSearching = false;

  async function searchCover() {
    if (!searchQuery) return;
    isSearching = true;
    try {
      const res = await fetch(`/api/tmdb/search?q=${searchQuery}`);
      const data = await res.json();
      searchResults = data.results || [];
    } catch (e) {
      console.error("Search failed", e);
    } finally {
      isSearching = false;
    }
  }

  function selectCover(url) {
    if (!url) return;
    localCover = url;
    showSearch = false;
  }

  function handleClick() {
    if (selectionMode) {
      dispatch("toggle", { id: serie.id });
    } else {
      openModal();
    }
  }

  function openModal() {
    localStagione = serie.stagione_corrente || 1;
    localEpisodio = serie.episodio_corrente || 1;
    localStato = serie.stato || "in corso";
    localVoto = serie.voto_personale;
    localCover = serie.cover;
    localTotaleStagioni = serie.stagioni || serie.totale_stagioni || 1;
    localTipo = serie.tipo;

    showSearch = false;
    searchResults = [];
    searchQuery = serie.titolo || "";

    document.getElementById(modalId).showModal();
  }

  function changeProgress(type, amount) {
    if (type === "stagione") {
      localStagione = Math.max(1, localStagione + amount);
      if (amount > 0) localEpisodio = 1;
    } else {
      localEpisodio = Math.max(1, localEpisodio + amount);
    }
  }

  async function saveChanges() {
    try {
      const res = await fetch("/api/serie/edit", {
        method: "POST",
        body: JSON.stringify({
          id: serie.id,
          stagione_corrente: localStagione,
          episodio_corrente: localEpisodio,
          stato: localStato,
          voto_personale: localVoto,
          cover: localCover,
          stagioni: localTotaleStagioni,
          tipo: localTipo,
        }),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        document.getElementById(modalId).close();
        invalidateAll();
      }
    } catch (e) {
      console.error("Failed to save", e);
    }
  }

  async function deleteSerie() {
    if (
      !confirm(
        "Sei sicuro di voler eliminare questa serie? L'azione è irreversibile.",
      )
    )
      return;

    try {
      const res = await fetch("/api/serie/delete", {
        method: "POST",
        body: JSON.stringify({ ids: [serie.id] }),
        headers: { "content-type": "application/json" },
      });

      if (res.ok) {
        document.getElementById(modalId).close();
        invalidateAll();
      }
    } catch (e) {
      console.error("Failed to delete", e);
    }
  }

  function getStatusClass(status) {
    switch (status) {
      case "completa":
        return "border-4 border-green-400";
      case "in corso":
        return "border-4 border-purple-400";
      case "droppata":
        return "border-4 border-red-500/50";
      default:
        return "border-4 border-gray-300/30";
    }
  }
</script>

<button
  type="button"
  class={`w-full max-w-xs h-[28rem] rounded-3xl overflow-hidden cursor-pointer transform transition duration-300 relative group backdrop-blur-[6px] ${getStatusClass(serie.stato)} ${selected ? "ring-4 ring-offset-4 ring-offset-slate-900 ring-green-400 scale-[0.95]" : "hover:scale-[1.03]"}`}
  style="box-shadow: 0 8px 32px 0 rgba(31,38,135,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.08);"
  on:click={handleClick}
>
  <!-- Selection Overlay -->
  {#if selectionMode}
    <div
      class="absolute inset-0 z-50 bg-black/20 flex items-center justify-center transition-all duration-300 {selected
        ? 'bg-green-500/20'
        : ''}"
    >
      {#if selected}
        <div
          class="bg-green-500 text-white rounded-full p-2 shadow-lg scale-110"
        >
          <span class="material-symbols-outlined text-4xl font-bold">check</span
          >
        </div>
      {:else}
        <div
          class="bg-white/20 text-white rounded-full p-4 border-2 border-white/50 hover:bg-white/40"
        >
          <span class="material-symbols-outlined text-2xl"
            >check_box_outline_blank</span
          >
        </div>
      {/if}
    </div>
  {/if}
  <div class="relative w-full h-full flex flex-col justify-end">
    {#if serie.cover}
      <img
        src={serie.cover}
        alt={serie.title}
        class="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500 blur-[0.5px] opacity-90"
      />
    {:else}
      <img
        src="https://placehold.co/800?text=No+Cover&font=roboto"
        alt="Default cover"
        class="absolute inset-0 w-full h-full object-cover blur-[1.5px] opacity-80"
      />
    {/if}
    <div
      class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"
    ></div>

    <!-- Status Badge (Top Right) -->
    {#if serie.stato}
      <div
        class="absolute top-3 right-3 z-30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg
        {serie.stato === 'completa'
          ? 'bg-green-500 text-white'
          : serie.stato === 'in corso'
            ? 'bg-purple-500 text-white'
            : serie.stato === 'droppata'
              ? 'bg-red-500 text-white'
              : 'bg-gray-500 text-white'}"
      >
        {serie.stato}
      </div>
    {/if}

    <div
      class="relative z-20 flex flex-col items-center justify-end h-full p-5 text-center"
    >
      <h2
        class="font-extrabold text-2xl text-white drop-shadow-lg mb-1 w-full truncate tracking-tight"
        style="text-shadow:0 2px 16px #0008,0 1px 0 #fff2;"
      >
        {serie.titolo}
      </h2>

      <!-- Progress Section -->
      <div class="w-full flex flex-col items-center mt-2 mb-3">
        <div
          class="flex items-center gap-2 text-white/90 font-semibold text-sm mb-1 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10"
        >
          <span>S{serie.stagione_corrente || 1}</span>
          <span class="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>E{serie.episodio_corrente || 1}</span>
        </div>
        {#if serie.stagioni || serie.totale_stagioni}
          <div class="text-xs text-white/60">
            su {serie.totale_stagioni || serie.stagioni || 1} Stagioni
          </div>
        {/if}
      </div>

      {#if serie.voto_personale}
        <div class="flex items-center justify-center gap-1 mb-2">
          {#each Array(5) as _, i}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={i < serie.voto_personale ? "#facc15" : "#e5e7eb"}
              class="w-4 h-4 drop-shadow"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"
              />
            </svg>
          {/each}
        </div>
      {/if}
    </div>
    <div
      class="absolute inset-0 rounded-3xl border-2 border-white/10 group-hover:border-green-400/40 pointer-events-none transition duration-300"
    ></div>
  </div>
</button>

<!-- Edit Modal -->
<dialog id={modalId} class="modal backdrop-blur-sm">
  <div
    class="modal-box bg-slate-900 border border-white/10 shadow-2xl p-0 overflow-hidden text-gray-100 max-w-lg"
  >
    <!-- Header with Cover -->
    <div class="relative h-48 w-full group/header">
      <img
        src={localCover || "https://placehold.co/800?text=Header"}
        alt="Cover"
        class="w-full h-full object-cover opacity-60 transition-opacity duration-300"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"
      ></div>

      <!-- Close Button -->
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white z-20 bg-black/20 hover:bg-black/40"
        on:click={() => document.getElementById(modalId).close()}>✕</button
      >

      <!-- Edit Cover Button -->
      <button
        class="absolute top-2 left-2 z-20 btn btn-sm btn-ghost bg-black/20 text-white hover:bg-black/40 opacity-0 group-hover/header:opacity-100 transition-opacity"
        on:click={() => (showSearch = !showSearch)}
      >
        <span class="material-symbols-outlined text-lg">image_search</span>
        {showSearch ? "Chiudi Ricerca" : "Cambia Cover"}
      </button>

      <h3
        class="font-bold text-3xl absolute bottom-4 left-6 text-white drop-shadow-md z-10"
      >
        {serie.titolo}
      </h3>
    </div>

    <!-- Body -->
    <div class="p-6 space-y-6">
      <!-- Cover Search UI -->
      {#if showSearch}
        <div
          class="bg-base-200 p-4 rounded-xl border border-white/5 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div class="flex gap-2">
            <input
              type="text"
              class="input input-sm input-bordered w-full bg-slate-800"
              placeholder="Cerca cover..."
              bind:value={searchQuery}
              on:keydown={(e) => e.key === "Enter" && searchCover()}
            />
            <button
              class="btn btn-sm btn-primary"
              on:click={searchCover}
              disabled={isSearching}
            >
              {#if isSearching}
                <span class="loading loading-spinner loading-xs"></span>
              {:else}
                Cerca
              {/if}
            </button>
          </div>

          {#if searchResults.length > 0}
            <div class="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
              {#each searchResults as result}
                <button
                  class="relative aspect-[2/3] w-full overflow-hidden rounded-md border-2 border-transparent hover:border-green-400 focus:border-green-400 transition-all group/poster"
                  on:click={() => selectCover(result.poster_path)}
                >
                  {#if result.poster_path}
                    <img
                      src={result.poster_path}
                      alt={result.title}
                      class="w-full h-full object-cover"
                    />
                  {:else}
                    <div
                      class="w-full h-full bg-slate-700 flex items-center justify-center text-xs text-center p-1"
                    >
                      No Img
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          {:else if isSearching}
            <div class="text-center py-4 text-sm text-gray-400">
              Ricerca in corso...
            </div>
          {/if}
        </div>
      {/if}

      <!-- Progress Control -->
      <div class="bg-white/5 rounded-xl p-4 border border-white/5">
        <h4
          class="text-sm uppercase tracking-wider text-green-400 font-bold mb-4 flex justify-between items-center"
        >
          <span>Progresso Visione</span>
          <span class="text-xs text-gray-500 normal-case"
            >Su {localTotaleStagioni} stagioni</span
          >
        </h4>

        <div class="flex items-center justify-between mb-4">
          <span class="text-lg font-medium">Stagione</span>
          <div class="flex items-center gap-3">
            <button
              class="btn btn-sm btn-square btn-outline btn-success"
              on:click={() => changeProgress("stagione", -1)}>-</button
            >
            <span class="text-xl font-bold w-8 text-center"
              >{localStagione}</span
            >
            <button
              class="btn btn-sm btn-square btn-outline btn-success"
              on:click={() => changeProgress("stagione", 1)}>+</button
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-lg font-medium">Episodio</span>
          <div class="flex items-center gap-3">
            <button
              class="btn btn-sm btn-square btn-outline btn-success"
              on:click={() => changeProgress("episodio", -1)}>-</button
            >
            <span class="text-xl font-bold w-8 text-center"
              >{localEpisodio}</span
            >
            <button
              class="btn btn-sm btn-square btn-outline btn-success"
              on:click={() => changeProgress("episodio", 1)}>+</button
            >
          </div>
        </div>
      </div>

      <!-- Total Seasons & Status -->
      <div class="grid grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label" for="stagioni-{serie.id}"
            ><span class="label-text text-gray-400">Totale Stagioni</span
            ></label
          >
          <input
            id="stagioni-{serie.id}"
            type="number"
            class="input input-bordered input-sm w-full bg-slate-800"
            bind:value={localTotaleStagioni}
            min="1"
          />
        </div>

        <div class="form-control">
          <label class="label" for="tipo-{serie.id}"
            ><span class="label-text text-gray-400">Tipo</span></label
          >
          <select
            id="tipo-{serie.id}"
            class="select select-bordered select-sm w-full bg-slate-800"
            bind:value={localTipo}
          >
            <option value={0}>Serie TV 📺</option>
            <option value={1}>Anime ⛩️</option>
          </select>
        </div>

        <div class="form-control col-span-2">
          <label class="label" for="stato-{serie.id}"
            ><span class="label-text text-gray-400">Stato</span></label
          >
          <select
            id="stato-{serie.id}"
            class="select select-bordered select-sm w-full bg-slate-800"
            bind:value={localStato}
          >
            <option value="in corso">In Corso 🏃</option>
            <option value="completa">Completa ✅</option>
            <option value="da iniziare">Da Iniziare 🕒</option>
            <option value="droppata">Droppata ❌</option>
          </select>
        </div>
      </div>

      <!-- Rating check -->
      <div class="form-control">
        <label class="label" for="voto-{serie.id}"
          ><span class="label-text text-gray-400">Voto</span></label
        >
        <select
          id="voto-{serie.id}"
          class="select select-bordered select-sm w-full bg-slate-800"
          bind:value={localVoto}
        >
          <option value={null}>-</option>
          <option value={1}>1 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={5}>5 ⭐</option>
        </select>
      </div>

      <div class="flex gap-2">
        <button class="btn btn-error btn-outline flex-1" on:click={deleteSerie}>
          Elimina
        </button>
        <button
          class="btn btn-success flex-[2] font-bold text-white shadow-lg shadow-green-900/20"
          on:click={saveChanges}
        >
          Salva Modifiche
        </button>
      </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
