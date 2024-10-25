<script>
    import { createEventDispatcher } from "svelte";

    let { itemType, item = $bindable(), isSelected = $bindable() } = $props();

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
    onclick={handleClick}
    style="view-transition-name: id-{item.id}; margin-top:0 !important;"
>
    + Create {itemType.slice(0, -1)}
</button>
