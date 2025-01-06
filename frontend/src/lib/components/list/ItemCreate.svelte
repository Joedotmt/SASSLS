<script>
    let { itemType, item = $bindable(), isSelected = $bindable(), pageParams = $bindable() } = $props();

    item = {
        id: "create",
    };

    import { global } from "$lib/global.svelte.js";
    function handleClick() {
        isSelected = true;
        pageParams.selectedId = "create";
        pageParams.display_mode = "edit";
    }
</script>

<button class="list-button list-item {isSelected ? 'selected' : ''}" onclick={handleClick} style="view-transition-name: id-{item.id}; margin-top:0 !important;">
    + Create {itemType.slice(0, -1)}
</button>
