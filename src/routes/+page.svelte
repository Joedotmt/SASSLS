<script>
    import { goto } from "$app/navigation";
</script>

<button onclick={goto("/books")}> Go to books </button>
<button onclick={goto("/borrowers")}> Go to borrowers </button>
