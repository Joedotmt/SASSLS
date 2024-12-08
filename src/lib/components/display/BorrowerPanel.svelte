<script>
    import BorrowerDisplay from "./BorrowerDisplay.svelte";
    import BorrowerEdit from "./BorrowerEdit.svelte";
    import { untrack } from "svelte";

    let { borrowers, selectedBorrowerId = $bindable("") } = $props();

    let selectedBorrowerData = $derived(
        getSelectedBorrowerData(
            untrack(() => borrowers),
            selectedBorrowerId,
        ),
    );

    function getSelectedBorrowerData(borrowers, selectedBorrowerId) {
        if (selectedBorrowerId == "create") {
            return { id: "create" };
        }
        return borrowers.find((borrower) => borrower.id === selectedBorrowerId);
    }

    function handleBorrowerSave() {
        // Forcing Triggering Reactivity
        // So it updates the borrowers details
        const old = selectedBorrowerId;
        selectedBorrowerId = "";
        selectedBorrowerId = old;
    }

    let display_mode = $state("none");

    $effect.pre(() => {
        display_mode = getDisplayMode(selectedBorrowerId);
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

    function unselect_borrower() {
        selectedBorrowerId = "";
    }
</script>

<div
    style="flex-grow: {display_mode == 'none' ? 0 : 1};"
    id="display_area"
    class="display-area panel"
>
    <button
        onclick={unselect_borrower}
        class="button-circle"
        style="position:absolute; left:5px; top:5px; z-index:6; border:none; width:40px; height:40px"
        ><span class="symbol">arrow_back</span></button
    >
    {#if display_mode === "edit"}
        <BorrowerEdit
            on:EditButton={EditButtonClicked}
            on:borrowerUpdate={handleBorrowerSave}
            on:deleteButton={unselect_borrower}
            {selectedBorrowerData}
        />
    {:else if display_mode === "display"}
        <BorrowerDisplay
            style="opacity:1"
            on:EditButton={EditButtonClicked}
            {selectedBorrowerData}
        />
    {/if}
</div>

<style>
    #display_area {
        width: 100%;
        transition: 0.5s flex-grow ease-in-out;
    }
</style>
