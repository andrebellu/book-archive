<script>
  import "../app.css";
</script>

<div class="relative min-h-screen w-full overflow-hidden">
  <!-- Sfondo premium coerente: gradient scuro + foglie + overlay -->
  <div class="fixed inset-0 -z-10">
    <div
      class="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700/80 to-green-400/60"
    ></div>
    <img
      src="/leaves.png"
      alt=""
      class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-lighten pointer-events-none select-none"
      draggable="false"
    />
    <div class="absolute inset-0 bg-black/60"></div>
  </div>
  <main class="relative z-10 flex flex-col min-h-screen w-full">
    <slot />
  </main>
</div>
