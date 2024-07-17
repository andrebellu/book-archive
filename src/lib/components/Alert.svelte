<script>
    import { onMount, onDestroy } from "svelte";

    export let message;
    export let onClose;
    export let success;

    let timeout;

    onMount(() => {
        timeout = setTimeout(() => {
            onClose();
        }, 10000);
    });

    onDestroy(() => {
        clearTimeout(timeout);
    });

    function close() {
        clearTimeout(timeout);
        onClose();
    }
</script>

{#if message}
    <div
        role="alert"
        class="alert alert-{success
            ? 'success'
            : 'error'} flex items-center justify-between"
    >
        <div class="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span class="ml-2">{message}</span>
        </div>
        <button class="btn btn-sm btn-circle btn-ghost" on:click={close}
            >✕</button
        >
    </div>
{/if}
