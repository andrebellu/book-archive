<script>
    import { onMount } from "svelte";
    import BookCard from "$lib/components/BookCard.svelte";
    import Add from "$lib/components/Add.svelte";
    import { books, authors } from "../../store.js";
    import Filter from "../../lib/components/Filter.svelte";
    import BookCardList from "../../lib/components/BookCardList.svelte";
    export let data;

    let list = false;

    onMount(() => {
        setVariables();
    });

    function setVariables() {
        books.set(data.books);
        authors.set(data.authors);
    }

    async function handleList() {
        list = !list;
    }
</script>

<body class="flex flex-col items-center no-scroll">
    <div class="flex flex-row-reverse items-center gap-4 p-10">
        <Filter />
        <button class="btn btn-gray hover:bg w-32" on:click={handleList}>
            {list ? "Grid" : "List"}
        </button>
        <Add />
    </div>

    {#if list}
        <div class="grid grid-cols-4 px-10 gap-8">
            {#each $books as book}
                <BookCardList {book} />
            {/each}
        </div>
    {:else}
        <div class="flex justify-center items-center flex-wrap gap-10 px-10">
            {#each $books as book}
                <BookCard {book} />
            {/each}
        </div>
    {/if}
</body>
