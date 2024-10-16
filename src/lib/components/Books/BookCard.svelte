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
            "card card-side bg-base-100 shadow-xl w-96 max-w-96 cursor-pointer group hover:scale-110 transition-all duration-300 hover:shadow-2xl";
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
        <figure>
            <img
                src={book.cover}
                alt="Book Cover"
                class="h-64 w-48 object-cover"
            />
        </figure>
        <div
            class="card-body flex flex-col text-center items-center justify-center"
        >
            <div class="font-bold w-32 group flex justify-center">
                {book.title}
            </div>
            <div class="text-sm text-gray-400">
                {name}
                {surname}
            </div>
            <div class="text-wrap line-clamp-3 w-32 text-gray-500">
                {book.description}
            </div>
        </div>
    </div>
</div>
