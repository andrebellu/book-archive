<script>
    import { authors, filteredBooks } from "../../../store";
    import { onMount } from "svelte";
    import Alert from "./Alert.svelte";
    import { v4 as uuidv4 } from "uuid";
    import { books } from "../../../store";

    let search = "";
    let filteredAuthors = [];
    let selectedAuthor = null;
    let message;
    let success;
    let readCheckbox;
    let readingCheckbox;
    let bookCover;

    function filter() {
        filteredAuthors = $authors.filter(
            (author) =>
                author.name.toLowerCase().includes(search.toLowerCase()) ||
                author.surname.toLowerCase().includes(search.toLowerCase())
        );
    }

    onMount(() => {
        filter();
    });

    $: $authors, filter();

    async function addBook(e) {
        e.preventDefault();

        const id = uuidv4();
        const title = document.getElementById("title").value;
        const cover = document.getElementById("cover").value;
        const description = document.getElementById("description").value;
        const author_id = selectedAuthor ? selectedAuthor.id : null;
        const genre = document
            .getElementById("genre")
            .value.split(",")
            .map((g) => g.trim());
        const status = document.getElementById("status").value;

        if (!author_id) {
            message = "Please select a valid author.";
            success = false;
            return;
        }

        const data = {
            id,
            title,
            cover,
            description,
            status,
            author_id,
            genre,
        };

        console.log("Adding book:", data);

        filteredBooks.update((b) => [...b, data]);

        try {
            const res = await fetch("/api/books/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                document.getElementById("addBookForm").reset();
                message = "Book added successfully!";
                success = true;
            } else {
                console.error("Error adding book:", result);
                message =
                    result.error || "An error occurred while adding the book.";
                success = false;
            }

            console.log("Book added:", result);
            my_modal_3.close();
        } catch (error) {
            console.error("Error adding book:", error);
            message = "An error occurred while adding the book.";
            success = false;
        }
    }

    function clearMessage() {
        message = null;
    }

    function selectAuthor(author) {
        selectedAuthor = author;
        search = `${author.name} ${author.surname}`;
        filteredAuthors = [];
    }

    $: bookCover;
</script>

<button class="btn btn-success hover:bg w-32" onclick="my_modal_3.showModal()">
    Add a book
</button>

<dialog id="my_modal_3" class="modal backdrop-blur-sm">
    <div class="modal-box p-10">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <form id="addBookForm" on:submit={addBook}>
            <div
                class="first-section flex flex-row justify-between h-56 gap-x-4"
            >
                <div class="preview">
                    <img
                        src={bookCover ||
                            "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Book cover"
                        class="rounded-lg h-56 object-cover aspect-square"
                        on:error={() => (bookCover = null)}
                    />
                </div>

                <div class="flex flex-col justify-between">
                    <input
                        type="text"
                        id="title"
                        class="input input-bordered w-full placeholder:text-center"
                        placeholder="Book Title"
                        required
                    />

                    <div class="relative">
                        <input
                            type="text"
                            class="input input-bordered w-full placeholder:text-center"
                            placeholder="Search Author"
                            bind:value={search}
                            on:input={filter}
                            required
                        />

                        <!-- Author dropdown menu -->
                        {#if search && filteredAuthors.length > 0}
                            <ul
                                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full absolute z-10 max-h-40 overflow-y-auto"
                            >
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                {#each filteredAuthors as author}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <li
                                        class="cursor-pointer hover:bg-base-200 p-2"
                                        on:click={() => selectAuthor(author)}
                                    >
                                        {author.name}
                                        {author.surname}
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>

                    <input
                        type="text"
                        id="cover"
                        class="input input-bordered w-full placeholder:text-center"
                        placeholder="Cover URL"
                        bind:value={bookCover}
                        required
                    />
                    <input
                        type="text"
                        id="genre"
                        class="input input-bordered w-full placeholder:text-center"
                        placeholder="Genre (comma-separated)"
                        required
                    />
                </div>
            </div>

            <div class="second-section gap-y-4 flex flex-col py-4">
                <input
                    type="text"
                    id="description"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Book Description"
                />

                <select class="select select-bordered" id="status">
                    <option disabled selected>Select Status</option>
                    <option value="read">Read</option>
                    <option value="reading">Reading</option>
                    <option value="wishlist">Wishlist</option>
                    <option value="lib">In Library</option>
                </select>

                <button type="submit" class="btn btn-success w-full">
                    Add
                </button>
            </div>
        </form>
    </div>
</dialog>

<div class="z-10 absolute p-10 {message ? '' : 'hidden'}">
    <Alert {message} onClose={clearMessage} {success} />
</div>
