<script>
    import { books, filteredBooks } from "../../../store.js";

    let active = {
        wishlist: false,
        library: false,
        read: false,
        pizza: false,
    };

    function handleFilter(e) {
        let event = e.target.className;

        if (event === "material-symbols-outlined") {
            event = e.target.parentElement.className;
        }

        handleActive(event);

        const filterMap = {
            wishlist: "wishlist",
            library: "lib",
            read: "read",
            pizza: "pizza",
        };

        let selectedBooks = $books;

        for (const [key, status] of Object.entries(filterMap)) {
            if (event.includes(key) && !event.includes("active")) {
                selectedBooks = $books.filter((book) => book.status === status);
                break;
            }
        }

        filteredBooks.update(() => selectedBooks);
    }

    function handleActive(event) {
        for (let key in active) {
            if (event.includes(key)) {
                active[key] = !active[key];
            } else {
                active[key] = false;
            }
        }
    }
</script>

<div class="join">
    <button
        type="button"
        class={`wishlist filter ${active.wishlist ? "active" : ""}`}
        on:click={handleFilter}
        aria-pressed={active.wishlist}
    >
        <span class="material-symbols-outlined"> bookmarks </span>
    </button>

    <button
        type="button"
        class={`library filter ${active.library ? "active" : ""}`}
        on:click={handleFilter}
        aria-pressed={active.library}
    >
        <span class="material-symbols-outlined"> library_books </span>
    </button>

    <button
        type="button"
        class={`read filter ${active.read ? "active" : ""}`}
        on:click={handleFilter}
        aria-pressed={active.read}
    >
        <span class="material-symbols-outlined"> done_all </span>
    </button>

    <button
        type="button"
        class={`pizza filter ${active.pizza ? "active" : ""}`}
        on:click={handleFilter}
        aria-pressed={active.reading}
    >
        <span class="material-symbols-outlined"> menu_book </span>
    </button>
</div>
