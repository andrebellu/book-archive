<script>
    import { onMount } from "svelte";
    import ArtistCard from "$lib/components/Artists/ArtistCard.svelte";
    import Add from "../../lib/components/Artists/Add.svelte";
    import { authors } from "../../store.js";
    export let data;

    onMount(() => {
        setVariables();
    });

    function setVariables() {
        authors.set(data.authors);
    }
</script>

<body class="">
    <div class="flex justify-center items-center flex-wrap gap-x-10 px-10">
        <Add />
        {#each $authors as author}
            <ArtistCard {author} />
        {/each}
    </div>
</body>
