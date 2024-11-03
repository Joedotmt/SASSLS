<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let { selectedBookData } = $props();
    let display_mode = $state("none");

    $effect(() => {
        onBookChange(selectedBookData);
    });

    function onBookChange(bd) {
        console.log(JSON.stringify(bd));
        if (bd == null) {
            display_mode = "none";
            return;
        }
        if (bd?.id == "create") {
            display_mode = "edit";
            return;
        }
        display_mode = "display";
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

    function close_panel() {
        selectedBookData = null;
    }
</script>

<div
    style="max-width: {display_mode == 'none' ? 0 : 'unset'}px;"
    id="display_area"
    class="display-area panel"
>
    <button
        onclick={close_panel}
        class="button-circle"
        style="position:absolute; left:5px; top:5px; z-index:6; border:none; width:40px; height:40px"
        ><span class="symbol">arrow_back</span></button
    >
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
