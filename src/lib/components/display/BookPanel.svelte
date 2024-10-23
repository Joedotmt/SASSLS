<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import { browser } from "$app/environment";

    export let selectedBookData;
    let display_mode = "none";

    $: foo(selectedBookData);

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
</script>

<div id="display_area" class="display-area panel">
    {#if display_mode === "edit"}
        <BookEdit on:EditButton={EditButtonClicked} bind:selectedBookData
        ></BookEdit>
    {:else if display_mode === "display"}
        <BookDisplay on:EditButton={EditButtonClicked} bind:selectedBookData
        ></BookDisplay>
    {/if}
</div>
