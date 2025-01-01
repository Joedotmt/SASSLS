<script>
    import { global } from "$lib/global.svelte.js";
</script>

<button onclick={() => global.change_page("books")}> Go to books </button>
<button onclick={() => global.change_page("borrowers")}>
    Go to borrowers
</button>
