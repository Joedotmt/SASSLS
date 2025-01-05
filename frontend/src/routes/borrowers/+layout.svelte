<script>
    import ListPanel from "$lib/components/list/ListPanel.svelte";
    import BorrowerPanel from "$lib/components/display/BorrowerPanel.svelte";
    import { page } from "$app/state";

    let { children } = $props();

    let searchState = $state({
        query: "",
        sortType: "created",
        sortAscending: true,
    });

    document.body.className;
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <ListPanel bind:searchState collection="borrowers" />
        <BorrowerPanel />
    </div>
</div>
