<script>
    import { page } from "$app/state";
    import { global } from "$lib/global.svelte.js";
    import { onMount } from "svelte";
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import ListPanel from "$lib/components/list/ListPanel.svelte";

    let { selectedData } = $props();
    let loaded = $derived(selectedData != null && selectedData.id != undefined);
    let add_book_to_borrow_dialog = $state();
    let dpdb_add_button_FAKE = $state();
    let dpdb_add_button = $state();
    let iirirri9i49 = $state();
    let searchState = $state({
        query: "",
        subjects: [],
        levels: [],
        sortType: "created",
        sortAscending: true,
    });
    let dialog_open = $state(false);

    onMount(() => {
        document.body.appendChild(dpdb_add_button_FAKE);
    });

    function lend_button() {
        document.body.style.setProperty("--j95r4ji5r-opacity", "1");
        iirirri9i49.style.opacity = "1";
        iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
        add_book_to_borrow_dialog.style = null;
        add_book_to_borrow_dialog.style.display = "flex";
        add_book_to_borrow_dialog.showModal();
        dialog_open = true;

        var zeBOX = dpdb_add_button.getBoundingClientRect();

        let finaltargetWidth = add_book_to_borrow_dialog.getBoundingClientRect().width;
        let finaltargetHeight = add_book_to_borrow_dialog.getBoundingClientRect().height;

        dpdb_add_button_FAKE.style.display = "flex";
        iirirri9i49.style.transform = `scaleX(1) scaleY(1)`;
        dpdb_add_button_FAKE.style.width = zeBOX.width + "px";
        dpdb_add_button_FAKE.style.height = zeBOX.height + "px";
        dpdb_add_button_FAKE.style.left = zeBOX.left + "px";
        dpdb_add_button_FAKE.style.top = zeBOX.top + "px";

        add_book_to_borrow_dialog.style.transition = "0s";
        add_book_to_borrow_dialog.style.display = "flex";
        add_book_to_borrow_dialog.style.width = zeBOX.width + "px";
        add_book_to_borrow_dialog.style.height = zeBOX.height + "px";
        add_book_to_borrow_dialog.style.left = zeBOX.left + "px";
        add_book_to_borrow_dialog.style.top = zeBOX.top + "px";
        add_book_to_borrow_dialog.style.opacity = "0";
        iirirri9i49.style.transform = "scaleX(1) scaleY(1)";

        setTimeout(() => {
            iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
            add_book_to_borrow_dialog.style.transition = "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
            iirirri9i49.style.transition = "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
            dpdb_add_button_FAKE.style.display = "flex";
            iirirri9i49.style.transform = `scaleX(${finaltargetWidth / zeBOX.width}) scaleY(${finaltargetHeight / zeBOX.height})`;
            dpdb_add_button_FAKE.style.width = finaltargetWidth + "px";
            dpdb_add_button_FAKE.style.height = finaltargetHeight + "px";
            dpdb_add_button_FAKE.style.left = "50%";
            dpdb_add_button_FAKE.style.top = "50%";
            dpdb_add_button_FAKE.style.translate = "-50% -50%";

            add_book_to_borrow_dialog.style.width = finaltargetWidth + "px";
            add_book_to_borrow_dialog.style.height = finaltargetHeight + "px";
            add_book_to_borrow_dialog.style.left = "50%";
            add_book_to_borrow_dialog.style.top = "50%";
            add_book_to_borrow_dialog.style.translate = "-50% -50%";
        }, 1);

        setTimeout(() => {
            iirirri9i49.style.transition = "0.1s";
            iirirri9i49.style.opacity = "0";
            add_book_to_borrow_dialog.style.opacity = "1";
        }, 150);

        setTimeout(() => {
            dpdb_add_button_FAKE.style = null;
            iirirri9i49.style.opacity = "1";
        }, 1000);
    }

    function close_dialog() {
        dpdb_add_button_FAKE.style = null;
        iirirri9i49.style.transform = "scaleX(1) scaleY(1)";
        iirirri9i49.style.opacity = "1";
        add_book_to_borrow_dialog.style.transitionDuration = "0.4s";
        add_book_to_borrow_dialog.style.opacity = "0";
        add_book_to_borrow_dialog.style.width = "0";
        add_book_to_borrow_dialog.style.height = "0";
        let eggririir = 1;
        let eer4r4 = setInterval(() => {
            document.body.style.setProperty("--j95r4ji5r-opacity", eggririir);
            eggririir -= 0.05;
        }, 10);
        add_book_to_borrow_dialog.style.transformOrigin = "center";
        setTimeout(() => {
            add_book_to_borrow_dialog.close();
            add_book_to_borrow_dialog.style.display = "none";
            clearInterval(eer4r4);
        }, 500);
    }
</script>

{#if loaded}
    <button bind:this={dpdb_add_button_FAKE} class="iriiririr9">
        <div bind:this={iirirri9i49} style="transform: scaleX(1) scaleY(1); display: flex; transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97); flex-direction: row; align-items: center;">
            <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="button-icon symbol"> library_add </span>
            <div style="align-content: space-around; text-wrap: nowrap;">Lend book</div>
        </div>
    </button>
    <dialog bind:this={add_book_to_borrow_dialog} class="j95r4ji5r bigdialog">
        <div style="display: flex; height: 100%; width: 100%; flex-direction: column;" id="add_book_to_borrow_dialog_container">
            <div style="display: flex; margin-top: 0.4em; align-items: center; flex-direction: row;">
                <button onclick={close_dialog} style="width: 40px; height: 40px; border: 0;" class="button-circle">
                    <span class="symbol"> close </span>
                </button>
                <div style="text-wrap: nowrap; font-size: 1.2em; margin-left: 0.3em;">Lend book to borrower</div>
            </div>
            {#if false && dialog_open}
                <div class="container-scroller">
                    <div class="container">
                        <SearchPanel bind:searchState />
                        <ListPanel bind:searchState collection="books" />
                        <BookPanel />
                    </div>
                </div>
            {/if}
        </div>
    </dialog>
    <div class="quick-buttons">
        <button style="border:none; margin: 5px; margin-right: 5px; height: 40px;">
            <span class="symbol" style="margin-right: 0.5em;">tab_close</span>
            Return All
        </button>

        <button
            onclick={() => {
                global.change_page("borrowers/" + page.params.id + "/edit");
            }}
            style="margin: 5px; margin-right: 5px; height: 40px;"
        >
            <span class="symbol" style="margin-right: 0.5em;"> edit </span>
            Edit
        </button>
    </div>
    <div class="display-panel-display">
        <div style="margin: 1em;" id="display_panel_details_borrower">
            <div style="display: flex; font-size: 2em; font-weight: bold;">
                <div>
                    {selectedData.name}
                    {selectedData.surname}
                </div>
            </div>
            <div style="background-color: var(---surface-3); border-radius: 0.4em; padding: 0.5em; font-size: 1.2em; font-family: var(--the-robo-font);">
                <div id="dpdb_group">Group: {selectedData.group}</div>
                <div id="dpdb_borrower_id">
                    ID: {selectedData.id}
                </div>
            </div>
            <div style="font-size: 1.3em; font-weight: bold; margin-top: 0.5em;">Currently borrowing books:</div>
            <div id="borrower_currently_borrowing_books"></div>
            <div style="border-top: solid var(---surface-5) 2px; display: flex; width: 100%;">
                <button bind:this={dpdb_add_button} onclick={lend_button} style="width: fit-content; height: 2.6em; padding: 1.2em; margin-top: 0.4em; view-transition-name: lend-button;">
                    <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="button-icon symbol"> library_add </span>
                    <div>Lend book</div>
                </button>
            </div>
            <div style="margin-top: 100%;" id="dpdb_created">
                Updated: {selectedData.created}
            </div>
            <div id="dpdb_updated">Updated: {selectedData.updated}</div>
            <div id="dpdb_id" style="opacity: 0.5;">
                SYS_ID: {selectedData.id}
            </div>
        </div>
    </div>
{/if}

<style>
    :global(body) {
        --j95r4ji5r-opacity: 1;
    }
    .iriiririr9 {
        background: var(---surface-0);
        transform-origin: 0 0;
        pointer-events: none;
        display: none;
        position: absolute;
        z-index: 2;
        width: fit-content;
        height: 2.6em;
        padding: 1.2em;
        transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97);
    }
    .j95r4ji5r {
        transform: scaleX(1) scaleY(1);
        transform-origin: 0 0;
        border: 1.2px solid var(---utility-outline);
        padding: 0 0.5em 0.5em 0.5em;
        border-radius: 1em;
        margin: 0;
        position: absolute;
    }

    .j95r4ji5r::backdrop {
        opacity: var(--j95r4ji5r-opacity);
    }
</style>
