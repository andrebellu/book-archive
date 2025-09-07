<script>
  export let book;
  import { onMount } from "svelte";
  import { authors } from "../../../store.js";

  let authorName = "";

  let modalId = `modal_${book.id}`;

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
        return "border-green-500 bg-green-50";
      case "reading":
        return "border-purple-400 bg-purple-50";
      case "wishlist":
        return "border-blue-400 bg-blue-50";
      case "lib":
        return "border-yellow-400 bg-yellow-50";
      default:
        return "border-gray-300 bg-white";
    }
  }
</script>

<button
  type="button"
  class={`w-60 shadow-lg rounded-xl border-2 ${getStatusClass(book.reading_status)} overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl text-left p-0`}
  on:click={openModal}
>
  <div class="relative w-full h-80">
    {#if book.cover}
      <img src={book.cover} alt={book.title} class="h-80 w-full object-cover" />
    {:else}
      <img
        src="https://placehold.co/800?text=No+Cover&font=roboto"
        alt="Default cover"
        class="h-80 w-full object-cover"
      />
    {/if}
    <div
      class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 text-center"
    >
      <h2
        class="font-bold text-xl md:text-2xl text-white drop-shadow mb-2 w-full truncate overflow-hidden whitespace-nowrap"
      >
        {book.title}
      </h2>
      <p class="text-base text-gray-200 truncate drop-shadow mb-3 w-full">
        {authorName}
      </p>
      <div class="flex flex-wrap gap-1 mb-3 justify-center w-full">
        <span
          class="badge badge-outline w-32 flex items-center bg-white bg-opacity-20 text-white border-white border-opacity-30 justify-center"
          title={book.genre}
        >
          <span class="overflow-hidden text-ellipsis whitespace-nowrap">
            {book.genre}
          </span>
        </span>
        {#if book.shelf}
          <span
            class="badge badge-secondary bg-white bg-opacity-20 text-white border-white border-opacity-30 justify-center"
            >{book.shelf}</span
          >
        {/if}
        {#if book.is_borrowed}
          <span
            class="badge badge-warning bg-white bg-opacity-20 text-white border-white border-opacity-30 justify-center"
            >In prestito</span
          >
        {/if}
      </div>
      <p class="text-sm text-gray-200 line-clamp-3 drop-shadow w-full">
        {book.short_description}
      </p>
    </div>
  </div>
</button>

<dialog id={modalId} class="modal">
  <div class="modal-box max-w-3xl">
    <div class="flex flex-col md:flex-row gap-4">
      <img
        src={book.cover}
        alt="Cover"
        class="w-40 h-60 object-cover rounded-md shadow-md"
      />

      <div class="flex-1">
        <h3 class="text-xl font-bold">{book.title}</h3>
        <p class="">{authorName}</p>
        <p class="text-sm mt-2"><strong>Genere:</strong> {book.genre}</p>
        <p class="text-sm"><strong>Editore:</strong> {book.publisher}</p>
        <p class="text-sm">
          <strong>Pubblicazione:</strong>
          {book.publication_date}
        </p>
        <p class="text-sm"><strong>Scaffale:</strong> {book.shelf}</p>
        <p class="text-sm mt-2">{book.short_description}</p>

        <div class="flex gap-2 mt-4">
          <button
            class={`btn btn-sm ${
              book.reading_status === "read"
                ? "btn-success btn-outline"
                : "btn-success"
            }`}
          >
            {book.reading_status === "read"
              ? "Segna come Non Letto"
              : "Segna come Letto"}
          </button>
          <button class="btn btn-warning btn-sm">
            {book.is_borrowed ? "Restituito" : "Segna come Prestato"}
          </button>
        </div>
      </div>
    </div>

    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Chiudi</button>
      </form>
    </div>
  </div>
</dialog>
