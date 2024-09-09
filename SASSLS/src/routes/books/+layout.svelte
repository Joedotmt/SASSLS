<script>
    import { onMount } from "svelte";
    import BookList from "$lib/components/BookList.svelte";
    import FilterSelector from "$lib/components/FilterSelector.svelte";
    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import pb from "$lib/pocketbase";

    let selectedBookId = "";
    let searchInput = "";
    let bookSubjects = [];
    let filterDialog;

    $: pbFilter = createPbFilter(searchInput);

    onMount(() => {
        fetchSubjects();
    });

    function createPbFilter(search) {
        const bookLazyFields = ["title", "isbn"];
        const bookExactFields = ["legacy_book_id", "book_id"];

        return search
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
    }

    async function fetchSubjects() {
        try {
            const records = await pb.collection("books_subjects").getFullList({
                sort: "-created",
            });
            bookSubjects = records.map((record) => ({
                id: record.id,
                subject: record.subject,
            }));
        } catch (err) {
            console.error("Error fetching subjects:", err);
        }
    }

    function openFilters() {
        filterDialog.showModal();
    }

    function closeFilters() {
        filterDialog.close();
    }
</script>

<div>Selected Book ID: {selectedBookId}</div>
<div>Selected Filters IDs: {selectedBookId}</div>

<div class="container">
    <div class="search-area panel">
        <Accordion>
            <span slot="head">Subjects</span>
            <ChipGroup
                slot="details"
                items={bookSubjects.map((subject) => ({
                    label: subject.subject,
                    id: subject.id,
                }))}
            />
        </Accordion>
    </div>

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

        <dialog
            class="filter-dialog"
            bind:this={filterDialog}
            on:close={closeFilters}
        >
            <FilterSelector />
        </dialog>

        <BookList searchQuery={pbFilter} bind:selectedBookId />
    </div>
</div>

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

    .filter-dialog::backdrop {
        opacity: 1;
    }
    .filter-dialog {
        border-radius: 10px;
    }
</style>
