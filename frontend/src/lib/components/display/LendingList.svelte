<script>
    import { onMount } from "svelte";
    import pb from "$lib/pocketbase";
    import { global } from "$lib/global.svelte.js";

    let { id } = $props();
    let transactions = $state([]);

    async function updateBorrowerBooks() {
        try {
            transactions = await pb.collection("transactions").getFullList({
                filter: `person.id = "${id}" && returned = false`,
                expand: "book",
            });
        } catch (e) {
            console.error(e);
        }
    }

    function returnBook(transactionId, personId) {
        // Implement the return book functionality
    }

    function displayInIsolation(bookId) {
        // Implement the display in isolation functionality
    }

    onMount(() => {
        updateBorrowerBooks();
    });
</script>

{#each transactions as transaction}
    <div class="book_view">
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
                        <label style="font-family:var(--the-robo-font)">ISBN: {transaction.expand.book.isbn}</label>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: end;">
                        <button onclick={() => returnBook(transaction.id, transaction.person)} class="button-circle">
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
