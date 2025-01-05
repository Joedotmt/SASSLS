<script>
    import Input from "../Input.svelte";
    import pb from "$lib/pocketbase";
    import { global, constants } from "$lib/global.svelte.js";
    import { slide } from "svelte/transition";
    import { page } from "$app/state";

    let { selectedData } = $props();
    let localData = $state(null);

    // BOOK SPESIFIC //
    const collection_name = "books";
    const item_name = "book";
    let legacy_book = $derived(localData.legacy_book_id[0] == "_");

    let loaded = $state(false);
    let isCreation = $derived(localData.id == undefined);

    ////////////////////////////////////////////////////////////////////////////////////////

    global.unsaved_changes = true;

    $effect(() => {
        if (selectedData !== null && !loaded) {
            localData = JSON.parse(JSON.stringify(selectedData));
            loaded = true;
        }
    });

    async function saveChanges() {
        let updatedRecord;
        if (isCreation) {
            updatedRecord = await createItem(localData);
        } else {
            updatedRecord = await updateItem(localData);
        }
        global.change_page(collection_name + "/" + updatedRecord.id, true);
    }

    let errorMessage = $state("");
    let fieldErrors = $state({});

    function showErrorAlert(errorData) {
        try {
            const errorFields = errorData.response.data;
            errorMessage = `Error updating ${item_name} record <br>`;

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
            console.log(`CREATING ${item_name.toUpperCase()} RECORD WITH DATA: `, $state.snapshot(data));
            const record = await pb.collection(collection_name).create(data);
            return record;
        } catch (error) {
            console.log(error.response);
            showErrorAlert(error);
        }
    }

    async function updateItem(data) {
        try {
            return await pb.collection(collection_name).update(data.id, { ...data });
        } catch (error) {
            showErrorAlert(error);
            throw error;
        }
    }

    async function deleteItem(id) {
        try {
            await pb.collection(collection_name).delete(id);
            setTimeout(() => {
                global.change_page(collection_name, true);
            }, 500);
        } catch (error) {
            alert(`Error deleting ${item_name} record: ` + error.message);
            throw error;
        }
    }
</script>

{#if loaded}
    <div>
        <div>
            <div style="display: flex; margin-left: auto; flex-direction: row;">
                <button
                    onclick={() => {
                        if (isCreation) {
                            global.change_page(collection_name + "/", true);
                            return;
                        }
                        global.change_page(collection_name + "/" + page.params.id, true);
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

            <Input style="margin-bottom:1em" label="Title" bind:value={localData.title} />
            <Input style="margin-bottom:1em" label="Author" bind:value={localData.author} />

            {#if !isCreation}
                <div style=" background-color: var(---surface-1); padding: 0.5em; flex-grow: 1; font-size: 1.2em; border-radius: 0.5em; margin-top: 0.2em; font-family: var(--the-font); flex-direction: row; justify-content: space-between; margin-bottom: 1em; ">
                    <div style="display:flex; height:2.5em; margin-right: 1em; flex-direction: column; justify-content: center; font-family: 'roboto mono';">
                        <div style="text-wrap: nowrap;">
                            ID: {localData.id}
                        </div>
                        {#if !legacy_book}
                            <div style="text-wrap: nowrap;">
                                IDL: {localData.legacy_book_id}
                            </div>
                        {/if}
                    </div>
                    {#if !legacy_book}
                        <button
                            onclick={() => {
                                localData.legacy_book_id = "_" + localData.legacy_book_id;
                            }}
                            style="text-wrap:balance; width: fit-content; margin: auto; height: fit-content; letter-spacing: 0; margin-right: 0;"
                        >
                            Migrate to New ID
                        </button>
                    {/if}
                </div>
            {/if}
            <Input style="margin-bottom:1em" error={fieldErrors["isbn"] || false} label="ISBN" bind:value={localData.isbn} />

            <Input style="margin-bottom:1em" label="Description" type="textarea" bind:value={localData.description} />
            <Input style="margin-bottom:1em" label="Classification Label" bind:value={localData.classification_label} />

            <Input style="margin-bottom:1em" label="Level" type="select" bind:value={localData.level}>
                {#each constants.books.levels as { label, id }}
                    <option value={id}>{label}</option>
                {/each}
            </Input>

            <Input style="margin-bottom:1em" label="Subject" type="select" bind:value={localData.subject}>
                {#each constants.books.subjects as { subject, id }}
                    <option value={id}>{subject}</option>
                {/each}
            </Input>

            <div style="margin-bottom: 0.8em; font-size: 1.4em;">
                <div style=" margin-bottom: 0.5em; flex-direction: row;">
                    <input bind:checked={localData.scrapped} type="checkbox" />
                    <label style="margin-left: 0.3em;">Scrapped</label>
                </div>
                <div style="display: flex; margin-bottom: 0.5em; flex-direction: row;">
                    <input type="checkbox" bind:checked={localData.lost} />
                    <label style="margin-left: 0.3em;">Lost</label>
                </div>
            </div>
            <Input style="margin-bottom:1em" label="Price (EUR)" type="number" min="0" bind:value={localData.price} />
            <Input style="margin-bottom:1em" label="Cover Image URL" placeholder="Automatic" bind:value={localData.preview_url_override} />
            {#if !isCreation}
                <button onclick={() => deleteItem(localData.id)}>Delete Book Forever</button>
            {/if}
        </div>
    </div>
{/if}
