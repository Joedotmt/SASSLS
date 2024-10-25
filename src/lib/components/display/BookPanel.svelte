<script>
    import { run } from "svelte/legacy";
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import { browser } from "$app/environment";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let { selectedBookData } = $props();
    let display_mode = $state("none");

    function foo(bd) {
        if (bd != undefined && browser) display_mode = "display";
        else display_mode = "none";
    }

    function EditButtonClicked() {
        if (display_mode == "edit") {
            display_mode = "display";
        } else if (display_mode == "display") {
            display_mode = "edit";
        }
    }

    function handleBookUpdate(event) {
        // Forward the update event to the parent
        dispatch("bookUpdate", event.detail);
    }

    run(() => {
        foo(selectedBookData);
    });
</script>

<div id="display_area" class="display-area panel">
    {#if display_mode === "edit"}
        <BookEdit
            on:EditButton={EditButtonClicked}
            on:bookUpdate={handleBookUpdate}
            {selectedBookData}
        />
    {:else if display_mode === "display"}
        <BookDisplay on:EditButton={EditButtonClicked} {selectedBookData} />
    {/if}
</div>
