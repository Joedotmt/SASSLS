<script>
    import { createEventDispatcher } from "svelte";
    import { global } from "$lib/global.svelte.js";

    const dispatch = createEventDispatcher();

    import logo from "$lib/MAIN_LOGO.png";

    let logoText = "Library";
    let fontWeight = $state(600);

    function logoEasterEgg() {
        fontWeight += 50;
    }

    function openAccountDialog() {
        dispatch("accBtnPress");
    }
</script>

<div class="top-bar panel">
    <div class="site-logo">
        <button class="button-circle" onclick={logoEasterEgg} style="padding: 0; height: auto; width: auto; border-width: 0;">
            <img src={logo} class="logo-image" style="height: 2.7em; width: 2.7em; opacity: 0.8;" alt="Main Logo" />
        </button>

        <div class="logo-text" style="font-weight: {fontWeight};">
            {#if fontWeight > 900}
                Made by <a target="_blank" rel="external" class="joeweblink" href="https://www.joe.mt#sassls">Joe Esposito</a>
            {:else}
                <button
                    class="link-button"
                    onclick={() => {
                        global.change_page("");
                    }}
                >
                    {logoText}
                </button>
            {/if}
        </div>
    </div>
    <div style="flex-direction: row; align-items: center; margin-left: auto;">
        <button style="width: 7em; height: 2em;" onclick={() => global.change_page("books")}> Books </button>
        <button style="margin-right: 1em; margin-left: 0.2em; width: 7em; height: 2em" onclick={() => global.change_page("borrowers")}> Borrowers </button>
        <button class="button-circle" id="account_button" onclick={openAccountDialog} style="padding: 0; border-width: 0;">
            <span class="symbol" style="font-size: 2.8em; z-index: 1; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;"> account_circle </span>
        </button>
    </div>
</div>

<style>
    .logo-text {
        user-select: none;
        align-self: center;
        font-size: min(5vw, 30px);
        font-family: "Montserrat", "Poppins", "Trebuchet MS", Helvetica, sans-serif;
        margin: 0em 0.2em;
        font-weight: 600;
        flex-direction: row;
        text-wrap: nowrap;
    }

    @media (max-width: 550px) {
        .logo-text {
            font-size: 1em;
            padding: 0;
        }
    }
</style>
