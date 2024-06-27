<script>
  import { authors } from "../../store";
  import { onMount } from "svelte";

  let search = "";
  let filteredAuthors = [];

  function filter() {
    filteredAuthors = $authors.filter(
      (author) =>
        author.name.toLowerCase().includes(search.toLowerCase()) ||
        author.surname.toLowerCase().includes(search.toLowerCase())
    );
  }

  function handleAdd(event) {
    event.preventDefault();
    const form = event.target;
    const [title, cover, description, author_id, genre] = form.elements;

    const newBook = {
      title: title.value,
      cover: cover.value,
      description: description.value,
      author_id: author_id.value,
      genre: genre.value,
    };

    console.error(newBook);
  }

  onMount(() => {
    filter();
  });

  $: $authors, filter();
</script>

<div class="p-10">
  <button
    class="btn btn-success hover:bg w-32"
    onclick="my_modal_3.showModal()"
  >
    Add book
  </button>
</div>

<dialog id="my_modal_3" class="modal">
  <div class="modal-box p-10">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <form method="dialog">
      <div class="gap-y-4 flex flex-col">
        <input
          type="text"
          class="input input-bordered w-full placeholder:text-center"
          placeholder="Book Title"
        />

        <input
          type="text"
          class="input input-bordered w-full placeholder:text-center"
          placeholder="Cover URL"
        />

        <input
          type="text"
          class="input input-bordered w-full placeholder:text-center"
          placeholder="Book Description"
        />

        <div class="dropdown w-full">
          <select class="select w-full select-bordered">
            <option
              value=""
              disabled
              selected
              class="
                  cursor-pointer
                  hover:bg-base-200
                  p-2
                  rounded-md
                  text-center"
            >
              Select an author
            </option>
            {#each filteredAuthors as author}
              <option
                class="menu-title
                  cursor-pointer
                  hover:bg-base-200
                  p-2
                  rounded-md
                  text-center"
                value={author.id}
              >
                {author.name}
                {author.surname}
              </option>
            {/each}
          </select>

          <input
            type="text"
            class="input input-bordered w-full placeholder:text-center"
            placeholder="Genre"
          />

          <div
            class="text-center opacity-30 p-2 flex items-center justify-center"
          >
            <span class="material-symbols-outlined"> lightbulb </span>
            tip: write on your keyboard to filter authors
          </div>
        </div>

        <button class="btn btn-success w-full" on:submit={handleAdd}>
          Add
        </button>
      </div>
    </form>
  </div>
</dialog>
