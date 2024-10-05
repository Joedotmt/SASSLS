<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";
    import { detectTouch } from "$lib/utils/touchDetection";
    import AccountDialog from "$lib/components/AccountDialog.svelte";

    export const prerender = true;

    let isDialogOpen = false;

    function openDialog() {
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    onMount(() => {
        detectTouch();

        // Load fonts and update class on symbols
        document.fonts.load('1rem "Material Symbols Outlined"').then(() => {
            document.querySelectorAll(".symbol").forEach((e) => {
                e.classList.add("material-symbols-outlined");
                e.classList.remove("symbol");
            });
        });
    });

    import "../themes.css";
    import "../style.css";
    import "../fresh.css";
</script>

<div
    style="position: fixed; z-index:2; right:50%; scale:0.3; opacity:0.3"
></div>

<TopBar on:accBtnPress={openDialog} />

<AccountDialog bind:isOpen={isDialogOpen} on:close={closeDialog} />

<slot />
