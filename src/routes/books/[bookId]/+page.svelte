<script>
    let { selectedBookId, books } = $props();
</script>

<BookPanel bind:selectedBookId {books} />
