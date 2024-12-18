<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import pb from "$lib/pocketbase";

    let { selectedBookBook_id = "" } = $props();
    import { page } from "$app/stores";

    let selectedBookData = $state(null);

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

    // let display_mode = $state("none");
    // $effect.pre(() => {
    //     display_mode = getDisplayMode(selectedBookBook_id);
    // });
    // function getDisplayMode(id) {
    //     if (id == "create") {
    //         return "edit";
    //     }
    //     if (id != "") {
    //         return "display";
    //     } else {
    //         return "none";
    //     }
    //     return "none";
    // }

    function EditButtonClicked() {
        if ($page.params.display_mode == "edit") {
            goto(base + "/books/" + $page.params.book_id + "/");
        } else if ($page.params.display_mode == null) {
            goto(base + "/books/" + $page.params.book_id + "/edit");
        }
    }

    function unselect_book() {
        goto(base + "/books/");
    }

    $inspect($page.params.book_id);
</script>

{#if selectedBookData != null}
    <div
        style="flex-grow: {$page.params.book_id == undefined ? 0 : 1};"
        id="display_area"
        class="display-area panel"
    >
        <button
            onclick={unselect_book}
            class="button-circle"
            style="position:absolute; left:5px; top:5px; z-index:6; border:none; width:40px; height:40px"
            ><span class="symbol">arrow_back</span></button
        >

        {#if $page.params.display_mode == "edit"}
            <BookEdit
                EditButton={EditButtonClicked}
                bookUpdate={handleBookSave}
                deleteButton={unselect_book}
                {selectedBookData}
            />
        {:else if $page.params.display_mode == "" || $page.params.display_mode == undefined}
            <BookDisplay
                style="opacity:1"
                EditButton={EditButtonClicked}
                {selectedBookData}
            />
        {/if}
    </div>
{/if}

<style>
    #display_area {
        width: 100%;
        transition: 0.5s flex-grow ease-in-out;
    }
</style>
