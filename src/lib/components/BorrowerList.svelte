<script>
    import { onDestroy } from "svelte";
    import pb from "$lib/pocketbase";
    import ListItem from "./ListItem.svelte";
    import { browser } from "$app/environment";
    import LoadingBar from "./LoadingBar.svelte";
    import ListItemCreate from "./ListItemCreate.svelte";
    import { page } from "$app/stores";

    let { searchState = {} } = $props();

    let items = $state([]);
    let isLoading = $state(true);
    let error = $state(null);

    function createPbSort(state) {
        return (state.sortAscending ? "-" : "+") + state.sortType;
    }
    function createPbFilter(state) {
        let extra = [];

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
                items = records.items;
            } catch (err) {
                console.error("Error fetching borrowers:", err);
                error = "Failed to fetch borrowers. Please try again.";
            } finally {
                isLoading = false;
            }

            items.forEach((borrower) => {
                let t = pb
                    .collection("borrowers")
                    .subscribe(borrower.id, (e) => {
                        switch (e.action) {
                            case "create":
                                items = [...items, e.record];
                                break;
                            case "update":
                                items = items.map((borrower) =>
                                    borrower.id === e.record.id
                                        ? e.record
                                        : borrower
                                );
                                break;
                            case "delete":
                                items = items.filter(
                                    (borrower) => borrower.id !== e.record.id
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
            isSelected={"create" == $page.params.borrower_id}
        />
        {#each items as borrower (borrower.id)}
            <ListItem
                itemType="borrowers"
                item={borrower}
                isSelected={borrower.borrower_id == $page.params.borrower_id}
            />
        {/each}
    {/if}
</div>
