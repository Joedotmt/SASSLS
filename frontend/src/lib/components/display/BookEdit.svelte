<script>
    import Input from "../Input.svelte";
    import pb from "$lib/pocketbase";
    import { global, constants } from "$lib/global.svelte.js";
    import { slide } from "svelte/transition";
    global.unsaved_changes = true;

    let { selectedBookData, bookUpdate } = $props();

    let loaded = $state(false);
    let localBookData = $state(null);

    $effect(() => {
        if (selectedBookData !== null && !loaded) {
            localBookData = JSON.parse(JSON.stringify(selectedBookData));
            loaded = true;
        }
    });

    let isCreation = $derived(false);

    async function saveChanges() {
        let updatedRecord;
        if (isCreation) {
            updatedRecord = await createItem(localBookData);
        } else {
            updatedRecord = await updateItem(localBookData);
        }
        // the updated record from the server
        bookUpdate(updatedRecord);
        global.change_page("books/" + $page.params.id, true);
    }

    let errorMessage = $state("");
    let fieldErrors = $state({});

    function showErrorAlert(errorData) {
        try {
            const errorFields = errorData.response.data;
            errorMessage = "Error updating book record <br>";

            // Reset all field errors
            fieldErrors = {};

            // Set error states for fields with errors
            for (const field in errorFields) {
                if (errorFields.hasOwnProperty(field)) {
                    errorMessage += `${field}: ${errorFields[field].message}\n`;
                    fieldErrors[field] = true;
                }
            }
        } catch (e) {
            errorMessage = "An unexpected error occurred.";
        }
    }

    async function createItem(data) {
        try {
            console.log("CREATING BOOK RECORD WITH DATA: ", data);
            const record = await pb.collection("books").create(data);
            return record;
        } catch (error) {
            showErrorAlert(error);
        }
    }

    async function updateItem(data) {
        try {
            return await pb.collection("books").update(data.id, { ...data });
        } catch (error) {
            showErrorAlert(error);
            throw error;
        }
    }

    async function deleteItem(id) {
        if (id == "creation" || id == null) {
            return;
        }
        try {
            await pb.collection("books").delete(id);
            setTimeout(() => {
                global.change_page("books", true);
            }, 500);
        } catch (error) {
            alert("Error deleting book record: " + error.message);
            throw error;
        }
    }

    import { page } from "$app/stores";
</script>

{#if loaded}
    <div class="display_panel_edit" id="display_panel_edit_details">
        <div>
            <div style="display: flex; margin-left: auto; flex-direction: row;" id="display_area_top_book_view_edit">
                <button
                    onclick={() => {
                        global.change_page("books/" + $page.params.id, true);
                    }}
                    style="border: 0; margin: 5px; margin-right: 0; margin-left: auto;"
                >
                    <span class="symbol button-icon"> cancel </span>
                    Cancel
                </button>
                <button onclick={saveChanges} style="--bg: var(---primary-container); border: none; margin: 5px; margin-right: 5px; height: 40px; width: 80px;">
                    <span class="symbol button-icon"> save </span>
                    Save
                </button>
            </div>
        </div>
        <div style="padding: 2em;">
            {#if errorMessage != ""}
                <div transition:slide style="margin-bottom: 2rem; color: rgb(255, 80, 80) !important;">
                    {@html errorMessage}
                </div>
            {/if}

            <Input style="margin-bottom:1em" label="Title" bind:value={localBookData.title} />
            <Input style="margin-bottom:1em" label="Author" bind:value={localBookData.author} />

            <div
                style=" background-color: var(---surface-1); padding: 0.5em; flex-grow: 1; font-size: 1.2em; border-radius: 0.5em; margin-top: 0.2em; font-family: var(--the-font); display:{isCreation ? 'none' : 'flex'}; flex-direction: row; justify-content: space-between; margin-bottom: 1em; "
            >
                <div style="display:flex; height:2.5em; margin-right: 1em; flex-direction: column; justify-content: center; font-family: 'roboto mono';">
                    <div style="text-wrap: nowrap;">
                        ID: {localBookData.id}
                    </div>
                    {#if !localBookData.legacy_book_id?.includes("_")}
                        <div style="text-wrap: nowrap;" id="display_panel_book_legacy_book_id_editing">
                            IDL: {localBookData.legacy_book_id}
                        </div>
                    {/if}
                </div>
                {#if !localBookData.legacy_book_id?.includes("_")}
                    <button id="j5498" style="text-wrap:balance; width: fit-content; margin: auto; height: fit-content; letter-spacing: 0; margin-right: 0;"> Migrate to New ID </button>
                {/if}
            </div>
            <Input style="margin-bottom:1em" error={fieldErrors["isbn"] || false} label="ISBN" bind:value={localBookData.isbn} />

            <Input style="margin-bottom:1em" label="Description" type="textarea" bind:value={localBookData.description} />
            <Input style="margin-bottom:1em" label="Classification Label" bind:value={localBookData.classification_label} />

            <Input style="margin-bottom:1em" label="Level" type="select" bind:value={localBookData.level}>
                {#each constants.books.levels as { label, id }}
                    <option value={id}>{label}</option>
                {/each}</Input
            >

            <Input style="margin-bottom:1em" label="Subject" type="select" bind:value={localBookData.subject}>
                {#each constants.books.subjects as { subject, id }}
                    <option value={id}>{subject}</option>
                {/each}</Input
            >

            <div style="margin-bottom: 0.8em; font-size: 1.4em;">
                <div style=" margin-bottom: 0.5em;">
                    <input bind:checked={localBookData.scrapped} id="display_panel_book_scrapped_editing" type="checkbox" />
                    <label style="margin-left: 0.3em;">Scrapped</label>
                </div>
                <div style="display: flex; margin-bottom: 0.5em;">
                    <input id="display_panel_book_lost_editing" type="checkbox" bind:checked={localBookData.lost} />
                    <label style="margin-left: 0.3em;">Lost</label>
                </div>
            </div>
            <Input style="margin-bottom:1em" label="Price (EUR)" type="number" min="0" bind:value={localBookData.price} />
            <Input style="margin-bottom:1em" label="Cover Image URL" placeholder="Automatic" bind:value={localBookData.preview_url_override} />
            <button style="display:{isCreation ? 'none' : 'flex'}" onclick={() => deleteItem(localBookData.id)}>Delete Book Forever</button>
        </div>
    </div>
{/if}
