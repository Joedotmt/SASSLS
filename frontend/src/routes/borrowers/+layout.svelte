<script>
    import BorrowerList from "$lib/components/BorrowerList.svelte";
    import { onMount } from "svelte";
    import BorrowerPanel from "$lib/components/display/BorrowerPanel.svelte";
    import { page } from "$app/stores";

    let searchState = $state({
        query: "",
        sortAscending: false,
        sortType: "created",
    });

    onMount(() => {
        // const hashParams = new URLSearchParams(window.location.hash.slice(1));
        // if (hashParams.size) {
        //     searchState = JSON.parse(hashParams.get("search"));
        // }
    });

    $effect(() => {
        updateWindowHash(searchState);
    });

    function updateWindowHash(state) {
        // if (!browser) return;
        // let hash = "";
        // hash = `search=${JSON.stringify(state)}`;
        // window.location.hash = hash;
    }

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            searchBarChanged(event);
        }
    }
    function searchBarChanged(event) {
        searchState.query = event.target.value;
    }
</script>

<div class="container">
    <!-- <SearchPanel bind:searchState /> -->
    <div class="list-area panel">
        <div class="list-area-search">
            <div class="search-input-wrapper">
                <span class="symbol search-icon">search</span>
                <input type="text" class="main-search-bar" placeholder="Search borrowers" onchange={searchBarChanged} onkeydown={handleSearchKeyDown} />
            </div>
        </div>
        <BorrowerList {searchState} />
    </div>
    <BorrowerPanel />
</div>
