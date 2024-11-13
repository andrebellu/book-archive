<script>
    import { onMount } from "svelte";
    import { books, filteredBooks } from "../../store.js";

    function handleSearch(e) {
        let searchedBooks = [];

        searchedBooks = $books.filter((book) =>
            book.title.toLowerCase().includes(e.target.value.toLowerCase())
        );

        filteredBooks.set(searchedBooks);
    }

    onMount(() => {
        function handleKeydown(e) {
            const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
            if (
                (isMac && e.metaKey && e.key === "k") ||
                (!isMac && e.ctrlKey && e.key === "k")
            ) {
                e.preventDefault();
                openModal();
            }
        }

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    });

    function openModal() {
        document.getElementById("my_modal_2").showModal();
    }
</script>

<button class="btn" onclick="my_modal_2.showModal()">
    <span class="material-symbols-outlined"> search </span>
</button>
<dialog id="my_modal_2" class="modal modal-bottom sm:modal-middle">
    <div
        class="modal-box flex flex-row items-center content-center p-4 gap-x-2 glass bg-opacity-75"
    >
        <span class="material-symbols-outlined text-gray-300"> search </span>
        <input
            type="text"
            class="w-full h-full focus:outline-none bg-transparent"
            on:input={handleSearch}
            placeholder="Search for a book"
        />
        <!-- <form method="dialog">
            <button
                class="hover:scale-125 ease-in-out duration-150 text-gray-300"
            >
                X</button
            >
        </form> -->
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
