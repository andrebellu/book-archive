<script>
  import { authors, filteredBooks, books } from "../../../../store";
  import { onMount } from "svelte";
  import Alert from "../Alert.svelte";
  import { v4 as uuidv4 } from "uuid";

  let search = "";
  let filteredAuthors = [];
  let selectedAuthor = null;
  let message;
  let success;
  let bookCover;

  function filter() {
    filteredAuthors = $authors.filter(
      (author) =>
        author.name.toLowerCase().includes(search.toLowerCase()) ||
        author.surname.toLowerCase().includes(search.toLowerCase())
    );
  }

  onMount(() => {
    filter();
  });

  function clearMessage() {
    message = null;
    success = null;
  }

  $: $authors, filter();

  function selectAuthor(author) {
    selectedAuthor = author;
    search = author.name;
    filteredAuthors = [];
  }

  async function addBook(e) {
    e.preventDefault();

    const id = uuidv4();
    const title = document.getElementById("title").value;
    const cover = document.getElementById("cover").value || "/questionmark.png";
    const description = document.getElementById("description").value;
    const author_id = selectedAuthor ? selectedAuthor.id : null;
    const genre = document
      .getElementById("genre")
      .value.split(",")
      .map((g) => g.trim());
    const reading_status = document.getElementById("reading_status").value;
    const shelf = document.getElementById("shelf").value;

    if (!author_id) {
      message = "Seleziona un autore valido.";
      success = false;
      return;
    }

    const newBook = {
      id,
      title,
      cover,
      short_description: description,
      reading_status,
      author_id,
      genre,
      shelf,
      is_borrowed: false,
      publisher: "",
      publication_date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("http://192.168.1.50:3006/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error(`Errore server: ${res.status}`);

      const savedBook = await res.json();

      $books.update((existing) => [...existing, savedBook]);

      message = "📚 Libro aggiunto con successo!";
      success = true;
      document.getElementById("addBookForm").reset();
      bookCover = null;

      my_modal_3.close();
    } catch (error) {
      console.error("Errore aggiunta libro:", error);
      message = "❌ Errore durante l'aggiunta del libro.";
      success = false;
    }
  }
</script>

<button
  class="btn text-lg btn-success hover:bg rounded-full"
  onclick="my_modal_3.showModal()"
>
  <span class="material-symbols-outlined"> add </span>
</button>

<dialog id="my_modal_3" class="modal backdrop-blur-sm">
  <div class="modal-box p-10">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <form id="addBookForm" on:submit={addBook}>
      <div class="first-section flex flex-row justify-between h-56 gap-x-4">
        <div class="preview">
          <img
            src={bookCover || "/questionmark.png"}
            alt="Book cover"
            class="rounded-lg h-56 object-cover aspect-square"
            on:error={() => (bookCover = null)}
          />
        </div>

        <div class="flex flex-col justify-between">
          <input
            type="text"
            id="title"
            class="input input-bordered w-full placeholder:text-center"
            placeholder="Book Title"
            required
          />

          <div class="relative">
            <input
              type="text"
              class="input input-bordered w-full placeholder:text-center"
              placeholder="Search Author"
              bind:value={search}
              on:input={filter}
              required
            />

            {#if search && filteredAuthors.length > 0}
              <ul
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full absolute z-10 max-h-40 overflow-y-auto"
              >
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                {#each filteredAuthors as author}
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <li
                    class="cursor-pointer hover:bg-base-200 p-2"
                    on:click={() => selectAuthor(author)}
                  >
                    {author.name}
                  </li>
                {/each}
              </ul>
            {/if}
          </div>

          <input
            type="text"
            id="cover"
            class="input input-bordered w-full placeholder:text-center"
            placeholder="Cover URL"
            bind:value={bookCover}
            required
          />
          <input
            type="text"
            id="genre"
            class="input input-bordered w-full placeholder:text-center"
            placeholder="Genre (comma-separated)"
            required
          />
        </div>
      </div>

      <div class="second-section gap-y-4 flex flex-col py-4">
        <input
          type="text"
          id="description"
          class="input input-bordered w-full placeholder:text-center"
          placeholder="Book Description"
        />

        <select class="select select-bordered" id="shelf">
          <option disabled selected>Select Shelf</option>
          <option value="read">Mobile Marrone</option>
          <option value="reading">Mobile Grigio</option>
        </select>

        <select class="select select-bordered" id="reading_status">
          <option disabled selected>Select Status</option>
          <option value="read">Read</option>
          <option value="reading">Reading</option>
          <option value="unread">Unread</option>
        </select>

        <button type="submit" class="btn btn-success w-full"> Add </button>
      </div>
    </form>
  </div>
</dialog>

<div class="z-10 absolute p-10 {message ? '' : 'hidden'}">
  <Alert {message} onClose={clearMessage} {success} />
</div>
