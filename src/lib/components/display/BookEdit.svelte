<script>
    import Input from "../Input.svelte";
    import pb from "$lib/pocketbase";
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

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function editButton() {
        dispatch("EditButton");
    }

    async function saveChanges() {
        const isCreation = selectedBookData.id === "creation";

        try {
            if (isCreation) {
                await createBook(selectedBookData);
            } else {
                await updateBook(selectedBookData);
            }
        } catch (error) {
            handleError(error);
        }
        editButton();
    }

    import { BookLevelsStore } from "$lib/levels.js";
    let levelChips = $BookLevelsStore;

    function handleError(error) {
        console.error(error);
        // const issueString = Object.entries(error.data.data)
        //     .map(([key, value]) => `\n${key}: ${value.message}`)
        //     .join("");
        // alert(
        //     `Error code: ${error.data.code}\nMessage: ${error.data.message}\n\nIssues:${issueString}`,
        // );
    }

    async function createBook(data) {
        console.log("CREATING BOOK RECORD WITH DATA: ", data);
        data.book_id = generatedid_book;
        data.legacy_book_id = "DEPRECATED_";
        pb.collection("books").create(data);
    }

    async function updateBook(data) {
        console.log("UPDATING BOOK RECORD WITH DATA: ", data);
        pb.collection("books").update(selectedBookData.id, data);
    }
</script>

<div class="display_panel_edit" id="display_panel_edit_details">
    <div class="display-area-quick-buttons">
        <div
            style="display: flex; margin-left: auto;"
            id="display_area_top_book_view_edit"
        >
            <button
                on:click={editButton}
                id="book_cancel_button"
                style="border: 0; margin: 5px; margin-right: 0; margin-left: auto; width:8em"
            >
                <div id="book_save_button_text">Cancel</div>
            </button>
            <button
                id="book_save_button"
                on:click={saveChanges}
                style="background-color: var(---primary); border: none; margin: 5px; margin-right: 5px; width:8em"
            >
                <div
                    style="color: var(---background);"
                    id="book_save_button_text"
                >
                    Save
                </div>
            </button>
        </div>
    </div>
    <div style="padding: 2em;">
        <!-- WHY DOES THIS HAVE TO BE HERE FOR IT TO WORK????-->
        <div style="display: none;">{selectedBookData.title}</div>
        <!--???????????-->
        <Input
            style="margin-bottom:1em"
            label="Title"
            bind:value={selectedBookData.title}
        />
        <Input
            style="margin-bottom:1em"
            label="Author"
            bind:value={selectedBookData.author}
        />

        <div
            style="
                                background-color: var(---surface-1);
                                padding: 0.5em;
                                flex-grow: 1;
                                font-size: 1.2em;
                                border-radius: 0.5em;
                                margin-top: 0.2em;
                                font-family: var(--the-font);
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                margin-bottom: 1em;
                            "
        >
            <div
                style="height:2.5em; margin-right: 1em; display: flex; flex-direction: column; justify-content: center; font-family: 'roboto mono';"
            >
                <div
                    style="text-wrap: nowrap;"
                    id="display_panel_book_book_id_editing"
                >
                    ID: {selectedBookData.book_id}
                </div>
                {#if !selectedBookData.legacy_book_id?.includes("DEPRECATED_")}
                    <div
                        style="text-wrap: nowrap;"
                        id="display_panel_book_legacy_book_id_editing"
                    >
                        IDL: {selectedBookData.legacy_book_id}
                    </div>
                {/if}
            </div>
            {#if !selectedBookData.legacy_book_id?.includes("DEPRECATED_")}
                <button
                    id="j5498"
                    style="text-wrap:balance; width: fit-content; margin: auto; height: fit-content; letter-spacing: 0; margin-right: 0;"
                >
                    Migrate to New ID
                </button>
            {/if}
        </div>
        <Input
            style="margin-bottom:1em"
            label="ISBN"
            bind:value={selectedBookData.isbn}
        />
        <div
            style="margin-bottom: 1em; align-items: normal;"
            class="input-container"
        >
            <textarea
                style="resize: none; font-size: 1em; height: 100px;"
                value={selectedBookData.description}
                type="text"
                class="input-google"
            ></textarea>
            <label style="--translateamount: -1.15em;" class="input-placeholder"
                >Description</label
            >
        </div>
        <Input
            style="margin-bottom:1em"
            label="Classification Label"
            bind:value={selectedBookData.classification_label}
        />
        <div style="margin-bottom: 1em;" class="input-container">
            <select
                bind:value={selectedBookData.level}
                style="width: 100%;"
                id="display_panel_book_level_editing"
                type="text"
                class="input-google"
            >
                {#each levelChips as { label, id }}
                    <option value={id}>{label}</option>
                {/each}
            </select>
            <label class="input-placeholder">Level</label>
        </div>

        <div
            style="margin-bottom: 1em; flex-basis: 8em;"
            class="input-container"
        >
            <select
                id="display_panel_book_subject_editing"
                style="width: 100%;"
                type="text"
                class="input-google"
            >
                <optgroup style="font-size: 0;" id="kej0f4jj05___2" label=""
                ></optgroup>
                <optgroup style="font-size: 1px;" id="kj0f4jj05__2" label=""
                ></optgroup>
                <optgroup id="nv9tuni9_2" label="Resources"></optgroup>
            </select>
            <label class="input-placeholder">Subject</label>
        </div>
        <div style="margin-bottom: 0.8em; font-size: 1.4em;">
            <div style="display: flex; margin-bottom: 0.5em;">
                <input
                    checked={selectedBookData.scrapped ? "scrapped" : ""}
                    id="display_panel_book_scrapped_editing"
                    type="checkbox"
                />
                <label style="margin-left: 0.3em;">Scrapped</label>
            </div>
            <div style="display: flex; margin-bottom: 0.5em;">
                <input
                    id="display_panel_book_lost_editing"
                    type="checkbox"
                    checked={selectedBookData.lost ? "checked" : ""}
                />
                <label style="margin-left: 0.3em;">Lost</label>
            </div>
        </div>
        <Input
            style="margin-bottom:1em"
            label="Price (EUR)"
            type="number"
            min="0"
            bind:value={selectedBookData.price}
        />
        <Input
            style="margin-bottom:1em"
            label="Cover Image URL"
            placeholder="Automatic"
            bind:value={selectedBookData.preview_url_override}
        />
    </div>
</div>
