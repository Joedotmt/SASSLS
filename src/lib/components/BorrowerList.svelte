<script>
    import { onDestroy } from "svelte";
    import pb from "$lib/pocketbase";
    import ListItem from "./ListItem.svelte";
    import { browser } from "$app/environment";
    import LoadingBar from "./LoadingBar.svelte";
    import ListItemCreate from "./ListItemCreate.svelte";

    let {
        searchState = {},
        selectedBorrowerId: selectedBorrowerId = $bindable(""),
        borrowers: borrowers = $bindable([]),
    } = $props();

    let isLoading = $state(true);
    let error = $state(null);

    function createPbSort(state) {
        return (state.sortAscending ? "-" : "+") + state.sortType;
    }
    function createPbFilter(state) {
        // let subjectFilter = "";
        // let levelFilter = "";

        // if (state.subjects.length >= 1) {
        //     subjectFilter = state.subjects
        //         .map((subject) => `subject.id='${subject}'`)
        //         .join(" || ");
        //     subjectFilter = `(${subjectFilter})`;
        // }

        // if (state.levels.length >= 1) {
        //     levelFilter = state.levels
        //         .map((label) => `level='${label}'`)
        //         .join(" || ");

        //     levelFilter = `(${levelFilter})`;
        // }

        let extra = []; //[subjectFilter, levelFilter].filter(Boolean);

        // if (state.showingIdType === "old") {
        //     extra.push(`legacy_borrower_id !~ '_'`);
        // } else if (state.showingIdType === "new") {
        //     extra.push(`legacy_borrower_id ~ '_'`);
        // }

        const borrowerLazyFields = ["name", "surname", "group"];
        const borrowerExactFields = ["borrower_id"];

        let filter = state.query
            .split(" ")
            .map((token) => token.trim())
            .filter((token) => token !== "")
            .map((cleanToken) => {
                const lazyConditions = borrowerLazyFields
                    .map((field) => `${field} ~ "%${cleanToken}%"`)
                    .join(" || ");
                const exactConditions = borrowerExactFields
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

    async function fetchBorrowers(filter, sort) {
        if (browser) {
            isLoading = true;
            error = null;
            try {
                const records = await pb
                    .collection("borrowers")
                    .getList(1, 10, {
                        filter: filter,
                        sort: sort,
                        requestKey: null,
                    });
                borrowers = records.items;
            } catch (err) {
                console.error("Error fetching borrowers:", err);
                error = "Failed to fetch borrowers. Please try again.";
            } finally {
                isLoading = false;
            }

            borrowers.forEach((borrower) => {
                let t = pb
                    .collection("borrowers")
                    .subscribe(borrower.id, (e) => {
                        switch (e.action) {
                            case "create":
                                borrowers = [...borrowers, e.record];
                                break;
                            case "update":
                                borrowers = borrowers.map((borrower) =>
                                    borrower.id === e.record.id
                                        ? e.record
                                        : borrower,
                                );
                                break;
                            case "delete":
                                borrowers = borrowers.filter(
                                    (borrower) => borrower.id !== e.record.id,
                                );
                                break;
                        }
                    });
            });
        }
    }

    onDestroy(() => {
        pb.collection("borrowers").unsubscribe();
    });

    function handleBorrowerClick(event) {
        selectedBorrowerId = event.detail;
    }

    $effect(() => {
        fetchBorrowers(createPbFilter(searchState), createPbSort(searchState));
    });
</script>

<div
    style="overflow-y: scroll;
    border-radius: 0.6em;
    height: 100%;"
>
    {#if isLoading}
        <div class="fade-in" style="width: 50%; margin:auto;">
            <LoadingBar />
            Loading Borrowers
        </div>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        <ListItemCreate
            itemType="borrowers"
            isSelected={"create" == selectedBorrowerId}
            on:ItemClick={handleBorrowerClick}
        />
        {#each borrowers as borrower (borrower.id)}
            <ListItem
                itemType="borrowers"
                item={borrower}
                isSelected={borrower.id == selectedBorrowerId}
                on:ItemClick={handleBorrowerClick}
            />
        {/each}
    {/if}
</div>
