import { writable } from "svelte/store";

export let authors = writable([]);
export let books = writable([]);
export let filteredBooks = writable([]);

export let list = writable();