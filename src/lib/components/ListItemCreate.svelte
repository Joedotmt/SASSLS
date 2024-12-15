<script>
    let { itemType, item = $bindable(), isSelected = $bindable() } = $props();

    item = {
        id: "create",
    };

    import { goto } from "$app/navigation";
    import { base } from "$app/paths";

    function handleClick() {
        isSelected = true;

        goto(`${base}/${itemType}/create`);
    }
</script>

<button
    class="list-button list-item {isSelected ? 'selected' : ''}"
    onclick={handleClick}
    style="view-transition-name: id-{item.id}; margin-top:0 !important;"
>
    + Create {itemType.slice(0, -1)}
</button>
