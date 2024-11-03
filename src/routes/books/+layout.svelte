<script>
    import { run } from 'svelte/legacy';
    import BookList from "$lib/components/BookList.svelte";
    import SearchPanel from "$lib/components/SearchPanel.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import { fetchGlobalSubjects } from "$lib/levels.js";

    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props();

    let selectedBookId = $state("");
    let selectedBookData = $state(null);
    let searchInput = $state("");
    let pbFilter = $state("");
    let pbSort = $state("-created");
    
    let searchPanelState = $state({
        selectedSubjects: [],
        selectedLevels: [],
        showingIdType: "both",
        sort: ["-", ["created"]],
    });

    onMount(() => {
        fetchGlobalSubjects();
    });

    if (browser) {
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        if (hashParams.size) {
            searchInput = hashParams.get("search") || "";
            searchPanelState = JSON.parse(hashParams.get("filter"));
        }
    }

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            doSearch();
        }
    }

    function handleBookSelect(event) {
        selectedBookId = event.detail.id;
        selectedBookData = event.detail.data;
    }

    // New function to handle book updates from BookEdit
    function handleBookUpdate(event) {
        selectedBookData = event.detail;
    }

    function doSearch() {
        updateWindowHash(searchInput, searchPanelState);
        pbSort = searchPanelState.sort[0] + searchPanelState.sort[1];
        pbFilter = createPbFilter(searchInput, searchPanelState);
    }

    function updateWindowHash(search, state) {
        if (!browser) return;
        let hash = "";

        hash = `search=${search}&filter=${JSON.stringify(state)}`;

        window.location.hash = hash;
    }

    function createPbFilter(search, state) {
        let subjectFilter = "";
        let levelFilter = "";
        
        if (state.selectedSubjects.length >= 1) {
            subjectFilter = state.selectedSubjects
                .map((subject) => `subject.id='${subject}'`)
                .join(" || ");
        }

        if (state.selectedLevels.length >= 1) {
            levelFilter = state.selectedLevels
                .map((label) => `level='${label}'`)
                .join(" || ");
        }

        let extra = [subjectFilter, levelFilter].filter(Boolean);

        if (state.showingIdType === "old") {
            extra.push(`legacy_book_id !~ 'DEPRECATED_'`);
        } else if (state.showingIdType === "new") {
            extra.push(`legacy_book_id ~ 'DEPRECATED_'`);
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

        let extraFilter = extra.join(" && ");

        if (filter && extraFilter) {
            return `${filter} && ${extraFilter}`;
        } else if (filter) {
            return filter;
        } else if (extraFilter) {
            return extraFilter;
        }
        return filter;
    }

    function changeState() {
        searchPanelState = {
            selectedSubjects: [],
            selectedLevels: ["Red"],
            sort: ["+", ["updated"]],
        };
    }

    run(() => {
        searchPanelState, doSearch();
    });
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
        <BookList
            searchQuery={pbFilter}
            sortPb={pbSort}
            selectedBookId={selectedBookId}
            on:selectBook={handleBookSelect}
        />
    </div>
    <BookPanel 
        selectedBookData={selectedBookData} 
        on:bookUpdate={handleBookUpdate}
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