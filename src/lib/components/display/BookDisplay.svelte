<script>
    import { run } from "svelte/legacy";
    import { page } from "$app/stores";
    import { global } from "$lib/global.svelte.js";

    const defaultSelectedBookData = {};

    import { BookSubjectsStore } from "$lib/levels.js";

    let {
        style = "",
        selectedBookData = $bindable(defaultSelectedBookData),
        lending_mode = false,
    } = $props();
    let subjectLabel = $state("");
    run(() => {
        if (selectedBookData == undefined) {
            selectedBookData = defaultSelectedBookData;
        }
    });
    // Subscribe to the BookSubjectsStore to get the list of subjects
    run(() => {
        if (selectedBookData.subject && $BookSubjectsStore) {
            const foundSubject = $BookSubjectsStore.find(
                (subj) => subj.id === selectedBookData.subject
            );
            subjectLabel = foundSubject
                ? foundSubject.subject
                : "Unknown subject";
        }
    });
</script>

<div {style} class="display-panel-display">
    <div class="display-area-quick-buttons">
        {#if lending_mode}
            <div>
                <button
                    style="margin: 5px; border: none; background-color: var(---primary); width: 100%; padding: 0 1.1em;"
                >
                    <div
                        style="pointer-events: none; color: var(---background);"
                    >
                        Lend book to borrower
                    </div>
                </button>
            </div>
        {:else}
            <div style="display: flex; margin-left: auto;">
                <button
                    style="border: 0; margin: 5px; margin-right: 0px; height: 40px;"
                >
                    <span class="symbol"> tab_close </span>
                    Return
                </button>
                <button
                    onclick={() => {
                        global.change_page(
                            "books/" + $page.params.book_id + "/edit"
                        );
                    }}
                    class="button-circle"
                    style="margin: 5px; margin-right: 5px; height: 40px; width: 80px;"
                >
                    <span class="symbol"> edit </span>
                    Edit
                </button>
            </div>
        {/if}
    </div>
    <div class="display-panel-book-general">
        <div
            style="margin: 0.5em; display: flex; flex-direction: column; justify-content: center;"
        >
            <img
                class="display_panel_book_cover"
                src={selectedBookData.preview_url_override}
                alt="book cover"
            />
        </div>
        <div
            style="padding: 0.5em; font-size: 1.1em; display: flex; flex-direction: column; width: 100%;"
        >
            <div style="font-weight: bold; font-size: min(7vw, 2em);">
                {selectedBookData.title}
            </div>
            <div
                style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; font-size: 0.9em;"
            >
                <div>
                    by {selectedBookData.author}
                </div>
            </div>
            <div class="e00j430985t">
                <div
                    style="
                                        background-color: var(---surface-1);
                                        padding: 0.5em;
                                        flex-grow: 1;
                                        border-radius: 0.5em;
                                        margin-top: 0.2em;
                                        font-family: var(--the-font);
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;
                                    "
                >
                    <div style="justify-self: end; text-wrap:nowrap">
                        CLL: {selectedBookData.classification_label}
                    </div>
                    <div>
                        ISBN: {selectedBookData.isbn}
                    </div>
                    <div>
                        ID: {selectedBookData.book_id}
                    </div>
                    {#if !selectedBookData.legacy_book_id?.includes("_")}
                        <div>
                            IDL: {selectedBookData.legacy_book_id}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <div style="margin: 0.8em; margin-top: 0.5em;">
        Description
        <div
            style="padding: 0.5em; width: calc(100% - 1em); height: 5em; border-radius: 0.5em; background-color: var(---surface-1);"
        >
            {selectedBookData.description}
        </div>
    </div>

    {#if selectedBookData.lost}
        <div style="margin: 0.8em; margin-top: 0.5em; margin-bottom: 0.3em;">
            <div
                style="padding: 0.5em; width: calc(100% - 1em); border-radius: 0.5em; background-color: var(---primary-container);"
            >
                <span style="translate: 0 5px;" class="symbol">
                    warning
                </span>&nbsp Book marked as lost
            </div>
        </div>
    {/if}
    {#if selectedBookData.scrapped}
        <div style="margin: 0.8em; margin-top: 0em;">
            <div
                style="padding: 0.5em; width: calc(100% - 1em); border-radius: 0.5em; background-color: var(---primary-container);"
            >
                <span style="translate: 0 5px;" class="symbol">
                    warning
                </span>&nbsp Book marked as scrapped
            </div>
        </div>
    {/if}
    {#if selectedBookData.price > 0}
        <div style="margin: 0.8em; margin-top: 0.5em;">
            Price: {selectedBookData.price} EUR
        </div>
    {/if}

    <div style="margin: 0.8em; margin-top: 0.5em;">
        Subject: {subjectLabel}
    </div>

    <div style="margin: 0.8em; margin-top: 0.5em;">
        Level: {selectedBookData.level}
    </div>
    <div style="margin: 0.8em; margin-top: 0.5em;">
        Updated: {selectedBookData.updated}
    </div>
    {#if selectedBookData.legacy_date_entered !== ""}
        <div style="margin: 0.8em; margin-top: 0.5em;">
            Legacy Created: {selectedBookData.legacy_date_entered}
        </div>
    {/if}
    <div style="margin: 0.8em; margin-top: 0.5em; opacity: 0.5;">
        SYS_CREATED: {selectedBookData.created}
    </div>
    <div style="margin: 0.8em; margin-top: 0.5em; opacity: 0.5;">
        SYS_ID: {selectedBookData.id}
    </div>
</div>
