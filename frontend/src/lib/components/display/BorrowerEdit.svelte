<script>
    import Input from "../Input.svelte";
    import pb from "$lib/pocketbase";
    import { global, constants } from "$lib/global.svelte.js";
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";

    let { selectedData, pageParams = $bindable() } = $props();
    let localData = $state(null);

    // BORROWER SPESIFIC //
    const collection_name = "borrowers";
    const item_name = "borrower";

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
        pageParams.display_mode = "";
        pageParams.selectedId = updatedRecord.id;
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
                pageParams.selectedId = "";
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
                            pageParams.selectedId = "";
                            pageParams.display_mode = "";
                            return;
                        }
                        pageParams.display_mode = "";
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

            <Input style="margin-bottom:1em" label="Name" bind:value={localData.name} />
            <Input style="margin-bottom:1em" label="Surname" bind:value={localData.surname} />
            {#if !isCreation}
                <div style=" background-color: var(---surface-5); padding: 0.5em; flex-grow: 1; font-size: 1.2em; border-radius: 0.5em; margin-top: 0.2em; font-family: var(--the-font); display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 1em; ">
                    <div style="font-family: 'roboto mono'; display: flex; flex-direction: column; justify-content: center;">
                        <div>
                            ID: {localData.id}
                        </div>
                    </div>
                </div>
            {/if}
            <Input style="margin-bottom:1em" label="Group" type="select" bind:value={localData.group}>
                {#each constants.borrowers.groups as group}
                    <option value={group}>{group}</option>
                {/each}
            </Input>
            {#if !isCreation}
                <button onclick={() => deleteItem(localData.id)} class="delete-forever-button no-ripple" style="border-radius: 100em; border: 0; width: fit-content; padding: 0.5em 1em;">
                    <span class="button-icon symbol"> delete_forever </span>
                    <div>Delete Record</div>
                </button>
            {/if}
        </div>
    </div>
{/if}
