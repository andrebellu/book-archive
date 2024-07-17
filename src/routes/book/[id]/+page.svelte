<script>
    import { authors } from "../../../store";
    export let data;
    let book = data.book[0];
    let author = data.author[0];
</script>

<body class="p-4 w-full">
    <div class="flex flex-row justify-start gap-x-4">
        <figure class="cover rounded-md w-max aspect-square">
            <img
                src={book.cover}
                alt="Book Cover"
                class="object-cover rounded-xl h-96"
            />
        </figure>
        <div class="w-full">
            <div class="title font-bold text-3xl">
                {book.title}
            </div>
            <div class="author">
                <span class="font-bold">Autore:</span>
                {author.name}
                {author.surname}
            </div>
            <div class="genre">
                <span class="font-bold">Genere:</span>
                {book.genre}
            </div>
            <div class="description">
                {book.description}
            </div>
        </div>
    </div></body
>
