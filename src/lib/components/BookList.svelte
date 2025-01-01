<script>
    import { onDestroy } from "svelte";
    import pb from "$lib/pocketbase";
    import ListItem from "./ListItem.svelte";
    import LoadingBar from "./LoadingBar.svelte";
    import ListItemCreate from "./ListItemCreate.svelte";
    import { page } from "$app/stores";

    let { searchState = {} } = $props();

    let books = $state([]);
    let isLoading = $state(true);
    let error = $state(null);

    function createPbSort(state) {
        return (state.sortAscending ? "-" : "+") + state.sortType;
    }
    function createPbFilter(state) {
        let subjectFilter = "";
        let levelFilter = "";

        if (state.subjects.length >= 1) {
            subjectFilter = state.subjects
                .map((subject) => `subject.id='${subject}'`)
                .join(" || ");
            subjectFilter = `(${subjectFilter})`;
        }

        if (state.levels.length >= 1) {
            levelFilter = state.levels
                .map((label) => `level='${label}'`)
                .join(" || ");

            levelFilter = `(${levelFilter})`;
        }

        let extra = [subjectFilter, levelFilter].filter(Boolean);

        if (state.showingIdType === "old") {
            extra.push(`legacy_book_id !~ '_'`);
        } else if (state.showingIdType === "new") {
            extra.push(`legacy_book_id ~ '_'`);
        }

        const lazyFields = ["title", "isbn"];
        const exactFields = ["legacy_book_id", "book_id"];

        let filter = state.query
            .split(" ")
            .map((token) => token.trim())
            .filter((token) => token !== "")
            .map((cleanToken) => {
                const lazyConditions = lazyFields
                    .map((field) => `${field} ~ "%${cleanToken}%"`)
                    .join(" || ");
                const exactConditions = exactFields
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

    async function fetchBooks(filter, sort, page = 1, pageSize = 10) {
        isLoading = true;
        error = null;

        try {
            const startTime = performance.now();

            const records = await pb
                .collection("books")
                .getList(page, pageSize, {
                    filter,
                    sort,
                    fields: "title, author, legacy_book_id, book_id, id, preview_url_override",
                });

            const endTime = performance.now();
            console.log(
                `Request duration: ${(endTime - startTime).toFixed(2)} ms`
            );

            books = records.items;

            // Subscribe to the entire collection
            pb.collection("books").subscribe("*", (e) => {
                document.startViewTransition(() => {
                    switch (e.action) {
                        case "create":
                            books = [e.record, ...books];
                            break;
                        case "update":
                            books = books.map((book) =>
                                book.id === e.record.id ? e.record : book
                            );
                            break;
                        case "delete":
                            books = books.filter(
                                (book) => book.id !== e.record.id
                            );
                            break;
                    }
                });
            });
        } catch (err) {
            console.error("Error fetching books:", err);
            error = `Failed to fetch books: ${err.message}`;
        } finally {
            isLoading = false;
        }
    }

    onDestroy(() => {
        pb.collection("books").unsubscribe();
    });

    $effect(() => {
        fetchBooks(createPbFilter(searchState), createPbSort(searchState));
    });
</script>

<div
    style="overflow:hidden; overflow-y: scroll;
    border-radius: 0.6em;
    height: 100%;"
>
    {#if isLoading}
        <div class="fade-in" style="width: 50%; margin:auto;">
            <LoadingBar />
            Loading Books
        </div>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        <ListItemCreate
            itemType="books"
            isSelected={"create" == $page.params.book_id}
        />
        {#each books as book (book.book_id)}
            <div>
                <ListItem
                    itemType="books"
                    item={book}
                    isSelected={book.book_id == $page.params.book_id}
                />
            </div>
        {/each}
    {/if}
</div>
