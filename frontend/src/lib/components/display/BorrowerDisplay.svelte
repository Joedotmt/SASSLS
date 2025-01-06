<script>
    import { global } from "$lib/global.svelte.js";
    import { onMount } from "svelte";
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import BookPanel from "$lib/components/display/BookPanel.svelte";
    import ListPanel from "$lib/components/list/ListPanel.svelte";

    let { selectedData, env: borrowerenv = $bindable() } = $props();
    let loaded = $derived(selectedData != null && selectedData.id != undefined);
    let lend_dialog = $state();
    let fake_lend_button = $state();
    let lend_button = $state();
    let fake_button_div = $state();
    let dialog_open = $state(false);

    onMount(() => {
        document.body.appendChild(fake_lend_button);
        document.body.addEventListener("keydown", keydown_dialog);
    });

    function keydown_dialog(e) {
        if (dialog_open) {
            if (e.key == "Escape") {
                e.preventDefault();
                close_dialog();
            }
        }
    }

    function click_lend_button(close = false) {
        function transition_start() {
            dialog_open = true;
            lend_dialog.showModal();
            const style = `width: ${btn.width}px; height: ${btn.height}px; left: ${btn.x}px; top: ${btn.y}px; display: flex;`;
            fake_lend_button.style.cssText = style;
            fake_button_div.style.scale = "1 1";
            lend_dialog.style.cssText = `${style} opacity: 0;`;
        }

        function transition_end() {
            const scale = `${target.width / btn.width} ${target.height / btn.height}`;
            fake_button_div.style.scale = scale;
            const style = `width: ${finalWidth}px; height: ${finalHeight}px; left: ${margin}px; top: ${margin}px; display: flex; border-radius: 15px;`;
            fake_lend_button.style.cssText = style;
            lend_dialog.style.cssText = `transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97); ${style} opacity: 1;`;
        }

        function transition_close() {
            const style = `transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97); width: ${btn.width}px; height: ${btn.height}px; left: ${btn.x}px; top: ${btn.y}px; display: flex;`;
            fake_lend_button.style.cssText = `${style} border-radius: 20px; --lend-dialog-opacity: 0`;
            fake_button_div.style.scale = "1 1";
            lend_dialog.style.cssText = `${style} opacity: 0; --lend-dialog-opacity: 0;`;
            setTimeout(() => {
                fake_lend_button.style.cssText = "";
                lend_dialog.close();
                dialog_open = false;
            }, 700);
        }

        const margin = 20;
        const finalWidth = window.innerWidth - 40;
        const finalHeight = window.innerHeight - 40;
        const target = document.body.getBoundingClientRect();
        const btn = lend_button.getBoundingClientRect();
        btn.y += 0.1; // Idk man

        if (close === true) {
            transition_close();
            return;
        }

        transition_start();
        requestAnimationFrame(transition_end);
    }

    function close_dialog() {
        click_lend_button(true);
    }

    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import { untrack } from "svelte";

    let env = $state({
        searchState: {
            query: "",
            subjects: [],
            levels: [],
            sortType: "created",
            sortAscending: true,
            idType: "both",
        },
        propogate_page: true,
        display_mode: "",
        selectedId: "",
        isLending: true,
        lend: () => {
            return;
        },
        setSelectedId: (id) => {
            env.selectedId = id;
        },
        setDisplay_mode: (mode) => {
            env.display_mode = mode;
        },
    });
</script>

{#if loaded}
    <button bind:this={fake_lend_button} class="fake-button">
        <div bind:this={fake_button_div} class="fake-button-div">
            <span style="user-select: none; font-size: 1.5em; margin: 0.2em;" class="button-icon symbol"> library_add </span>
            <div style="align-content: space-around; text-wrap: nowrap;">Lend book</div>
        </div>
    </button>
    <dialog bind:this={lend_dialog} class="lend-dialog bigdialog {dialog_open ? `` : `display-none`}">
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
                        <SearchPanel bind:env />
                        <ListPanel bind:env collection="books" />
                        <BookPanel bind:env />
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
                borrowerenv.setDisplay_mode("edit");
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
    .display-none {
        display: none !important;
    }
    .fake-button {
        background-color: var(---surface-0) !important;
        transform-origin: 0 0;
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
    .fake-button-div {
        scale: 1 1;
        transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97);
        flex-direction: row;
        align-items: center;
    }
    .lend-dialog {
        max-width: none;
        max-height: none;
        box-sizing: border-box;
        border: 1.2px solid var(---utility-outline);
        padding: 0 0.5em 0.5em 0.5em;
        margin: 0;
        position: fixed;
        --lend-dialog-opacity: 1;
    }

    .lend-dialog::backdrop {
        opacity: var(--lend-dialog-opacity);
        transition: 0.7s cubic-bezier(0.36, 0.01, 0.27, 0.97);
    }
</style>
