<script>
  import { onMount } from "svelte";
  import { authors } from "../../../store.js";
  import { goto } from "$app/navigation";

  export let book;
  let authorName = "";

  onMount(() => {
    const author = $authors.find((a) => a.id === book.author_id);
    if (author) authorName = `${author.name} ${author.surname ?? ""}`;
  });

  function handleClick() {
    goto(`/book/${book.id}`);
  }
</script>

<div
  class="flex items-center justify-between w-full p-3 bg-base-100 border-l-4 rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition"
  on:click={handleClick}
>
  <div class="flex items-center gap-3">
    <img src={book.cover} alt="cover" class="h-14 w-10 rounded shadow-md" />
    <div>
      <p class="font-semibold">{book.title}</p>
      <p class="text-sm text-gray-500">{authorName}</p>
    </div>
  </div>

  <div class="flex gap-2">
    <span
      class="badge badge-outline max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
      title={book.genre}
    >
      {book.genre}
    </span>

    {#if book.is_borrowed}<span class="badge badge-warning">Prestito</span>{/if}
  </div>
</div>
