<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import { untrack } from "svelte";

    let { books, selectedBookId = $bindable("") } = $props();

    let selectedBookData = $derived(
        getSelectedBookData(
            untrack(() => books),
            selectedBookId,
        ),
    );

    function getSelectedBookData(books, selectedBookId) {
        if (selectedBookId == "create") {
            return { id: "create" };
        }
        return books.find((book) => book.id === selectedBookId);
    }

    function handleBookSave() {
        // Forcing Triggering Reactivity
        // So it updates the books details
        const old = selectedBookId;
        selectedBookId = "";
        selectedBookId = old;
    }

    let display_mode = $state("none");

    $effect.pre(() => {
        display_mode = getDisplayMode(selectedBookId);
    });
    function getDisplayMode(id) {
        if (id == "create") {
            return "edit";
        }
        if (id != "") {
            return "display";
        }
        return "none";
    }

    function EditButtonClicked() {
        if (display_mode == "edit") {
            display_mode = "display";
        } else if (display_mode == "display") {
            display_mode = "edit";
        }
    }

    function unselect_book() {
        selectedBookId = "";
    }
</script>

<div
    style="flex-grow: {display_mode == 'none' ? 0 : 1};"
    id="display_area"
    class="display-area panel"
>
    <button
        onclick={unselect_book}
        class="button-circle"
        style="position:absolute; left:5px; top:5px; z-index:6; border:none; width:40px; height:40px"
        ><span class="symbol">arrow_back</span></button
    >
    {#if display_mode === "edit"}
        <BookEdit
            on:EditButton={EditButtonClicked}
            on:bookUpdate={handleBookSave}
            on:deleteButton={unselect_book}
            {selectedBookData}
        />
    {:else if display_mode === "display"}
        <BookDisplay
            style="opacity:1"
            on:EditButton={EditButtonClicked}
            {selectedBookData}
        />
    {/if}
</div>

<style>
    #display_area {
        width: 100%;
        transition: 0.5s flex-grow ease-in-out;
    }
</style>
