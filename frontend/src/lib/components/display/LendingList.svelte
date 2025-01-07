<script>
    import { onMount } from "svelte";
    import pb from "$lib/pocketbase";
    import { global } from "$lib/global.svelte.js";

    let { id } = $props();

    let items = $state([]);
    let isLoading = $state(true);
    let error = $state(null);

    const collection_name = "transactions";
    const item_name = "transaction";

    async function updateBorrowerBooks(id) {
        fetchItems({ filter: `person.id = "${id}" && returned = false`, expand: `book` });
    }
    async function fetchItems(pbOptions = {}) {
        isLoading = true;
        error = null;

        try {
            const startTime = performance.now();

            const records = await pb.collection(collection_name).getFullList(pbOptions);

            const endTime = performance.now();
            console.log(`Request duration: ${(endTime - startTime).toFixed(2)} ms`);

            items = records; // different since it's getFullList not getList

            // Subscribe to the entire collection
            pb.collection(collection_name).subscribe(
                "*",
                (e) => {
                    document.startViewTransition(() => {
                        switch (e.action) {
                            case "create":
                                items = [e.record, ...items];
                                break;
                            case "update":
                                items = items.map((item) => (item.id === e.record.id ? e.record : item)).filter((item) => !item.returned);
                                break;
                            case "delete":
                                items = items.filter((item) => item.id !== e.record.id);
                                break;
                        }
                    });
                },
                { expand: pbOptions.expand },
            );
        } catch (err) {
            console.error(`Error fetching ${collection_name}:`, err);
            error = `Failed to fetch ${item_name}: ${err.message}`;
        } finally {
            isLoading = false;
        }
    }

    async function returnTransaction(id) {
        await pb.collection("transactions").update(id, { returned: true });
    }

    function displayInIsolation(bookId) {
        // Implement the display in isolation functionality
    }

    onMount(() => {
        updateBorrowerBooks(id);
    });
</script>

{#if !isLoading}
    {#each items as transaction}
        <div class="book_view" style="view-transition-name: id-{transaction.id};">
            <div style="display: flex; flex-direction: row; border-top: solid var(---surface-5) 2px;">
                <div style="margin-top: 0.5em;">
                    <img style="object-fit: cover; padding: 0.2em; width: 6em; height: calc(100% - 1em); background-color: var(---inverse-surface); border-radius: 0.6em;" src={transaction.expand.book.preview_url_override || global.getRandomBookCover(transaction.expand.book.id)} />
                </div>
                <div style="margin-bottom: 0.5em; margin-top: 0.5em; display: flex; align-items: center; width: 100%; justify-content: left; margin-left: 1em;">
                    <div style="width: 100%">
                        <div style="font-weight: bold; font-size: xx-large; text-wrap: wrap;">
                            {transaction.expand.book.title}
                        </div>
                        <div style="margin-bottom: 0.3em; padding: 0.3em; border-radius: 0.3em; font-size: 1.1em; background-color: var(---surface-3);">
                            <label style="font-family:var(--the-robo-font)">ID: {transaction.expand.book.id}</label>
                            <label style="font-family:var(--the-robo-font)">ISBN: {transaction.expand.book.isbn || "None"}</label>
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: end;">
                            <button onclick={() => returnTransaction(transaction.id)} class="button-circle">
                                <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="symbol">tab_close</span>
                            </button>
                            <button onclick={() => displayInIsolation(transaction.expand.book.id)} style="margin-left: 0.3em;" class="button-circle">
                                <span class="symbol">open_in_new</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
    {#if items.length == 0}
        <div style="display: flex; flex-direction: row; border-top: solid var(---surface-5) 2px; padding: 1em;">Not borrowing any books</div>
    {/if}
{/if}
