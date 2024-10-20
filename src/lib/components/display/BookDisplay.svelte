<script>
    export let selectedBookData = {
        preview_url_override: "",
        title: "",
        author: "",
        id: "",
        created: "",
        updated: "",
        legacy_date_entered: "",
        subject: "",
        level: "",
        price: "",
        classification_label: "",
        isbn: "",
        book_id: "",
        legacy_book_id: "",
        description: "",
        lost: true,
        scrapped: true,
    };
    export let lending_mode = false;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function editButton() {
        dispatch("EditButton");
    }
</script>

<div class="display_panel_display">
    <div class="display-area-quick-buttons">
        {#if lending_mode}
            <div>
                <button
                    onclick=""
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
                    style="border: 0; margin: 5px; margin-right: 0; margin-left: auto; width:8em"
                >
                    Return
                </button>
                <button
                    on:click={editButton}
                    style="margin: 5px; margin-right: 5px; width:8em"
                >
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
                    <div style="justify-self: end;">
                        CLL: {selectedBookData.classification_label}
                    </div>
                    <div>
                        ISBN: {selectedBookData.isbn}
                    </div>
                    <div>
                        ID: {selectedBookData.book_id}
                    </div>
                    {#if !selectedBookData.legacy_book_id?.includes("DEPRECATED_")}
                        <div>
                            IDL: {selectedBookData.legacy_book_id}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
    <!--
    <div
        style="display: flex; display: none; margin: 0.2em; border: 3px solid var(---surface-1); border-left: 0; border-right: 0;"
    >
        <div
            style="margin: 0.5em; display: flex; flex-direction: column; justify-content: center;"
        >
            <button
                style="
                                    object-fit: fill;
                                    padding: 0.2em;
                                    width: min(8.4em, 31.7vw);
                                    height: 5em;
                                    border: 0.2em dashed var(---inverse-surface);
                                    border-radius: 0.6em;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
            >
                <span
                    style="user-select: none; font-size: 2em;"
                    class="material-symbols-outlined"
                >
                    person_add
                </span>
            </button>
        </div>
        <div
            style="padding: 0.5em; font-size: 1.1em; display: flex; flex-direction: column; justify-content: center;"
        >
            <div
                style="font-weight: bold; font-size: min(5vw, 1.3em); flex-direction: row; display: flex;"
            >
                Joe Esposito
                <div style="font-weight: lighter;">&nbsp11.4</div>
            </div>
            <div
                style="width: fit-content; background-color: var(---surface-5); padding: 0.4em; border-radius: 0.4em; font-family: var(--the-font);"
            >
                <div class="tooltip">
                    <div
                        style="user-select: none; display: flex; font-size: min(4vw, 1em); align-items: center;"
                    >
                        <div>ID: t2m</div>
                    </div>
                    <span class="tooltiptext">Copy</span>
                </div>
            </div>
        </div>
    </div>-->
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
                <span
                    style="translate: 0 5px;"
                    class="material-symbols-outlined"
                >
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
                <span
                    style="translate: 0 5px;"
                    class="material-symbols-outlined"
                >
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
        Subject: {selectedBookData.subject}
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
