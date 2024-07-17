<script>
    import { onMount } from "svelte";
    import { authors } from "../../store.js";
    import { goto } from "$app/navigation";

    export let book;

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
        console.log(book.id);
        goto(`/book/${book.id}`);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
    class={`h-16 px-4 flex justify-between items-center content-between shadow-xl rounded-md gap-x-4 group hover:scale-110 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
        book.read ? "border-2 border-green-500" : ""
    }`}
    on:click={handleClick}
>
    <figure class="w-6">
        <img src={book.cover} alt="cover" />
    </figure>
    <p class="font-bold md:hidden lg:flex">
        {book.title}
    </p>
    <div class="md:hidden lg:flex lg:flex-row">
        <p class="truncate">{name} {surname}</p>
    </div>
</div>
