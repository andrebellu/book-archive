<script>
  import { onMount } from "svelte";

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
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
  <div class="mb-10 mt-8 text-center">
    <h1
      class="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]"
    >
      <span class="font-light">{greeting},</span>
      <span class="font-bold text-green-200"> {name}.</span>
    </h1>
    <p
      class="mt-2 text-lg text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
    >
      Benvenuto nel tuo archivio personale di libri e serie TV!
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
    <a
      href="/books"
      class="group block rounded-3xl bg-green-900/80 shadow-2xl hover:shadow-2xl border-2 border-green-400/60 hover:border-green-200/80 transition-all p-8 text-center relative overflow-hidden backdrop-blur-md"
    >
      <span
        class="material-symbols-outlined text-6xl text-green-200 mb-2 group-hover:scale-110 transition"
        >menu_book</span
      >
      <h2 class="text-2xl font-bold text-white mb-1 drop-shadow">Libri</h2>
      <p class="text-gray-100 mb-2 drop-shadow">
        Gestisci la tua collezione di libri, aggiungi, modifica e consulta le
        tue letture.
      </p>
      <span
        class="inline-block mt-2 text-green-200 font-semibold group-hover:underline"
        >Vai ai libri →</span
      >
    </a>

    <a
      href="/anime"
      class="group block rounded-3xl bg-green-900/80 shadow-2xl hover:shadow-2xl border-2 border-green-400/60 hover:border-green-200/80 transition-all p-8 text-center relative overflow-hidden backdrop-blur-md"
    >
      <span
        class="material-symbols-outlined text-6xl text-green-200 mb-2 group-hover:scale-110 transition"
        >live_tv</span
      >
      <h2 class="text-2xl font-bold text-white mb-1 drop-shadow">
        Serie TV & Anime
      </h2>
      <p class="text-gray-100 mb-2 drop-shadow">
        Crea e consulta la tua lista di serie TV e anime preferiti, con le
        stesse funzionalità dei libri.
      </p>
      <span
        class="inline-block mt-2 text-green-200 font-semibold group-hover:underline"
        >Vai a serie TV & anime →</span
      >
    </a>
  </div>

  <footer class="mt-16 text-gray-400 text-xs text-center opacity-70">
    <span>Book & Series Archive • {new Date().getFullYear()}</span>
  </footer>
</div>
