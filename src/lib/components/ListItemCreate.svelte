<script>
    import { createEventDispatcher } from "svelte";
    import pb from "$lib/pocketbase";

    let { itemType, item = $bindable(), isSelected = $bindable() } = $props();

    const dispatch = createEventDispatcher();

    async function handleClick() {
        isSelected = true;

        dispatch("ItemClick", item.id);
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
