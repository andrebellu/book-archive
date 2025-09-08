<script>
  export let book;
  import { onMount } from "svelte";
  import { authors } from "../../../store.js";

  let authorName = "";
  let modalId = `modal_${book.id}`;
  let showEdit = false;
  let editBook = {};
  let saving = false;
  let error = "";

  onMount(() => {
    const author = $authors.find((a) => a.id === book.author_id);
    if (author) authorName = `${author.name}`;
  });

  function openModal() {
    document.getElementById(modalId).showModal();
  }

  function getStatusClass(status) {
    switch (status) {
      case "read":
        return "border-4 border-green-400";
      case "reading":
        return "border-4 border-purple-400";
      case "unread":
      default:
        return "border-4 border-gray-300";
    }
  }

  async function updateBookField(field, value) {
    try {
      const res = await fetch(`/api/books/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: book.id, [field]: value }),
      });
      if (res.ok) {
        book = { ...book, [field]: value };
      }
    } catch (e) {
      console.error("Errore aggiornamento libro:", e);
    }
  }

  function openEditModal() {
    editBook = { ...book };
    error = "";
    showEdit = true;
  }

  async function saveEdit() {
    saving = true;
    error = "";
    try {
      const res = await fetch(`/api/books/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBook),
      });
      if (res.ok) {
        Object.assign(book, editBook);
        showEdit = false;
      } else {
        error = "Errore salvataggio";
      }
    } catch (e) {
      error = "Errore di rete";
    } finally {
      saving = false;
    }
  }
</script>

<button
  type="button"
  class={`w-64 h-96 rounded-3xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-[1.03] relative group backdrop-blur-[6px] ${getStatusClass(book.reading_status)}`}
  style="box-shadow: 0 8px 32px 0 rgba(31,38,135,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.08);"
  on:click={openModal}
>
  <div class="relative w-full h-96 flex flex-col justify-end">
    {#if book.cover}
      <img
        src={book.cover}
        alt={book.title}
        class="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500 blur-[1.5px] opacity-80"
      />
    {:else}
      <img
        src="https://placehold.co/800?text=No+Cover&font=roboto"
        alt="Default cover"
        class="absolute inset-0 w-full h-full object-cover blur-[1.5px] opacity-80"
      />
    {/if}
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"
    ></div>
    <div
      class="relative z-20 flex flex-col items-center justify-end h-full p-5 text-center"
    >
      <h2
        class="font-extrabold text-2xl md:text-3xl text-white drop-shadow-lg mb-1 w-full truncate tracking-tight"
        style="text-shadow:0 2px 16px #0008,0 1px 0 #fff2;"
      >
        {book.title}
      </h2>
      <p
        class="text-base text-gray-200 font-medium truncate drop-shadow mb-2 w-full tracking-wide"
        style="text-shadow:0 1px 8px #0006;"
      >
        {authorName}
      </p>
      <div class="flex flex-wrap gap-2 mb-3 justify-center w-full">
        {#if book.genre}
          <span
            class="px-2 py-1 rounded-full bg-white/30 text-xs font-semibold text-gray-900 shadow border border-white/40 backdrop-blur-[2px] truncate max-w-[100px]"
            >{book.genre}</span
          >
        {/if}

        {#if book.shelf}
          <span
            class="px-2 py-1 rounded-full bg-gradient-to-r from-green-200/60 to-green-400/40 text-xs font-semibold text-green-900 shadow border border-green-200/60 truncate max-w-[100px]"
            >{book.shelf}</span
          >
        {/if}

        {#if book.reading_status === "wishlist"}
          <span
            class="px-2 py-1 rounded-full bg-gradient-to-r from-green-100/60 to-green-400/40 text-xs font-semibold text-green-900 shadow border border-green-200/60"
            >Wishlist</span
          >
        {/if}
      </div>
      <p
        class="text-xs text-gray-100/90 line-clamp-2 drop-shadow w-full font-light"
        style="text-shadow:0 1px 8px #0006;"
      >
        {book.short_description}
      </p>
    </div>
    <div
      class="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-green-400/40 pointer-events-none transition duration-300"
    ></div>
  </div>
</button>

<dialog id={modalId} class="modal !z-1">
  <div
    class="modal-box max-w-3xl bg-gradient-to-br from-green-400/90 via-green-200/80 to-green-50/90 backdrop-blur-[8px] border-2 border-white/30 shadow-2xl rounded-3xl p-0 overflow-hidden relative premium-modal"
  >
    <div
      class="absolute inset-0 pointer-events-none z-0 rounded-3xl bg-gradient-to-br from-green-500/30 via-green-200/20 to-green-100/30 blur-[2px] opacity-80"
    ></div>
    <div class="flex flex-col gap-0 relative z-10">
      <div class="flex flex-row gap-6 p-8 pb-2 items-start">
        <img
          src={book.cover}
          alt="Cover"
          class="w-44 h-64 object-cover rounded-2xl shadow-xl border-4 border-white/40 bg-white/10 backdrop-blur-[2px] mt-0 mb-2"
          style="flex-shrink:0;align-self:flex-start;"
        />
        <div class="flex-1 flex flex-col gap-2 justify-center">
          <h3
            class="text-3xl font-extrabold text-gray-900 drop-shadow mb-1 tracking-tight"
          >
            {book.title}
          </h3>
          <p class="text-lg text-gray-700 font-medium mb-2">{authorName}</p>
          {#if book.genre}
            <div class="mb-2">
              <span class="text-sm font-semibold text-gray-900">Genere:</span>
              <span class="ml-2 text-base text-gray-800/90 font-light"
                >{book.genre}</span
              >
            </div>
          {/if}
          {#if book.shelf}
            <div class="mb-2">
              <span class="text-sm font-semibold text-gray-900">Scaffale:</span>
              <span class="ml-2 text-base text-green-900/90 font-light"
                >{book.shelf}</span
              >
            </div>
          {/if}
          <div class="mb-2">
            <span class="text-sm font-semibold text-gray-900">Editore:</span>
            <span class="ml-2 text-base text-gray-800/90 font-light"
              >{book.publisher}</span
            >
          </div>
        </div>
      </div>
      <div class="px-8 pb-2">
        <p class="text-base text-gray-900/90 font-light mt-2">
          {book.short_description}
        </p>
      </div>
      <div class="px-8 pb-4">
        <div class="flex flex-row gap-2 mt-4 items-center">
          <div class="flex gap-2 items-center">
            <label
              for="status-select-{book.id}"
              class="text-sm font-bold text-gray-900">Stato:</label
            >
            <select
              id="status-select-{book.id}"
              class="select select-bordered select-sm"
              bind:value={book.reading_status}
              on:change={(e) =>
                updateBookField("reading_status", e.target.value)}
            >
              <option value="unread">Non letto</option>
              <option value="reading">In lettura</option>
              <option value="read">Letto</option>
            </select>
          </div>
          <div class="flex gap-2 items-center">
            <button
              class={`btn btn-warning btn-sm`}
              on:click={() => updateBookField("is_borrowed", !book.is_borrowed)}
            >
              {book.is_borrowed ? "Restituito" : "Segna come Prestato"}
            </button>
          </div>
        </div>
      </div>
      <div
        class="modal-action flex gap-2 bg-white/10 rounded-b-3xl p-4 mt-0 z-10 relative"
      >
        <button type="button" class="btn btn-primary" on:click={openEditModal}>
          <span class="material-symbols-outlined align-middle">edit</span> Modifica
        </button>
        <form method="dialog">
          <button class="btn">Chiudi</button>
        </form>
      </div>
    </div>
    <div
      class="absolute -inset-1 rounded-3xl pointer-events-none z-20 bg-gradient-to-br from-green-300/40 via-green-200/20 to-green-100/30 blur-[6px] opacity-60"
    ></div>
    <div
      class="absolute -inset-2 rounded-3xl pointer-events-none z-0 shadow-[0_8px_32px_0_rgba(31,38,135,0.18)]"
    ></div>
  </div>
</dialog>

{#if showEdit}
  <div class="fixed inset-0 !z-[9999] flex items-center justify-center">
    <div
      class="absolute inset-0 bg-black bg-opacity-50"
      on:click={() => (showEdit = false)}
      tabindex="0"
      aria-label="Chiudi modifica"
    ></div>
    <div class="modal-box max-w-2xl z-[1010] bg-base-100 shadow-xl">
      <h3 class="font-bold text-lg mb-4">Modifica libro</h3>
      <div class="flex flex-col md:flex-row gap-4">
        <img
          src={editBook.cover}
          alt="Cover"
          class="w-40 h-60 object-cover rounded-md shadow-md"
        />
        <div class="flex-1 flex flex-col gap-2">
          <input
            class="input input-bordered"
            type="text"
            bind:value={editBook.title}
            placeholder="Titolo"
          />
          <input
            class="input input-bordered"
            type="text"
            bind:value={editBook.cover}
            placeholder="URL Copertina"
          />
          <input
            class="input input-bordered"
            type="text"
            bind:value={editBook.publisher}
            placeholder="Editore"
          />
          <input
            class="input input-bordered"
            type="text"
            bind:value={editBook.genre}
            placeholder="Genere"
          />
          <input
            class="input input-bordered"
            type="text"
            bind:value={editBook.shelf}
            placeholder="Scaffale"
          />
          <textarea
            class="textarea textarea-bordered"
            bind:value={editBook.short_description}
            placeholder="Descrizione"
          ></textarea>
          <select
            class="select select-bordered"
            bind:value={editBook.reading_status}
          >
            <option value="unread">Non letto</option>
            <option value="reading">In lettura</option>
            <option value="read">Letto</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>
      </div>
      {#if error}
        <div class="text-error mt-2">{error}</div>
      {/if}
      <div class="modal-action mt-4 flex gap-2">
        <button
          class="btn btn-success"
          on:click={saveEdit}
          disabled={saving}
          type="button">Salva</button
        >
        <button class="btn" type="button" on:click={() => (showEdit = false)}
          >Annulla</button
        >
      </div>
    </div>
  </div>
{/if}
