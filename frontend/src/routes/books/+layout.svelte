<script>
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import { page } from "$app/state";
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

    import { untrack } from "svelte";
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

    setInterval(() => {
        console.log(global.unsaved_changes);
    }, 10);

    $effect(() => {
        console.log("CHANGING PAGE");
        if (pageParams.selectedId) {
        }
        if (pageParams.display_mode) {
        }
        untrack(() => {
            global.change_page(`books/${pageParams.selectedId}${pageParams.selectedId ? `/${pageParams.display_mode}` : ""}`);
        });
    });
</script>

{@render children()}
<div class="container-scroller">
    <div class="container">
        <SearchPanel bind:searchState />
        <ListPanel bind:searchState bind:pageParams collection="books" />
        <BookPanel bind:pageParams />
    </div>
</div>
