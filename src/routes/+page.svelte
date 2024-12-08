<script>
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
</script>

<button onclick={() => goto(base + "/books")}> Go to books </button>
<button onclick={() => goto(base + "/borrowers")}> Go to borrowers </button>
