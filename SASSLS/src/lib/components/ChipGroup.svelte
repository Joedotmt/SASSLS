<script>
    import { createEventDispatcher } from "svelte";
    import Chip from "$lib/components/Chip.svelte";

    export let items = [];
    export let selectedIds = [];

    const dispatch = createEventDispatcher();

    function toggleSelection(id) {
        if (selectedIds.includes(id)) {
            selectedIds = selectedIds.filter((item) => item !== id);
        } else {
            selectedIds = [...selectedIds, id];
        }
        dispatch("selectionChange", selectedIds);
    }
</script>

<div class="chip-group">
    {#each items as item (item.id)}
        <Chip
            on:click={() => toggleSelection(item.id)}
            selected={selectedIds.includes(item.id)}
        >
            {item.label}
        </Chip>
    {/each}
</div>

<style>
    .chip-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4em;
        margin: 0.4em;
        flex-direction: column;
    }
</style>
