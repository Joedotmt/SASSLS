<script>
    import { onMount } from "svelte";
    import { theme } from "$lib/global.svelte.js";
    import { config } from "$lib/global.svelte.js";
    import Input from "$lib/components/Input.svelte";
    import { pb, currentUser } from "$lib/pocketbase.svelte.js";

    let { isOpen = $bindable(false) } = $props();

    let sign_in_dialog = $state();
    let databaseDialog = $state();
    let account_dialog = $state();
    let signed_in = $derived(currentUser.user != null);

    function signOutUser() {
        pb.authStore.clear();
    }
    function closeDialog() {
        isOpen = false;
    }
    function cancel_sign_in() {
        sign_in_dialog.close();
    }
    async function acceptSigninModal(event) {
        let email = email_input + "@" + config.email_domain;
        let password = password_input;

        if (password != "" && email != "@sanandrea.edu.mt" && email != "") {
            try {
                console.log("signing in");
                await pb.collection("users").authWithPassword(email, password);
            } catch (error) {
                window.alert("Wrong username/password" + "\n\n" + error);
                return;
            }
        } else {
            window.alert("U can't leave the email/pass blank ):<");
            return;
        }
        sign_in_dialog.close();
    }

    function showSignInDialog() {
        sign_in_dialog.showModal();
    }
    function showDbAddressDialog {
        databaseDialog.showModal();
    }

    function showThemePickerModal() {}

    function navigateToBookMigration() {
        window.location.href = "/book_migration.html";
    }

    function changeDarkLightTheme() {
        theme.currentTheme.mode = theme.currentTheme.mode == "light" ? "dark" : "light";
    }

    onMount(() => {
        window.addEventListener("mousedown", handleOutsideClick);
    });

    $effect(() => {
        if (!isOpen) {
            account_dialog?.close();
        } else {
            account_dialog?.showModal();
        }
    });

    function handleOutsideClick(event) {
        if (account_dialog && !sign_in_dialog.open) {
            const rect = account_dialog.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
                closeDialog();
            }
        }
    }
    let email_input = $state("");
    let password_input = $state("");
</script>

<dialog bind:this={databaseDialog}></dialog>

<dialog bind:this={sign_in_dialog} style="height: fit-content; width: min(93vw, 60em); margin: auto; padding: 1vw;">
    <div style="margin: min(3vw, 1em);">
        <div style="flex-direction: row;">
            <div style="flex-shrink: 0;">
                <img src={config.logo} class="logo-image" style="height: 5em; width: 5em; opacity: 0.8;" alt="SAS Logo" />
                <h1 style="margin: 0;">Sign in</h1>
                <h4 style="margin: 0; margin-bottom: 3em; font-weight: normal;">with your school email</h4>
            </div>
            <form style="margin-left: auto; width: 60%;">
                <div style="display: flex; margin: 0;">
                    <Input label_style="background-color: var(---surface-5); --tiny-size:17px; --translate-y: -25px" input_style="font-size: 23px; text-align: right; padding-right: 9.9em; margin-right: 0; width: 100%;" label="Email" bind:value={email_input} />
                    <label style="width: 100%; margin-bottom: -1.5em;text-align: end;font-size: 1.3em;  color: var(---on-background); opacity: 0.7; translate: -0.7em -2em; pointer-events: none;">@{config.email_domain}</label>
                </div>
                <div style="display: flex; margin-top: 1em;">
                    <Input type="password" label_style="background-color: var(---surface-5); --tiny-size:17px; --translate-y: -25px" input_style="font-size: 23px;" label="Password" bind:value={password_input} />
                </div>
            </form>
        </div>
        <div style="display: flex; flex-direction: row-reverse; margin-top: 1em;">
            <button onclick={acceptSigninModal} class="dialog-button-accept">Sign in</button>
            <button onclick={cancel_sign_in} style="margin-right: 1em; border-color: transparent; width: 7em;">Cancel</button>
        </div>
    </div>
</dialog>
<dialog
    onclose={() => {
        isOpen = false;
    }}
    bind:this={account_dialog}
    class="account-dialog"
>
    <button style="margin: 0.7em; border: none; width: 40px; height: 40px; margin-bottom: 0;" class="button-circle" onclick={closeDialog}>
        <span class="symbol">close</span>
    </button>
    <div style="background: var(---surface-1); border-radius: 1.5em; margin: 0.5em; overflow: hidden; height: 18em;">
        <button style="margin-bottom: 0.3em;" class="list-button">
            <span class="button-icon symbol">manage_accounts</span> Account Settings
        </button>
        <button onclick={showDbAddressDialog} style="margin-bottom: 0.3em;" class="list-button">
            <span class="button-icon symbol">settings_ethernet</span> Database Address
        </button>
        {#if signed_in}
            <button onclick={signOutUser} style="--bg: var(---primary-80); border-color: transparent; margin-left: auto; color: black; margin-right: auto; width: 8em;">
                <span class="button-icon symbol">logout</span> Sign Out
            </button>
        {:else}
            <button onclick={showSignInDialog} style="--bg: var(---primary-80); border-color: transparent; margin-left: auto; color: black; margin-right: auto; width: 8em;">
                <span class="button-icon symbol">login</span> Sign in
            </button>
        {/if}
    </div>
    <button onclick={showThemePickerModal} class="list-button">
        <span class="button-icon symbol">palette</span> Theme Colours
    </button>
    <button onclick={navigateToBookMigration} class="list-button">
        <span class="button-icon symbol">book</span> Book Migration
    </button>
    <button style="margin: auto; width: 20em;" class="button-circle" onclick={changeDarkLightTheme}>
        <span class="symbol">{theme.currentTheme.mode == "light" ? "dark" : "light"}_mode</span>
    </button>
</dialog>

<style>
    .h9854h45g {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    @media (max-width: 750px) {
        .h9854h45g {
            flex-direction: column;
        }
    }
</style>
