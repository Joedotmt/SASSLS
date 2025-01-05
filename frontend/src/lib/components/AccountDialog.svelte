<script>
    import { onMount } from "svelte";
    import { theme } from "$lib/global.svelte.js";

    let { isOpen = $bindable(false) } = $props();

    let isDarkMode = $state(true);

    function closeDialog() {
        isOpen = false;
    }

    function showSignInDialog() {}

    function showThemePickerModal() {}

    function navigateToBookMigration() {
        window.location.href = "/book_migration.html";
    }

    function changeDarkLightTheme() {
        isDarkMode = !isDarkMode;

        theme.currentTheme.mode = isDarkMode ? "dark" : "light";
    }

    let dialog;

    onMount(() => {
        dialog = document.getElementById("acc-dialog");
        dialog.addEventListener("close", () => {
            isOpen = false;
        });
        window.addEventListener("mousedown", handleOutsideClick);
        isDarkMode = document.body.className.includes("dark");
    });

    $effect(() => {
        if (!isOpen) {
            dialog?.close();
        } else {
            dialog?.showModal();
        }
    });

    function handleOutsideClick(event) {
        if (dialog) {
            const rect = dialog.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
                closeDialog();
            }
        }
    }
</script>

<dialog id="acc-dialog" class="account-dialog">
    <button style="margin: 0.7em; border: none; width: 40px; height: 40px; margin-bottom: 0;" class="button-circle" onclick={closeDialog}>
        <span class="symbol">close</span>
    </button>
    <div style="background: var(---surface-1); border-radius: 1.5em; margin: 0.5em; overflow: hidden; height: 18em;">
        <button class="list-button">
            <span class="button-icon symbol">settings</span> account settings
        </button>
        <button onclick={showSignInDialog} style="--bg: var(---primary-80); border-color: transparent; margin-left: auto; color: black; margin-right: auto; width: 8em;">
            <span class="button-icon symbol">login</span> Sign in
        </button>
    </div>
    <button onclick={showThemePickerModal} class="list-button">
        <span class="button-icon symbol">palette</span> Theme Colours
    </button>
    <button onclick={navigateToBookMigration} class="list-button">
        <span class="button-icon symbol">book</span> Book Migration
    </button>
    <button class="button-circle" onclick={changeDarkLightTheme}>
        <span class="symbol">{isDarkMode ? "light_mode" : "dark_mode"}</span>
    </button>
</dialog>
