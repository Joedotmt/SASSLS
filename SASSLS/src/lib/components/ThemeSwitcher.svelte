<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";

    import Button from "$lib/components/Button.svelte";
    import { theme, AvailableThemes } from "$lib/stores/theme";

    $: if (typeof document !== "undefined") {
        document.body.className = $theme;
    }

    function swaptheme() {
        const currentIndex = AvailableThemes.indexOf($theme);
        const nextIndex = (currentIndex + 1) % AvailableThemes.length;
        theme.set(AvailableThemes[nextIndex]);
    }
</script>

<button on:click={swaptheme}
    >Switch to {AvailableThemes[
        (AvailableThemes.indexOf($theme) + 1) % AvailableThemes.length
    ]}</button
>
