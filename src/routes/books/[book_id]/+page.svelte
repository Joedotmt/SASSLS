<script>
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import { page } from "$app/stores";
</script>

<BookPanel selectedBookBook_id={$page.params.book_id} />
