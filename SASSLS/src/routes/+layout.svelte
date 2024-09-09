<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";
    import { theme, AvailableThemes } from "$lib/stores/theme";
    import { detectTouch } from "$lib/utils/touchDetection";

    onMount(() => {
        detectTouch();
    });
</script>

<TopBar />

<slot />

<style>
    @import "src/style.css";
    @import "src/fresh.css";
    @import "src/themes.css";
</style>
