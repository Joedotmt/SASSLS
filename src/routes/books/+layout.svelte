<script>
    import BookList from "$lib/components/BookList.svelte";
    import SearchPanel from "$lib/components/SearchPanel.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let selectedBookId = "";
    let searchInput = "";
    let pbFilter = ""; //createPbFilter(searchInput, searchPanelState);
    let pbSort = "-created";
    const defaultState = { selectedSubjects: [], sort: ["-", ["created"]] };
    let searchPanelState = { selectedSubjects: [], sort: ["-", ["created"]] };

    if (browser) {
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        if (hashParams.size) {
            searchInput = hashParams.get("search") || "";
            searchPanelState = JSON.parse(hashParams.get("filter"));
        }
    }
    $: searchPanelState, doSearch();

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            doSearch();
        }
    }

    function doSearch() {
        updateWindowHash(searchInput, searchPanelState);
        pbSort = searchPanelState.sort[0] + searchPanelState.sort[1];
        pbFilter = createPbFilter(searchInput, searchPanelState);
    }

    function updateWindowHash(search, state) {
        if (!browser) return;
        let hash = "";

        if (state && JSON.stringify(state) !== JSON.stringify(defaultState)) {
            hash = `search=${search}&filter=${encodeURIComponent(JSON.stringify(state))}`;
        } else if (search) {
            hash = `search=${search}`;
        }

        window.location.hash = hash;
    }

    function createPbFilter(search, state) {
        let extra = "";
        if (state.selectedSubjects.length >= 1) {
            extra = "";

            state.selectedSubjects.forEach((id) => {
                extra += `subject='${id}'||`;
            });

            extra = extra.substring(0, extra.length - 2);
        } else {
            extra = "";
        }

        const bookLazyFields = ["title", "isbn"];
        const bookExactFields = ["legacy_book_id", "book_id"];

        let filter = search
            .split(" ")
            .map((token) => token.trim())
            .filter((token) => token !== "")
            .map((cleanToken) => {
                const lazyConditions = bookLazyFields
                    .map((field) => `${field} ~ "%${cleanToken}%"`)
                    .join(" || ");
                const exactConditions = bookExactFields
                    .map((field) => `${field} = "${cleanToken}"`)
                    .join(" || ");
                return `(${lazyConditions}${exactConditions ? " || " + exactConditions : ""})`;
            })
            .join(" && ");

        if (filter && extra) {
            return filter + " && " + extra;
        } else if (filter) {
            return filter;
        } else if (extra) {
            return extra;
        }
        return filter;
    }

    function changeState() {
        searchPanelState = { selectedSubjects: [], sort: ["+", ["updated"]] };
    }
</script>

<div class="container">
    <SearchPanel bind:searchPanelState />
    <div class="list-area panel">
        <div class="list-area-search">
            <div class="search-input-wrapper">
                <span class="symbol search-icon">search</span>
                <input
                    type="text"
                    class="main-search-bar"
                    placeholder="Search Books"
                    bind:value={searchInput}
                    on:keydown={handleSearchKeyDown}
                />
            </div>
        </div>
        <BookList searchQuery={pbFilter} sortPb={pbSort} bind:selectedBookId />
        <button on:click={changeState}>Test Change State</button>
    </div>
</div>
<slot />

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
