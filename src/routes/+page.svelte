<script>
    import { global } from "$lib/global.svelte.js";
</script>

<div
    style="position: fixed; top:4em; left:0; width: 100em; height: 100em; background-color: var(---surface-3); z-index: 10;"
>
    <button onclick={() => global.change_page("books")}> Go to books </button>
    <button onclick={() => global.change_page("borrowers")}>
        Go to borrowers
    </button>
</div>
