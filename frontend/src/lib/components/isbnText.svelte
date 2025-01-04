<script>
    let { isbn } = $props();

    function formatISBN(isbn) {
        if (isbn == undefined) return;
        // Remove any existing hyphens or spaces
        const cleaned = isbn.replace(/[-\s]/g, "");

        if (cleaned.length === 10) {
            // Format ISBN-10: xxx-x-xxx-xxxxx
            return cleaned.replace(/^(\d{3})(\d{1})(\d{3})(\d{3})$/g, "$1-$2-$3-$4");
        } else if (cleaned.length === 13) {
            // Format ISBN-13: xxx-x-xxx-xxxxx-x
            return cleaned.replace(/^(\d{3})(\d{1})(\d{3})(\d{5})(\d{1})$/g, "$1-$2-$3-$4-$5");
        }

        // Return original if not valid length
        return isbn;
    }
</script>

{formatISBN(isbn)}
