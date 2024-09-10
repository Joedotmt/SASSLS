<script>
    import { createEventDispatcher } from "svelte";
    import Chip from "$lib/components/Chip.svelte";

    export let items = [];
    export let selectedIds = [];

    const dispatch = createEventDispatcher();

    function handleChipChange(id, checked) {
        if (checked) {
            selectedIds = [...selectedIds, id];
        } else {
            selectedIds = selectedIds.filter((item) => item !== id);
        }
        dispatch("selectionChange", { selectedIds });
    }
</script>

<div class="chip-group">
    {#each items as item (item.id)}
        <Chip
            checked={selectedIds.includes(item.id)}
            on:change={(event) =>
                handleChipChange(item.id, event.detail.checked)}
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
