<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import pb from "$lib/pocketbase";

    let { selectedBookBook_id = "" } = $props();

    let selectedBookData = $state({});

    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    $effect(async () => {
        try {
            selectedBookData = await pb
                .collection("books")
                .getFirstListItem(`book_id="${selectedBookBook_id}"`, {});
        } catch (error) {
            console.log("Error with selected book data " + selectedBookData);
            goto(base + "/books");
        }
    });

    function handleBookSave() {
        // Forcing Triggering Reactivity
        // So it updates the books details
        const old = selectedBookBook_id;
        selectedBookBook_id = "";
        selectedBookBook_id = old;
    }

    let display_mode = $state("none");

    $effect.pre(() => {
        display_mode = getDisplayMode(selectedBookBook_id);
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
        goto(base + "/books");
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
            bind:selectedBookData
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
