<script>
    import { onDestroy } from "svelte";
    import pb from "$lib/pocketbase";
    import ListItem from "./ListItem.svelte";
    import { browser } from "$app/environment";
    import LoadingBar from "./LoadingBar.svelte";

    export let searchQuery = "";

    let books = []; //: Book[] = [];
    let isLoading = false;
    let error = null;

    $: {
        fetchBooks(searchQuery);
    }

    async function fetchBooks(filter) {
        if (browser) {
            document.startViewTransition(async () => {
                isLoading = true;
                error = null;
                try {
                    const records = await pb
                        .collection("books")
                        .getList(1, 50, {
                            filter: filter,
                            sort: "-created",
                        });
                    books = records.items;
                } catch (err) {
                    console.error("Error fetching books:", err);
                    error = "Failed to fetch books. Please try again.";
                } finally {
                    isLoading = false;
                }

                books.forEach((book) => {
                    let t = pb.collection("books").subscribe(book.id, (e) => {
                        switch (e.action) {
                            case "create":
                                books = [...books, e.record];
                                break;
                            case "update":
                                books = books.map((book) =>
                                    book.id === e.record.id ? e.record : book,
                                );
                                break;
                            case "delete":
                                books = books.filter(
                                    (book) => book.id !== e.record.id,
                                );
                                break;
                        }
                    });
                });
            });
        }
    }

    onDestroy(() => {
        pb.collection("books").unsubscribe();
    });

    export let selectedBookId = null;

    function handleBookClick(event) {
        selectedBookId = event.detail.id;
    }
</script>

<div style="overflow-y: scroll; border-radius: 0.6em;">
    {#if isLoading}
        <div class="fade-in" style="width: 30%; margin:auto;">
            <LoadingBar />
            Loading Books
        </div>
    {:else if error}
        <p style="color: red;">{error}</p>
    {:else}
        {#each books as book (book.id)}
            <ListItem
                itemType="books"
                item={book}
                isSelected={book.id == selectedBookId}
                on:ItemClick={handleBookClick}
            />
        {/each}
    {/if}
</div>
