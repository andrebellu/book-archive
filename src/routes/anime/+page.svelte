<script>
  let tab = "anime";
</script>

<div class="max-w-4xl mx-auto mt-8">
  <div class="flex gap-2 mb-6">
    <button
      class="px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2"
      class:border-b-green-500={tab === "anime"}
      class:text-green-700={tab === "anime"}
      class:text-gray-500={tab !== "anime"}
      on:click={() => (tab = "anime")}
    >
      Anime
    </button>
    <button
      class="px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition border-b-2"
      class:border-b-green-500={tab === "serie"}
      class:text-green-700={tab === "serie"}
      class:text-gray-500={tab !== "serie"}
      on:click={() => (tab = "serie")}
    >
      Serie TV
    </button>
  </div>

  {#if tab === "anime"}
    <div class="bg-white/80 rounded-2xl shadow p-6 min-h-[200px]">
      <h2 class="text-2xl font-bold mb-2 text-green-700">Anime</h2>
      <p class="text-gray-700">
        Qui potrai aggiungere e gestire la tua lista di anime preferiti.
      </p>
      <!-- TODO: lista anime -->
    </div>
  {:else}
    <div class="bg-white/80 rounded-2xl shadow p-6 min-h-[200px]">
      <h2 class="text-2xl font-bold mb-2 text-green-700">Serie TV</h2>
      <p class="text-gray-700">
        Qui potrai aggiungere e gestire la tua lista di serie TV preferite.
      </p>
      <!-- TODO: lista serie TV -->
    </div>
  {/if}
</div>
