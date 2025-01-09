<script>
    import { onMount } from "svelte";
    import Chip from "$lib/components/Chip.svelte";

    let { style = "", items = [], selected = $bindable([]), multiple = true, optional = true, defaultIndex = null } = $props();

    // onMount(()=>{
    //     handleChipChange()
    // })

    function handleChipChange(id, checked) {
        let updatedSelected;
        if (multiple) {
            // Multiple selection allowed
            if (checked) {
                updatedSelected = [...selected, id];
            } else {
                // If optional is false and it's the last selected chip, prevent deselecting
                if (!optional && selected.length === 1) return;
                updatedSelected = selected.filter((item) => item !== id);
            }
        } else {
            // Only one selection allowed
            if (checked) {
                updatedSelected = [id]; // Deselect all others and select the new one
            } else {
                if (optional) {
                    updatedSelected = [];
                } else {
                    updatedSelected = [id]; // Prevent deselection if optional is false
                }
            }
        }

        // Update selected and dispatch event
        selected = updatedSelected;
    }
</script>

<div {style} class="chip-group">
    {#each items as item (item)}
        <Chip checked={selected.includes(item)} clicked={(checked) => handleChipChange(item, checked)}>
            {item}
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
