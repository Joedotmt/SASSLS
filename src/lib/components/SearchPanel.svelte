<script>
    import { run } from "svelte/legacy";

    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import SortButton from "$lib/components/SortButton.svelte";
    import TabSelector from "$lib/components/TabSelector.svelte";
    import TabView from "$lib/components/TabView.svelte";
    import { BookLevelsStore, BookSubjectsStore } from "$lib/levels.js";
    import { browser } from "$app/environment";
    import { crossfade } from "svelte/transition";
    let [send, receive] = crossfade({
        duration: 100,
        fallback: null,
    });

    let subjectChips = $state([]);
    let resourceSubjectChips = $state([]);

    let { searchState = $bindable() } = $props();

    function mapToChips(records) {
        const mapToChips = (subject) => ({
            label: subject.subject,
            id: subject.id,
        });
        subjectChips = records.filter((s) => !s.resource).map(mapToChips);
        resourceSubjectChips = records
            .filter((s) => s.resource)
            .map(mapToChips);
    }

    let currentTab = $state(0);
    // Subscribe to the store and reactively update when it changes
    run(() => {
        if (browser && $BookSubjectsStore != null) {
            mapToChips($BookSubjectsStore);
        }
    });

    let selectedIds_id_type = $state(["both"]);

    $effect(() => {
        searchState.showingIdType = selectedIds_id_type[0];
    });
    import { objects } from "$lib/global.svelte.js";
</script>

<div
    class="search-area panel"
    style="padding: 0; margin-inline-end:{!objects.searchPanel.minimized *
        10}px; overflow:hidden; max-width:{!objects.searchPanel.minimized *
        350 +
        objects.searchPanel.minimized *
            50}px; transition: max-width 0.3s cubic-bezier(0.4, 0, 0, 1); border-top-right-radius:{objects
        .searchPanel.minimized
        ? 0
        : ''}; border-bottom-right-radius:{objects.searchPanel.minimized
        ? 0
        : ''}"
>
    <div
        style="    border-bottom: 1px solid var(---surface-5);
    width: 100%;
    display: flex;
    align-items: center;"
    >
        <button
            onclick={() => {
                objects.searchPanel.minimized = !objects.searchPanel.minimized;
            }}
            class="button-circle"
            style="border:none; width:40px; height:40px; margin:5px"
            ><span class="symbol"
                >{objects.searchPanel.minimized
                    ? "left_panel_open"
                    : "left_panel_close"}</span
            ></button
        >
        <span style="margin: 0em 0em;">Filters</span>
    </div>
    {#if objects.searchPanel.minimized}
        <div style="position: absolute; left: 0; top: 3.3em;">
            <SortButton
                bind:isAscending={searchState.sortAscending}
                class="button-circle"
                style="width:40px; height:40px; margin:5px; border:none; border-radius: 100px;"
            />
            <button
                in:receive
                out:send
                onclick={() => {
                    searchState = {
                        query: "",
                        subjects: [],
                        levels: [],
                        sortType: "created",
                        sortAscending: "true",
                        showingIdType: "both",
                    };
                }}
                class="button-circle"
                style="width:40px; height:40px; margin:5px; border:none; border-radius: 100px;"
                ><span class="symbol">reset_settings</span></button
            >
        </div>
    {/if}

    <div
        style="padding: 1em {!objects.searchPanel.minimized * 1 +
            objects.searchPanel.minimized *
                5}em; overflow-y: auto; overflow-x:hidden; transition: padding 0.2s cubic-bezier(0.4, 0, 0, 1);"
        inert={objects.searchPanel.minimized ? "inert" : ""}
    >
        {#if !objects.searchPanel.minimized}
            <button
                in:receive
                out:send
                onclick={() => {
                    searchState = {
                        query: "",
                        subjects: [],
                        levels: [],
                        sortType: "created",
                        sortAscending: "true",
                        showingIdType: "both",
                    };
                }}
                class=""
                style="justify-content:center;margin:auto; margin-bottom:1em; padding: 0.5em 1em; width: calc(100% - 2em); border:none; border-radius: 100px;"
                ><span style="scale:1; margin-right: 0.5em;" class="symbol"
                    >reset_settings</span
                >Reset Filters</button
            >
        {/if}

        <Accordion overflowy="none">
            {#snippet head()}
                <span>Sort by</span>
            {/snippet}
            {#snippet details()}
                <div
                    style="flex-direction: row; display:flex; justify-content: space-between;"
                >
                    <ChipGroup
                        bind:selectedIds={searchState.sortType}
                        multiple={false}
                        optional={false}
                        defaultId={"created"}
                        style="width: fit-content"
                        items={[
                            { id: "created", label: "Created" },
                            { id: "updated", label: "Updated" },
                            { id: "title", label: "Title" },
                            { id: "price", label: "Price" },
                        ]}
                    />
                    <SortButton
                        bind:isAscending={searchState.sortAscending}
                        style="margin:0.5em; width:100px"
                    />
                </div>
            {/snippet}
        </Accordion>
        <Accordion expandedHeight={280}>
            {#snippet head()}
                <span>Subjects</span>
            {/snippet}
            {#snippet details()}
                <div>
                    <TabSelector bind:currentTab />
                    <TabView bind:currentTab>
                        {#snippet content1()}
                            <ChipGroup
                                bind:selectedIds={searchState.subjects}
                                items={subjectChips}
                            />
                        {/snippet}
                        {#snippet content2()}
                            <ChipGroup
                                bind:selectedIds={searchState.subjects}
                                items={resourceSubjectChips}
                            />
                        {/snippet}
                    </TabView>
                </div>
            {/snippet}
        </Accordion>
        <Accordion>
            {#snippet head()}
                <span>Level</span>
            {/snippet}
            {#snippet details()}
                <div>
                    <ChipGroup
                        bind:selectedIds={searchState.levels}
                        items={$BookLevelsStore}
                    />
                </div>
            {/snippet}
        </Accordion>
        <Accordion overflowy="none">
            {#snippet head()}
                <span>ID Type</span>
            {/snippet}
            {#snippet details()}
                <div
                    style="flex-direction: row; display:flex; justify-content: space-between;"
                >
                    <ChipGroup
                        bind:selectedIds={selectedIds_id_type}
                        multiple={false}
                        optional={false}
                        defaultId={"both"}
                        style="width: fit-content"
                        items={[
                            { id: "both", label: "Both" },
                            { id: "old", label: "Old" },
                            { id: "new", label: "New" },
                        ]}
                    />
                </div>
            {/snippet}
        </Accordion>
    </div>
</div>
