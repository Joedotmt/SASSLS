<script>
    import BookList from "$lib/components/BookList.svelte";
    import SearchPanel from "$lib/components/SearchPanel.svelte";
    import { onMount } from "svelte";
    import { global } from "$lib/global.svelte.js";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import { page } from "$app/stores";

    let searchState = $state({
        query: "",
        subjects: [],
        levels: [],
        sortType: "created",
        sortAscending: "true",
    });

    onMount(() => {
        global.fetchSubjects();
        // const hashParams = new URLSearchParams(window.location.hash.slice(1));
        // if (hashParams.size) {
        //     searchState = JSON.parse(hashParams.get("search"));
        // }
    });

    // $effect(() => {
    //     updateWindowHash(searchState);
    // });

    // function updateWindowHash(state) {
    //     if (!browser) return;
    //     let hash = "";

    //     hash = `search=${JSON.stringify(state)}`;

    //     window.location.hash = hash;
    // }

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            searchBarChanged(event);
        }
    }
    function searchBarChanged(event) {
        searchState.query = event.target.value;
    }
    import { objects } from "$lib/global.svelte.js";
</script>

<div class="container">
    <SearchPanel bind:searchState />
    <div class="list-area panel" style="border-top-left-radius:{objects.searchPanel.minimized ? 0 : ''}; border-bottom-left-radius:{objects.searchPanel.minimized ? 0 : ''}">
        <div
            style="flex-direction: row;    border-bottom: 1px solid var(---surface-5);
    min-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;">
            <span style="margin: 0em 1em;">Search</span>
        </div>
        <div class="list-area-search">
            <div class="search-input-wrapper">
                <span class="symbol search-icon">search</span>
                <input type="text" class="main-search-bar" placeholder="Search Books" onchange={searchBarChanged} onkeydown={handleSearchKeyDown} />
            </div>
        </div>
        <BookList {searchState} />
    </div>
    <BookPanel selectedBookBook_id={$page.params.item_id} />
</div>
