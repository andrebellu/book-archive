<script>
    import { authors } from "../../store";
    import { onMount } from "svelte";
    import Alert from "./Alert.svelte";
    import { fade } from "svelte/transition";

    let search = "";
    let filteredAuthors = [];
    let message;
    let success;

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

        const form = e.target;
        const title = form.elements[0].value;
        const cover = form.elements[1].value;
        const description = form.elements[2].value;
        const author_id = form.elements[3].value;
        const genre = form.elements[4].value;
        const read = form.elements[5].checked;

        const data = {
            title,
            cover,
            description,
            author_id,
            genre,
            read,
            created_at: new Date().toISOString(),
        };

        const res = await fetch("/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (res.status === 200) {
            form.reset();
            message = "Book added successfully!";
            success = true;
        } else {
            console.error("Error adding book:", result);
            message = result.error;
            success = false;
        }

        console.log("Book added:", result);
        my_modal_3.close();
    }

    function clearMessage() {
        message = null;
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
        <form on:submit={addBook}>
            <div class="gap-y-4 flex flex-col">
                <input
                    type="text"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Book Title"
                />

                <input
                    type="text"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Cover URL"
                />

                <input
                    type="text"
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Book Description"
                />

                <div class="dropdown w-full">
                    <select class="select w-full select-bordered">
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
                    class="input input-bordered w-full placeholder:text-center"
                    placeholder="Genre"
                />

                <div class="flex items-center content-center !w-full">
                    <label for="read" class="label">Read</label>
                    <input type="checkbox" checked="checked" class="checkbox" />
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
