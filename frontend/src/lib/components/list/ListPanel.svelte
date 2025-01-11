<script>
    import { objects } from "$lib/global.svelte.js";
    import BookList from "./BookList.svelte";
    import BorrowerList from "$lib/components/list/BorrowerList.svelte";

    let { collection, env = $bindable() } = $props();

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            searchBarChanged(event);
        }
    }
    function searchBarChanged(event) {
        env.searchState.query = event.target.value;
    }
</script>

<div class="list-area panel" style="border-top-left-radius:{env.minimized ? 0 : ''}; border-bottom-left-radius:{env.minimized ? 0 : ''}">
    <div style="flex-direction: row; border-bottom: 1px solid var(---surface-5); min-height: 50px; width: 100%; display: flex; align-items: center;">
        <span style="margin: 0em 1em;">Search</span>
    </div>
    <div class="list-area-search">
        <div class="search-input-wrapper">
            <span class="symbol search-icon">search</span>
            <input type="text" class="main-search-bar" placeholder="Search Books" onchange={searchBarChanged} onkeydown={handleSearchKeyDown} />
        </div>
    </div>
    {#if collection == "books"}
        <BookList bind:env />
    {:else if collection == "borrowers"}
        <BorrowerList bind:env />
    {/if}
</div>
