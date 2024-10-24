<script>
    import { goto } from "$app/navigation";

    function navigate() {
        goto("/books");
    }
</script>

<button onclick={navigate}> Go to books </button>
