<script>
    import { createEventDispatcher } from "svelte";

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

    function onCollectionSelectChange(event) {
        //window.location.hash = event.target.value;
    }

    let collections = ["Books", "Borrowers", "Prints", "Transactions"];

    /*
    onMount(() => {
        if (collections.includes(window.location.hash.substring(1))) {
            collection_select.value = window.location.hash.substring(1);
        } else {
            window.location.hash = collection_select.value;
        }
    });*/
</script>

<div class="top-bar panel" style="border: 0;">
    <div class="site-logo" style="display: flex; align-items: center">
        <button
            class="button-circle"
            onclick={logoEasterEgg}
            style="padding: 0; height: auto; width: auto; border-width: 0;"
        >
            <img
                src={logo}
                class="logo-image"
                style="height: 3em; width: 3em; opacity: 0.8;"
                alt="Main Logo"
            />
        </button>

        <div class="logo-text" style="font-weight: {fontWeight};">
            {#if fontWeight > 900}
                Made by <a
                    target="_blank"
                    rel="external"
                    class="joeweblink"
                    href="https://www.joe.mt#sassls">Joe Esposito</a
                >
            {:else}
                <a href="/">{logoText}</a>
            {/if}
        </div>
    </div>
    <div
        style="width: 100%; display: flex; flex-direction: row-reverse; align-items: center;"
    >
        <button
            class="button-circle"
            id="account_button"
            onclick={openAccountDialog}
            style="padding: 0; border-width: 0;"
        >
            <span
                class="symbol"
                style="font-size: 2.8em; z-index: 1; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;"
            >
                account_circle
            </span>
        </button>
        <select
            id="collection_select"
            onchange={onCollectionSelectChange}
            style="width: 10em; margin: 0.2em; font-size: 18px;"
        >
            {#each collections as collection}
                <option value={collection.toLowerCase()}>{collection}</option>
            {/each}
        </select>
    </div>
</div>
