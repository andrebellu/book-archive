<div
    class="w-64 h-96 rounded-3xl bg-white/5 animate-pulse relative overflow-hidden border-4 border-white/5"
>
    <!-- Shimmer effect -->
    <div
        class="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
    ></div>

    <div class="absolute bottom-0 w-full p-5 flex flex-col items-center gap-3">
        <!-- Title -->
        <div class="h-6 w-3/4 bg-white/20 rounded-md"></div>
        <div class="h-6 w-1/2 bg-white/20 rounded-md"></div>

        <!-- Author -->
        <div class="h-4 w-1/2 bg-white/10 rounded-md mt-2"></div>

        <!-- Badges -->
        <div class="flex gap-2 mt-2">
            <div class="h-5 w-12 bg-white/10 rounded-full"></div>
            <div class="h-5 w-12 bg-white/10 rounded-full"></div>
        </div>

        <!-- Description -->
        <div class="h-3 w-full bg-white/5 rounded-md mt-2"></div>
        <div class="h-3 w-5/6 bg-white/5 rounded-md"></div>
    </div>
</div>

<style>
    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
</style>
