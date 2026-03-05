<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let data;

  let greeting = "";
  let name = "Andrea";

  onMount(() => {
    const hour = new Date().getHours();
    if (hour < 12 && hour >= 6) {
      greeting = "Buongiorno";
    } else if (hour < 18 && hour >= 12) {
      greeting = "Buon pomeriggio";
    } else if (hour < 22 && hour >= 18) {
      greeting = "Buona sera";
    } else {
      greeting = "Buonanotte";
    }
  });

  $: bookCount = data.bookStats?.count || 0;
  $: serieCount = data.serieStats?.count || 0;
  $: lastBook = data.bookStats?.lastAdded;
  $: lastSerie = data.serieStats?.lastAdded;
</script>

<div
  class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-0"
>
  <!-- Hero Section -->
  <div class="w-full max-w-5xl mb-12 text-center" in:fade={{ duration: 800 }}>
    <h1
      class="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] mb-4"
    >
      <span class="font-light block sm:inline">{greeting},</span>
      <span
        class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-400"
      >
        {name}.</span
      >
    </h1>
    <p class="text-xl text-gray-200 drop-shadow-md max-w-2xl mx-auto">
      Il mio archivio personale!
    </p>
  </div>

  <div
    class="w-full max-w-5xl grid grid-cols-2 gap-4 mb-12"
    in:fly={{ y: 20, duration: 800, delay: 200 }}
  >
    <div
      class="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 shadow-lg"
    >
      <span class="text-3xl font-bold text-white">{bookCount}</span>
      <span
        class="text-xs text-green-200 uppercase tracking-wider font-semibold"
        >Libri</span
      >
    </div>
    <div
      class="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 shadow-lg"
    >
      <span class="text-3xl font-bold text-white">{serieCount}</span>
      <span
        class="text-xs text-green-200 uppercase tracking-wider font-semibold"
        >Serie & Anime</span
      >
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-16">
    <a
      href="/books"
      class="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-white/10 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-900/20"
      in:fly={{ x: -20, duration: 800, delay: 400 }}
    >
      <div
        class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"
      ></div>
      <div
        class="absolute -right-12 -bottom-12 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] group-hover:bg-green-400/30 transition duration-500"
      ></div>

      <div class="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div
            class="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner"
          >
            <span class="material-symbols-outlined text-3xl text-green-300"
              >menu_book</span
            >
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Libri</h2>
          <p class="text-gray-300 mb-6 leading-relaxed">
            Esplora la tua libreria digitale. Gestisci letture, autori e scopri
            nuovi titoli.
          </p>
        </div>

        {#if lastBook}
          <div
            class="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/5 mx-[-0.5rem] mb-4 group-hover:bg-black/40 transition"
          >
            <p class="text-xs text-green-300 uppercase font-bold mb-1">
              Ultimo aggiunto
            </p>
            <p class="text-white font-medium truncate">{lastBook.title}</p>
          </div>
        {/if}

        <div class="flex items-center text-green-300 font-semibold transition">
          Sfoglia collezione <span
            class="material-symbols-outlined ml-2 text-xl">arrow_forward</span
          >
        </div>
      </div>
    </a>

    <a
      href="/serie"
      class="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-white/10 p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-900/20"
      in:fly={{ x: 20, duration: 800, delay: 400 }}
    >
      <div
        class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"
      ></div>
      <div
        class="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-400/30 transition duration-500"
      ></div>

      <div class="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div
            class="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner"
          >
            <span class="material-symbols-outlined text-3xl text-indigo-300"
              >live_tv</span
            >
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">Serie TV & Anime</h2>
          <p class="text-gray-300 mb-6 leading-relaxed">
            Il tuo catalogo di intrattenimento. Tieni traccia di episodi,
            stagioni e prossime uscite.
          </p>
        </div>

        {#if lastSerie}
          <div
            class="bg-black/30 rounded-xl p-4 backdrop-blur-sm border border-white/5 mx-[-0.5rem] mb-4 group-hover:bg-black/40 transition"
          >
            <p class="text-xs text-indigo-300 uppercase font-bold mb-1">
              Ultimo aggiunto
            </p>
            <p class="text-white font-medium truncate">{lastSerie.titolo}</p>
          </div>
        {/if}

        <div class="flex items-center text-indigo-300 font-semibold transition">
          Guarda catalogo <span class="material-symbols-outlined ml-2 text-xl"
            >arrow_forward</span
          >
        </div>
      </div>
    </a>
  </div>
</div>
