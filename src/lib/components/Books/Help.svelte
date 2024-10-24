<button class="btn" onclick="help_modal.showModal()">
    <span class="material-symbols-outlined"> question_mark </span>
</button>
<dialog id="help_modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button
            >
        </form>
        <div class="split flex flex-row justify-evenly">
            <div class="split-1 flex flex-col justify-start">
                <h2 class="text-md font-bold">Book Legend</h2>
                <ul class="list-disc">
                    <li class="flex items-center">
                        <span
                            class="border-2 border-green-600 inline-block w-4 h-4 mr-2"
                        ></span>Read
                    </li>
                    <li class="flex items-center">
                        <span
                            class="border-2 border-purple-400 inline-block w-4 h-4 mr-2"
                        ></span>Reading
                    </li>
                    <li class="flex items-center">
                        <span
                            class="border-2 border-yellow-500 border-dashed inline-block w-4 h-4 mr-2"
                        ></span>Library
                    </li>
                    <li class="flex items-center">
                        <span
                            class="border-2 border-blue-400 inline-block w-4 h-4 mr-2"
                        ></span>Wishlist
                    </li>
                </ul>
            </div>
            <div class="split-2">
                <h2 class="text-md font-bold">Icon Legend</h2>
                <ul class="list-disc">
                    <li class="flex items-center">
                        <span
                            class="material-symbols-outlined inline-block w-4 h-4 mr-2"
                            >bookmarks</span
                        >Wishlist
                    </li>
                    <li class="flex items-center">
                        <span
                            class="material-symbols-outlined inline-block w-4 h-4 mr-2"
                            >library_books</span
                        >Library
                    </li>
                    <li class="flex items-center">
                        <span
                            class="material-symbols-outlined inline-block w-4 h-4 mr-2"
                            >done_all</span
                        >Read
                    </li>
                    <li class="flex items-center">
                        <span
                            class="material-symbols-outlined inline-block w-4 h-4 mr-2"
                            >menu_book</span
                        >Reading
                    </li>
                </ul>
            </div>
        </div>
    </div>
</dialog>
