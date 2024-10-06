<script>
    import { books, filteredBooks } from "../../store.js";

    function handleSearch(e) {
        filteredBooks.update((books) => {
            return books.filter((book) =>
                book.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
        });
    }
</script>

<button class="btn" onclick="my_modal_2.showModal()">
    <span class="material-symbols-outlined"> search </span>
</button>
<dialog id="my_modal_2" class="modal">
    <div
        class="modal-box flex flex-row items-center content-center p-4 gap-x-2 glass bg-opacity-75"
    >
        <span class="material-symbols-outlined text-gray-300"> search </span>
        <input
            type="text"
            class="w-full h-full focus:outline-none bg-transparent"
            on:input={handleSearch}
        />
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
