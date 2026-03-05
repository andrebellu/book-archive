<script>
  import { onMount, tick } from "svelte";
  import {
    books,
    filteredBooks,
    series,
    filteredSeries,
  } from "../../../../store";
  import { fade } from "svelte/transition";

  export let mode = "books"; // 'books' | 'series'

  let overlayString = "";
  let overlayVisible = false;
  let overlayTimeout;
  let searchTimeout;

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^\w\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function fuzzyMatch(title, query) {
    const normTitle = normalize(title);
    const normQuery = normalize(query);
    return normQuery.split(" ").every((q) => normTitle.includes(q));
  }

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  function updateSearch(str) {
    if (mode === "books") {
      // Server-side filtering via URL
      const url = new URL($page.url);
      if (str) {
        url.searchParams.set("search", str);
      } else {
        url.searchParams.delete("search");
      }
      goto(url, { keepFocus: true, noScroll: true, replaceState: false });
    } else if (mode === "series") {
      // Keep existing client-side logic for series until migrated
      let searchedSeries = $series.filter((s) => fuzzyMatch(s.titolo, str));
      filteredSeries.set(searchedSeries);
    }
  }

  function showOverlay(str) {
    overlayString = str;
    overlayVisible = true;
    clearTimeout(overlayTimeout);
    overlayTimeout = setTimeout(() => {
      overlayVisible = false;
    }, 800);
  }

  function resetSearch() {
    overlayString = "";
    updateSearch("");
    showOverlay("");
  }

  onMount(() => {
    function handleKeydown(e) {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      )
        return;
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
      if (
        (isMac && e.metaKey && e.key === "k") ||
        (!isMac && e.ctrlKey && e.key === "k")
      ) {
        e.preventDefault();
        resetSearch();
        return;
      }
      if (e.key === "Escape") {
        resetSearch();
        return;
      }
      if (e.key === "Backspace") {
        if (overlayString.length > 0) {
          overlayString = overlayString.slice(0, -1);
          showOverlay(overlayString);
          updateSearch(overlayString);
        }
        return;
      }
      if (
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !e.repeat &&
        e.key.length === 1
      ) {
        overlayString += e.key;
        showOverlay(overlayString);
        updateSearch(overlayString);
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          overlayString = "";
          showOverlay("");
          updateSearch("");
        }, 20000);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

{#if overlayVisible && overlayString}
  <div
    class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    transition:fade={{ duration: 200 }}
  >
    <span
      class="text-8xl font-bold text-white drop-shadow-lg bg-black bg-opacity-60 px-10 py-4 rounded-xl"
      >{overlayString}</span
    >
  </div>
{/if}
