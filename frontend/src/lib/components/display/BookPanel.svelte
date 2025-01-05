<script>
    import BookDisplay from "./BookDisplay.svelte";
    import BookEdit from "./BookEdit.svelte";
    import pb from "$lib/pocketbase";
    import { global, objects, constants } from "$lib/global.svelte.js";
    import { page } from "$app/state";
    import { untrack } from "svelte";
    //let { } = $props();

    let selectedId = $derived(page.params.id);
    let display_mode = $derived(page.params.display_mode);

    let selectedData = $state(null);
    let visible = $state(true);
    let loaded = $state(false);

    $effect(async () => {
        loaded = false;
        if (selectedId) {
        }
        if (display_mode) {
        }
        await untrack(async () => {
            await update_kollox();
            loaded = true;
        });
    });

    async function update_kollox() {
        if (selectedId == "") {
            visible = false;
            return;
        }
        if (selectedId == "create") {
            selectedData = constants.books.defaultItem;
            global.loading_items.delete(selectedId);
            if (window.innerWidth < 1100) {
                objects.searchPanel.minimized = true;
            }
            visible = true;
            return;
        }
        try {
            selectedData = await pb.collection("books").getOne(selectedId, { expand: "subject" });
            global.loading_items.delete(selectedId);
            if (window.innerWidth < 1100) {
                objects.searchPanel.minimized = true;
            }
            visible = true;
        } catch (error) {
            console.log("Error with selected book data " + selectedData);
            global.change_page("books");
        }
    }

    function unselect_item() {
        global.change_page("books");
    }
</script>

{#if page.params.id != undefined && visible}
    <div id="display_area" class="panel">
        <div style=" flex-direction: row; border-bottom: 1px solid var(---surface-5); min-height: 50px; width: 100%; display: flex; align-items: center;">
            <button onclick={unselect_item} class="button-circle" style="border:none; width:40px; height:40px; margin:5px; z-index: 6;"><span class="symbol">close</span></button>
            <span style="margin: 0em 0em; z-index: 6;">Item</span>
        </div>
        {#if loaded}
            <div style="translate: 0 -3.2em;">
                {#if display_mode == "edit"}
                    <BookEdit {selectedData} />
                {:else if display_mode == "" || display_mode == undefined}
                    <BookDisplay style="opacity:1" {selectedData} />
                {/if}
            </div>
        {/if}
    </div>
{/if}

<style>
    #display_area {
        width: 100%;
        transition: 0.5s translate cubic-bezier(0.4, 0, 0, 1);
        margin-right: 10px;
    }
</style>
