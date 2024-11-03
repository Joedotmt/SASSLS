<script>
    import { run } from 'svelte/legacy';

    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import SortButton from "$lib/components/SortButton.svelte";
    import TabSelector from "$lib/components/TabSelector.svelte";
    import TabView from "$lib/components/TabView.svelte";
    import { BookLevelsStore, BookSubjectsStore } from "$lib/levels.js";
    import { browser } from "$app/environment";
    let subjectChips = $state([]);
    let resourceSubjectChips = $state([]);

    let { searchPanelState = $bindable({
        selectedSubjects: [],
        selectedLevels: [],
        showingIdType: "",
        sort: ["-", "created"],
    }) } = $props();


    function mapToChips(records) {
        const mapToChips = (subject) => ({
            label: subject.subject,
            id: subject.subject,
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
</script>

<div class="search-area panel">
    <Accordion expandedHeight={155} overflowy="none">
        {#snippet head()}
                <span >Sort by</span>
            {/snippet}
        {#snippet details()}
                <div
                style="flex-direction: row; display:flex; justify-content: space-between;"
                
            >
                <ChipGroup
                    bind:selectedIds={searchPanelState.sort[1]}
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
                    bind:value={searchPanelState.sort[0]}
                    style="margin:0.5em; width:100px"
                />
            </div>
            {/snippet}
    </Accordion>
    <Accordion expandedHeight={400}>
        {#snippet head()}
                <span>Subjects</span>
            {/snippet}
        {#snippet details()}
                <div >
                <TabSelector bind:currentTab />
                <TabView bind:currentTab>
                    {#snippet content1()}
                        <ChipGroup
                            bind:selectedIds={searchPanelState.selectedSubjects}
                            items={subjectChips}
                        />
                    {/snippet}
                    {#snippet content2()}
                        <ChipGroup
                            bind:selectedIds={searchPanelState.selectedSubjects}
                            items={resourceSubjectChips}
                        />
                    {/snippet}
                </TabView>
            </div>
            {/snippet}
    </Accordion>
    <Accordion expandedHeight={192}>
        {#snippet head()}
                <span >Level</span>
            {/snippet}
        {#snippet details()}
                <div >
                <ChipGroup
                    bind:selectedIds={searchPanelState.selectedLevels}
                    items={$BookLevelsStore}
                />
            </div>
            {/snippet}
    </Accordion>
    <select style="width: 100%;" bind:value={searchPanelState.showingIdType}>
        <option value="both">Both</option>
        <option value="old">Old ID</option>
        <option value="new">New ID</option>
    </select>
</div>
