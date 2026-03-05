<script>
    import { onMount } from "svelte";
    import Menu from "$lib/components/Books/Menu/Menu.svelte";
    import { goto } from "$app/navigation";

    let title = "";
    let cover = "";
    let genre = "";
    let startYear = "";
    let endYear = "";
    let rating = 0;
    let type = 0; // 0: TV, 1: Anime
    let seasons = 0;
    let status = "in corso"; // 'in corso', 'completa', 'droppata', 'da iniziare'
    let tmdbId = null;

    let searchQuery = "";
    let searchResults = [];
    let isSearching = false;
    let showDropdown = false;
    let searchTimeout;

    // Debounce search
    function handleSearchInput() {
        clearTimeout(searchTimeout);
        if (searchQuery.length < 3) {
            searchResults = [];
            showDropdown = false;
            return;
        }
        searchTimeout = setTimeout(searchTMDB, 500);
    }

    async function searchTMDB() {
        isSearching = true;
        try {
            const res = await fetch(`/api/tmdb/search?q=${searchQuery}`);
            const data = await res.json();
            searchResults = data.results || [];
            showDropdown = true;
        } catch (err) {
            console.error("Search failed", err);
        } finally {
            isSearching = false;
        }
    }

    function selectResult(result) {
        title = result.title;
        cover = result.poster_path;
        startYear = result.release_date
            ? result.release_date.split("-")[0]
            : "";
        tmdbId = result.id;
        // Guess type if possible, otherwise default to TV
        if (result.original_language === "ja") {
            type = 1; // Anime
        } else {
            type = 0; // TV Series
        }

        // Clear search
        searchQuery = "";
        searchResults = [];
        showDropdown = false;
    }

    async function handleSubmit() {
        const payload = {
            titolo: title,
            cover,
            genere: genre,
            anno_inizio: startYear,
            anno_fine: endYear,
            voto_personale: rating,
            tipo: type,
            stagioni: seasons,
            stato: status,
            id_tmdb: tmdbId,
        };

        try {
            const res = await fetch("/api/serie/add", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                goto("/serie");
            } else {
                alert("Errore durante il salvataggio");
            }
        } catch (err) {
            console.error(err);
            alert("Errore di connessione");
        }
    }
</script>

<div
    class="min-h-screen flex flex-col items-center justify-start relative overflow-hidden bg-gradient-to-br from-green-900 to-black"
>
    <div
        class="w-full max-w-2xl p-8 flex flex-col gap-6 z-10 bg-white/10 rounded-3xl shadow-2xl backdrop-blur-md mt-10 mb-10 border border-white/20"
    >
        <Menu />

        <h2 class="text-3xl font-bold text-white text-center mb-4">
            Aggiungi Nuova Serie
        </h2>

        <!-- Search Section -->
        <div class="relative">
            <label class="block text-green-300 text-sm font-bold mb-2"
                >Cerca su TMDB (Auto-compilazione)</label
            >
            <input
                type="text"
                bind:value={searchQuery}
                on:input={handleSearchInput}
                placeholder="Digita il titolo..."
                class="w-full p-3 rounded-lg bg-black/50 text-white border border-green-500/50 focus:border-green-400 focus:outline-none"
            />

            {#if showDropdown && searchResults.length > 0}
                <div
                    class="absolute z-50 w-full bg-gray-900 border border-gray-700 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl"
                >
                    {#each searchResults as result}
                        <button
                            class="w-full text-left p-3 hover:bg-green-900/50 flex items-center gap-3 border-b border-gray-800 last:border-0"
                            on:click={() => selectResult(result)}
                        >
                            {#if result.poster_path}
                                <img
                                    src={result.poster_path}
                                    alt={result.title}
                                    class="w-10 h-14 object-cover rounded"
                                />
                            {:else}
                                <div
                                    class="w-10 h-14 bg-gray-700 rounded flex items-center justify-center text-xs"
                                >
                                    No Img
                                </div>
                            {/if}
                            <div>
                                <div class="font-bold text-white">
                                    {result.title}
                                </div>
                                <div class="text-xs text-gray-400">
                                    {result.release_date?.split("-")[0]} • {result.media_type ===
                                    "movie"
                                        ? "Film"
                                        : "TV"}
                                </div>
                            </div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <hr class="border-gray-600/50 my-2" />

        <!-- Form Section -->
        <form
            on:submit|preventDefault={handleSubmit}
            class="flex flex-col gap-4"
        >
            <div>
                <label class="block text-green-200 text-sm font-bold mb-1"
                    >Titolo*</label
                >
                <input
                    type="text"
                    bind:value={title}
                    required
                    class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-green-200 text-sm font-bold mb-1"
                        >Tipo</label
                    >
                    <select
                        bind:value={type}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value={0}>Serie TV</option>
                        <option value={1}>Anime</option>
                    </select>
                </div>
                <div>
                    <label class="block text-green-200 text-sm font-bold mb-1"
                        >Stato</label
                    >
                    <select
                        bind:value={status}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="in corso">In Corso</option>
                        <option value="completa">Completa</option>
                        <option value="droppata">Droppata</option>
                        <option value="da iniziare">Da Iniziare</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-green-200 text-sm font-bold mb-1"
                        >Stagioni</label
                    >
                    <input
                        type="number"
                        bind:value={seasons}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label class="block text-green-200 text-sm font-bold mb-1"
                        >Voto (0-5)</label
                    >
                    <input
                        type="number"
                        max="5"
                        min="0"
                        bind:value={rating}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-green-200 text-sm font-bold mb-1"
                        >Anno Inizio</label
                    >
                    <input
                        type="text"
                        bind:value={startYear}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div>
                    <label class="block text-green-200 text-sm font-bold mb-1"
                        >Anno Fine</label
                    >
                    <input
                        type="text"
                        bind:value={endYear}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            <div>
                <label class="block text-green-200 text-sm font-bold mb-1"
                    >Genere</label
                >
                <input
                    type="text"
                    bind:value={genre}
                    class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div>
                <label class="block text-green-200 text-sm font-bold mb-1"
                    >Cover URL</label
                >
                <div class="flex gap-2">
                    <input
                        type="text"
                        bind:value={cover}
                        class="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {#if cover}
                        <img
                            src={cover}
                            alt="Preview"
                            class="h-10 w-10 object-cover rounded border border-white/50"
                        />
                    {/if}
                </div>
            </div>

            <button
                type="submit"
                class="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform hover:scale-105"
            >
                Salva Serie
            </button>
        </form>
    </div>
</div>
