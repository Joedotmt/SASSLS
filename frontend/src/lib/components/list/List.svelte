<script>
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import ListItem from "$lib/components/list/Item.svelte";
    import ListItemCreate from "$lib/components/list/ItemCreate.svelte";
    let { collection_name, isLoading, error, selectedId, items } = $props();
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
            <ListItemCreate itemType={collection_name} isSelected={"create" == selectedId} />
        </div>
        {#each items as item (item.id)}
            <div>
                <ListItem itemType={collection_name} {item} isSelected={item.id == selectedId} />
            </div>
        {/each}
    {/if}
</div>
