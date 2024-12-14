<script>
    import Input from "../Input.svelte";
    import pb from "$lib/pocketbase";
    import { createEventDispatcher } from "svelte";
    import { BookLevelsStore } from "$lib/levels.js";

    const dispatch = createEventDispatcher();

    let { selectedBookData = $bindable() } = $props();
    let levelChips = $BookLevelsStore;

    let isCreation = $derived(localBookData.id == null);
    let localBookData = $derived(updateLocalBookData());

    function updateLocalBookData() {
        if (selectedBookData?.id != "create") {
            return selectedBookData;
        }

        return {
            title: "",
            author: "",
            legacy_book_id: "DEPRECATED_",
            isbn: "",
            description: "",
            book_id: "",
            classification_label: "",
            level: "",
            subject: "",
            scrapped: false,
            lost: false,
            preview_url_override: "",
            price: "",
        };
    }

    function create_random_string(length) {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async function generate_unique_book_id() {
        let generated_id = "";
        for (let i = 0; i < 1000; i++) {
            try {
                generated_id = create_random_string(4);

                await pb
                    .collection("books")
                    .getFirstListItem(`book_id="${generated_id}"`);
                console.error(
                    "trying to generate a book id again because of collisions",
                );
            } catch (err) {
                console.log("Sucessfully creaded book_id: ", generated_id);
                return generated_id;
            }
        }
    }

    function editButton() {
        dispatch("EditButton");
    }

    async function saveChanges() {
        try {
            let updatedRecord;
            if (isCreation) {
                updatedRecord = await createBook(localBookData);
            } else {
                updatedRecord = await updateBook(localBookData);
            }
            // Dispatch the updated record from the server
            dispatch("bookUpdate", updatedRecord);
            editButton();
        } catch (error) {
            console.error(error);
        }
    }

    async function createBook(data) {
        await generate_unique_book_id().then((generated_id_response) => {
            localBookData.book_id = generated_id_response;
        });
        console.log("CREATING BOOK RECORD WITH DATA: ", data);
        const record = await pb.collection("books").create(data);
        return record;
    }

    async function updateBook(data) {
        return await pb.collection("books").update(data.id, { ...data });
    }

    async function deleteBook(id) {
        if (id == "creation" || id == null) {
            return;
        }
        dispatch("deleteButton");
        return await pb.collection("books").delete(id);
    }
</script>

<div class="display_panel_edit" id="display_panel_edit_details">
    <div class="display-area-quick-buttons">
        <div
            style="display: flex; margin-left: auto;"
            id="display_area_top_book_view_edit"
        >
            <button
                onclick={editButton}
                id="book_cancel_button"
                style="border: 0; margin: 5px; margin-right: 0; margin-left: auto; width:8em"
            >
                <div id="book_save_button_text">Cancel</div>
            </button>
            <button
                id="book_save_button"
                onclick={saveChanges}
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
        <Input
            style="margin-bottom:1em"
            label="Title"
            bind:value={localBookData.title}
        />
        <Input
            style="margin-bottom:1em"
            label="Author"
            bind:value={localBookData.author}
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
                display:{isCreation ? 'none' : 'flex'};
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 1em;
            "
        >
            <div
                style="display:flex; height:2.5em; margin-right: 1em; flex-direction: column; justify-content: center; font-family: 'roboto mono';"
            >
                <div style="text-wrap: nowrap;">
                    ID: {localBookData.book_id}
                </div>
                {#if !localBookData.legacy_book_id?.includes("DEPRECATED_")}
                    <div
                        style="text-wrap: nowrap;"
                        id="display_panel_book_legacy_book_id_editing"
                    >
                        IDL: {localBookData.legacy_book_id}
                    </div>
                {/if}
            </div>
            {#if !localBookData.legacy_book_id?.includes("DEPRECATED_")}
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
            bind:value={localBookData.isbn}
        />
        <div
            style="margin-bottom: 1em; align-items: normal;"
            class="input-container"
        >
            <textarea
                style="resize: none; font-size: 1em; height: 100px;"
                bind:value={localBookData.description}
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
            bind:value={localBookData.classification_label}
        />
        <div style="margin-bottom: 1em;" class="input-container">
            <select
                bind:value={localBookData.level}
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
                bind:value={localBookData.subject}
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
                    bind:checked={localBookData.scrapped}
                    id="display_panel_book_scrapped_editing"
                    type="checkbox"
                />
                <label style="margin-left: 0.3em;">Scrapped</label>
            </div>
            <div style="display: flex; margin-bottom: 0.5em;">
                <input
                    id="display_panel_book_lost_editing"
                    type="checkbox"
                    bind:checked={localBookData.lost}
                />
                <label style="margin-left: 0.3em;">Lost</label>
            </div>
        </div>
        <Input
            style="margin-bottom:1em"
            label="Price (EUR)"
            type="number"
            min="0"
            bind:value={localBookData.price}
        />
        <Input
            style="margin-bottom:1em"
            label="Cover Image URL"
            placeholder="Automatic"
            bind:value={localBookData.preview_url_override}
        />
        <button
            style="display:{isCreation ? 'none' : 'flex'}"
            onclick={deleteBook(localBookData.id)}>Delete Book Forever</button
        >
    </div>
</div>
