<script>
    import Input from "../Input.svelte";
    import pb from "$lib/pocketbase";
    import { global } from "$lib/global.svelte.js";
    global.unsaved_changes = true;

    let { selectedBorrowerData, borrowerUpdate } = $props();

    let loaded = $state(false);
    let localBorrowerData = $state(null);

    $effect(() => {
        if (selectedBorrowerData !== null && !loaded) {
            localBorrowerData = JSON.parse(
                JSON.stringify(selectedBorrowerData)
            );
            loaded = true;
        }
    });

    let isCreation = $derived(false);

    function create_random_string(length) {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    async function generate_unique_id() {
        let generated_id = "";
        for (let i = 0; i < 1000; i++) {
            try {
                generated_id = create_random_string(3);

                await pb
                    .collection("borrowers")
                    .getFirstListItem(`borrower_id="${generated_id}"`);
                console.error(
                    "trying to generate a borrower id again because of collisions"
                );
            } catch (err) {
                console.log("Successfully created borrower_id: ", generated_id);
                return generated_id;
            }
        }
    }

    async function saveChanges() {
        try {
            let updatedRecord;
            if (isCreation) {
                updatedRecord = await createItem(localBorrowerData);
            } else {
                updatedRecord = await updateItem(localBorrowerData);
            }
            // the updated record from the server
            borrowerUpdate(updatedRecord);
            global.change_page("borrowers/" + $page.params.item_id, true);
        } catch (error) {
            console.error(error);
        }
    }

    async function createItem(data) {
        await generate_unique_id().then((generated_id_response) => {
            localBorrowerData.borrower_id = generated_id_response;
        });
        console.log("CREATING BORROWER RECORD WITH DATA: ", data);
        const record = await pb.collection("borrowers").create(data);
        return record;
    }

    async function updateItem(data) {
        return await pb.collection("borrowers").update(data.id, { ...data });
    }

    async function deleteItem(id) {
        if (id == "creation" || id == null) {
            return;
        }
        await pb.collection("borrowers").delete(id);
        setTimeout(() => {
            global.change_page("borrowers", true);
        }, 500);
    }

    import { page } from "$app/stores";
</script>

{#if loaded}
    <div id="display_panel_edit_details_borrower" class="display_panel_edit">
        <div class="display-area-quick-buttons">
            <div style="display: flex; margin-left: auto;">
                <button
                    onclick={() => {
                        global.change_page(
                            "borrowers/" + $page.params.item_id,
                            true
                        );
                    }}
                    style="border: 0; margin: 5px; margin-right: 0; margin-left: auto;"
                >
                    <span class="symbol"> cancel </span>
                    Cancel
                </button>
                <button
                    class="button-circle"
                    onclick={saveChanges}
                    style="background-color: var(---primary-container); border: none; margin: 5px; margin-right: 5px; height: 40px; width: 80px;"
                >
                    <span class="symbol"> save </span>
                    Save
                </button>
            </div>
        </div>
        <div style="padding: 2em;">
            <div style="margin-bottom: 1em;" class="input-container">
                <input
                    id="display_panel_borrower_name_editing"
                    type="text"
                    class="input-google"
                    bind:value={localBorrowerData.name}
                />
                <label class="input-placeholder">Name</label>
            </div>
            <div style="margin-bottom: 1em;" class="input-container">
                <input
                    id="display_panel_borrower_surname_editing"
                    type="text"
                    class="input-google"
                    bind:value={localBorrowerData.surname}
                />
                <label class="input-placeholder"> Surname </label>
            </div>
            <div
                style="
                            background-color: var(---surface-5);
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
                    style="font-family: 'roboto mono'; display: flex; flex-direction: column; justify-content: center;"
                >
                    <div id="display_panel_borrower_borrower_id_editing">
                        ID: {localBorrowerData.borrower_id}
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 1em;" class="input-container">
                <select
                    style="width: 100%;"
                    id="display_panel_borrower_group_editing"
                    type="text"
                    class="input-google"
                >
                    <option> </option>
                </select>
                <label class="input-placeholder">Group</label>
            </div>
            <button
                onclick={() => deleteItem(localBorrowerData.id)}
                class="delete-forever-button no-ripple"
                id="delete_borrower_forever"
                style="border-radius: 100em; border: 0; width: fit-content; padding: 0.5em 1em;"
            >
                <span class="button-icon symbol"> delete_forever </span>
                <div id="delete_borrower_forever_text">Delete Record</div>
            </button>
        </div>
    </div>
{/if}
