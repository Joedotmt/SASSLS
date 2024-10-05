<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";
    import { detectTouch } from "$lib/utils/touchDetection";
    import AccountDialog from "$lib/components/AccountDialog.svelte";

    export const prerender = true;

    let isDialogOpen = false;
    let currentTheme = "blue-dark"; // Default theme

    function openDialog() {
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    onMount(() => {
        const availableThemes = [
            "blue-dark",
            "blue-light",
            "red-dark",
            "red-light",
            "green-dark",
            "green-light",
        ];

        // Check for saved theme in local storage
        const savedTheme = localStorage.getItem("theme");

        // If no theme is saved, save the default theme
        if (!savedTheme) {
            localStorage.setItem("theme", currentTheme);
        } else {
            currentTheme = savedTheme; // Use the saved theme
        }

        // Apply the theme immediately
        document.body.className = currentTheme;

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
