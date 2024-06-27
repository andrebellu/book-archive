import { writable } from "svelte/store";

export let authors = writable([]);
export let books = writable([]);