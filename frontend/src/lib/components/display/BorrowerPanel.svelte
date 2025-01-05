<script>
    import BorrowerDisplay from "./BorrowerDisplay.svelte";
    import BorrowerEdit from "./BorrowerEdit.svelte";
    import pb from "$lib/pocketbase";
    import { global, objects, constants } from "$lib/global.svelte.js";
    import { untrack } from "svelte";
    import { page } from "$app/state";

    //let {} = $props();

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
            selectedData = constants.borrowers.defaultItem;
            global.loading_items.delete(selectedId);
            if (window.innerWidth < 1100) {
                // TODO
                //objects.searchPanel.minimized = true;
            }
            visible = true;
            return;
        }
        try {
            selectedData = await pb.collection("borrowers").getOne(selectedId);
            global.loading_items.delete(selectedId);
            if (window.innerWidth < 1100) {
                // TODO
                //objects.searchPanel.minimized = true;
            }
            visible = true;
        } catch (error) {
            console.log("Error with selected borrower data " + selectedData);
            global.change_page("borrowers");
        }
    }

    function unselect_item() {
        global.change_page("borrowers");
    }
</script>

{#if page.params.id != undefined && visible}
    <div id="display_area" class="panel">
        <div style="flex-direction: row; border-bottom: 1px solid var(---surface-5); min-height: 50px; width: 100%; display: flex; align-items: center;">
            <button onclick={unselect_item} class="button-circle" style="border:none; width:40px; height:40px; margin:5px; z-index: 6;"><span class="symbol">close</span></button>
            <span style="margin: 0em 0em; z-index: 6;">Item</span>
        </div>
        {#if loaded}
            <div style="translate: 0 -3.2em;">
                {#if display_mode == "edit"}
                    <BorrowerEdit {selectedData} />
                {:else if display_mode == "" || display_mode == undefined}
                    <BorrowerDisplay style="opacity:1" {selectedData} />
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
