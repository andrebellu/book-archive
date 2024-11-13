<script>
    import { onMount } from "svelte";
    import { authors } from "../../../store.js";
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

    function getClassNames(book) {
        let baseClasses =
            "h-16 px-4 flex justify-between items-center content-between shadow-xl rounded-md gap-x-4 group hover:scale-110 transition-all duration-300 hover:shadow-2xl cursor-pointer";
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

<div class={`${getClassNames(book)}`} on:click={handleClick}>
    <figure class="w-6">
        <img src={book.cover} alt="cover" />
    </figure>
    <div class="flex gap-x-4 md:flex-row">
        <p class="font-bold">
            {book.title}
        </p>
        <div>
            <p class="truncate">{name} {surname}</p>
        </div>
    </div>
</div>
