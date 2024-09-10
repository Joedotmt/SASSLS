<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { onMount } from "svelte";
    import { detectTouch } from "$lib/utils/touchDetection";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    onMount(() => {
        detectTouch();
    });
</script>

<div style="position: fixed; z-index:2; right:50%"><ThemeSwitcher /></div>

<TopBar />

<slot />

<style>
    @import "src/themes.css";
    @import "src/style.css";
    @import "src/fresh.css";
</style>
