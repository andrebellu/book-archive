<script>
    import { books, filteredBooks } from "../../../store.js";

    function handleFilter(e) {
        let selectedBooks = [];
        let event = e.target.className;

        if (event === "material-symbols-outlined") {
            event = e.target.parentElement.className;
        }

        switch (event) {
            case "wishlist filter":
                selectedBooks = $books.filter(
                    (book) => book.status === "wishlist"
                );
                break;
            case "library filter":
                selectedBooks = $books.filter((book) => book.status === "lib");
                break;
            case "read filter":
                selectedBooks = $books.filter((book) => book.status === "read");
                break;
            case "reading filter":
                selectedBooks = $books.filter(
                    (book) => book.status === "reading"
                );
                break;
            default:
                filteredBooks.update((b) => $books);
        }

        filteredBooks.update((b) => selectedBooks);
    }
</script>

<div class="join">
    <div class="wishlist filter" on:click={handleFilter}>
        <span class="material-symbols-outlined"> bookmarks </span>
    </div>

    <div class="library filter" on:click={handleFilter}>
        <span class="material-symbols-outlined"> library_books </span>
    </div>

    <div class="read filter" on:click={handleFilter}>
        <span class="material-symbols-outlined"> done_all </span>
    </div>

    <div class="reading filter" on:click={handleFilter}>
        <span class="material-symbols-outlined"> menu_book </span>
    </div>
</div>
