<script>
    import BookList from "$lib/components/BookList.svelte";
    import SearchPanel from "$lib/components/SearchPanel.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import { fetchGlobalSubjects } from "$lib/levels.js";

    let { children } = $props();

    let searchState = $state({query:"", subjects: [], levels:[], sortType:"created", sortOrder : "-"})
    let books = $state([])
    let selectedBookId = $state("")



    // let selectedBookData = $state(null);
    // let searchInput = $state("");
    // let pbFilter = $state("");
    // let pbSort = $state("-created");
    
    // let searchPanelState = $state({
    //     subjects: [],
    //     levels: [],
    //     showingIdType: "both",
    //     sort: ["-", ["created"]],
    // });

    onMount(() => {
        fetchGlobalSubjects();
    });

    // if (browser) {
    //     const hashParams = new URLSearchParams(window.location.hash.slice(1));
    //     if (hashParams.size) {
    //         searchInput = hashParams.get("search") || "";
    //         searchPanelState = JSON.parse(hashParams.get("filter"));
    //     }
    // }




    // function updateWindowHash(search, state) {
    //     if (!browser) return;
    //     let hash = "";

    //     hash = `search=${search}&filter=${JSON.stringify(state)}`;

    //     window.location.hash = hash;
    // }

    

    // function changeState() {
    //     searchPanelState = {
    //         subjects: [],
    //         levels: ["Red"],
    //         sort: ["+", ["updated"]],
    //     };
    // }

    // run(() => {
    //     searchPanelState, doSearch();
    // });


    function handleSearchKeyDown(event) {
    if (event.key === "Enter") {
        searchBarChanged(event)
    }
    }
    function searchBarChanged(event)
    {
        searchState.query = event.target.value
    }
</script>

<div class="container">
    <SearchPanel bind:searchState/>
    <div class="list-area panel">
        <div class="list-area-search">
            <div class="search-input-wrapper">
                <span class="symbol search-icon">search</span>
                <input
                    type="text"
                    class="main-search-bar"
                    placeholder="Search Books"
                    onchange={searchBarChanged}
                    onkeydown={handleSearchKeyDown}
                />
            </div>
        </div>
        <BookList
            {searchState}
            bind:books
            bind:selectedBookId
        />
    </div>
    <BookPanel 
        bind:selectedBookId
        {books}
    />
</div>
{@render children?.()}

<style>
    .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 0.8em;
        opacity: 0.7;
    }
</style>