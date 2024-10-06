<script>
    export let author;
</script>

<div class="card card-compact bg-base-100 w-52 h-52 shadow-xl mt-5">
    <figure>
        <img
            class="object-cover aspect-square"
            src={author.pic}
            alt="author pic"
        />
    </figure>
    <div class="card-body flex justify-center items-center">
        <h2 class="text-lg">{author.name} {author.surname}</h2>
    </div>
</div>
