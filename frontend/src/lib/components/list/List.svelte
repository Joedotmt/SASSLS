<script>
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import Item from "$lib/components/list/Item.svelte";
    import ItemCreate from "$lib/components/list/ItemCreate.svelte";
    let { collection_name, isLoading, error, selectedId, items, env = $bindable() } = $props();
</script>

<div style="overflow:hidden; overflow-y: auto; border-radius: 0.6em; height: 100%;">
    {#if isLoading}
        <div class="fade-in" style="width: 50%; margin:auto;">
            <LoadingBar />
            Loading {collection_name}
        </div>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        <div>
            <ItemCreate itemType={collection_name} isSelected={"create" == selectedId} bind:env />
        </div>
        {#each items as item (item.id)}
            <div>
                <Item itemType={collection_name} {item} isSelected={item.id == selectedId} bind:env />
            </div>
        {/each}
    {/if}
</div>
