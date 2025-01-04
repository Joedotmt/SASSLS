<script>
    import BorrowerDisplay from "./BorrowerDisplay.svelte";
    import BorrowerEdit from "./BorrowerEdit.svelte";
    import pb from "$lib/pocketbase";
    import { global } from "$lib/global.svelte.js";

    let { selectedBorrowerBorrower_id = "" } = $props();
    import { page } from "$app/stores";

    let selectedBorrowerData = $state(null);
    let visible = $state(true);

    $effect(async () => {
        if (selectedBorrowerBorrower_id == "") {
            visible = false;
            return;
        }
        try {
            selectedBorrowerData = await pb.collection("borrowers").getOne(selectedBorrowerBorrower_id, {});
            global.loading_items.delete(selectedBorrowerBorrower_id);
            visible = true;
        } catch (error) {
            console.log("Error with selected borrower data " + selectedBorrowerData);
            global.change_page("borrowers");
        }
    });

    function handleBorrowerSave() {
        // Forcing Triggering Reactivity
        // So it updates the borrowers details
        const old = selectedBorrowerBorrower_id;
        selectedBorrowerBorrower_id = "";
        selectedBorrowerBorrower_id = old;
    }

    function unselect_borrower() {
        global.change_page("borrowers");
    }
</script>

{#if $page.params.id != undefined && visible}
    <div id="display_area" class="panel">
        <div
            style="flex-direction: row; border-bottom: 1px solid var(---surface-5); min-height: 50px; width: 100%; display: flex; align-items: center;"
        >
            <button onclick={unselect_borrower} class="button-circle" style="border:none; width:40px; height:40px; margin:5px; z-index: 6;"><span class="symbol">close</span></button>
            <span style="margin: 0em 0em; z-index: 6;">Borrower</span>
        </div>
        <div style="translate: 0 -3.2em;">
            {#if $page.params.display_mode == "edit"}
                <BorrowerEdit borrowerUpdate={handleBorrowerSave} {selectedBorrowerData} />
            {:else if $page.params.display_mode == "" || $page.params.display_mode == undefined}
                <BorrowerDisplay style="opacity:1" {selectedBorrowerData} />
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
