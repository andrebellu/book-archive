<script>
    import { onMount } from "svelte";

    let greeting = "";
    let name = "Andrea";
    onMount(() => {
        const hour = new Date().getHours();
        if (hour < 12 && hour >= 6) {
            greeting = "Good morning";
        } else if (hour < 18 && hour >= 12) {
            greeting = "Good afternoon";
        } else if (hour < 22 && hour >= 18) {
            greeting = "Good evening";
        } else {
            greeting = "Good night";
        }
    });
</script>

<body class="flex flex-col justify-center items-center">
    <div>
        <h1 class="text-6xl">
            <span class="font-thin">{greeting},</span>
            <span class="font-bold">{name}.</span>
        </h1>
    </div>
    <div class="flex flex-col justify-center items-center gap-y-5 p-6">
        <span class="opacity-75">Enter the book archive</span>
        <a href="/books" class="category"
            ><span class="material-symbols-outlined text-4xl">
                arrow_forward
            </span></a
        >
    </div>
</body>
