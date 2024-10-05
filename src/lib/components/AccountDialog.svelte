<script>
    import { createEventDispatcher } from "svelte";

    export let isOpen = false;

    const dispatch = createEventDispatcher();

    let isDarkMode = false;

    function closeDialog() {
        isOpen = false;
    }

    function showSignInDialog() {
        dispatch("showSignIn");
    }

    function showThemePickerModal() {
        dispatch("showThemePicker");
    }

    function navigateToBookMigration() {
        window.location.href = "book_migration.html";
    }

    function changeDarkLightTheme() {
        isDarkMode = !isDarkMode;
        document.body.className = isDarkMode ? "dark" : "light";
    }

    let dialog;

    import { onMount } from "svelte";
    onMount(() => {
        dialog = document.getElementById("acc-dialog");
    });

    $: if (!isOpen) {
        console.log("closing");
        dialog?.close();
    } else {
        console.log("opening");
        dialog?.showModal();
    }
</script>

<dialog id="acc-dialog" class="account-dialog">
    <button
        style="margin: 0.7em; border: none; width: 40px; height: 40px; margin-bottom: 0;"
        class="button-circle"
        on:click={closeDialog}
    >
        <span class="material-symbols-outlined">close</span>
    </button>
    <div
        style="background: var(---surface-1); border-radius: 1.5em; margin: 0.5em; overflow: hidden; height: 18em;"
    >
        <button class="list-button">
            <span class="button-icon material-symbols-outlined">settings</span> account
            settings
        </button>
        <button
            on:click={showSignInDialog}
            style="--bg: var(---primary-80); border-color: transparent; margin-left: auto; color: black; margin-right: auto; width: 8em;"
        >
            <span class="button-icon material-symbols-outlined">login</span> Sign
            in
        </button>
    </div>
    <button on:click={showThemePickerModal} class="list-button">
        <span class="button-icon material-symbols-outlined">palette</span> Theme
        Colours
    </button>
    <button on:click={navigateToBookMigration} class="list-button">
        <span class="button-icon material-symbols-outlined">book</span> Book Migration
    </button>
    <button class="button-circle" on:click={changeDarkLightTheme}>
        <span class="material-symbols-outlined"
            >{isDarkMode ? "light_mode" : "dark_mode"}</span
        >
    </button>
</dialog>
