<script>
    import BookList from "$lib/components/BookList.svelte";
    import SearchPanel from "$lib/components/SearchPanel.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import BookPanel from "$lib/components/display/BookPanel.svelte";

    let selectedBookId = "";
    let searchInput = "";
    let pbFilter = "";
    let pbSort = "-created";
    const defaultState = {
        selectedSubjects: [],
        selectedLevels: [],
        showingIdType: "both",
        sort: ["-", ["created"]],
    };
    let searchPanelState = {
        selectedSubjects: [],
        selectedLevels: [],
        showingIdType: "both",
        sort: ["-", ["created"]],
    };

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
            hash = `search=${search}&filter=${JSON.stringify(state)}`;
        } else if (search) {
            hash = `search=${search}`;
        }

        window.location.hash = hash;
    }

    function createPbFilter(search, state) {
        let subjectFilter = "";
        let levelFilter = "";
        // Create filter for selected subjects
        if (state.selectedSubjects.length >= 1) {
            subjectFilter = state.selectedSubjects
                .map((subject) => `subject.subject='${subject}'`)
                .join(" || ");
        }

        // Create filter for selected levels
        if (state.selectedLevels.length >= 1) {
            levelFilter = state.selectedLevels
                .map((label) => `level='${label}'`)
                .join(" || ");
        }

        // Combine subject and level filters if both exist
        let extra = [subjectFilter, levelFilter].filter(Boolean);

        // Add logic for showingIdType filter
        if (state.showingIdType === "old") {
            extra.push(`legacy_book_id !~ 'DEPRECATED_'`);
        } else if (state.showingIdType === "new") {
            extra.push(`legacy_book_id ~ 'DEPRECATED_'`);
        }
        //if "both" dont add anything

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

        // Combine search filter with extra filters if they exist
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
    let selectedBookData;
</script>

<!--<button on:click={changeState}>Test Change State</button>-->
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
            bind:selectedBookId
            bind:selectedBookData
        />
    </div>
    <BookPanel bind:selectedBookData></BookPanel>
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
