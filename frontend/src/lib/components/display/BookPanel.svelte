<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import pb from "$lib/pocketbase";
    import { global, objects } from "$lib/global.svelte.js";

    let { selectedBookBook_id = "" } = $props();
    import { page } from "$app/stores";

    let selectedBookData = $state(null);
    let visible = $state(true);

    $effect(async () => {
        if (selectedBookBook_id == "") {
            visible = false;
            return;
        }
        try {
            selectedBookData = await pb.collection("books").getOne(selectedBookBook_id, { expand: "subject" });
            global.loading_items.delete(selectedBookBook_id);
            if (window.innerWidth < 1100) {
                objects.searchPanel.minimized = true;
            }
            visible = true;
        } catch (error) {
            console.log("Error with selected book data " + selectedBookData);
            global.change_page("books");
        }
    });

    function handleBookSave() {
        // Forcing Triggering Reactivity
        // So it updates the books details
        const old = selectedBookBook_id;
        selectedBookBook_id = "";
        selectedBookBook_id = old;
    }

    function unselect_book() {
        global.change_page("books");
    }
</script>

{#if $page.params.id != undefined && visible}
    <div id="display_area" class="panel">
        <div
            style=" flex-direction: row;   border-bottom: 1px solid var(---surface-5);
                    min-height: 50px;
                    width: 100%;
                    display: flex;
                    align-items: center;"
        >
            <button onclick={unselect_book} class="button-circle" style="border:none; width:40px; height:40px; margin:5px; z-index: 6;"><span class="symbol">close</span></button>
            <span style="margin: 0em 0em; z-index: 6;">Item</span>
        </div>
        <div style="translate: 0 -3.2em;">
            {#if $page.params.display_mode == "edit"}
                <BookEdit bookUpdate={handleBookSave} {selectedBookData} />
            {:else if $page.params.display_mode == "" || $page.params.display_mode == undefined}
                <BookDisplay style="opacity:1" {selectedBookData} />
            {/if}
        </div>
    </div>
{/if}

<style>
    #display_area {
        width: 100%;
        transition: 0.5s translate cubic-bezier(0.4, 0, 0, 1);
    }
</style>
