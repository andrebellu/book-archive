<button
  type="button"
  class="btn btn-circle btn-outline"
  aria-label="Mostra filtri"
  onclick="help_modal.showModal()"
>
  <span class="material-symbols-outlined">question_mark</span>
</button>
<dialog id="help_modal" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button
      >
    </form>
    <h2 class="text-md font-bold mb-4">Aiuto!</h2>
    <ul class="list-disc space-y-2">
      <li class="flex items-center">
        <span
          class="border-2 border-green-600 inline-block w-4 h-4 mr-2 rounded"
        ></span>
        <span>Letto</span>
      </li>
      <li class="flex items-center">
        <span
          class="border-2 border-purple-400 inline-block w-4 h-4 mr-2 rounded"
        ></span>
        <span>In lettura</span>
      </li>
      <li class="flex items-center">
        <span class="border-2 border-gray-300 inline-block w-4 h-4 mr-2 rounded"
        ></span>
        <span>Neutro / Non letto</span>
      </li>
    </ul>
    <div class="mt-4 text-sm text-gray-400">
      Puoi filtrare e cercare i libri usando i controlli in alto.<br />
      <b>Ricerca rapida:</b> Inizia a scrivere da tastiera.<br />
      <b>Backspace</b> cancella l'ultima lettera, <b>Esc</b> o <b>Ctrl+K</b> azzerano
      la ricerca.
    </div>
  </div>
</dialog>
