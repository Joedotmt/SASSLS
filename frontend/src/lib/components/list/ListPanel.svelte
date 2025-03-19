<script>
    import { objects } from "$lib/global.svelte.js";
    import BookList from "./BookList.svelte";
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
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

    let searching = $state(false);
</script>

<div class="list-area panel" style="border-top-left-radius:{env.minimized ? 0 : ''}; border-bottom-left-radius:{env.minimized ? 0 : ''}">
    <!-- <div style="flex-direction: row; border-bottom: 1px solid var(---surface-5); min-height: 50px; width: 100%; display: flex; align-items: center;">
        <span style="margin: 0em 1em;">Search</span>
    </div> -->
    <div class="list-area-search">
        <div class="search-input-wrapper">
            <input onfocus={(searching = true)} onblur={(searching = false)} type="text" data-searching={searching} class="main-search-bar" placeholder="Search Books" onchange={searchBarChanged} onkeydown={handleSearchKeyDown} />
            <span class="symbol search-icon">search</span>
        </div>
    </div>
    {#if collection == "books"}
        {#if searching}
            <!-- <SearchPanel bind:env /> -->
        {/if}
        <BookList bind:env />
    {:else if collection == "borrowers"}
        <BorrowerList bind:env />
    {/if}
</div>

<style>
    .main-search-bar {
        margin: 10px;
        background-color: var(---background);
        height: 0.8em;
        padding: 0.6em 0.6em 0.6em 1.9em;
        border-radius: 1em;
        font-size: 1.2em;
        box-shadow:
            inset 0 0 0 1.2px var(---neutral-variant60),
            0 0 0 0 var(---neutral-variant60);
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        background-color: var(---surface-1);
        box-shadow: none;
    }
    .main-search-bar[data-searching="true"] {
        margin: 0px;
        box-shadow:
            inset 0 0 0 0px var(---background),
            0 0 0px 0px var(---neutral-variant60);
        border-bottom: 1px solid var(---neutral-variant60);
        background-color: var(---surface-1);
        height: 0.8em;
        padding: 1em 0.6em 1em 2em;
        border-radius: 0em;
        font-size: 1.2em;

        margin-bottom: 8px;
    }
    .search-icon {
        position: absolute;
        left: 0.8em;
        top: 0.75em;
        opacity: 0.7;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .main-search-bar[data-searching="true"] + .search-icon {
        left: 0.4em;
        top: 0.65em;
    }
</style>
