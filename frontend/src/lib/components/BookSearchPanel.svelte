<script>
    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import SortButton from "$lib/components/SortButton.svelte";
    import TabSelector from "$lib/components/TabSelector.svelte";
    import TabView from "$lib/components/TabView.svelte";
    import { objects, constants } from "$lib/global.svelte.js";
    import { browser } from "$app/environment";
    import { crossfade } from "svelte/transition";
    import { untrack } from "svelte";

    let [send, receive] = crossfade({
        duration: 100,
        fallback: null,
    });

    let subjectChips = $state([]);
    let resourceSubjectChips = $state([]);

    let { env = $bindable() } = $props();

    function mapToChips(records) {
        const mapToChips = (subject) => ({
            label: subject.subject,
            id: subject.id,
        });
        subjectChips = records.filter((s) => !s.resource).map(mapToChips);
        resourceSubjectChips = records.filter((s) => s.resource).map(mapToChips);
    }

    let currentTab = $state(0);

    $effect(() => {
        if (browser && constants.books.subjects != null) {
            mapToChips(constants.books.subjects);
        }
    });

    let subjects = $state([]);
    let resources = $state([]);

    $effect(() => {
        untrack(() => {
            subjects = [];
            resources = [];
        });
        constants.books.subjects.forEach((item) => {
            untrack(() => {
                if (item.n.endsWith("RES")) {
                    resources.push(item.n.replace(" RES", ""));
                } else {
                    subjects.push(item.n);
                }
            });
        });
    });

    function reset_filters() {
        env.searchState = {
            query: "",
            subjects: [],
            levels: [],
            sortType: "created",
            sortAscending: "true",
            idType: "Both",
        };
    }
</script>

<div class="search-area panel {env.minimized ? 'minimized' : ''}">
    <div style="flex-direction: row; border-bottom: 1px solid var(---surface-5); width: 100%; display: flex; align-items: center;">
        <button
            onclick={() => {
                env.minimized = !env.minimized;
            }}
            class="button-circle"
            style="border:none; width:40px; height:40px; margin:5px"><span class="symbol">{env.minimized ? "left_panel_open" : "left_panel_close"}</span></button
        >
        <span style="margin: 0em 0em;">Filters</span>
    </div>
    {#if env.minimized}
        <div style="position: absolute; left: 0; top: 3.3em;">
            <SortButton bind:isAscending={env.searchState.sortAscending} class="button-circle" style="width:40px; height:40px; margin:5px; border:none; border-radius: 100px;" />
            <button in:receive out:send onclick={reset_filters} class="button-circle" style="width:40px; height:40px; margin:5px; border:none; border-radius: 100px;"><span class="symbol">reset_settings</span></button>
        </div>
    {/if}

    <div style="padding: 1em {env.minimized ? 5 : 1}em; overflow-y: auto; overflow-x:hidden; transition: padding 0.2s cubic-bezier(0.4, 0, 0, 1); gap:0.3em; display: flex; flex-direction: column;" inert={env.minimized ? "inert" : ""}>
        {#if !env.minimized}
            <button in:receive out:send onclick={reset_filters} style="flex-shrink: 0; justify-content:center;margin:auto; margin-bottom:0.6em; padding: 0.5em 1em; width: calc(100% - 2em); border:none;"><span style="margin-right: 0.5em;" class="symbol">reset_settings</span>Reset Filters</button>
        {/if}

        <Accordion overflowy="hidden">
            {#snippet head()}
                <span>Sort by</span>
            {/snippet}
            {#snippet details()}
                <div style="flex-direction: row; display:flex; justify-content: space-between;">
                    <ChipGroup bind:selected={env.searchState.sortType} multiple={false} optional={false} defaultIndex={0} style="width: fit-content" items={["Created", "Updated", "Title", "Price"]} />
                    <SortButton bind:isAscending={env.searchState.sortAscending} style="margin:0.5em; width:100px" />
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
                            <ChipGroup bind:selected={env.searchState.subjects} items={subjects} />
                        {/snippet}
                        {#snippet content2()}
                            <ChipGroup bind:selected={env.searchState.subjects} items={resources} />
                        {/snippet}
                    </TabView>
                </div>
            {/snippet}
        </Accordion>
        <Accordion overflowy="hidden">
            {#snippet head()}
                <span>Level</span>
            {/snippet}
            {#snippet details()}
                <div>
                    <ChipGroup bind:selected={env.searchState.levels} items={constants.books.levels} />
                </div>
            {/snippet}
        </Accordion>
        <Accordion overflowy="hidden">
            {#snippet head()}
                <span>ID Type</span>
            {/snippet}
            {#snippet details()}
                <div style="flex-direction: row; display:flex; justify-content: space-between;">
                    <ChipGroup bind:selected={env.searchState.idType} multiple={false} optional={false} defaultIndex={0} style="width: fit-content" items={["Both", "Old", "New"]} />
                </div>
            {/snippet}
        </Accordion>
    </div>
</div>
