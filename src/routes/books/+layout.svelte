<script>
    import BookList from "$lib/components/BookList.svelte";
    import SearchPanel from "$lib/components/SearchPanel.svelte";

    let selectedBookId = "";
    let extraPbFilters = "";
    let searchInput = "";

    $: pbFilter = createPbFilter(searchInput, extraPbFilters);

    function createPbFilter(search, extra) {
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

    async function changeState() {
        selectedBookId = "7w6qye6trgvn5dt";
        searchPanelState = {
            selectedSubjects: ["31rgqvi1oeqd1ey"],
        };

        searchInput = "Hindi";
    }

    let searchPanelState = {
        selectedSubjects: [],
    };
</script>

<div class="container">
    <SearchPanel bind:searchPanelState bind:extraPbFilters />
    <div class="list-area panel">
        <div class="list-area-search">
            <div class="search-input-wrapper">
                <span class="material-symbols-outlined search-icon">search</span
                >
                <input
                    type="text"
                    class="main-search-bar"
                    placeholder="Search Books"
                    bind:value={searchInput}
                />
            </div>
        </div>
        <BookList searchQuery={pbFilter} bind:selectedBookId />
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
