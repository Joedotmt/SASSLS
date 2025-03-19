<script>
    import BookList from "./BookList.svelte";
    import SearchPanel from "$lib/components/BookSearchPanel.svelte";
    import BorrowerList from "$lib/components/list/BorrowerList.svelte";

    let { collection, env = $bindable() } = $props();

    function handleSearchKeyDown(event) {
        if (event.key === "Enter") {
            searchBarChanged(event);
        } else if (event.key === "Escape") {
            searching = false;
            document.activeElement.blur();
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
            <input
                onpointerdown={() => {
                    searching = true;
                }}
                onfocus={() => {
                    searching = true;
                }}
                type="text"
                data-searching={searching}
                class="main-search-bar"
                placeholder="Search Books"
                onchange={searchBarChanged}
                onkeydown={handleSearchKeyDown}
            />

            <button
                onclick={() => {
                    searching = !searching;
                }}
                class="button-circle search-icon"><span class="symbol">{searching ? "close" : "search"}</span></button
            >
        </div>
    </div>
    {#if collection == "books"}
        <div style="display: {searching ? '' : 'none'};" data-searching={searching} class="crop-transition">
            <SearchPanel bind:env />
        </div>
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
        /* border-bottom: 1px solid var(---neutral-variant60); */
        background-color: var(---surface-1);
        height: 0.8em;
        padding: 1em 0.6em 1em 2.5em;
        border-radius: 0em;
        font-size: 1.2em;
    }
    .search-icon {
        position: absolute;
        left: 0.8em;
        top: 0.78em;
        opacity: 0.7;
        rotate: 0deg;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        border: 0;
        width: 32px;
        height: 32px;
    }
    .main-search-bar[data-searching="true"] + .search-icon {
        left: 0.5em;
        top: 0.65em;
        rotate: 180deg;
    }
    .crop-transition {
        transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        transition-behavior: allow-discrete;

        height: 0;
        scale: 0.8;
        translate: 0em -3.3em;
        opacity: 0;
    }
    .crop-transition[data-searching="true"] {
        height: fit-content;
        scale: 1;
        opacity: 1;
        translate: 0em 0em;
    }

    @starting-style {
        .crop-transition[data-searching="true"] {
            height: 0;
            scale: 0.95;
            opacity: 1;
            translate: 0em -1em;
        }
    }
</style>
