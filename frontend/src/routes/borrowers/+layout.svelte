<script>
    import ListPanel from "$lib/components/list/ListPanel.svelte";
    import BorrowerPanel from "$lib/components/display/BorrowerPanel.svelte";

    let { children } = $props();

    let searchState = $state({
        query: "",
        sortType: "created",
        sortAscending: true,
    });
    let pageParams = $state({
        display_mode: "",
        selectedId: "",
    });
    $effect(() => {
        if (page.params.id) {
            untrack(() => {
                pageParams.selectedId = page.params.id;
            });
        }
    });
    $effect(() => {
        if (page.params.display_mode) {
            untrack(() => {
                pageParams.display_mode = page.params.display_mode;
            });
        }
    });
    $effect(() => {
        global.change_page(`borrowers/${pageParams.selectedId}${pageParams.selectedId ? `/${pageParams.display_mode}` : ""}`);
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <ListPanel bind:pageParams bind:searchState collection="borrowers" />
        <BorrowerPanel bind:pageParams />
    </div>
</div>
