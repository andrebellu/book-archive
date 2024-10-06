<script>
    import { authors } from "../../store";
    import { onMount } from "svelte";
    import Alert from "./Alert.svelte";
    import { fade } from "svelte/transition";
    import { v4 as uuidv4 } from "uuid";
    import { books } from "../../store";

    let search = "";
    let filteredAuthors = [];
    let message;
    let success;
    let readCheckbox;
    let readingCheckbox;

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
        const author_id = document.getElementById("author").value;
        const genre = document
            .getElementById("genre")
            .value.split(",")
            .map((g) => g.trim());
        const read = document.getElementById("read").checked;
        const reading = document.getElementById("reading").checked;

        const data = {
            id,
            title,
            cover,
            description,
            read,
            reading,
            author_id,
            genre,
        };

        $books = [
            ...$books,
            {
                id,
                title,
                cover,
                description,
                read,
                reading,
                author_id,
                genre,
            },
        ];
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

    function handleReadChange() {
        if (readCheckbox.checked) {
            readingCheckbox.checked = false;
        }
    }

    function handleReadingChange() {
        if (readingCheckbox.checked) {
            readCheckbox.checked = false;
        }
    }
</script>

<button class="btn btn-success hover:bg w-32" onclick="my_modal_3.showModal()">
    Add book
</button>

<dialog id="my_modal_3" class="modal">
    <div class="modal-box p-10">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <form id="addBookForm" on:submit={addBook}>
            <div class="gap-y-4 flex flex-col">
                <input
                    type="text"
                    id="title"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Book Title"
                    required
                />

                <input
                    type="text"
                    id="cover"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Cover URL"
                    required
                />

                <input
                    type="text"
                    id="description"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Book Description"
                    required
                />

                <div class="dropdown w-full">
                    <select
                        id="author"
                        class="select w-full select-bordered"
                        required
                    >
                        <option
                            value=""
                            disabled
                            selected
                            class="
                  cursor-pointer
                  hover:bg-base-200
                  p-2
                  rounded-md
                  text-center"
                        >
                            Select an author
                        </option>
                        {#each filteredAuthors as author}
                            <option
                                class="menu-title
                  cursor-pointer
                  hover:bg-base-200
                  p-2
                  rounded-md
                  text-center"
                                value={author.id}
                            >
                                {author.name}
                                {author.surname}
                            </option>
                        {/each}
                    </select>
                </div>

                <input
                    type="text"
                    id="genre"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Genre (comma-separated)"
                    required
                />

                <div class="flex items-center content-center !w-full">
                    <label for="read" class="label">Read</label>
                    <input
                        id="read"
                        bind:this={readCheckbox}
                        type="checkbox"
                        class="checkbox"
                        on:change={handleReadChange}
                    />
                </div>

                <div class="flex items-center content-center !w-full">
                    <label for="reading" class="label">Reading</label>
                    <input
                        id="reading"
                        bind:this={readingCheckbox}
                        type="checkbox"
                        class="checkbox"
                        on:change={handleReadingChange}
                    />
                </div>

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
