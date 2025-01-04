<script>
    import { run } from "svelte/legacy";
    import { page } from "$app/stores";
    import { global, constants } from "$lib/global.svelte.js";
    import IsbnText from "../isbnText.svelte";

    const defaultSelectedBookData = {};

    let { selectedBookData = $bindable(defaultSelectedBookData), lending_mode = false } = $props();
    let subjectLabel = $state("");
    run(() => {
        if (selectedBookData == undefined) {
            selectedBookData = defaultSelectedBookData;
        }
    });
</script>

<div class="quick-buttons">
    {#if lending_mode}
        <button class="lend-button">
            <div class="lend-text">Lend book to borrower</div>
        </button>
    {:else}
        <div class="action-buttons">
            <button class="return-button">
                <span class="symbol">tab_close</span>
                Return
            </button>
            <button
                class="edit-button"
                onclick={() => {
                    global.change_page("books/" + $page.params.id + "/edit");
                }}
            >
                <span class="symbol">edit</span>
                Edit
            </button>
        </div>
    {/if}
</div>
<div class="display-panel-display">
    <div class="book-general">
        <div class="cover-container">
            <img class="book-cover" src={selectedBookData.preview_url_override || global.getRandomBookCover(selectedBookData.id)} alt="book cover" />
        </div>
        <div class="book-info">
            <h1 class="book-title">{selectedBookData.title}</h1>
            <div class="author-grid">
                <div>by {selectedBookData.author}</div>
            </div>
            <div class="book-details">
                <div>CLL: {selectedBookData.classification_label}</div>
                <div>ISBN: <IsbnText isbn={selectedBookData.isbn} /></div>

                <div>ID: {selectedBookData.id}</div>
                {#if !selectedBookData.legacy_book_id?.includes("_")}
                    <div>IDL: {selectedBookData.legacy_book_id}</div>
                {/if}
            </div>
        </div>
    </div>

    <div class="description-section">
        <div>Description</div>
        <div class="description-box">{selectedBookData.description}</div>
    </div>

    {#if selectedBookData.lost}
        <div class="notice">
            <span class="symbol warning-icon">warning</span>
            Book marked as lost
        </div>
    {/if}

    {#if selectedBookData.scrapped}
        <div class="notice">
            <span class="symbol warning-icon">warning</span>
            Book marked as scrapped
        </div>
    {/if}

    <div class="metadata">
        <div>Price: {selectedBookData.price} EUR</div>
        <div>Level: {selectedBookData.level}</div>
        <div>Subject: {selectedBookData?.expand?.subject.n}</div>
        <div>Updated: {selectedBookData.updated}</div>
        {#if selectedBookData.legacy_date_entered !== ""}
            <div>Legacy Created: {selectedBookData.legacy_date_entered}</div>
        {/if}
        <div>Created: {selectedBookData.created}</div>
    </div>
</div>

<style>
    .symbol {
        margin-right: 0.5em;
    }

    .display-panel-display {
        gap: 0.5em;
    }

    .lend-button {
        margin: 5px;
        border: none;
        background-color: var(---primary);
        width: 100%;
        padding: 0 1.1em;
    }

    .lend-text {
        pointer-events: none;
        color: var(---background);
    }

    .action-buttons {
        flex-direction: row;
        margin-left: auto;
        margin-bottom: 0.8em;
    }

    .return-button {
        border: 0;
        margin: 5px;
        margin-right: 0;
        height: 40px;
    }

    .edit-button {
        margin: 5px;
        height: 40px;
    }

    .book-general {
        display: flex;
        margin: 0em;
        flex-direction: row;
    }

    @media (max-width: 270px) {
        .book-general {
            flex-direction: column;
            align-items: center;
        }
    }

    .cover-container {
        justify-content: center;
        margin: 0em 0.8em;
    }

    .book-cover {
        width: auto;
        height: auto;
        object-fit: fill;
        padding: 0.2em;
        width: min(8em, 30vw);
        height: 13em;
        background-color: var(---inverse-surface);
        border-radius: 0.6em;
        view-transition-name: book-cover;
        image-rendering: pixelated;
    }

    .book-info {
        padding: 0em 0.8em;
        font-size: 1.1em;
        width: 100%;
    }

    .book-title {
        font-weight: bold;
        font-size: min(7vw, 2em);
        margin: 0;
    }

    .author-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 0.9em;
    }

    .book-details {
        background-color: var(---surface-1);
        padding: 0.5em;
        border-radius: 0.5em;
        margin-top: 0.2em;
        font-family: var(--the-font);
        justify-content: center;
    }

    .description-section {
        margin: 0em 0.8em;
    }

    .description-box {
        padding: 0.5em;
        width: calc(100% - 1em);
        height: fit-content;
        border-radius: 0.5em;
        background-color: var(---surface-1);
        overflow: auto;
    }

    .notice {
        padding: 0.5em;
        border-radius: 0.5em;
        background-color: var(---primary-container);
        display: inline;
        margin: 0em 0.8em;
    }

    .warning-icon {
        translate: 0 5px;
    }

    .metadata {
        margin: 0.8em;
        margin-top: 0.5em;
        gap: 0.8em;
    }
</style>
