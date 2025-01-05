<script>
    import { onDestroy } from "svelte";
    import pb from "$lib/pocketbase";
    import ListItem from "./ListItem.svelte";
    import LoadingBar from "./LoadingBar.svelte";
    import ListItemCreate from "./ListItemCreate.svelte";
    import { page } from "$app/stores";

    let { searchState = {} } = $props();

    //BOOK ONLY
    const collection_name = "books";
    const item_name = "book";
    const search_fields = "title, author, legacy_book_id, id, preview_url_override";
    const lazyFields = ["title", "isbn"];
    const exactFields = ["legacy_book_id", "id"];

    let items = $state([]);
    let isLoading = $state(true);
    let error = $state(null);

    function createPbSort(state) {
        return (state.sortAscending ? "-" : "+") + state.sortType;
    }
    function createPbFilter(state) {
        let subjectFilter = "";
        let levelFilter = "";

        if (state.subjects.length >= 1) {
            subjectFilter = state.subjects.map((subject) => `subject.id='${subject}'`).join(" || ");
            subjectFilter = `(${subjectFilter})`;
        }

        if (state.levels.length >= 1) {
            levelFilter = state.levels.map((label) => `level='${label}'`).join(" || ");

            levelFilter = `(${levelFilter})`;
        }

        let extra = [subjectFilter, levelFilter].filter(Boolean);

        if (state.showingIdType === "old") {
            extra.push(`legacy_book_id !~ '_'`);
        } else if (state.showingIdType === "new") {
            extra.push(`legacy_book_id ~ '_'`);
        }

        let filter = state.query
            .split(" ")
            .map((token) => token.trim())
            .filter((token) => token !== "")
            .map((cleanToken) => {
                const lazyConditions = lazyFields.map((field) => `${field} ~ "%${cleanToken}%"`).join(" || ");
                const exactConditions = exactFields.map((field) => `${field} = "${cleanToken}"`).join(" || ");
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

    async function fetchItems(filter, sort, fields, page = 1, pageSize = 10) {
        isLoading = true;
        error = null;

        try {
            const startTime = performance.now();

            const records = await pb.collection(collection_name).getList(page, pageSize, {
                filter,
                sort,
                fields,
            });

            const endTime = performance.now();
            console.log(`Request duration: ${(endTime - startTime).toFixed(2)} ms`);

            items = records.items;

            // Subscribe to the entire collection
            pb.collection(collection_name).subscribe("*", (e) => {
                document.startViewTransition(() => {
                    switch (e.action) {
                        case "create":
                            items = [e.record, ...items];
                            break;
                        case "update":
                            items = items.map((item) => (item.id === e.record.id ? e.record : item));
                            break;
                        case "delete":
                            items = items.filter((item) => item.id !== e.record.id);
                            break;
                    }
                });
            });
        } catch (err) {
            console.error(`Error fetching ${collection_name}:`, err);
            error = `Failed to fetch ${item_name}: ${err.message}`;
        } finally {
            isLoading = false;
        }
    }

    onDestroy(() => {
        pb.collection(collection_name).unsubscribe();
    });

    $effect(() => {
        fetchItems(createPbFilter(searchState), createPbSort(searchState), search_fields);
    });
</script>

<div style="overflow:hidden; overflow-y: auto; border-radius: 0.6em; height: 100%;">
    {#if isLoading}
        <div class="fade-in" style="width: 50%; margin:auto;">
            <LoadingBar />
            Loading Books
        </div>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        <ListItemCreate itemType="books" isSelected={"create" == $page.params.id} />
        {#each items as book (book.id)}
            <div>
                <ListItem itemType="books" item={book} isSelected={book.id == $page.params.id} />
            </div>
        {/each}
    {/if}
</div>
