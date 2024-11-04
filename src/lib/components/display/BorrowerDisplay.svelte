<script>
    import { run } from "svelte/legacy";

    const defaultselectedBorrowerData = {};

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function editButton() {
        dispatch("EditButton");
    }

    let {
        style = "",
        selectedBorrowerData = $bindable(defaultselectedBorrowerData),
        lending_mode = false,
    } = $props();
    let subjectLabel = $state("");
    run(() => {
        if (selectedBorrowerData == undefined) {
            selectedBorrowerData = defaultselectedBorrowerData;
        }
    });
</script>

<div {style} class="display_panel_display">
    <div class="display-area-quick-buttons">
        <button
            id="returnbutton54985t8_borrower"
            style="border: 0; margin: 5px; margin-right: 0; margin-left: auto; width:8em"
        >
            <div id="returntextjinfo4_borrower">Return All</div>
        </button>
        <button
            id="edit_button_borrower"
            style="margin: 5px; margin-right: 5px; width:8em"
        >
            <div style="pointer-events: none;" id="edit_button_borrower_label">
                Edit
            </div>
        </button>
    </div>
    <div style="margin: 1em;" id="display_panel_details_borrower">
        <div style="display: flex; font-size: 2em; font-weight: bold;">
            <div>
                {selectedBorrowerData.name}
                {selectedBorrowerData.surname}
            </div>
        </div>
        <div
            style="background-color: var(---surface-3); border-radius: 0.4em; padding: 0.5em; font-size: 1.2em; font-family: var(--the-robo-font);"
        >
            <div id="dpdb_group">Group: {selectedBorrowerData.group}</div>
            <div id="dpdb_borrower_id">
                ID: {selectedBorrowerData.borrower_id}
            </div>
        </div>
        <div style="font-size: 1.3em; font-weight: bold; margin-top: 0.5em;">
            Currently borrowing books:
        </div>
        <div id="borrower_currently_borrowing_books"></div>
        <div
            style="border-top: solid var(---surface-5) 2px; display: flex; width: 100%;"
        >
            <button
                id="dpdb_add_button"
                style="width: fit-content; height: 2.6em; padding: 1.2em; margin-top: 0.4em;"
            >
                <span
                    style="user-select: none; font-size: 1.5em; margin: 0.2em;"
                    class="button-icon material-symbols-outlined"
                >
                    library_add
                </span>
                <div>Lend book</div>
            </button>
        </div>
        <div style="margin-top: 100%;" id="dpdb_created">
            Updated: {selectedBorrowerData.created}
        </div>
        <div id="dpdb_updated">Updated: {selectedBorrowerData.updated}</div>
        <div id="dpdb_id" style="opacity: 0.5;">
            SYS_ID: {selectedBorrowerData.id}
        </div>
    </div>
</div>
