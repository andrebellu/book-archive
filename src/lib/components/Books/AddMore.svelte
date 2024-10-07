<script>
  import { onMount } from "svelte";
  import { books, authors } from "../../../store";
  import { v4 as uuidv4 } from "uuid";

  let newBooks = [
    { id: uuidv4(), title: "", author_id: "", genre: "", year: "", cover: "" },
  ];
  let isOpen = false;

  function addNewRow() {
    newBooks = [
      ...newBooks,
      {
        id: uuidv4(),
        title: "",
        author_id: "",
        genre: "",
        year: "",
        cover: "",
      },
    ];
  }

  function removeRow(index) {
    newBooks = newBooks.filter((_, i) => i !== index);
  }

  function handleAddBooks() {
    books.update((b) => [...b, ...newBooks]);
    newBooks = [
      {
        id: uuidv4(),
        title: "",
        author_id: "",
        genre: "",
        year: "",
        cover: "",
      },
    ];
    isOpen = false;
  }

  function toggleModal() {
    isOpen = !isOpen;
  }
</script>

<!-- Button to open the modal -->
<button class="btn btn-success hover:bg w-32" on:click={toggleModal}>
  Add more books
</button>

<!-- Modal for adding multiple books -->
{#if isOpen}
  <div class="modal modal-open">
    <div class="modal-box modal-lg">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        on:click={toggleModal}>✕</button
      >
      <h3 class="font-bold text-lg mb-4">Add Multiple Books</h3>

      <form on:submit|preventDefault={handleAddBooks}>
        {#each newBooks as book, index}
          <div class="mb-2 flex items-center gap-2">
            <!-- Single line with flexbox for book inputs -->
            <input
              type="text"
              placeholder="Title"
              bind:value={book.title}
              class="input input-bordered w-1/5"
              required
            />

            <select
              class="select select-bordered w-1/5"
              bind:value={book.author_id}
              required
            >
              <option value="" disabled selected>Select Author</option>
              {#each $authors as author}
                <option value={author.id}>{author.name} {author.surname}</option
                >
              {/each}
            </select>

            <input
              type="text"
              placeholder="Genre"
              bind:value={book.genre}
              class="input input-bordered w-1/5"
              required
            />

            <input
              type="number"
              placeholder="Year"
              bind:value={book.year}
              class="input input-bordered w-1/5"
              required
            />

            <input
              type="text"
              placeholder="Cover URL"
              bind:value={book.cover}
              class="input input-bordered w-1/5"
              required
            />

            <!-- Remove button for each row -->

            <button class="btn btn-error" on:click={() => removeRow(index)}
              ><span class="material-symbols-outlined"> delete </span></button
            >
          </div>
        {/each}

        <!-- Add new row button -->
        <button
          class="btn btn-primary btn-sm mb-4 w-full"
          type="button"
          on:click={addNewRow}>Add Another Book</button
        >

        <!-- Submit button -->
        <button type="submit" class="btn btn-success w-full">Add Books</button>
      </form>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-box.modal-lg {
    max-width: 90%;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
  }
</style>
