<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";
    import { detectTouch } from "$lib/utils/touchDetection";
    import AccountDialog from "$lib/components/AccountDialog.svelte";
    import ConfirmationDialog from "$lib/components/ConfirmationDialog.svelte";
    import { confirmationDialog } from "$lib/global.svelte.js";

    let isDialogOpen = $state(false);

    function openDialog() {
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    let barcode_string = "";

    onMount(() => {
        detectTouch();

        document.body.addEventListener("keydown", function (event) {
            barcode_string += event.key;
            if (barcode_string.length >= 8) {
                barcode_string = "";
            }
        });
    });

    let { children } = $props();
    import "../themes.css";
    import "../style.css";
</script>

<div style="position: fixed; z-index:2; right:50%; scale:0.3; opacity:0.3"></div>

<TopBar on:accBtnPress={openDialog} />

<AccountDialog bind:isOpen={isDialogOpen} onclose={closeDialog} />

<ConfirmationDialog message="Discard Draft?" confirmText="Discard" cancelText="Cancel" confirm={confirmationDialog.confirm} cancel={confirmationDialog.cancel} bind:dialog={confirmationDialog.dialog}></ConfirmationDialog>

{@render children()}
