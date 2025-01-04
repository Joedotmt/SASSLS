<script>
    import { run } from "svelte/legacy";
    import { page } from "$app/stores";
    import { global } from "$lib/global.svelte.js";

    const defaultSelectedBorrowerData = {};

    let { style = "", selectedBorrowerData = $bindable(defaultSelectedBorrowerData), lending_mode = false } = $props();
    run(() => {
        if (selectedBorrowerData == undefined) {
            selectedBorrowerData = defaultSelectedBorrowerData;
        }
    });
</script>

<div {style} class="display-panel-display">
    <div class="quick-buttons">
        <button style="border:none; margin: 5px; margin-right: 5px; height: 40px;">
            <span class="symbol" style="margin-right: 0.5em;">tab_close</span>
            Return All
        </button>

        <button
            onclick={() => {
                global.change_page("borrowers/" + $page.params.id + "/edit");
            }}
            style="margin: 5px; margin-right: 5px; height: 40px;"
        >
            <span class="symbol" style="margin-right: 0.5em;"> edit </span>
            Edit
        </button>
    </div>
    <div style="margin: 1em;" id="display_panel_details_borrower">
        <div style="display: flex; font-size: 2em; font-weight: bold;">
            <div>
                {selectedBorrowerData.name}
                {selectedBorrowerData.surname}
            </div>
        </div>
        <div style="background-color: var(---surface-3); border-radius: 0.4em; padding: 0.5em; font-size: 1.2em; font-family: var(--the-robo-font);">
            <div id="dpdb_group">Group: {selectedBorrowerData.group}</div>
            <div id="dpdb_borrower_id">
                ID: {selectedBorrowerData.id}
            </div>
        </div>
        <div style="font-size: 1.3em; font-weight: bold; margin-top: 0.5em;">Currently borrowing books:</div>
        <div id="borrower_currently_borrowing_books"></div>
        <div style="border-top: solid var(---surface-5) 2px; display: flex; width: 100%;">
            <button id="dpdb_add_button" style="width: fit-content; height: 2.6em; padding: 1.2em; margin-top: 0.4em;">
                <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="button-icon symbol"> library_add </span>
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
