<script>
    import { goto } from "$app/navigation";

    function navigate() {
        goto("/books");
    }
</script>

<button on:click={navigate}> Go to books </button>
