<script>
    import { goto } from "$app/navigation";
</script>

<button
    class="card card-compact w-52 h-52 shadow-xl bg-success flex flex-col justify-center items-center
    hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-110 mt-5"
    on:click={() => {
        goto("/artists/new");
    }}
>
    <div class="text-6xl font-bold">+</div>
</button>
