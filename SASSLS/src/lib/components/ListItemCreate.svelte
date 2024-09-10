<script>
    import { createEventDispatcher } from "svelte";

    export let itemType;
    export let item;
    export let isSelected;

    const dispatch = createEventDispatcher();

    function handleClick() {
        isSelected = true;
        dispatch("ItemClick", { id: item.id });
    }
    item = {
        id: "create",
    };
</script>

<button
    class="list-button list-item {isSelected ? 'selected' : ''}"
    on:click={handleClick}
    style="view-transition-name: id-{item.id}; margin-top:0 !important;"
>
    + Create {itemType.slice(0, -1)}
</button>
