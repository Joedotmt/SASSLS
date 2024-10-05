<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";
    import { detectTouch } from "$lib/utils/touchDetection";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import AccountDialog from "$lib/components/AccountDialog.svelte";
    onMount(() => {
        detectTouch();
    });

    export const prerender = true;

    let isDialogOpen = false;

    function openDialog() {
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    function handleShowSignIn() {
        // Implement sign in logic
    }

    function handleShowThemePicker() {
        // Implement theme picker logic
    }

    import "../themes.css";
    import "../style.css";
    import "../fresh.css";
</script>

<div style="position: fixed; z-index:2; right:50%;">
    <ThemeSwitcher />
</div>

<TopBar on:accBtnPress={openDialog} />

<AccountDialog
    bind:isOpen={isDialogOpen}
    on:close={closeDialog}
    on:showSignIn={handleShowSignIn}
    on:showThemePicker={handleShowThemePicker}
/>

<slot />
