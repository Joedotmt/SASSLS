<script>
    import { global } from "$lib/global.svelte.js";
    import { onMount } from "svelte";
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import ListPanel from "$lib/components/list/ListPanel.svelte";

    let { selectedData, pageParams: borrowerPageParams = $bindable() } = $props();
    let loaded = $derived(selectedData != null && selectedData.id != undefined);
    let lend_dialog = $state();
    let fake_lend_button = $state();
    let lend_button = $state();
    let fake_button_div = $state();
    let searchState = $state({
        query: "",
        subjects: [],
        levels: [],
        sortType: "created",
        sortAscending: true,
    });
    let dialog_open = $state(false);

    onMount(() => {
        document.body.appendChild(fake_lend_button);
    });

    function click_lend_button() {
        const margin = 20;
        document.body.style.setProperty("--lend-dialog-opacity", "1");
        fake_button_div.style.opacity = "1";
        lend_dialog.style = null;
        lend_dialog.style.display = "flex";
        lend_dialog.showModal();
        dialog_open = true;

        var real_button_rect = lend_button.getBoundingClientRect();

        lend_dialog.style.width = `calc(100% - ${margin * 2}px)`;
        lend_dialog.style.height = `calc(100% - ${margin * 2}px)`;

        let finaltargetWidth = lend_dialog.getBoundingClientRect().width;
        let finaltargetHeight = lend_dialog.getBoundingClientRect().height;

        fake_lend_button.style.display = "flex";
        fake_lend_button.style.width = real_button_rect.width + "px";
        fake_lend_button.style.height = real_button_rect.height + "px";
        fake_lend_button.style.left = real_button_rect.left + "px";
        fake_lend_button.style.top = real_button_rect.top + 0.1 + "px";

        lend_dialog.style.transition = "0s";
        lend_dialog.style.display = "flex";
        lend_dialog.style.width = real_button_rect.width + "px";
        lend_dialog.style.height = real_button_rect.height + "px";
        lend_dialog.style.left = real_button_rect.left + "px";
        lend_dialog.style.top = real_button_rect.top + "px";
        lend_dialog.style.opacity = "0";

        setTimeout(() => {
            lend_dialog.style.transition = "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
            fake_button_div.style.transition = "0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97)";
            fake_lend_button.style.display = "flex";
            fake_button_div.style.scale = `${finaltargetWidth / real_button_rect.width} ${finaltargetHeight / real_button_rect.height}`;
            fake_lend_button.style.width = finaltargetWidth + "px";
            fake_lend_button.style.height = finaltargetHeight + "px";

            fake_lend_button.style.width = `calc(100% - ${margin * 2}px)`;
            fake_lend_button.style.height = `calc(100% - ${margin * 2}px)`;
            fake_lend_button.style.left = margin + "px";
            fake_lend_button.style.top = margin + "px";

            fake_lend_button.style.borderRadius = "15px";

            lend_dialog.style.width = `calc(100% - ${margin * 2}px)`;
            lend_dialog.style.height = `calc(100% - ${margin * 2}px)`;
            lend_dialog.style.left = margin + "px";
            lend_dialog.style.top = margin + "px";

            lend_dialog.style.borderRadius = "15px";
        }, 1);

        setTimeout(() => {
            fake_button_div.style.transition = "0.1s";
            fake_button_div.style.opacity = "0";
            lend_dialog.style.opacity = "1";
        }, 150);

        setTimeout(() => {
            fake_lend_button.style = null;
            fake_button_div.style.opacity = "1";
        }, 1000);
    }

    function close_dialog() {
        fake_lend_button.style = null;
        fake_button_div.style.scale = "1 1";
        fake_button_div.style.opacity = "1";
        lend_dialog.style.transitionDuration = "0.4s";
        lend_dialog.style.opacity = "0";
        lend_dialog.style.width = "0";
        lend_dialog.style.height = "0";
        let animate_opacity = 1;
        let interval = setInterval(() => {
            document.body.style.setProperty("--lend-dialog-opacity", animate_opacity);
            animate_opacity -= 0.05;
        }, 10);
        lend_dialog.style.transformOrigin = "center";
        setTimeout(() => {
            lend_dialog.close();
            lend_dialog.style.display = "none";
            clearInterval(interval);
        }, 500);
    }

    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { untrack } from "svelte";

    let pageParams = $state({
        propogate_page: false,
        display_mode: "",
        selectedId: "",
        setSelectedId: (id, skip_confirmation = false) => {
            const navigate = () => {
                global.unsaved_changes = false;
                pageParams.selectedId = id;
                if (pageParams.propogate_page) {
                    goto(`${base}/books${id ? "/" : ""}${id}/${id ? pageParams.display_mode : ""}`);
                }
            };

            if (!global.unsaved_changes || skip_confirmation) {
                navigate();
                return;
            }

            confirmationDialog.dialog.showModal();
            confirmationDialog.confirm = navigate;
        },
        setDisplay_mode: (mode, skip_confirmation = false) => {
            const navigate = () => {
                global.unsaved_changes = false;
                pageParams.display_mode = mode;
                if (pageParams.propogate_page) {
                    goto(`${base}/books/${pageParams.selectedId}/${mode}`);
                }
            };

            if (!global.unsaved_changes || skip_confirmation) {
                navigate();
                return;
            }

            confirmationDialog.dialog.showModal();
            confirmationDialog.confirm = navigate;
        },
    });
</script>

{#if loaded}
    <button bind:this={fake_lend_button} class="fake-button">
        <div bind:this={fake_button_div} style="transform: scaleX(1) scaleY(1); display: flex; transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97); flex-direction: row; align-items: center;">
            <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="button-icon symbol"> library_add </span>
            <div style="align-content: space-around; text-wrap: nowrap;">Lend book</div>
        </div>
    </button>
    <dialog bind:this={lend_dialog} class="lend-dialog bigdialog">
        <div style="display: flex; height: 100%; width: 100%; flex-direction: column;" id="lend_dialog_container">
            <div style="display: flex; margin-top: 0.4em; align-items: center; flex-direction: row;">
                <button onclick={close_dialog} style="width: 40px; height: 40px; border: 0;" class="button-circle">
                    <span class="symbol"> close </span>
                </button>
                <div style="text-wrap: nowrap; font-size: 1.2em; margin-left: 0.3em;">Lend book to borrower</div>
            </div>
            {#if dialog_open}
                <div class="container-scroller">
                    <div class="container">
                        <SearchPanel bind:searchState />
                        <ListPanel bind:searchState bind:pageParams collection="books" />
                        <BookPanel bind:pageParams />
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
                borrowerPageParams.setDisplay_mode("edit");
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
                <button bind:this={lend_button} onclick={click_lend_button} style="width: fit-content; height: 2.6em; padding: 1.2em; margin-top: 0.4em; view-transition-name: lend-button;">
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
        --lend-dialog-opacity: 1;
    }
    .fake-button {
        background: var(---surface-0);
        transform-origin: 0 0;
        pointer-events: none;
        display: none;
        position: fixed;
        z-index: 10;
        width: fit-content;
        height: 2.6em;
        padding: 1.2em;
        transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97);
        border-radius: 7px;
        margin: auto;
    }
    .lend-dialog {
        max-width: none;
        max-height: none;
        box-sizing: border-box;
        border: 1.2px solid var(---utility-outline);
        padding: 0 0.5em 0.5em 0.5em;
        border-radius: 7px;
        margin: 0;
        position: fixed;
    }

    .lend-dialog::backdrop {
        opacity: var(--lend-dialog-opacity);
    }
</style>
