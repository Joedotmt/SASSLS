<script>
    import Accordion from "$lib/components/Accordion.svelte";
    import ChipGroup from "$lib/components/ChipGroup.svelte";
    import SortButton from "$lib/components/SortButton.svelte";
    import TabSelector from "$lib/components/TabSelector.svelte";
    import TabView from "$lib/components/TabView.svelte";
    import { onMount } from "svelte";
    import pb from "$lib/pocketbase";
    import { BookLevelsStore } from "$lib/levels.js";
    let subjectChips = [];
    let levelChips = $BookLevelsStore;
    let resourceSubjectChips = [];

    export let searchPanelState = {
        selectedSubjects: [],
        selectedLevels: [],
        showingIdType: "",
        sort: ["-", "created"],
    };

    onMount(() => {
        fetchSubjects();
    });

    async function fetchSubjects() {
        try {
            const records = await pb.collection("books_subjects").getFullList({
                sort: "+subject",
                fields: "resource,subject",
            });

            const mapToChips = (subject) => ({
                label: subject.subject,
                id: subject.subject,
            });

            subjectChips = records.filter((s) => !s.resource).map(mapToChips);
            resourceSubjectChips = records
                .filter((s) => s.resource)
                .map(mapToChips);
        } catch (err) {
            console.error("Error fetching subjects:", err);
            subjectChips = { label: "Error fetching Subjects", id: "1" };
            resourceSubjectChips = {
                label: "Error fetching Subjects",
                id: "2",
            };
        }
    }

    //async function fetchSubjects() {}

    let currentTab = 0;
</script>

<div class="search-area panel">
    <Accordion expandedHeight={155} overflowy="none">
        <span slot="head">Sort by</span>
        <div
            style="flex-direction: row; display:flex; justify-content: space-between;"
            slot="details"
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
    </Accordion>
    <Accordion expandedHeight={400}>
        <span slot="head">Subjects</span>
        <div slot="details">
            <TabSelector bind:currentTab />
            <TabView bind:currentTab>
                <ChipGroup
                    slot="0"
                    bind:selectedIds={searchPanelState.selectedSubjects}
                    items={subjectChips}
                />
                <ChipGroup
                    slot="1"
                    bind:selectedIds={searchPanelState.selectedSubjects}
                    items={resourceSubjectChips}
                />
            </TabView>
        </div>
    </Accordion>
    <Accordion expandedHeight={192}>
        <span slot="head">Level</span>
        <div slot="details">
            <ChipGroup
                bind:selectedIds={searchPanelState.selectedLevels}
                items={levelChips}
            />
        </div>
    </Accordion>
    <select style="width: 100%;" bind:value={searchPanelState.showingIdType}>
        <option value="both">Both</option>
        <option value="old">Old ID</option>
        <option value="new">New ID</option>
    </select>
</div>
