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
<button
  class="btn btn-success hover:bg w-32 hidden lg:block"
  on:click={toggleModal}
>
  Add more books
</button>

<!-- Modal for adding multiple books -->
{#if isOpen}
  <div class="modal modal-open backdrop-blur-sm">
    <div class="modal-box w-full max-w-6xl p-8 md:p-10">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        on:click={toggleModal}>✕</button
      >
      <h3 class="font-bold text-lg mb-4">Add Multiple Books</h3>

      <form on:submit|preventDefault={handleAddBooks}>
        {#each newBooks as book, index}
          <div class="mb-2 flex items-center gap-2 flex-wrap">
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
              class="input input-bordered w-28"
              min="0"
              max={new Date().getFullYear()}
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
            {#if index > 0}
              <button class="btn btn-error" on:click={() => removeRow(index)}
                ><span class="material-symbols-outlined"> delete </span></button
              >
            {:else}
              <button class="btn btn-error" disabled
                ><span class="material-symbols-outlined"> delete </span></button
              >
            {/if}
          </div>
        {/each}

        <!-- Add new row button -->
        <button
          class="btn btn-sm mb-4 w-full btn-outline"
          type="button"
          on:click={addNewRow}>Add Another Book</button
        >

        <!-- Submit button -->
        <button type="submit" class="btn btn-success w-full">Add Books</button>
      </form>
    </div>
  </div>
{/if}
