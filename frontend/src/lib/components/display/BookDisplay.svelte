<script>
    import { page } from "$app/state";
    import { global } from "$lib/global.svelte.js";
    import IsbnText from "../isbnText.svelte";

    let { selectedData, lending_mode = false } = $props();
    let loaded = $derived(selectedData != null && selectedData.id != undefined);
</script>

{#if loaded}
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
                        global.change_page("books/" + page.params.id + "/edit");
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
            <div style="justify-content: center;">
                <img class="book-cover" src={selectedData.preview_url_override || global.getRandomBookCover(selectedData.id)} alt="book cover" />
            </div>
            <div class="book-info">
                <h1 class="book-title">{selectedData.title}</h1>
                <div class="author-grid">
                    <div>by {selectedData.author}</div>
                </div>
                <div class="book-details">
                    <div>CLL: {selectedData.classification_label}</div>
                    <div>ISBN: <IsbnText isbn={selectedData.isbn} /></div>

                    <div>ID: {selectedData.id}</div>
                    {#if selectedData.legacy_book_id != "" && !selectedData.legacy_book_id[0] == "_"}
                        <div>IDL: {selectedData.legacy_book_id}</div>
                    {/if}
                </div>
            </div>
        </div>

        <div class="description-section">
            <div>Description</div>
            <div class="description-box">{selectedData.description == "" ? "None" : selectedData.description}</div>
        </div>

        {#if selectedData.lost}
            <div class="notice">
                <span class="symbol warning-icon">warning</span>
                Book marked as lost
            </div>
        {/if}

        {#if selectedData.scrapped}
            <div class="notice">
                <span class="symbol warning-icon">warning</span>
                Book marked as scrapped
            </div>
        {/if}

        <div class="metadata">
            <div>Price: {selectedData.price} EUR</div>
            <div>Level: {selectedData.level || "None"}</div>
            <div>Subject: {selectedData?.expand?.subject?.n || "None"}</div>
            <div>Updated: {selectedData.updated}</div>
            {#if selectedData.legacy_date_entered !== ""}
                <div>Legacy Created: {selectedData.legacy_date_entered}</div>
            {/if}
            <div>Created: {selectedData.created}</div>
        </div>
    </div>
{/if}

<style>
    .symbol {
        margin-right: 0.5em;
    }

    .display-panel-display {
        gap: 0.5em;
        padding: 0.8em;
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
    }

    .return-button {
        border: 0;
        margin: 5px;
        margin-right: 0;
        height: 40px;
    }

    .book-info {
        width: 100%;
    }

    .edit-button {
        margin: 5px;
        height: 40px;
    }

    .book-general {
        margin: 0em;
        flex-direction: row;
    }

    @media (max-width: 270px) {
        .book-general {
            flex-direction: column;
            align-items: center;
        }
    }

    .book-cover {
        object-fit: contain;
        overflow: hidden;
        height: 12em;
        background-color: transparent;
        flex-shrink: 0;
        border-radius: 0.6em;
        image-rendering: pixelated;
        margin-right: 0.8em;
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
        height: 100%;
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
    }

    .warning-icon {
        translate: 0 5px;
    }

    .metadata {
        margin-top: 0.5em;
        gap: 0.8em;
    }
</style>
