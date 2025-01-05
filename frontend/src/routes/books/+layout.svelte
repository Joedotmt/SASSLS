<script>
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";

    import { global } from "$lib/global.svelte.js";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import ListPanel from "$lib/components/list/ListPanel.svelte";
    import { onMount } from "svelte";

    let { children } = $props();

    let searchState = $state({
        query: "",
        subjects: [],
        levels: [],
        sortType: "created",
        sortAscending: true,
    });
    onMount(() => {
        global.fetchSubjects();
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <SearchPanel bind:searchState />
        <ListPanel bind:searchState collection="books" />
        <BookPanel />
    </div>
</div>
