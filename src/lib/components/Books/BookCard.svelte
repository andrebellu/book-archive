<script>
  export let book;
  import { onMount } from "svelte";
  import { authors } from "../../../store.js";
  import { goto } from "$app/navigation";
  let name = "";
  let surname = "";

  onMount(() => {
    const author = $authors.find((author) => author.id === book.author_id);
    if (author) {
      name = author.name;
      surname = author.surname;
    }
  });

  function handleClick() {
    goto(`/book/${book.id}`);
  }

  function getClassNames(book) {
    let baseClasses =
      "card card-side bg-base-100 shadow-xl w-48 max-w-48 cursor-pointer group hover:scale-110 transition-all duration-300 hover:shadow-2xl";
    let statusClass = "";

    switch (book.status) {
      case "read":
        statusClass = "border-2 border-green-600";
        break;
      case "reading":
        statusClass = "border-2 border-purple-400";
        break;
      case "lib":
        statusClass = "border-2 border-yellow-500 border-dashed";
        break;
      case "wishlist":
        statusClass = "border-2 border-blue-400";
        break;
      default:
        statusClass = "";
    }

    return `${baseClasses} ${statusClass}`;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="tooltip tooltip-bottom" data-tip={book.description}>
  <div class={getClassNames(book)} on:click={handleClick}>
    <figure class="relative w-full rounded-md">
      <img
        src={book.cover}
        alt="Book Cover"
        class="h-64 w-full object-cover rounded-xl"
      />
      <div class="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
      <div
        class="absolute inset-0 flex flex-col justify-center text-left text-white p-4"
      >
        <div class="font-bold text-lg mb-2 font-aby">
          {book.title}
        </div>
        <div class="text-sm text-gray-300 mb-2">
          {name}
          {surname}
        </div>
        <div class="text-sm text-gray-400 line-clamp-3">
          {book.description}
        </div>
      </div>
    </figure>
  </div>
</div>
