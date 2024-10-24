<script>
    import { goto } from "$app/navigation";

    function navigate() {
        goto("/books");
    }
    let count = 0;
    let count2 = $state(0);
    function incrament() {
        count += 1;
        count2 += 1;
    }
</script>

<button onclick={navigate}> Go to books </button>

<button onclick={incrament}>{count}{count2}</button>
