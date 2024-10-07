<script>
  import { onMount } from "svelte";
  import ArtistCard from "../../lib/components/ArtistCard.svelte";
  // import { authors } from "../../store.js";
  export let data;

  let authors = data.authors;
</script>

<body>
  {@debug authors}
  {#each authors as author}
    {#if author.name != "Unknown"}
      <ArtistCard {author} />
    {/if}
  {/each}
</body>
