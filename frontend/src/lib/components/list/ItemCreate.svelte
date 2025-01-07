<script>
    let { itemType, item = $bindable(), isSelected = $bindable(), env = $bindable() } = $props();

    item = {
        id: "create",
    };

    function handleClick() {
        isSelected = true;
        env.setSelectedId("create");
        env.setDisplay_mode("edit");
    }
</script>

<button class="list-button list-item {isSelected ? 'selected' : ''}" onclick={handleClick} style="view-transition-name: id-{itemType}{item.id}; margin-top:0 !important;">
    + Create {itemType.slice(0, -1)}
</button>
